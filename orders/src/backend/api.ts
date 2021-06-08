import * as sdk from 'botpress/sdk'
import DB from './db'

export default async (bp: typeof sdk, db: DB) => {
  /**
   * This is an example route to get you started.
   * Your API will be available at `http://localhost:3000/api/v1/bots/BOT_NAME/mod/orders`
   * Just replace BOT_NAME by your bot ID
   */
  const router = bp.http.createRouterForBot('orders')

  // Link to access this route: http://localhost:3000/api/v1/bots/BOT_NAME/mod/orders/orders
  router.post('/orders', async (req, res) => {
    const { item, qty, customer } = req.body
    const { id, orderId } = await db.addOrder(item, qty, customer)
    res.send({ id, orderId })
  })

  router.get('/orders', async (req, res) => {
    const { customer } = req.query
    const orders = await db.getOrders(customer)
    res.send({ orders })
  })

  router.get('/order', async (req, res) => {
    const { orderId } = req.query
    const orders = await db.getOrder(orderId)
    res.send({ order: orders[0] })
  })
}
