import clsx from "clsx";
import { MouseEventHandler, ReactElement, useState } from "react";

type RippleMeta = {
  key: number;
  radius: number;
  left: number;
  top: number;
};

const useRipples: () => [MouseEventHandler, ReactElement[]] = () => {
  const [metaList, setMetaList] = useState<RippleMeta[]>([]);

  const removeRippleByKey = (key: number) => {
    setMetaList(metaList.filter((ripple) => ripple.key !== key));
  };

  const addRipple: MouseEventHandler = (e) => {
    const { left, top, height, width } =
      e.currentTarget.getBoundingClientRect();
    const radius = height + width;

    setMetaList([
      ...metaList,
      {
        key: e.timeStamp,
        radius,
        left: e.clientX - left - radius,
        top: e.clientY - top - radius,
      },
    ]);
  };

  const ripples = metaList.map((meta) => (
    <div
      key={meta.key}
      style={{
        width: 2 * meta.radius,
        height: 2 * meta.radius,
        left: meta.left,
        top: meta.top,
      }}
      className={clsx(
        "absolute animate-[ripple_1100ms_ease-in-out_forwards] rounded-full bg-current"
      )}
      onAnimationEnd={() => removeRippleByKey(meta.key)}
    />
  ));

  return [addRipple, ripples];
};

export default useRipples;
