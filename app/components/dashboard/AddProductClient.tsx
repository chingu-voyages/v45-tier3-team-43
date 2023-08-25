"use client";

import { useRouter } from "next/navigation";
import Input from "../inputs/Input";
import { useState } from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import classes from "./AddProductClient.module.css";
import ImageUpload from "../inputs/ImageUpload";

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
      price: 1,
      images: [],
    },
  });

  let images = watch("images");

  // console.log(images);

  //created setCustomValue because setValue doesn't rerender the page
  const setCustomValue = (id: string, value: any) => {
    images = [...images, value];
    setValue(id, images, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
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
            id="price"
            label="Price"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            formatPrice
          />
        </div>
        <p className={classes.note}>Note: first image added is main image!</p>
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
