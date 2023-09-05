"use client";

import { Banner, User } from "@prisma/client";
import classes from "./Banner.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BannerClientProps {
  banner: Banner | null;
  isStoreOwner: boolean;
}
const BannerClient: React.FC<BannerClientProps> = ({
  banner,
  isStoreOwner,
}) => {
  const router = useRouter();

  return (
    <div className={classes.banner}>
      <Image
        fill
        src={banner?.bannerImage || "/assets/images/default-banner.jpg"}
        alt="Banner Image"
        className={classes.image}
        sizes="(width: 100%)"
        priority
      />
      <div className={classes.bannerContent}>
        <div className={classes.mainContent}>
          {banner?.bannerText || "Explore our latest products!"}
        </div>
        {isStoreOwner && (
          <button
            onClick={() => router.push("/dashboard")}
            className={classes.dashboardBtn}
          >
            Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default BannerClient;
