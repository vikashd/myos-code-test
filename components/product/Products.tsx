import { Cart, Product } from "../../types";
import { Card } from "./Card";

interface ProductsProps {
  products: Product[];
  cart: Cart;
  onAdd(id: number): void;
  onSubtract(id: number): void;
  disabled?: boolean;
}

const Products: React.FC<ProductsProps> = ({
  products,
  cart,
  onAdd,
  onSubtract,
  disabled,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-8 mb-10">
    {products.map((product) => {
      const cartItem = cart.find(({ id }) => id === product.id);

      return (
        <Card
          key={product.id}
          product={product}
          quantity={cartItem?.quantity || 0}
          onAdd={onAdd}
          onSubtract={onSubtract}
          disabled={disabled}
        />
      );
    })}
  </div>
);

export type { ProductsProps };
export { Products };
