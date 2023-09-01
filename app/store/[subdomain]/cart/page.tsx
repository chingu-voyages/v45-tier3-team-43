import getProductsByStoreId from "@/app/actions/getProductsByStoreId";
import ShoppingCart from "./ShoppingCart";
import classes from "./ShoppingCart.module.css";

interface IParams {
  subdomain: string;
}

const CartPage = async ({ params }: { params: IParams }) => {
  const products = await getProductsByStoreId(params);

  return (
    <div className={classes.container}>
      <ShoppingCart products={products} />
    </div>
  );
};
export default CartPage;
