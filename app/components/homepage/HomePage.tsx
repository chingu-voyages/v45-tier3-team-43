"use client";

import { User } from "@prisma/client";
import LoginForm from "../authforms/LoginForm";
import RegisterForm from "../authforms/RegisterForm";
import { useState, useCallback } from "react";
import classes from "./HomePage.module.css";
import { redirect } from "next/navigation";




interface HomePageProps {
  currentUser?: User | null;
}

const HomePage: React.FC<HomePageProps> = ({ currentUser }) => {
  if (currentUser) {
    redirect("/dashboard");
  }

  const [loginMode, setLoginMode] = useState(true);

  const toggleMode = useCallback(() => {
    setLoginMode((current) => !current);
  }, []);

  return (

<section className={classes.hpsection}>
     <video className={classes.video} playsInline autoPlay muted loop id="video">
        <source
          src="
https://github.com/chingu-voyages/v45-tier3-team-43/assets/114012059/3d4d25cc-dbed-47ac-b497-e3ac53fd6acf
"
          type="video/mp4"
        />


      </video>
      {/*  */}
  <nav className={classes.nav}>
 <li>Fashion Vista</li>
 <li>Log In</li>
</nav>
    <div className={classes.container} >
      
      <div className={classes.hptext}>
        <span style={{color:"#ffe601"}}>
         Connect</span> With Shoppers Anywhere at Anytime.
        
        <div style={{fontSize:"1.3rem", fontFamily:"Visby-Reg"}}>Create your online store with Fashion Vista.
        </div>
   </div>
      {loginMode ? (
        <LoginForm toggleMode={toggleMode} />
      ) : (
        <RegisterForm toggleMode={toggleMode} />
      )}
    </div>
    </section>
  );
};
export default HomePage;
