"use client";

import { Store } from "@prisma/client";
import classes from "./Footer.module.css";

interface FooterProps {
  store: Store | null;
}

const Footer: React.FC<FooterProps> = ({ store }) => {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.footer}>
        <ul className={classes.text}>
          <li>About Us</li>
          <li>Contact</li>
          <li>FAQS</li>
        </ul>
      </div>
      <div className={classes.copyright}>
        Copyright &copy;2023 {store?.name}. All right reserved
      </div>
    </div>
  );
};

export default Footer;
