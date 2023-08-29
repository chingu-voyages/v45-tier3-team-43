import { Product, Store } from "@prisma/client";
import classes from "./StorePageClient.module.css";
import HeaderClient from "./HeaderClient";
import Banner from "./Banner";

interface StorePageClientProps {
  store: Store | null;
  products: Product[] | null;
}

const StorePageClient: React.FC<StorePageClientProps> = ({
  store,
  products,
}) => {
  // console.log(products);
  // console.log(store);

  if (!store) {
    return (
      <div className={classes.noStore}>
        <p>No store exists for this subdomain!</p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <HeaderClient store={store} />
      <Banner />
    </div>
  );
};
export default StorePageClient;
