"use client";

import { Store } from "@prisma/client";
import classes from "./Footer.module.css";
import Icon from "./Icon";

interface FooterProps {
  store: Store | null;
}

const Footer: React.FC<FooterProps> = ({ store }) => {

  return (
   <div className={classes.footerContainer}>
    <div className={classes.footer}>
      <div className={classes.title}>
        <h3>{store?.name}</h3>
        <p className={classes.text}>Specializes in providing high-quality, stylish products for your wardrobe</p>
      </div>
      <div className={classes.navigation}>
        <h5>SHOP</h5>
        <div className={classes.text}>
          <p>All Collections</p>
          <p>Winter Collection</p>
          <p>Discount</p>
        </div>
      </div>
      <div className={classes.navigation}>
        <h5>COMPANY</h5>
        <div className={classes.text}>
          <p>About Us</p>
          <p>Contact</p>
          <p>Affiliates</p>
        </div>
      </div>
      <div className={classes.navigation}>
        <h5>SUPPORT</h5>
        <div className={classes.text}>
          <p>FAQS</p>
          <p>Cookie Policy</p>
          <p>Terms of Use</p>
        </div>
      </div>
      <div className={classes.navigation}>
        <h5>PAYMENT METHODS</h5>
        <div>
          <Icon iconUrl="/assets/images/mc_symbol.svg" altText="MasterCardIcon" />
          &nbsp;&nbsp;
          <Icon iconUrl="/assets/images/visa.svg" altText="VisaIcon" />
          &nbsp;&nbsp;&nbsp;
          <Icon iconUrl="/assets/images/paypal-3.svg" altText="PayPalIcon" width={50} />
        </div>
      </div>
    </div>
    <div className={classes.copyright}>Copyright &copy;2023 {store?.name}. All right reserved </div>
   </div>
  );
};

export default Footer;