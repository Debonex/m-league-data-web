import clsx from "clsx";
import React, { FC } from "react";
import useRipples from "../hooks/useRipples";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: FC<ButtonProps> = (props) => {
  const [addRipple, ripples] = useRipples();

  const handleClick = (e: React.MouseEvent) => {
    addRipple(e);
    props.onClick?.();
  };

  return (
    <div
      className={clsx(
        "relative cursor-pointer select-none overflow-hidden rounded-md px-3 py-2 text-primary-main transition-colors hover:bg-primary-main/20",
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
