"use client";

import { useRouter } from "next/navigation";
import Input from "../inputs/Input";
import { useState } from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import classes from "./AddProductClient.module.css";
import ImageUpload from "../inputs/ImageUpload";
import SizeInput from "../inputs/SizeInput";

export const sizes = [
  {
    label: "XXS",
  },
  {
    label: "XS",
  },
  {
    label: "S",
  },
  {
    label: "M",
  },
  {
    label: "L",
  },
  {
    label: "XL",
  },
  {
    label: "2XL",
  },
  {
    label: "3XL",
  },
];

const AddProductClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      color: "",
      size: "",
      price: 1,
      images: [],
    },
  });

  const size = watch("size");
  let images = watch("images");

  // console.log(images);

  //created setCustomValue because setValue doesn't rerender the page
  const setCustomValue = (id: string, value: any) => {
    if (id === "images") {
      images = [...images, value];

      setValue(id, images, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    } else {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  // console.log(images);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/products", data)
      .then(() => {
        toast.success("Product Added!");
        router.refresh();
        reset();
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.inputs}>
          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="color"
            label="Color"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <div className={classes.sizeInputs}>
            {sizes.map((item) => (
              <div key={item.label} className={classes.sizeInput}>
                <SizeInput
                  onClick={(size) => setCustomValue("size", size)}
                  selected={size === item.label}
                  label={item.label}
                />
              </div>
            ))}
          </div>
          <Input
            id="price"
            label="Price"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            formatPrice
          />
        </div>
        <p className={classes.note}>
          <b>Note:</b> first image added is main image!
        </p>
        <div className={classes.imageUploads}>
          <ImageUpload
            value={images[0]}
            onChange={(value) => setCustomValue("images", value)}
          />
          <ImageUpload
            value={images[1]}
            onChange={(value) => setCustomValue("images", value)}
          />
          <ImageUpload
            value={images[2]}
            onChange={(value) => setCustomValue("images", value)}
          />
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          className={classes.addProductButton}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};
export default AddProductClient;
