"use client";

import { Product } from "@prisma/client";
import classes from "./StoreList.module.css";
import Image from "next/image";
import { BiExpand } from "react-icons/bi";
import { LuShoppingCart } from "react-icons/lu";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";

interface StoreItemProps {
  product: Product;
}

const StoreItem: React.FC<StoreItemProps> = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  return (
    <>
      <div className={classes.storeItem}>
        <div className={classes.imageContainer}>
          <Image
            fill
            alt="fashionvista"
            sizes="(width: 230px)"
            src={product.images[0]}
            priority={false}
            className={classes.itemImage}
          />
          <div className={classes.cart}>
            <LuShoppingCart size={16} />
          </div>
          <div
            onClick={() => {
              setModalOpen(true);
              setModalProduct(product);
            }}
            className={classes.expand}
          >
            <BiExpand size={20} />
          </div>
        </div>
        <span className={classes.title}>{product.title}</span>
        <span className={classes.price}>${product.price}.00 USD</span>
      </div>

      {modalOpen && modalProduct && (
        <>
          <div className={classes.backdrop}></div>
          <div className={classes.modal}>
            <div>
              <div>
                <div className={classes.close}>
                  <AiOutlineCloseCircle
                    size={30}
                    onClick={() => {
                      setModalOpen(false);
                      setModalProduct(null);
                    }}
                  />
                </div>
                <span className={classes.modalTitle}>{modalProduct.title}</span>
                <span className={classes.modalPrice}>
                  ${modalProduct.price}.00 USD
                </span>
                <hr />
                <p className={classes.modalColor}>
                  Color: <span>{modalProduct.color}</span>
                </p>
                <p className={classes.description}>
                  <span>Description: </span>
                  {modalProduct.description}
                </p>
                <hr />
                <div className={classes.section}>
                  <div className={classes.modalCartButton}>
                    Add to Cart <LuShoppingCart size={20} />
                  </div>
                  <div className={classes.modalSize}>
                    Size: <span>{modalProduct.size}</span>
                  </div>
                </div>
                <hr />
              </div>
              <div className={classes.modalImages}>
                {modalProduct.images.map((image) => (
                  <div key={image} className={classes.modalImageContainer}>
                    <Image
                      fill
                      alt="fashionvista"
                      sizes="(width: 230px)"
                      src={image}
                      priority={false}
                      className={classes.itemImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StoreItem;
