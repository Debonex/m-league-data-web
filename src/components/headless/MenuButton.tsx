import { FC, ReactNode, useContext } from "react";
import { MenuContext } from "./Menu";

type MenuButtonProps = {
  className?: string;
  children?: ReactNode;
};

const MenuButton: FC<MenuButtonProps> = ({ className, children }) => {
  const { handleClickRoot } = useContext(MenuContext);
  return (
    <div onClick={handleClickRoot} className={className}>
      {children}
    </div>
  );
};

export default MenuButton;
