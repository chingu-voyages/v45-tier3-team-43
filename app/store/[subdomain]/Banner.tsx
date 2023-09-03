"use client";

import { Banner } from "@prisma/client";
import classes from "./Banner.module.css";
import Image from "next/image";

interface BannerClientProps {
  banner: Banner | null;
}
const BannerClient: React.FC<BannerClientProps> = ({ banner }) => {
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
      </div>
    </div>
  );
};

export default BannerClient;
