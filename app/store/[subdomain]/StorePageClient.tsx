import { Banner, Product, Store, User } from "@prisma/client";
import classes from "./StorePageClient.module.css";
import HeaderClient from "./HeaderClient";
import StoreList from "./StoreList";
import BannerClient from "./Banner";

interface StorePageClientProps {
  store: Store | null;
  products: Product[] | null;
  banner: Banner | null;
  currentUser: User | null;
}

const StorePageClient: React.FC<StorePageClientProps> = ({
  store,
  products,
  banner,
  currentUser,
}) => {
  if (!store) {
    return (
      <div className={classes.noStore}>
        <p>No store exists for this subdomain!</p>
      </div>
    );
  }

  let isStoreOwner;

  if (currentUser && store && currentUser.id === store.userId) {
    isStoreOwner = true;
  } else {
    isStoreOwner = false;
  }

  return (
    <div className={classes.container}>
      <HeaderClient store={store} />
      <BannerClient banner={banner} isStoreOwner={isStoreOwner} />
      <StoreList products={products} />
    </div>
  );
};
export default StorePageClient;
