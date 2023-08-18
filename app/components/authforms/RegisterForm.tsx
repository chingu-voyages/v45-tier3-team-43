"use client";

import { useState } from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import classes from "./AuthForms.module.css";
import Input from "../inputs/Input";

interface RegisterFormProps {
  toggleMode: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ toggleMode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("api/register", data)
      .then(() => {
        toast.success("Success!");
        toggleMode();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
      <h2>Register</h2>
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
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
      <button type="submit">Continue</button>
      <div className={classes.switchModeOuter}>
        <div className={classes.switchModeInner}>
          <div>Already have an account?</div>
          <div className={classes.switchToLogin} onClick={() => toggleMode()}>
            Log in
          </div>
        </div>
      </div>
    </form>
  );
};
export default RegisterForm;
