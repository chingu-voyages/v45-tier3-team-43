import { Product } from "@prisma/client";
import classes from "./StoreList.module.css";
import Image from "next/image";

interface StoreItemProps {
  product: Product | null;
}

const StoreItem: React.FC<StoreItemProps> = ({
  product
}) => {
 return (
  <div className={classes.storeItem}>
    <Image 
      alt="fashinvista" 
      width={320}
      height={471} 
      src="https://images.pexels.com/photos/3119215/pexels-photo-3119215.jpeg?auto=compress&cs=tinysrgb&w=1600" 
    />
  </div>
 )
};

export default StoreItem;
