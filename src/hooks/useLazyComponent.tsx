import InnerLoading from "components/InnerLoading";
import { ReactNode, useMemo } from "react";

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
