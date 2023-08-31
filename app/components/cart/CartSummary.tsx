
import React from 'react'
import formatCurrency from "@/app/components/ui/formatCurrency"

type Props = {}

const CartSummary = (props: Props) => {
  return (
<div>
    <h2>ORDER SUMMARY</h2>
    <div>
      <div>ITEM TOTAL</div>
      <div>{formatCurrency(45.99)}</div>
    </div>
    <button>Checkout</button>
</div>

    )
}

export default CartSummary



