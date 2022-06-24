import clsx from "clsx";
import {
  FC,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as CheckSvg } from "../components/svg/Check.svg";

export type SelectOption = {
  label: string;
  value: unknown;
};

type SelectProps = {
  options: SelectOption[];
  className?: string;
  placeholder?: string;
  onChange?: (value: unknown) => void;
};

const Select: FC<SelectProps> = (props) => {
  const [current, setCurrent] = useState<SelectOption>();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClickOutside = useCallback(() => {
    document.body.removeEventListener("click", handleClickOutside);
    setDropdownOpen(false);
  }, []);

  const handleClickRoot = (e: ReactMouseEvent) => {
    e.nativeEvent.stopPropagation();
    if (dropdownOpen) {
      document.body.removeEventListener("click", handleClickOutside);
    } else {
      document.body.addEventListener("click", handleClickOutside);
    }
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickItem = (e: ReactMouseEvent, option: SelectOption) => {
    e.nativeEvent.stopPropagation();
    document.body.removeEventListener("click", handleClickOutside);
    setCurrent(option);
    props.onChange && props.onChange(option.value);
    setDropdownOpen(false);
  };

  return (
    <div
      className={clsx(
        "relative cursor-pointer rounded-md border-2",
        "dark:border-primary-outstand dark:bg-dark-deep",
        props.className
      )}
    >
      {/* root item */}
      <div
        className="flex min-h-[40px] select-none items-center px-3 py-2"
        onClick={handleClickRoot}
      >
        <div
          className={clsx("flex-grow basis-0", {
            "dark:text-white/50": !current,
          })}
        >
          {current ? current.label : props.placeholder ?? ""}
        </div>
        <Arrow up={dropdownOpen} className="h-4 w-4" />
      </div>

      {/* option items */}
      <CSSTransition
        in={dropdownOpen}
        classNames="dropdown"
        timeout={200}
        unmountOnExit
      >
        <div
          className={clsx(
            "absolute top-full left-0 max-h-72 w-full translate-y-2 overflow-y-auto rounded-md py-1",
            "dark:bg-dark-deep"
          )}
        >
          {props.options.map((option, idx) => (
            <div
              className={clsx(
                "flex select-none py-2",
                "dark:hover:bg-dark-outstand",
                {
                  "text-primary-main dark:bg-dark-outstand": option === current,
                }
              )}
              key={idx}
              onClick={(e) => handleClickItem(e, option)}
            >
              <div className="mx-2 w-5">
                {option === current && <CheckSvg className="h-5 w-5" />}
              </div>
              {option.label}
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

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

export default Select;
