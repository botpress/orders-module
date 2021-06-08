  const _ = require('lodash')
  let { questions_asked } = event.state.session
  const { currentFlow, currentNode } = event.state.context
  const matchesQuickReply = async flow => {
    if (currentFlow.startsWith('skills/choice')) {
      const preview = event.preview.toLowerCase()
      const kw = _.chain(flow.skillData.keywords)
        .values()
        .flatten()
        .find(kw => kw.toLowerCase() === preview.toLowerCase())
        .value()

      if (kw) {
         bp.logger.debug('match quick reply is true')
        return true
      }
    }
 bp.logger.debug('match quick reply is false')
    return false
  }

  async function hook() {
    if (!suggestions.length || !suggestions[0].decision) {
      return
    }

    const suggestion = suggestions[0]
    const flow = currentFlow && (await bp.ghost.forBot(event.botId).readFileAsObject('flows', currentFlow))

    if (
      event.state.context.currentFlow !== 'skills/choice-1d42d7.flow.json' &&
      !event.state.context.currentFlow.startsWith('skills/SFLiveAgent')
    ) {
       bp.logger.debug('enter decision')

      const decision = suggestion.decision
      if (
        decision.status === 'dropped' &&
        decision.reason.includes('already in the middle of a flow') &&
        suggestions[0].confidence > 0.5 &&
        !(await matchesQuickReply(flow))
      ) {
        bp.logger.debug('redirecting to q&a')
        // We're changing the election results
        decision.status = 'elected'
        decision.reason = 'Direct Q&A question detected - calling up answer.'

        if (!questions_asked) {
          questions_asked = 1
        } else {
          questions_asked++
        }
        event.state.session.questions_asked = questions_asked

        if (questions_asked === 3 && !suggestion.sourceDetails.endsWith('i_need_help')) {
          suggestion.payloads = [
            ...suggestion.payloads,
            { type: 'redirect', flow: 'a_lot_of_questions.flow.json', node: 'entry' }
          ]
          return
        }

        suggestion.payloads = [...suggestion.payloads, { type: 'redirect', flow: 'main.flow.json', node: 'end-flow' }]
      }
    }
  }

  return hook()