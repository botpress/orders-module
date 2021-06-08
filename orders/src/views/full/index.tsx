import React, { FC } from 'react'

import OrdersList from './OrdersList'

/**
 * This file is the full view of your module. It automatically includes heavy dependencies, like react-bootstrap
 * If you want to display an interface for your module, export your principal view as "default"
 */
const MyMainView: FC<any> = ({ bp }) => {
  return (
    <div>
      <h1>Orders List</h1>
      <OrdersList bp={bp} />
    </div>
  )
}

export default MyMainView
export { CreateOrder } from './CreateOrder'
