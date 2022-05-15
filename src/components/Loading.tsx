import clsx from "clsx";
import { FC } from "react";

type LoadingProps = {
  size: number | string;
  color?: string;
  className?: string;
};

const Loading: FC<LoadingProps> = (props) => {
  return (
    <span
      className={clsx(["animate-[delay-in_0.15s_forwards]", props.className])}
    >
      <svg
        className="animate-[spin_1.4s_linear_infinite]"
        viewBox="0 0 40 40"
        width={props.size}
        height={props.size}
      >
        <circle
          className="animate-[loading-circle_1.4s_ease-in-out_infinite]"
          cx={20}
          cy={20}
          r={18.2}
          stroke={props.color ?? "currentColor"}
          fill="none"
          strokeWidth={3.6}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

export default Loading;
