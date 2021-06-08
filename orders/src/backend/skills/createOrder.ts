import * as sdk from 'botpress/sdk'

export interface CreateOrderData {
  itemContentId: string
  qtyContentId: string
}

export const generateFlow = async (
  data: CreateOrderData,
  metadata: sdk.FlowGeneratorMetadata
): Promise<sdk.FlowGenerationResult> => {
  return {
    transitions: createTransitions(),
    flow: {
      nodes: createNodes(data),
      catchAll: {
        next: []
      }
    }
  }
}

const createNodes = (data: CreateOrderData) => {
  const nodes: sdk.SkillFlowNode[] = [
    {
      name: 'entry',
      onEnter: [
        {
          type: sdk.NodeActionType.RenderElement,
          name: `#!${data.itemContentId}`
        }
      ],
      onReceive: [
        {
          type: sdk.NodeActionType.RunAction,
          name: 'builtin/setVariable {"type":"temp","name":"item","value":"{{event.preview}}"}'
        }
      ],
      next: [{ condition: 'true', node: 'promptQty' }]
    },
    {
      name: 'promptQty',
      onEnter: [
        {
          type: sdk.NodeActionType.RenderElement,
          name: `#!${data.qtyContentId}`
        }
      ],
      onReceive: [
        {
          type: sdk.NodeActionType.RunAction,
          name: 'builtin/setVariable {"type":"temp","name":"qty","value":"{{event.preview}}"}'
        }
      ],
      next: [{ condition: 'true', node: 'validateQty' }]
    },
    {
      name: 'validateQty',
      onEnter: [
        {
          type: sdk.NodeActionType.RunAction,
          name: 'orders/validateQty'
        }
      ],
      next: [
        { condition: 'temp.qtyValid === false', node: 'promptQty' },
        { condition: 'true', node: 'createOrder' }
      ]
    },
    {
      name: 'createOrder',
      onEnter: [
        {
          type: sdk.NodeActionType.RunAction,
          name: 'orders/createOrder',
          args: {
            item: '{{event.state.temp.item}}',
            qty: '{{event.state.temp.qty}}',
            customer: '{{event.state.user.email}}'
          }
        },
        {
          type: sdk.NodeActionType.RunAction,
          name: 'builtin/setVariable {"type":"temp","name":"success","value":"true"}'
        }
      ],
      next: [{ condition: 'true', node: '#' }]
    }
  ]
  return nodes
}

const createTransitions = (): sdk.NodeTransition[] => {
  return [
    { caption: 'On success', condition: 'temp.success', node: '' },
    { caption: 'On failure', condition: '!temp.success', node: '' }
  ]
}

export default { generateFlow }
