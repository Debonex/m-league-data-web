import clsx from "clsx";
import { FC, ReactNode } from "react";
import InnerLoading from "./InnerLoading";

const Card: FC<{
  title: string;
  children?: ReactNode;
  className?: string;
  loading?: boolean;
}> = ({ title, children, className, loading }) => (
  <div
    className={clsx(
      "rounded-lg border-2",
      "dark:border-dark-outstand",
      className
    )}
  >
    <div
      className={clsx(
        "rounded-t-lg border-b-2 p-2 pl-4 text-2xl font-bold",
        "dark:border-dark-outstand dark:bg-dark-deep"
      )}
    >
      {title}
    </div>
    <div className={clsx("relative rounded-b-lg", "dark:bg-dark-secondary")}>
      {children}
      {loading && <InnerLoading />}
    </div>
  </div>
);

export default Card;
