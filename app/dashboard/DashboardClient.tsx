"use client";

import { signOut } from "next-auth/react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Input from "../components/inputs/Input";
import { useRouter } from "next/navigation";
import { Store } from "@prisma/client";
import classes from "./DashboardClient.module.css";

interface DashboardClientProps {
  store: Store | null;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ store }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", description: "", subdomain: "" },
  });

  const createStore: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("api/store", data)
      .then(() => {
        toast.success("Store Created!");
        setIsOpen(false);
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className={classes.navbar}>
        <h2>Dashboard</h2>
        <div className={classes.navActions}>
          {store && (
            <button
              onClick={() => router.push(`/store/${store?.subdomain}`)}
              className={classes.visitStoreButton}
            >
              Visit your Store
            </button>
          )}
          {!store && (
            <button
              onClick={() => setIsOpen(true)}
              className={classes.createStoreFormButton}
            >
              Create a Store
            </button>
          )}
          <button onClick={() => signOut()} className={classes.logoutButton}>
            Sign Out
          </button>
        </div>
      </div>

      {isOpen && (
        <div>
          <form onSubmit={handleSubmit(createStore)} className={classes.form}>
            <h3>Create your store!</h3>
            <Input
              id="name"
              label="Name"
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
              id="subdomain"
              label="Subdomain (no spaces)"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <div className={classes.formActions}>
              <button
                onClick={() => setIsOpen(false)}
                className={classes.cancelFormButton}
              >
                Cancel
              </button>
              <button type="submit" className={classes.createStoreButton}>
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default DashboardClient;
