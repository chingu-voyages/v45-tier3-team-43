"use client";

import { Order, Product } from "@prisma/client";
import Image from "next/image";
import classes from "./OrderClient.module.css";
import { JsonObject } from "@prisma/client/runtime/library";
import { useState } from "react";

interface OrderClientProps {
  order: Order;
  products: Product[];
}

const OrderClient: React.FC<OrderClientProps> = ({ order, products }) => {
  const [openProducts, setOpenProducts] = useState(false);

  const orderProducts = products.filter((product) =>
    order.orderItems.includes(product.id)
  );

  return (
    <div className={classes.container}>
      <div className={classes.orderFace}>
        <div>
          <b>Order Date:</b> {order.createdAt.toLocaleString()}
        </div>
        <div>
          <b>Order Total:</b> ${order.orderTotal}
        </div>
        <button
          onClick={() => setOpenProducts((prevState) => !prevState)}
          className={classes.viewOrderButton}
        >
          {openProducts ? "Hide Info" : "View Info"}
        </button>
      </div>

      {openProducts && (
        <div className={classes.orderDetails}>
          <div className={classes.address}>
            <b>Address:</b> <p>{order.address}</p>
          </div>
          <div className={classes.phone}>
            <b>Phone:</b> <p>{order.phone}</p>
          </div>
          <div className={classes.productsContainer}>
            <h4>Products:</h4>
            <div className={classes.products}>
              {orderProducts.map((product) => (
                <div key={product.id} className={classes.orderProduct}>
                  <div className={classes.imageContainer}>
                    <Image
                      fill
                      alt="Product"
                      src={product.images[0]}
                      className={classes.image}
                      sizes="(width: 5rem)"
                      priority={false}
                    />
                  </div>
                  <p>{product.title}</p>
                  <div>
                    <b>QTY: </b>
                    {order.counts &&
                      ((order.counts as JsonObject)[product.id] as number)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderClient;
