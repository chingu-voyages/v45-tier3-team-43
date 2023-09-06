"use client";

import { Product } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./ShoppingCart.module.css";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

interface ShoppingCartProps {
  products: Product[] | null;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ products }) => {
  const router = useRouter();
  const params = useParams();
  const [cartWithDuplicateData, setCartWithDuplicateData] = useState<
    string | null
  >("");

  const counts: any = {};

  // let cartWithDuplicatesData;

  useEffect(() => {
    const data = localStorage.getItem(params?.subdomain as string);
    if (data) {
      setCartWithDuplicateData(data);
    }
  }, [params?.subdomain]);

  // cartWithDuplicatesData = localStorage.getItem(params?.subdomain as string);

  let cartwithDuplicates: Product[] = [];

  if (cartWithDuplicateData) {
    cartwithDuplicates = JSON.parse(cartWithDuplicateData);
  }

  if (cartwithDuplicates) {
    cartwithDuplicates.forEach(function (x) {
      counts[x.id] = (counts[x.id] || 0) + 1;
    });
  }

  const individualItems = Object.keys(counts);

  let cart: Product[] = [];

  individualItems.forEach((item) => {
    const product = products?.find((product) => product.id === item);
    if (product) {
      cart.push(product);
    }
  });

  function handleMinusOne(product: Product) {
    const index = cartwithDuplicates.findIndex(
      (item) => item.id === product.id
    );
    if (index > -1) {
      // only splice array when item is found
      cartwithDuplicates.splice(index, 1); // 2nd parameter means remove one item only
    }
    localStorage.setItem(
      params?.subdomain as string,
      JSON.stringify(cartwithDuplicates)
    );

    setCartWithDuplicateData(localStorage.getItem(params?.subdomain as string));
  }

  function handlePlusOne(product: Product) {
    localStorage.setItem(
      params?.subdomain as string,
      JSON.stringify(cartwithDuplicates.concat(product))
    );

    setCartWithDuplicateData(localStorage.getItem(params?.subdomain as string));
  }

  let itemTotal = 0;

  cart.forEach((item) => {
    itemTotal = itemTotal + item.price * counts[item.id];
  });

  cart = cart.sort((a, b) => b.price - a.price);

  return (
    <div>
      <div className={classes.heading}>
        <h2 className={classes.headingTitle}>Shopping Cart</h2>
        <button
          onClick={() => router.push(`/store/${params?.subdomain}`)}
          className={classes.storeButton}
        >
          Back to Store
        </button>
      </div>
      <div className={classes.cartDivs}>
        {!cartwithDuplicates ||
          (cartwithDuplicates.length === 0 && (
            <div className={classes.noItems}>
              <p>You have no items in your cart!</p>
            </div>
          ))}
        {cart && cart.length > 0 && (
          <div className={classes.items}>
            {cart.map((item) => {
              return (
                <CartItem
                  product={item}
                  key={item.id}
                  onMinusOne={handleMinusOne}
                  onPlusOne={handlePlusOne}
                  quantity={counts[item.id]}
                />
              );
            })}
          </div>
        )}

        <div>
          <OrderSummary itemTotal={itemTotal} cart={cart} counts={counts} />
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;
