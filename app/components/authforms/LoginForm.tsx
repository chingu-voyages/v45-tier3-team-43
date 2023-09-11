"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "../inputs/Input";
import classes from "./AuthForms.module.css";

interface LoginFormProps {
  toggleMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleMode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("Logged in");
        router.push("/dashboard");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
      setIsLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
      <h2 style={{ fontSize: "1.3rem", fontFamily: "Visby" }}>
        Let&apos;s get started!
      </h2>
      <p className={classes.demo}>Demo Email: test@test.com</p>
      <p className={classes.demo}>Demo Password: testers</p>
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <button type="submit">{isLoading ? "connecting ..." : "Continue"}</button>
      <div className={classes.switchModeOuter}>
        <div className={classes.switchModeInner}>
          <div>First time using FashionVista?</div>
          <div className={classes.switchToLogin} onClick={() => toggleMode()}>
            Create an account
          </div>
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
