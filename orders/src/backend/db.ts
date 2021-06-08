import * as sdk from 'botpress/sdk'

const TABLE_NAME = 'orders'

interface User {
  id: number
  name: string
  role: string
}

const generateOrderId = () =>
  Array(10)
    // @ts-ignore
    .fill()
    .map(() => Math.floor(Math.random() * 10))
    .join('')

export default class CompleteModuleDB {
  knex: sdk.KnexExtended

  constructor(bp: typeof sdk) {
    this.knex = bp.database
  }

  initialize() {
    return this.knex.createTableIfNotExists(TABLE_NAME, table => {
      table.increments('id').primary()
      table.string('orderId')
      table.string('item')
      table.integer('qty')
      table.string('customer')
      table.string('status')
      table.date('date')
    })
  }

  async addOrder(item: string, qty: number, customer: string) {
    const orderId = generateOrderId()
    const { id } = await this.knex.insertAndRetrieve<User>(
      TABLE_NAME,
      { orderId, item, qty, customer, status: 'pending', date: new Date() },
      ['id']
    )
    return { id, orderId }
  }

  async getOrders(customer?: string) {
    let query = this.knex(TABLE_NAME).select()
    if (customer) {
      query = query.where({ customer })
    }

    return await query
  }

  async getOrder(orderId: string) {
    return await this.knex(TABLE_NAME)
      .select()
      .where({ orderId })
  }
}
