  // const ambiguousQnAs = []

  let { questions_asked, live_prompted } = event.state.session

  if (event.suggestions && event.suggestions.length) {
    event.suggestions
      .filter(x => x.source === 'qna')
      .forEach(suggestion => {
        if (suggestion.decision.status === 'elected' && !suggestion.sourceDetails.endsWith('i_need_help')) {
          // bp.logger.debug(typeof questions_asked)
          if (!questions_asked) {
            questions_asked = 1
          } else {
            questions_asked++
          }
          event.state.session.questions_asked = questions_asked

          if (questions_asked == 3) {
            suggestion.payloads = [
              ...suggestion.payloads,
              { type: 'redirect', flow: 'a_lot_of_questions.flow.json', node: 'entry' }
            ]
          }
        } // else {
        //   ambiguousQnAs.push(suggestion.payloads.filter(x => x.type === 'text')[0].text)
        // }
      })

    // if (ambiguousQnAs.length) {
    //   event.state.temp.ambiguousQnAs = ambiguousQnAs
    // }
  }