import { ReactNode, useMemo } from "react";
import InnerLoading from "../components/InnerLoading";

const useLazyComponent = (component: ReactNode, loading: boolean) => {
  return useMemo(
    () => (
      <div className="relative">
        {component}
        {loading && <InnerLoading noMask />}
      </div>
    ),
    [loading]
  );
};

export default useLazyComponent;
