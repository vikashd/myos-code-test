import { Cart, CartItem, Order } from "../../types";
import {
  CART_CLEAR,
  CART_ITEM_ADD,
  CART_ITEM_REMOVE,
  CART_ITEM_SET_QUANTITY,
  ORDER_ADD,
} from "./constants";

interface OrdersState {
  cart: Cart;
  orders: Order[];
}

interface ClearCartAction {
  type: typeof CART_CLEAR;
}

interface AddItemToCartAction {
  type: typeof CART_ITEM_ADD;
  payload: number;
}

interface RemoveItemFromCartAction {
  type: typeof CART_ITEM_REMOVE;
  payload: number;
}

interface UpdateItemQuantityAction {
  type: typeof CART_ITEM_SET_QUANTITY;
  payload: CartItem;
}

interface AddOrderAction {
  type: typeof ORDER_ADD;
  payload: Order;
}

type OrdersActions =
  | ClearCartAction
  | AddItemToCartAction
  | RemoveItemFromCartAction
  | UpdateItemQuantityAction
  | AddOrderAction;

export type {
  AddItemToCartAction,
  AddOrderAction,
  ClearCartAction,
  OrdersActions,
  OrdersState,
  RemoveItemFromCartAction,
};
