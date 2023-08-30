import { Product } from "@prisma/client";
import classes from "./StoreList.module.css";
import StoreItem from "./StoreItem";

interface StoreListProps {
  products: Product[] | null;
}

const StoreList: React.FC<StoreListProps> = ({ products }) => {
  return (
    <div className={classes.storeList}>
      <div className={classes.heading}>Products</div>
      <div className={classes.storeItems}>
        {[...Array(12)].map((_, i) => (
          <StoreItem product={null} key={i} />
        ))}
      </div>
    </div>
  );
};

export default StoreList;
