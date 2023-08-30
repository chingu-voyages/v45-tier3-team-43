import { Banner, Product, Store } from "@prisma/client";
import classes from "./StorePageClient.module.css";
import HeaderClient from "./HeaderClient";
import StoreList from "./StoreList";
import BannerClient from "./Banner";

interface StorePageClientProps {
  store: Store | null;
  products: Product[] | null;
  banner: Banner | null;
}

const StorePageClient: React.FC<StorePageClientProps> = ({
  store,
  products,
  banner,
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
      <BannerClient banner={banner} />
      <StoreList products={products} />
    </div>
  );
};
export default StorePageClient;
