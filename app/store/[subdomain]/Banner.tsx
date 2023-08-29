import classes from "./Banner.module.css";
const Banner = () => {
 return (
  <div className={classes.banner}>
    <div className={classes.bannerContent}>
      <div className={classes.mainContent}>Grab exciting Deals and Special <br /> Promos Today, Don&apos;t Miss Out!</div>
      <p className={classes.subContent}>Take advantage of today&apos;s promotions with a variety of attractive offers such as discounts and exclusive offers. Get it soon before it runs out!</p>
      <button className={classes.button}>Grab Now</button>
    </div>
  </div>
 )
};

export default Banner;
