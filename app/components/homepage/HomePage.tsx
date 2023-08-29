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
    <div className={classes.hp}>
      <video
        className={classes.video}
        playsInline
        autoPlay
        muted
        loop
        id="video"
        src="/assets/dsk-video.mp4"
      ></video>
      <h1>FashionVista</h1>
      <div className={classes.container}>
        <div className={classes.text}>
          <p className={classes.mainText}>
            <span>Connect</span> with Shoppers Anywhere at Anytime
          </p>
          <p style={{ fontSize: "1.25rem", fontFamily: "Visby-Reg" }}>
            Create your online store with FashionVista
          </p>
        </div>

        {loginMode ? (
          <LoginForm toggleMode={toggleMode} />
        ) : (
          <RegisterForm toggleMode={toggleMode} />
        )}
      </div>
    </div>
  );
};
export default HomePage;
