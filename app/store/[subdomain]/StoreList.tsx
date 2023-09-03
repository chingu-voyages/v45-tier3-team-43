import { Product } from "@prisma/client";
import classes from "./StoreList.module.css";
import StoreItem from "./StoreItem";
import { LiaSearchSolid } from "react-icons/lia";

interface StoreListProps {
  products: Product[] | null;
}

const StoreList: React.FC<StoreListProps> = ({ products }) => {
  return (
    <div className={classes.storeList}>
      <div className={classes.heading}>
        <div className={classes.headingTitle}>Products</div>
        <div className={classes.inputContainer}>
          <input
            className={classes.input}
            type="text"
            placeholder="Search products..."
            id="search"
          />
          <LiaSearchSolid size={20} />
        </div>
      </div>

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
