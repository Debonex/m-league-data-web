import clsx from "clsx";
import React, { FC } from "react";
import useRipples from "../hooks/useRipples";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  flat?: boolean;
  outline?: boolean;
};

const Button: FC<ButtonProps> = (props) => {
  const [addRipple, ripples] = useRipples(
    props.active ? "translucent" : "primary"
  );

  const handleClick = (e: React.MouseEvent) => {
    addRipple(e);
    props.onClick?.();
  };

  return (
    <div
      className={clsx(
        "relative cursor-pointer select-none overflow-hidden px-3 py-2 transition-colors",
        {
          "bg-primary-main text-white hover:bg-primary-main/80": props.active,
          "text-primary-main hover:bg-primary-main/20": !props.active,
          "rounded-md": !props.flat,
          "border border-primary-main": props.outline,
        },
        props.className
      )}
      onClick={handleClick}
    >
      {props.children}
      {ripples}
    </div>
  );
};

export default Button;
