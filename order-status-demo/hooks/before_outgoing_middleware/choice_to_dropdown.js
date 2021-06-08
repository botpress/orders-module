  const _ = require('lodash')

  const DROP_PREFIX = '#Drop: '

  if (event.payload.quick_replies && event.payload.text && event.payload.text.startsWith(DROP_PREFIX)) {
    event.payload = {
      type: 'custom',
      module: 'extensions',
      component: 'Dropdown',
      message: event.payload.text.replace(DROP_PREFIX, ''),
      buttonText: '',
      displayInKeyboard: false,
      options: _.map(event.payload.quick_replies, reply => {
        return { label: reply.title, value: reply.payload }
      }),
      allowCreation: undefined,
      allowMultiple: undefined,
      width: 215,
      collectFeedback: undefined
    }

    event.preview = event.preview.replace(DROP_PREFIX, '')
  }