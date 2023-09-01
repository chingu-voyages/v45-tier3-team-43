import React from 'react'

import Image from "next/image";

import { Product } from "@prisma/client";
import formatCurrency from "@/app/components/ui/formatCurrency"
import classes from "./ShoppingCart.module.css";

interface CartItemProps {
  product: Product;
}


const CartItem: React.FC<CartItemProps> = ({
  product }) => {
  return (
    <div className={classes.individualitem}>

      <Image
        src={product.images[0]}
        width={80}
        height={80}
        alt='image alt text'
        className={classes.itemImage}
      />


      <div className={classes.itemDescription}>
        <h3>{product.title}</h3>
        <div>{formatCurrency(product.price)}</div>
        <div>{product.description}</div>
        <div>
          <span>QTY:</span>
          <button className={classes.button}>-</button>
          <span>1</span>
          <button className={classes.button}>+</button>
          </div>
      </div>
    </div>
  )
}

export default CartItem



