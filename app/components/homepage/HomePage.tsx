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
      <video
        className={classes.videoLarge}
        playsInline
        autoPlay
        muted
        loop
        id="video"
        src="/assets/dsk-video.mp4"
      >
        {/* <source src="/assets/dsk-video.mp4" type="video/mp4" /> */}
      </video>
      <video
        className={classes.videoSmall}
        playsInline
        autoPlay
        muted
        loop
        id="video"
        src="/assets/fv-mb-clip1.mp4"
      >
        {/* <source src="/assets/fv-mb-clip1.mp4" type="video/mp4" /> */}
      </video>
      <nav className={classes.nav}>
        <li>Fashion Vista</li>
        <li>Log In</li>
      </nav>
      <div className={classes.container}>
        <div className={classes.hptext}>
          <span style={{ color: "#ffe601" }}>Connect</span> With Shoppers
          Anywhere at Anytime.
          <div style={{ fontSize: "1.3rem", fontFamily: "Visby-Reg" }}>
            Create your online store with Fashion Vista.
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
