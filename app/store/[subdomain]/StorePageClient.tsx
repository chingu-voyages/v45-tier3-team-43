import { Store } from "@prisma/client";
import classes from "./StorePageClient.module.css";

interface StorePageClientProps {
  store: Store | null;
}

const StorePageClient: React.FC<StorePageClientProps> = ({ store }) => {
  return (
    <div className={classes.container}>
      <h2>{store?.name}</h2>
      <div>{store?.description}</div>
    </div>
  );
};
export default StorePageClient;
