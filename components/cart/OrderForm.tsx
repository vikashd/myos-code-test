import cx from "classnames";
import { useState } from "react";
import { CartProduct, OrderFormData } from "../../types";
import { calculateTotal, isValidEmail } from "../../utils";
import { Button, TextInput } from "../";
import { IconEmail } from "../img/icons";
import { Cart } from "./Cart";

interface OrderFormProps {
  cart: CartProduct[];
  onAdd(id: number): void;
  onSubtract(id: number): void;
  onRemoveItem(id: number): void;
  onFormSubmit(data: OrderFormData): void;
  className?: string;
  user?: string;
}

const OrderForm: React.FC<OrderFormProps> = ({
  className,
  cart,
  onAdd,
  onSubtract,
  onRemoveItem,
  onFormSubmit,
  user,
}) => {
  const [email, setEmail] = useState(user || "");
  const total = calculateTotal(cart);

  const onEmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateForm = () => {
    const isEmailValid = isValidEmail(email);

    return isEmailValid;
  };

  const onFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isFormValid) {
      return;
    }

    onFormSubmit({ items: cart, email });
  };

  const isFormValid = validateForm();

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
                type="email"
                value={email}
                icon={IconEmail}
                iconClass="text-gray-500"
                placeholder="Email"
                onChange={onEmailChangeHandler}
              />
              <Button
                type="submit"
                title="Confirm order"
                disabled={!isFormValid}
              >
                Confirm order
              </Button>
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
