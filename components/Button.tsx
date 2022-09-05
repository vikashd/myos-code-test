import cx from "classnames";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ComponentType<{ className?: string }>;
  labelShow?: "sm" | "md" | "lg" | "xl" | false;
};

const BUTTON_LABEL_CLASSES = new Map<
  Exclude<NonNullable<ButtonProps["labelShow"]>, false>,
  { inline: string }
>([
  ["sm", { inline: "sm:inline" }],
  ["md", { inline: "md:inline" }],
  ["lg", { inline: "lg:inline" }],
  ["xl", { inline: "xl:inline" }],
]);

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  icon: Icon,
  labelShow,
  className,
  disabled,
  children,
  ...rest
}) => {
  const labelClass =
    Icon && labelShow && BUTTON_LABEL_CLASSES.get(labelShow)?.inline;

  return (
    <button
      className={cx(
        "grow flex items-center justify-center border-solid border border-gray-500 text-gray-800 hover:border-blue-400 rounded px-2 py-3 w-full",
        className,
        {
          "disabled:opacity-50 disabled:border-gray-500 pointer-events-none":
            disabled,
        }
      )}
      disabled={disabled}
      {...rest}
    >
      <span className="flex items-center">
        {Icon && <Icon className="block h-5 fill-current" />}
        <span className={cx(labelClass && `hidden pl-2 ${labelClass}`)}>
          {children}
        </span>
      </span>
    </button>
  );
};

export { Button };
