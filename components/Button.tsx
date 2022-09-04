import cx from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.FC<{ className?: string }>;
};

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  icon: Icon,
  children,
  ...rest
}) => (
  <button
    className={cx(
      "grow flex items-center justify-center border-solid border border-gray-500 text-gray-800 hover:border-blue-400 rounded px-2 py-3 w-full"
    )}
    {...rest}
  >
    {Icon && <Icon className="block h-5 mr-2" />}
    {children}
  </button>
);

export { Button };
