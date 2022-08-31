import clsx from "clsx";
import React, { createContext, FC, useCallback, useState } from "react";

type MenuProps = {
  className?: string;
  onItemClick?: (itemKey: string | number) => void;
  children?: React.ReactNode;
};

type MenuContext = {
  open: boolean;
  handleClickOutside: () => void;
  handleClickRoot: (e: React.MouseEvent) => void;
  handleClickItem: (e: React.MouseEvent, itemKey: string | number) => void;
};

export const MenuContext = createContext<MenuContext>({
  open: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClickItem: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClickOutside: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClickRoot: () => {},
});

const Menu: FC<MenuProps> = ({ className, onItemClick, children }) => {
  const [open, setOpen] = useState(false);

  const handleClickOutside = useCallback(() => {
    document.body.removeEventListener("click", handleClickOutside);
    setOpen(false);
  }, []);

  const handleClickRoot = (e: React.MouseEvent) => {
    e.nativeEvent.stopPropagation();
    if (open) {
      document.body.removeEventListener("click", handleClickOutside);
    } else {
      document.body.addEventListener("click", handleClickOutside);
    }
    setOpen(!open);
  };

  const handleClickItem = (e: React.MouseEvent, itemKey: string | number) => {
    e.nativeEvent.stopPropagation();
    document.body.removeEventListener("click", handleClickOutside);
    onItemClick && onItemClick(itemKey);
    setOpen(false);
  };

  return (
    <MenuContext.Provider
      value={{
        open,
        handleClickOutside,
        handleClickRoot,
        handleClickItem,
      }}
    >
      <div className={clsx("relative", className)}>{children}</div>
    </MenuContext.Provider>
  );
};

export default Menu;
