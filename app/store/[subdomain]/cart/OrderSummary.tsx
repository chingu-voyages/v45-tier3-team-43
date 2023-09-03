"use client";

import React from "react";
import formatCurrency from "@/app/components/ui/formatCurrency";
import classes from "./OrderSummary.module.css";

interface OrderSummaryProps {
  itemTotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ itemTotal }) => {
  function handleSubmit() {
    alert("clicked checkout");
  }

  const orderTotal = (itemTotal + 15) * (1 + 7 / 100);

  return (
    <>
      <h2 className={classes.mainTitle}>Order Summary</h2>
      <div className={classes.content}>
        <div className={classes.summaryDivs}>
          <div className={classes.title}>Item Total</div>
          <div>{formatCurrency(itemTotal)}</div>
        </div>
        <div className={classes.summaryDivs}>
          <div className={classes.title}>Shipping</div>
          <div>{formatCurrency(15)}</div>
        </div>
        <div className={classes.summaryDivs}>
          <div className={classes.title}>Tax ({7}%)</div>
          <div>{formatCurrency(((itemTotal + 15) * 7) / 100)}</div>
        </div>
        <div className={classes.totalDiv}>
          <div className={classes.title}>Total</div>
          <div>{formatCurrency(orderTotal)}</div>
        </div>

        <button className={classes.button} onClick={handleSubmit}>
          Checkout
        </button>
      </div>
    </>
  );
};

export default OrderSummary;
