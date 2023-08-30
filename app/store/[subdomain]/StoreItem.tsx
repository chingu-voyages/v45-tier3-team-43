import { Product } from "@prisma/client";
import classes from "./StoreList.module.css";
import Image from "next/image";

interface StoreItemProps {
  product: Product | null;
}

const StoreItem: React.FC<StoreItemProps> = ({ product }) => {
  return (
    <div className={classes.storeItem}>
      <Image
        fill
        alt="fashionvista"
        sizes="(width: 230px)"
        src="https://images.pexels.com/photos/3119215/pexels-photo-3119215.jpeg?auto=compress&cs=tinysrgb&w=1600"
        priority={false}
        className={classes.itemImage}
      />
    </div>
  );
};

export default StoreItem;
