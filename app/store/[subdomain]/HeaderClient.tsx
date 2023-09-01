import { Store } from "@prisma/client";
import classes from "./Header.module.css";
import { BiShoppingBag } from "react-icons/bi";

interface HeaderClientProps {
  store: Store | null;
}

const HeaderClient: React.FC<HeaderClientProps> = ({ store }) => {
  return (
    <div className={classes.header}>
      <div className={classes.companyName}>{store?.name}</div>
      <div>
        <BiShoppingBag size={30} />
      </div>
    </div>
  );
};

export default HeaderClient;
