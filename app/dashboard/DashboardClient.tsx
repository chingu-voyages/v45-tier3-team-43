"use client";

import { signOut } from "next-auth/react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Input from "../components/inputs/Input";
import { useRouter } from "next/navigation";
import { Product, Store } from "@prisma/client";
import classes from "./DashboardClient.module.css";
import ProductsList from "../components/dashboard/ProductsList";
import AddProductClient from "../components/dashboard/AddProductClient";

interface DashboardClientProps {
  store: Store | null;
  products: Product[] | null;
}

const DashboardClient: React.FC<DashboardClientProps> = ({
  store,
  products,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("productsTab");
  const [productFormIsOpen, setProductFormIsOpen] = useState(false);
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
        setTab("productsTab");
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
      <nav className={classes.navbar}>
        <h2>FashionVista</h2>
        <button onClick={() => signOut()} className={classes.logoutButton}>
          Sign Out
        </button>
      </nav>

      {isOpen && tab === "createStore" && (
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
            label="Subdomain"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <div className={classes.formActions}>
            <button
              onClick={() => {
                setIsOpen(false);
                setTab("productsTab");
              }}
              className={classes.cancelFormButton}
            >
              Cancel
            </button>
            <button type="submit" className={classes.createStoreFormButton}>
              Create
            </button>
          </div>
        </form>
      )}

      {tab !== "createStore" && (
        <div className={classes.container}>
          <div className={classes.lowerNav}>
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
                onClick={() => {
                  setIsOpen(true);
                  setTab("createStore");
                }}
                className={classes.createStoreFormButton}
              >
                Create a Store
              </button>
            )}
            <div className={classes.tabButtons}>
              <button
                onClick={() => setTab("productsTab")}
                className={tab === "productsTab" ? classes.activeTab : ""}
              >
                Products
              </button>
              <button
                onClick={() => setTab("ordersTab")}
                className={tab === "ordersTab" ? classes.activeTab : ""}
              >
                Orders
              </button>
            </div>
          </div>
          {tab === "productsTab" && (
            <div className={classes.screen}>
              <div className={classes.screenHeading}>
                <h3>Dashboard</h3>
                {store && (
                  <button
                    onClick={() =>
                      setProductFormIsOpen((prevState) => !prevState)
                    }
                    className={classes.addProductButton}
                  >
                    {productFormIsOpen ? "Close Form" : "Add Product"}
                  </button>
                )}
              </div>

              {productFormIsOpen && <AddProductClient />}

              {store && (
                <div className={classes.products}>
                  <ProductsList products={products} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default DashboardClient;
