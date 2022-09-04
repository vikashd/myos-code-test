import React from "react";
import { Cart, Order, OrderFormData } from "../../types";

interface IContext {
  orders: Order[];
  cart: Cart;
  onAdd(id: number): void;
  onSubtract(id: number): void;
  removeItem(id: number): void;
  addOrder(order: OrderFormData): void;
  clearCart(): void;
}

const OrdersContext = React.createContext<IContext>({
  orders: [],
  cart: [],
  onAdd: () => {},
  onSubtract: () => {},
  removeItem: () => {},
  addOrder: () => {},
  clearCart: () => {},
});

export type { IContext };
export { OrdersContext };
