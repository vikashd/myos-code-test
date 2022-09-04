import React from "react";
import { Product } from "../../types";

interface IContext {
  products: Product[];
  productsMap: Map<number, Product>;
  setProducts(products: Product[]): void;
}

const ProductsContext = React.createContext<IContext>({
  products: [],
  productsMap: new Map(),
  setProducts: () => {},
});

export type { IContext };
export { ProductsContext };
