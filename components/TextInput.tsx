import cx from "classnames";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  inputClass?: string;
  iconClass?: string;
  icon?: React.FC<{ className?: string }>;
};

const TextInput: React.FC<TextInputProps> = ({
  inputClass,
  icon: Icon,
  iconClass,
  hasError,
  disabled,
  ...rest
}) => (
  <div className="relative w-full mb-4">
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
        { "disabled:opacity-75": disabled },
        { "!border-red-600": hasError },
        inputClass
      )}
      type="text"
      disabled={disabled}
      {...rest}
    />
  </div>
);

export { TextInput };
