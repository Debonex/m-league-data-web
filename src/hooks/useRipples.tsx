import clsx from "clsx";
import { MouseEventHandler, ReactElement, useState } from "react";

type RippleColor = "primary" | "translucent";

const useRipples: (
  color: RippleColor
) => [MouseEventHandler, ReactElement[]] = (color = "primary") => {
  const [ripples, setRipples] = useState<ReactElement[]>([]);

  const removeRippleByKey = (key: number) => {
    setRipples(ripples.filter((ripple) => ripple.key !== key));
  };

  const addRipple: MouseEventHandler = (e) => {
    const { left, top, height, width } =
      e.currentTarget.getBoundingClientRect();
    const radius = height + width;

    const newRipple = (
      <div
        key={e.timeStamp}
        style={{
          width: 2 * radius,
          height: 2 * radius,
          left: e.clientX - left - radius,
          top: e.clientY - top - radius,
        }}
        className={clsx(
          "absolute animate-[ripple_800ms_ease-in_forwards] rounded-full",
          {
            "bg-primary-main": color === "primary",
            "bg-white/75": color === "translucent",
          }
        )}
        onAnimationEnd={() => removeRippleByKey(e.timeStamp)}
      />
    );
    setRipples([...ripples, newRipple]);
  };

  return [addRipple, ripples];
};

export default useRipples;
