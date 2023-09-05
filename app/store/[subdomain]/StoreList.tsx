"use client";

import { Product } from "@prisma/client";
import classes from "./StoreList.module.css";
import StoreItem from "./StoreItem";
import { LiaSearchSolid } from "react-icons/lia";
import { useRef, useState } from "react";

interface StoreListProps {
  products: Product[] | null;
}

const StoreList: React.FC<StoreListProps> = ({ products }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<Product[] | null>(
    products
  );

  const searchHandler = () => {
    const currentInput = inputRef.current?.value
      .toLowerCase()
      .replace(/'/g, "");

    if (currentInput && currentInput !== "") {
      const results = products?.filter((item) => {
        const match = item.title.toLowerCase().replace(/'/g, "");
        return match.includes(currentInput);
      });
      setSearchResults(results ? results : []);
    } else {
      setSearchResults(products);
    }
  };

  return (
    <div className={classes.storeList}>
      <div className={classes.heading}>
        <div className={classes.headingTitle}>Products</div>
        <div className={classes.inputContainer}>
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            className={classes.input}
            type="text"
            placeholder="Search products..."
            id="search"
            name="search"
            ref={inputRef}
            onChange={searchHandler}
          />
          <LiaSearchSolid size={20} />
        </div>
      </div>

      {(!products || products.length === 0) && (
        <p className={classes.noProducts}>This store has no products yet!</p>
      )}
      {searchResults &&
        searchResults.length === 0 &&
        products &&
        products.length > 0 && (
          <p className={classes.noProducts}>No results for this search!</p>
        )}
      {searchResults && searchResults.length > 0 && (
        <div className={classes.storeItems}>
          {searchResults.map((product) => (
            <StoreItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreList;
