"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
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

  const deleteProduct = (productId: any) => {
    axios
      .delete(`api/products/${productId}`)
      .then(() => {
        toast.success("Product Deleted!");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className={classes.productsContainer}>
      <h3>Products</h3>

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
                      View Pictures
                    </button>
                    <button
                      onClick={deleteProduct.bind(null, product.id)}
                      className={classes.deleteProductButton}
                    >
                      <RiDeleteBinLine />
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
