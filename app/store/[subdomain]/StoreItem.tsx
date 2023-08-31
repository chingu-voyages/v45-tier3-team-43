import { Product } from "@prisma/client";
import classes from "./StoreList.module.css";
import Image from "next/image";
import { BiExpand } from "react-icons/bi";
import { LuShoppingCart } from "react-icons/lu";

interface StoreItemProps {
  product: Product;
}

const StoreItem: React.FC<StoreItemProps> = ({ product }) => {
  return (
    <div className={classes.storeItem}>
      <div className={classes.imageContainer}>
        <Image
          fill
          alt="fashionvista"
          sizes="(width: 230px)"
          src={product.images[0]}
          priority={false}
          className={classes.itemImage}
        />
        <div className={classes.cart}>
          <LuShoppingCart size={16} />
        </div>
        <div className={classes.expand}>
          <BiExpand size={20} />
        </div>
      </div>
      <span className={classes.title}>{product.title}</span>
      <span className={classes.price}>${product.price} US</span>
    </div>
  );
};

export default StoreItem;
