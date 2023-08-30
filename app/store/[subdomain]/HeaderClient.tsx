import { Store } from "@prisma/client";
import classes from "./Header.module.css";
import { BiShoppingBag } from "react-icons/bi";
import { LiaSearchSolid } from "react-icons/lia";

interface HeaderClientProps {
  store: Store | null;
}

const HeaderClient: React.FC<HeaderClientProps> = ({ store }) => {
  return (
    <div className={classes.header}>
      <div className={classes.companyName}>{store?.name}</div>
      <div className={classes.shopping}>
        <div>
          <BiShoppingBag size={30} />
        </div>
        <div className={classes.inputContainer}>
          <input
            className={classes.input}
            type="text"
            placeholder="Search products..."
          />
          <LiaSearchSolid />
        </div>
      </div>
    </div>
  );
};

export default HeaderClient;
