"use client";

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import classes from "./Input.module.css";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className={classes.container}>
      {formatPrice && <BiDollar size={24} className={classes.icon} />}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`input ${formatPrice ? "formatPriceInput" : ""} ${
          errors[id] ? "errorsInput" : ""
        }`}
      />
      <label
        className={`label ${formatPrice ? "formatPriceLabel" : ""} ${
          errors[id] ? "errorsLabel" : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
};
export default Input;
