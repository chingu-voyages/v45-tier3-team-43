"use client";

import { Store } from "@prisma/client";
import classes from "./Header.module.css";
import { BiShoppingBag } from "react-icons/bi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderClientProps {
  store: Store | null;
}

const HeaderClient: React.FC<HeaderClientProps> = ({ store }) => {
  const router = useRouter();
  const params = useParams();
  const [cartItems, setCartItems] = useState<number>(0);

  useEffect(() => {
    const data = localStorage.getItem(params?.subdomain as string);
    if (data) {
      setCartItems(JSON.parse(data).length);
    }

    const handleStorage = () => {
      const data = localStorage.getItem(params?.subdomain as string);
      if (data) {
        setCartItems(JSON.parse(data).length);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [params?.subdomain]);

  return (
    <div className={classes.header}>
      <div className={classes.companyName}>{store?.name}</div>
      <div
        onClick={() => router.push(`${store?.subdomain}/cart`)}
        className={classes.cartButton}
      >
        <BiShoppingBag size={30} />
        <div className={classes.cartBadge}>{cartItems}</div>
      </div>
    </div>
  );
};

export default HeaderClient;
