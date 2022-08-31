import clsx from "clsx";
import { FC } from "react";

const Arrow: FC<{ up: boolean; className?: string }> = ({ up, className }) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    className={className}
    stroke="currentColor"
    strokeWidth={12}
    strokeLinecap="round"
  >
    <path
      className={clsx("transition-transform", { "translate-x-9": up })}
      d="M 14,25 L 50,65"
    />
    <path
      className={clsx("transition-transform", { "-translate-x-9": up })}
      d="M 86,25 L 50,65"
    />
  </svg>
);

export default Arrow;
