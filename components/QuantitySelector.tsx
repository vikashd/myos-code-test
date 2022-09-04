import cx from "classnames";

interface QuantitySelectorProps {
  className?: string;
  quantity: number;
  onAdd(): void;
  onSubtract(): void;
  disabled?: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  className,
  quantity,
  onAdd,
  onSubtract,
  disabled,
}) => (
  <div className={cx("flex items-center", className)}>
    <button
      type="button"
      className="w-6 text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-600"
      onClick={() => onSubtract()}
      title="Remove"
      disabled={disabled}
    >
      -
    </button>
    <span className="text-center align-center text-sm font-medium w-7">
      {quantity}
    </span>
    <button
      type="button"
      className="w-6 text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-600"
      onClick={() => onAdd()}
      title="Add"
      disabled={disabled}
    >
      +
    </button>
  </div>
);

export { QuantitySelector };
