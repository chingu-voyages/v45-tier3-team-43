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
        priority={false}
      />
      <div className={classes.bannerContent}>
        <div className={classes.mainContent}>
          {banner?.bannerText || "Explore our latest products!"}
        </div>
        {/* <p className={classes.subContent}>
          Take advantage of today&apos;s promotions with a variety of attractive
          offers such as discounts and exclusive offers. Get it soon before it
          runs out!
        </p> */}
        <button className={classes.button}>Grab Now</button>
      </div>
    </div>
  );
};

export default BannerClient;
