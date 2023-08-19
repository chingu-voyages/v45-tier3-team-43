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
    <div className={classes.container}>
      <h1>FashionVista</h1>
      {loginMode ? (
        <LoginForm toggleMode={toggleMode} />
      ) : (
        <RegisterForm toggleMode={toggleMode} />
      )}
    </div>
  );
};
export default HomePage;
