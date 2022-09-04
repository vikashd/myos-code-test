interface CartItem {
  id: number;
  quantity: number;
}

type Cart = CartItem[];

interface Product {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

type CartProduct = Product & CartItem;

interface Order {
  id: number;
  items: CartProduct[];
  email: string;
}

interface OrderFormData {
  items: CartProduct[];
  email: string;
}

export type { Cart, CartItem, CartProduct, Order, OrderFormData, Product };
