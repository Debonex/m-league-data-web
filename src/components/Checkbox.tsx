import clsx from "clsx";
import { FC, useState } from "react";

type CheckboxProps = {
  value: any;
  defaultChecked?: boolean;
  onChange: (value: any, checked: boolean) => void;
  label?: string;
};

const Checkbox: FC<CheckboxProps> = (props) => {
  const [checked, setChecked] = useState(props.defaultChecked ?? false);

  const handleClick = () => {
    props.onChange(props.value, !checked);
    setChecked(!checked);
  };

  return (
    <div
      className="group flex cursor-pointer items-center"
      onClick={handleClick}
    >
      <div className="relative h-10 w-10">
        <div className="h-full scale-0 rounded-full transition-all group-hover:scale-100 group-hover:bg-primary-main/25" />
        <div
          className={clsx({
            "absolute top-1/4 left-1/4 h-1/2 w-1/2 border-2 transition-colors":
              true,
            "border-primary-main bg-primary-main": checked,
            "dark:border-dark-outstand": !checked,
          })}
        >
          <svg className="h-full w-full" viewBox="0 0 24 24">
            <path
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
              fill="none"
              className="stroke-white stroke-3 transition-all"
              style={{
                strokeDashoffset: checked ? 0 : 29.78,
                strokeDasharray: 29.78,
              }}
            />
          </svg>
        </div>
      </div>

      {props.label && <div>{props.label}</div>}
    </div>
  );
};

export default Checkbox;
