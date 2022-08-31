import { FC, ReactNode, useContext } from "react";
import { MenuContext } from "./Menu";

type MenuItemProps = {
  className?: string;
  children?: ReactNode;
  itemKey: string | number;
};

const MenuItem: FC<MenuItemProps> = ({ className, itemKey, children }) => {
  const { handleClickItem } = useContext(MenuContext);

  return (
    <div onClick={(e) => handleClickItem(e, itemKey)} className={className}>
      {children}
    </div>
  );
};

export default MenuItem;
