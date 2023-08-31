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
      {(!products || products.length === 0) && (
        <p className={classes.noProducts}>This store has no products yet!</p>
      )}
      {products && (
        <div className={classes.storeItems}>
          {products.map((product) => (
            <StoreItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreList;
