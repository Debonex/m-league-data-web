import { FC, ReactNode, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { MenuContext } from "./Menu";

type MenuItemsProps = {
  className?: string;
  children?: ReactNode;
};

const MenuItems: FC<MenuItemsProps> = ({ className, children }) => {
  const { open } = useContext(MenuContext);
  return (
    <CSSTransition in={open} classNames="dropdown" timeout={200} unmountOnExit>
      <div className={className}>{children}</div>
    </CSSTransition>
  );
};

export default MenuItems;
