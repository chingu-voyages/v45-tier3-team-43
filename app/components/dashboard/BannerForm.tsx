"use client";

import { Banner, Store } from "@prisma/client";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";
import classes from "./BannerForm.module.css";

interface BannerFormProps {
  store: Store | null;
  banner: Banner | null;
}

const BannerForm: React.FC<BannerFormProps> = ({ store, banner }) => {
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
      bannerText: "",
      bannerImage: "",
    },
  });

  let bannerImage = watch("bannerImage");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/banner", data)
      .then(() => {
        toast.success("Banner Added!");
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

  const deleteBanner = (bannerId: any) => {
    axios
      .delete(`api/banner/${bannerId}`)
      .then(() => {
        toast.success("Banner Deleted!");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className={classes.container}>
      {!banner && (
        <div>
          <p className={classes.note}>
            <b>Note:</b> Before you add a custom banner image and custom banner
            text, the defaults are used. If you add a custom banner image, it
            can be changed afterwards as well!
          </p>
          <div className={classes.inputs}>
            <Input
              id="bannerText"
              label="Banner Text"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className={classes.imageUploads}>
            <ImageUpload
              value={bannerImage}
              onChange={(value) => setCustomValue("bannerImage", value)}
            />
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            className={classes.addProductButton}
          >
            Add Banner
          </button>
        </div>
      )}
      {banner && (
        <div className={classes.delete}>
          <p>
            <b>Note:</b> If you want to add a new banner, delete your current
            custom banner first with the button below
          </p>
          <button onClick={deleteBanner.bind(null, banner.id)}>
            Delete Custom Banner
          </button>
        </div>
      )}
    </div>
  );
};
export default BannerForm;
