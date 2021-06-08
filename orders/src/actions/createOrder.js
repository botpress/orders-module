const axios = require('axios')
/**
 * Creates a order
 * @title Create Order
 * @category Orders
 * @author Botpress, Inc.
 * @param item The name of the item
 * @param qty The item quantity
 * @param customer The name of the customer
 */
const createOrder = async (item, qty, customer) => {
  const axiosConfig = await this.bp.http.getAxiosConfigForBot(event.botId, { localUrl: true })
  const {
    data: { id, orderId }
  } = await axios.post('/mod/orders/orders', { item, qty, customer }, axiosConfig)
  event.state.temp.createdOrder = { orderId, item, qty, customer }
  bp.logger.info(`[createOrder] ${id} ${orderId} ${item} ${qty} ${customer}`)
}

return createOrder(args.item, args.qty, args.customer)
