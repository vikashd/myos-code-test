import cx from "classnames";
import { useState } from "react";
import { CartProduct, OrderFormData } from "../../types";
import { calculateTotal, isValidEmail } from "../../utils";
import { IconEmail } from "../img/icons";
import { TextInput } from "../TextInput";
import { Cart } from "./Cart";

interface OrderFormProps {
  cart: CartProduct[];
  onAdd(id: number): void;
  onSubtract(id: number): void;
  onRemoveItem(id: number): void;
  onFormSubmit(data: OrderFormData): void;
  className?: string;
}

const OrderForm: React.FC<OrderFormProps> = ({
  className,
  cart,
  onAdd,
  onSubtract,
  onRemoveItem,
  onFormSubmit,
}) => {
  const [email, setEmail] = useState("");
  const isEmailValid = isValidEmail(email);
  const total = calculateTotal(cart);

  const onEmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    onFormSubmit({ items: cart, email });
  };

  return (
    <div className={cx("flex grow", className)}>
      {!!cart.length && (
        <form
          className="flex flex-col grow"
          noValidate
          onSubmit={onFormSubmitHandler}
        >
          <div className="flex flex-col grow">
            <Cart
              cart={cart}
              onAdd={onAdd}
              onSubtract={onSubtract}
              onRemoveItem={onRemoveItem}
            />
            <div className="flex justify-between font-medium border-solid border border-gray-500 p-3 rounded-md mb-4">
              <span className="uppercase">Total</span>${total.toFixed(2)}
            </div>
            <div className="mt-auto">
              <TextInput
                value={email}
                icon={IconEmail}
                iconClass="text-gray-500"
                placeholder="Email"
                onChange={onEmailChangeHandler}
              />
              <button
                className={cx(
                  "flex items-center justify-center border-solid border border-sky-500 text-gray-800 hover:border-blue-400 rounded px-2 py-3 w-full",
                  {
                    "disabled:opacity-50 disabled:border-gray-500 pointer-events-none":
                      !isEmailValid,
                  }
                )}
                disabled={!isEmailValid}
                type="submit"
              >
                Confirm order
              </button>
            </div>
          </div>
        </form>
      )}
      {!cart.length && (
        <h3 className="text-4xl font-medium mt-3 mb-3">Cart empty</h3>
      )}
    </div>
  );
};

export { OrderForm };
