import cx from "classnames";
import { IconClose } from "./img/icons";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  inputClass?: string;
  iconClass?: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClear?(): void;
};

const TextInput: React.FC<TextInputProps> = ({
  inputClass,
  icon: Icon,
  iconClass,
  hasError,
  disabled,
  onClear,
  onChange,
  value,
  ...rest
}) => (
  <div
    className={cx("relative w-full mb-4", { "disabled:opacity-75": disabled })}
  >
    {Icon && (
      <Icon
        className={cx(
          "absolute block w-6 top-0 left-3 bottom-0 my-auto fill-current z-10",
          iconClass
        )}
      />
    )}
    <input
      className={cx(
        "text-black bg-white border-solid border border-gray-500 py-3 px-3 rounded w-full focus:outline-none focus:border-blue-400",
        { "pl-11": Icon },
        { "!border-red-600": hasError },
        { "pr-11": onClear },
        inputClass
      )}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...rest}
    />
    {onClear && value && (
      <button
        type="button"
        className={cx(
          "absolute flex items-center justify-center top-0 right-0 bottom-0 text-gray-600 hover:text-black focus:text-black w-11 z-10"
        )}
        onClick={() => onClear?.()}
      >
        <IconClose className="h-6 fill-current" />
      </button>
    )}
  </div>
);

export { TextInput };
