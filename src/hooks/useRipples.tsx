import { MouseEventHandler, ReactElement, useState } from "react";

const useRipples: () => [MouseEventHandler, ReactElement[]] = () => {
  const [ripples, setRipples] = useState<ReactElement[]>([]);

  const removeRippleByKey = (key: number) => {
    setRipples(ripples.filter((ripple) => ripple.key !== key));
  };

  const addRipple: MouseEventHandler = (e) => {
    console.log(e, e.currentTarget);
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
        className="absolute animate-[ripple_800ms_ease-in_forwards] rounded-full bg-primary-main"
        onAnimationEnd={() => removeRippleByKey(e.timeStamp)}
      />
    );
    setRipples([...ripples, newRipple]);
  };

  return [addRipple, ripples];
};

export default useRipples;
