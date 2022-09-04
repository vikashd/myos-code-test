import { Order as IOrder } from "../../types";
import { calculateTotal } from "../../utils";

interface OrderProps {
  orders: IOrder[];
  className?: string;
}

const Order: React.FC<OrderProps> = ({ className, orders }) => (
  <div className={className}>
    <h3 className="text-4xl font-medium mt-3 mb-3">Orders</h3>
    <div className="divide-y">
      {orders.map(({ id, email, items }) => (
        <div key={id} className="py-8">
          <h4 className="font-semibold text-3xl mb-3">#{id}</h4>
          <ul className="mb-4">
            {items.map(({ id: itemId, title, quantity, price }) => (
              <li key={itemId} className="mb-3">
                <div className="flex justify-between">
                  <span>
                    {title}{" "}
                    {quantity > 1 && (
                      <span className="font-medium text-blue-500">
                        [x{quantity}]
                      </span>
                    )}
                  </span>
                  <span className="font-medium w-20 text-right grow-0 shrink-0">
                    ${(price * quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold mb-2">
            <span className="uppercase">Total</span>
            <span className="font-medium w-20 text-right grow-0 shrink-0">
              ${calculateTotal(items).toFixed(2)}
            </span>
          </div>
          <div className="text-xs">email: {email}</div>
        </div>
      ))}
    </div>
  </div>
);

export { Order };
