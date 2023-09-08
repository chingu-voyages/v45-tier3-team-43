"use client";

import { Order, Product } from "@prisma/client";
import classes from "./OrdersList.module.css";
import OrderClient from "./OrderClient";

interface OrdersListProps {
  orders: Order[] | null;
  products: Product[] | null;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, products }) => {
  return (
    <div className={classes.ordersContainer}>
      <h3>Orders</h3>

      {!orders ||
        (orders.length === 0 && (
          <div className={classes.noOrders}>You have no orders yet!!!</div>
        ))}

      {products &&
        orders &&
        orders.length > 0 &&
        orders.map((order) => (
          <OrderClient key={order.id} order={order} products={products} />
        ))}
    </div>
  );
};
export default OrdersList;
