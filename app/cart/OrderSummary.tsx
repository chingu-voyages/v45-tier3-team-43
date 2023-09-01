"use client";

import React from 'react'
import formatCurrency from "@/app/components/ui/formatCurrency"
import { Product } from "@prisma/client";
import classes from "./OrderSummary.module.css";



interface OrderSummaryProps {
  tax: number,
  shipping: number,
  itemTotal:number
}


const OrderSummary: React.FC<OrderSummaryProps> = ({
  itemTotal, tax, shipping }) => {

  function handleSubmit() {
    alert('clicked checkout')
  }

const orderTotal = (itemTotal+ shipping)*(1+(tax/100))

  return (
    <>
      <h2>ORDER SUMMARY</h2>
      <div className={classes.content}>
        <div>
          <div>ITEM TOTAL</div>
          <div>{formatCurrency(itemTotal)}</div>
        </div>
        <div>
          <div>SHIPPING</div>
          <div>{formatCurrency(shipping)}</div>
        </div>
        <div>
          <div>TAX ({tax}%)</div>
          <div>{formatCurrency((itemTotal+shipping)*tax/100)}</div>
        </div>
        <div>
          <div>TOTAL</div>
          <div>{formatCurrency(orderTotal)}</div>
        </div>

        <button className={classes.button} onClick={handleSubmit}>CHECKOUT</button>
      </div>
    </>
  )
}

export default OrderSummary



