"use client";

import React, { useEffect } from "react";
import formatCurrency from "@/app/components/ui/formatCurrency";
import classes from "./OrderSummary.module.css";
import { Product } from "@prisma/client";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface OrderSummaryProps {
  itemTotal: number;
  cart: Product[];
  counts: any;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  itemTotal,
  cart,
  counts,
}) => {
  const searchParams = useSearchParams();
  const params = useParams();

  const orderTotal = itemTotal + 15;
  // const orderTotal = (itemTotal + 15) * (1 + 7 / 100);

  // console.log(counts);

  useEffect(() => {
    if (searchParams?.get("success")) {
      localStorage.removeItem(params?.subdomain as string);
      alert("Payment Completed!");
      toast.success("Payment completed.");
    }

    if (searchParams?.get("cancelled")) {
      alert("Payment Cancelled");
      toast.error("Something went wrong.");
    }
  }, [searchParams, params?.subdomain]);

  const onCheckout = async () => {
    const response = await axios.post(`/api/${params?.subdomain}/checkout`, {
      productIds: cart.map((item) => item.id),
      counts: counts,
      orderTotal: itemTotal + 15,
    });

    window.location = response.data.url;
  };

  // console.log(cart.length);

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
        {/* <div className={classes.summaryDivs}>
          <div className={classes.title}>Tax ({7}%)</div>
          <div>{formatCurrency(((itemTotal + 15) * 7) / 100)}</div>
        </div> */}
        <div className={classes.totalDiv}>
          <div className={classes.title}>Total</div>
          <div>{formatCurrency(orderTotal)}</div>
        </div>

        <button
          className={classes.button}
          onClick={onCheckout}
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export default OrderSummary;
