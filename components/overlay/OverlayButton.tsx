import cx from "classnames";
import { IconClose } from "../img/icons";
import { Button } from "../Button";
import React from "react";

interface OverlayButton {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

const OverlayButton: React.FC<OverlayButton> = ({
  onClick,
  label,
  icon: Icon,
  active,
}) => {
  const buttonLabel = active ? "Close" : label;

  return (
    <Button
      type="button"
      className={cx({
        "bg-black !text-white hover:!bg-white hover:!text-black hover:!border-black focus:border-transparent transition-colors whitespace-nowrap":
          active,
      })}
      title={buttonLabel}
      icon={active ? IconClose : Icon}
      labelShow="sm"
      onClick={onClick}
    >
      {buttonLabel}
    </Button>
  );
};

export { OverlayButton };
