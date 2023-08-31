"use client";

import React from 'react'
import formatCurrency from "@/app/components/ui/formatCurrency"
import { Product } from "@prisma/client";
import classes from "./OrderSummary.module.css";



interface OrderSummaryProps {
  prices: number[];
  tax: number,
  shipping: number
}


const OrderSummary: React.FC<OrderSummaryProps> = ({
  prices, tax, shipping }) => {

    function handleSubmit (){
      alert('clicked checkout')
    }

  return (
    <div>
      <h2>ORDER SUMMARY</h2>
      <div>
        <div>ITEM TOTAL</div>
        <div>{formatCurrency(45.99)}</div>
      </div>
      <div>
        <div>SHIPPING</div>
        <div>{formatCurrency(shipping)}</div>
      </div>
      <div>
        <div>TAX</div>
        <div>{formatCurrency(tax)}</div>
      </div>
          
      <button className={classes.button} onClick={handleSubmit}>CHECKOUT</button>
    </div>

  )
}

export default OrderSummary



