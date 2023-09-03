"use client";

import { Store } from "@prisma/client";
import classes from "./Header.module.css";
import { BiShoppingBag } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface HeaderClientProps {
  store: Store | null;
}

const HeaderClient: React.FC<HeaderClientProps> = ({ store }) => {
  const router = useRouter();

  return (
    <div className={classes.header}>
      <div className={classes.companyName}>{store?.name}</div>
      <div
        onClick={() => router.push(`${store?.subdomain}/cart`)}
        className={classes.cartButton}
      >
        <BiShoppingBag size={30} />
      </div>
    </div>
  );
};

export default HeaderClient;
