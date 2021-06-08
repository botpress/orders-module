import React, { FC } from 'react'

export const OrderCard: FC<any> = ({ bp, orderId, item, qty }) => {
  return (
    <div>
      {orderId} {item} x{qty}
    </div>
  )
}
