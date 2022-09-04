import React, { useReducer } from "react";
import { CartItem, Order } from "../../types";
import {
  CART_CLEAR,
  CART_ITEM_ADD,
  CART_ITEM_REMOVE,
  CART_ITEM_SET_QUANTITY,
  ORDER_ADD,
} from "./constants";
import { IContext, OrdersContext } from "./OrdersContext";
import { reducer } from "./reducer";

const Orders: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [{ orders, cart }, dispatch] = useReducer(reducer, {
    orders: [],
    cart: [],
  });

  const addItem: IContext["onAdd"] = (id) => {
    dispatch({ type: CART_ITEM_ADD, payload: id });
  };

  const removeItem: IContext["removeItem"] = (id) => {
    dispatch({ type: CART_ITEM_REMOVE, payload: id });
  };

  const updateQuantity = (item: CartItem) => {
    dispatch({ type: CART_ITEM_SET_QUANTITY, payload: item });
  };

  const onAdd: IContext["onAdd"] = (id) => {
    const cartItem = cart.find(({ id: cartItemId }) => id === cartItemId);

    cartItem
      ? updateQuantity({
          ...cartItem,
          quantity: cartItem.quantity + 1,
        })
      : addItem(id);
  };

  const onSubtract: IContext["onSubtract"] = (id) => {
    const cartItem = cart.find(({ id: cartItemId }) => id === cartItemId);

    cartItem &&
      updateQuantity({
        ...cartItem,
        quantity: cartItem.quantity - 1,
      });
  };

  const addOrder: IContext["addOrder"] = (order) => {
    const item: Order = { id: orders.length + 1, ...order };

    dispatch({ type: ORDER_ADD, payload: item });
  };

  const clearCart: IContext["clearCart"] = () => {
    dispatch({ type: CART_CLEAR });
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        cart,
        onAdd,
        onSubtract,
        removeItem,
        addOrder,
        clearCart,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export { Orders };
