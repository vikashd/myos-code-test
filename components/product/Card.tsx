import Image from "next/image";
import { Product } from "../../types";
import { QuantitySelector } from "../QuantitySelector";

interface CardProps {
  product: Product;
  quantity: number;
  onAdd(id: number): void;
  onSubtract(id: number): void;
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({
  product: { id, title, image, description, price },
  quantity,
  onAdd,
  onSubtract,
  disabled,
}) => {
  const onAddHandler = () => {
    onAdd(id);
  };

  const onSubtractHandler = () => {
    onSubtract(id);
  };

  return (
    <div className="relative">
      <div className="relative pt-[100%]">
        <Image
          className="rounded pointer-events-none"
          src={image}
          alt={title}
          layout="fill"
          objectFit="contain"
        />
        <small className="absolute bottom-2 right-0 z-10 font-medium bg-gray-700 text-sm text-white rounded-l-lg px-3 py-1">
          ${price.toFixed(2)}
        </small>
      </div>
      <div className="my-4">
        <h3 className="text-xl font-medium my-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{description}</p>
        <QuantitySelector
          quantity={quantity}
          onAdd={onAddHandler}
          onSubtract={onSubtractHandler}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export type { CardProps };
export { Card };
