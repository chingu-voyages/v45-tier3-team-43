"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./ProductsList.module.css";

interface ProductsListProps {
  products: Product[] | null;
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  const [showPics, setShowPics] = useState<string>("");
  const router = useRouter();

  const archiveProduct = (productId: any) => {
    axios
      .post(`api/products/${productId}`)
      .then(() => {
        toast.success("Success!");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className={classes.productsContainer}>
      <h3>Products</h3>
      <p className={classes.note}>
        <b>Note: </b>archived products are not shown on your store page!
      </p>
      {!products ||
        (products.length === 0 && (
          <div className={classes.noProducts}>
            You have no products, add some!!!
          </div>
        ))}
      {products && products.length > 0 && (
        <div className={classes.products}>
          <div className={classes.columnTitles}>
            <span className={classes.infoTitle}>Title</span>
            <span className={classes.infoTitle}>Price</span>
          </div>
          {products &&
            products.map((product) => (
              <div key={product.id} className={classes.product}>
                <div className={classes.productInfo}>
                  <div className={classes.details}>
                    <p>{product.title}</p>
                    <p>${product.price}</p>
                  </div>
                  <div className={classes.productActions}>
                    <button
                      onClick={() =>
                        setShowPics((prevState) =>
                          prevState === product.id ? "" : product.id
                        )
                      }
                      className={classes.viewProductPicturesButton}
                    >
                      {showPics === product.id ? "Hide Pics" : "View Pics"}
                    </button>
                    <button
                      onClick={archiveProduct.bind(null, product.id)}
                      className={classes.archiveProductButton}
                    >
                      {product.archived === true ? "Unarchive" : "Archive"}
                    </button>
                  </div>
                </div>
                {showPics === product.id && (
                  <div className={classes.images}>
                    {product.images.map((image) => (
                      <div key={image} className={classes.imageContainer}>
                        <Image
                          fill
                          alt="Product"
                          src={image}
                          className={classes.image}
                          sizes="(width: 10rem)"
                          priority={false}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default ProductsList;
