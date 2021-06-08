const base = require('./_base')

function renderElement(data, channel) {
  const events = []

  if (data.typing) {
    events.push({
      type: 'typing',
      value: data.typing
    })
  }

  return [
    ...events,
    {
      type: 'custom',
      module: 'orders',
      component: 'OrderCard',
      orderId: data.orderId,
      item: data.item,
      qty: data.qty
    }
  ]
}

module.exports = {
  id: 'orders_order-card',
  group: 'Orders Module',
  title: 'Order Card',

  jsonSchema: {
    description: 'module.orders.types.orderCard.description',
    type: 'object',
    required: ['orderId', 'item', 'qty'],
    properties: {
      orderId: {
        type: 'string',
        title: 'module.orders.types.orderCard.orderId'
      },
      item: {
        type: 'string',
        title: 'module.orders.types.orderCard.item'
      },
      qty: {
        type: 'string',
        title: 'module.orders.types.orderCard.qty'
      },
      ...base.typingIndicators
    }
  },

  uiSchema: {},
  computePreviewText: formData => `${formData.orderId} ${formData.item} ${formData.qty}`,

  renderElement
}
