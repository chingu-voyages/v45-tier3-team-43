"use client";

import Image from "next/image";
import { Product } from "@prisma/client";
import formatCurrency from "@/app/components/ui/formatCurrency";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import classes from "./ShoppingCart.module.css";

interface CartItemProps {
  product: Product;
  onMinusOne: (product: Product) => void;
  onPlusOne: (product: Product) => void;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  onMinusOne,
  onPlusOne,
  quantity,
}) => {
  return (
    <div className={classes.individualitem}>
      <Image
        src={product.images[0]}
        width={90}
        height={90}
        alt="Item"
        className={classes.itemImage}
        priority={false}
      />

      <div className={classes.itemDescription}>
        <h3 className={classes.productTitle}>{product.title}</h3>
        <div className={classes.itemPrice}>{formatCurrency(product.price)}</div>
        <div className={classes.quantityContainer}>
          <span>QTY:</span>
          <div className={classes.quantity}>
            <button
              className={classes.minusButton}
              onClick={() => onMinusOne(product)}
            >
              <AiOutlineMinusCircle size={20} />
            </button>
            <span>{quantity}</span>
            <button
              className={classes.plusButton}
              onClick={() => onPlusOne(product)}
            >
              <AiOutlinePlusCircle size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
