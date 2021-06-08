  const axios = require('axios')

  /**
   * Fetches the status and date or recent orders and send them to the user
   * @title Fetch recent order
   * @category Custom
   */
  const fetchRecentOrders = async () => {
    const axiosConfig = await this.bp.http.getAxiosConfigForBot(event.botId, { localUrl: true })
    const customer = user.email
    const { data:{orders} } = await axios.get('/mod/orders/orders', { params: { customer }, ...axiosConfig })

    const payloads = []
    for (const order of orders) {
      const row_payloads = await bp.cms.renderElement(
        'builtin_text',
        {
          text: `The status of **${order.orderId}**, placed on ${order.date} is **${order.status}**`,
          typing: true,
          markdown: true
        },
        event
      )
      payloads.push(...row_payloads)
    }

    bp.events.replyToEvent(
      {
        botId: event.botId,
        channel: event.channel,
        target: event.target,
        threadId: event.threadId
      },
      payloads,
      event.id
    )
  }

  return fetchRecentOrders()