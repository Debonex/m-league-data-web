import clsx from "clsx";
import { FC } from "react";
import Loading from "./Loading";

const InnerLoading: FC = () => {
  return (
    <div
      className={clsx([
        "absolute top-0 bottom-0 left-0 right-0 flex animate-[delay-in_0.05s_forwards] items-center justify-center text-primary-main",
        "dark:bg-white/5",
      ])}
    >
      <Loading color="currentColor" size={40} />
    </div>
  );
};

export default InnerLoading;
