import clsx from "clsx";
import { FC, useCallback, useContext, useState } from "react";
import { ReactComponent as CheckSvg } from "../components/svg/Check.svg";
import Arrow from "./Arrow";
import Menu, { MenuContext } from "./headless/Menu";
import MenuButton from "./headless/MenuButton";
import MenuItem from "./headless/MenuItem";
import MenuItems from "./headless/MenuItems";

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
  const { open } = useContext(MenuContext);
  const [current, setCurrent] = useState<SelectOption>();

  const handleChoose = useCallback(
    (menuItemKey: string | number) => {
      const optionIndex = menuItemKey as number;
      const option = props.options[optionIndex];
      setCurrent(option);
      props.onChange && props.onChange(option.value);
    },
    [props.options]
  );

  return (
    <Menu
      className={clsx(
        "relative cursor-pointer rounded-md border-2",
        "dark:border-primary-outstand dark:bg-dark-deep",
        props.className
      )}
      onItemClick={handleChoose}
    >
      <MenuButton className="flex min-h-[40px] select-none items-center px-3 py-2">
        <div
          className={clsx("flex-grow basis-0", {
            "dark:text-white/50": !current,
          })}
        >
          {current ? current.label : props.placeholder ?? ""}
        </div>
        <Arrow up={open} className="h-4 w-4" />
      </MenuButton>
      <MenuItems
        className={clsx(
          "absolute top-full left-0 max-h-96 w-full translate-y-2 overflow-y-auto rounded-md py-1",
          "dark:bg-dark-deep"
        )}
      >
        {props.options.map((option, idx) => (
          <MenuItem
            className={clsx(
              "flex select-none py-2",
              "dark:hover:bg-dark-outstand",
              {
                "text-primary-main dark:bg-dark-outstand": option === current,
              }
            )}
            key={idx}
            itemKey={idx}
          >
            <div className="mx-2 w-5">
              {option === current && <CheckSvg className="h-5 w-5" />}
            </div>
            {option.label}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default Select;
