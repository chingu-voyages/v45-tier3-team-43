import React from 'react'

import { Product } from "@prisma/client";
import formatCurrency from "@/app/components/ui/formatCurrency"

interface CartItemProps {
    item:  Product ;
  }


const CartItem: React.FC<CartItemProps> = ({
item }) => {
  return (
    <div  >
    <h3>{item.title}</h3>
    <div>{formatCurrency(item.price)}</div>
    <div>{item.description}</div>
    <div><span>QTY: </span></div>
</div>
  )
}

export default CartItem



