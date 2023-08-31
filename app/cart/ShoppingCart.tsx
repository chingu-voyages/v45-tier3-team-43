import React from 'react'

import { Product } from "@prisma/client";
import formatCurrency from "@/app/components/ui/formatCurrency"
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import classes from "./ShoppingCart.module.css";

interface ShoppingCartProps {
  data: Product[];
  tax: number,
  shipping: number
}


const ShoppingCart: React.FC<ShoppingCartProps> = ({
  data, tax, shipping }) => {
  return (
    <div  >
      <h2 className={classes.heading}>SHOPPING CART</h2>
      <div className={classes.cartDivs}>
        {data.length === 0 && (<p>no items in cart</p>)}
        <div className={classes.items}>
          {data.map((item) => {
            return <CartItem product={item} key={item.id}/>
          })}
        </div>
        {data.length !== 0 &&
          (<div> <OrderSummary tax={tax} shipping={shipping} prices={[15, 13]} /></div>)}
      </div>
    </div>
  )
}

export default ShoppingCart



