import { PRODUCTS_SET } from "./constants";
import { ProductsActions, ProductsState } from "./types";

const reducer: React.Reducer<ProductsState, ProductsActions> = (
  state,
  action
) => {
  switch (action.type) {
    case PRODUCTS_SET:
      return { ...state, products: action.payload };

    default:
      return state;
  }
};

export { reducer };
