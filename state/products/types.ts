import { Product } from "../../types";
import { PRODUCTS_SET } from "./constants";

interface ProductsState {
  products: Product[];
}

interface setProductsAction {
  type: typeof PRODUCTS_SET;
  payload: Product[];
}

type ProductsActions = setProductsAction;

export type { ProductsActions, ProductsState };
