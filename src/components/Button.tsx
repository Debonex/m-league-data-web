import clsx from "clsx";
import { FC } from "react";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: FC<ButtonProps> = (props) => {
  return (
    <div
      className={clsx([
        "cursor-pointer rounded-md px-3 py-2 text-primary-main transition-colors hover:bg-primary-main/20",
        props.className,
      ])}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Button;
