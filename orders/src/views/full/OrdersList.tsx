import React, { FC, useEffect, useState } from 'react'

const OrdersList: FC<any> = ({ bp }) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const {
        data: { orders }
      } = await bp.axios.get('mod/orders/orders')
      setOrders(orders)
    }

    fetchOrders()
  }, [])

  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          ({order.orderId}) {order.item} x{order.qty} {order.customer}
        </div>
      ))}
    </div>
  )
}

export default OrdersList
