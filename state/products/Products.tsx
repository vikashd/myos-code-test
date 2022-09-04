import React, { useCallback, useMemo, useReducer } from "react";
import { PRODUCTS_SET } from "./constants";
import { IContext, ProductsContext } from "./ProductsContext";
import { reducer } from "./reducer";

const Products: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [{ products }, dispatch] = useReducer(reducer, { products: [] });

  const productsMap = useMemo(
    () =>
      products.reduce<IContext["productsMap"]>(
        (map, product) => map.set(product.id, product),
        new Map()
      ),
    [products]
  );

  const setProducts: IContext["setProducts"] = useCallback((products) => {
    dispatch({ type: PRODUCTS_SET, payload: products });
  }, []);

  return (
    <ProductsContext.Provider value={{ products, productsMap, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { Products };
