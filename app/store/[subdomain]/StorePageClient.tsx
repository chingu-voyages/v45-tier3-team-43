import { Product, Store } from "@prisma/client";
import classes from "./StorePageClient.module.css";

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
      <h2>{store?.name}</h2>
      <div>{store?.description}</div>
    </div>
  );
};
export default StorePageClient;
