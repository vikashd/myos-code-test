import { CartProduct } from "../../types";
import { IconTrash } from "../img/icons";
import { QuantitySelector } from "../";

interface CartProps {
  cart: CartProduct[];
  onAdd(id: number): void;
  onSubtract(id: number): void;
  onRemoveItem(id: number): void;
}

const Cart: React.FC<CartProps> = ({
  cart,
  onAdd,
  onSubtract,
  onRemoveItem,
}) => (
  <div className="px-2">
    <h3 className="text-4xl font-medium mt-3 mb-3">Cart</h3>
    <ul className="divide-y mb-6">
      {cart.map(({ id, title, quantity, price }) => (
        <li key={id} className="flex flex-col py-4">
          <div className="flex justify-between mb-2">
            <span>{title}</span>
            <div className="w-28 grow-0 shrink-0 text-right">{`$${(
              price * quantity
            ).toFixed(2)}`}</div>
          </div>
          <div className="flex justify-between">
            <QuantitySelector
              quantity={quantity}
              onAdd={() => onAdd(id)}
              onSubtract={() => onSubtract(id)}
            />
            <button
              className="p-1 ml-4 hover:text-red-600"
              type="button"
              title="Remove"
              onClick={() => onRemoveItem(id)}
            >
              <IconTrash className="w-5 fill-current" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export { Cart };
