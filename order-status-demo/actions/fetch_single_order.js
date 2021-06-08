  const axios = require('axios')

  /**
   * Fetches the status and data of an order
   * @title Fetch a single order
   * @category Custom
   */
  const fetchOrderStatus = async () => {
    const orderId = temp.oid

    const axiosConfig = await this.bp.http.getAxiosConfigForBot(event.botId, { localUrl: true })
    console.log({ axiosConfig })

    const {
      data: {order: { status, date }}
    } = await axios.get('/mod/orders/order', { params: { orderId }, ...axiosConfig })

    temp.order = { status, date }
  }

  return fetchOrderStatus()