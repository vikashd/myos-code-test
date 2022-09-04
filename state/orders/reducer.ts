import { Cart, CartItem } from "../../types";
import {
  CART_CLEAR,
  CART_ITEM_ADD,
  CART_ITEM_REMOVE,
  CART_ITEM_SET_QUANTITY,
  ORDER_ADD,
} from "./constants";
import { OrdersActions, OrdersState } from "./types";

const updateItemQuantity = (cart: Cart, item: CartItem) => {
  let index = cart.findIndex(({ id }) => id === item.id);

  // remove
  if (item.quantity === 0) {
    return index > -1
      ? [...cart.slice(0, index), ...cart.slice(index + 1)]
      : cart;
  }

  index = index === -1 ? cart.length : index;

  // add/update
  return [
    ...cart.slice(0, index),
    { ...item, quantity: item.quantity },
    ...cart.slice(index + 1),
  ];
};

const reducer: React.Reducer<OrdersState, OrdersActions> = (state, action) => {
  switch (action.type) {
    case CART_ITEM_ADD: {
      return {
        ...state,
        cart: updateItemQuantity(state.cart, {
          id: action.payload,
          quantity: 1,
        }),
      };
    }

    case CART_ITEM_REMOVE: {
      return {
        ...state,
        cart: updateItemQuantity(state.cart, {
          id: action.payload,
          quantity: 0,
        }),
      };
    }

    case CART_ITEM_SET_QUANTITY: {
      return {
        ...state,
        cart: updateItemQuantity(state.cart, action.payload),
      };
    }

    case ORDER_ADD: {
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    }

    case CART_CLEAR: {
      return {
        ...state,
        cart: [],
      };
    }

    default:
      return state;
  }
};

export { reducer };
