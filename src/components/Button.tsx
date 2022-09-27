import clsx from "clsx";
import useRipples from "hooks/useRipples";
import React, { FC } from "react";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  flat?: boolean;
  outline?: boolean;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = (props) => {
  const [addRipple, ripples] = useRipples();

  const handleClick = (e: React.MouseEvent) => {
    if (props.disabled) {
      return;
    }
    addRipple(e);
    props.onClick?.();
  };
  return (
    <div
      className={clsx(
        "relative select-none overflow-hidden px-3 py-2 transition-colors",
        {
          "cursor-pointer": !props.disabled,
          "text-[#5b656f]": props.disabled,
          "bg-primary-main text-white hover:bg-primary-main/80": props.active,
          "text-primary-main hover:bg-primary-main/20":
            !props.active && !props.disabled,
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
