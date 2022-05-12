import clsx from "clsx";
import { FC, ReactNode } from "react";
import { NavLink, To } from "react-router-dom";

const Navigator: FC<{ className?: string }> = (props) => {
  return (
    <div className={clsx([props.className, "dark:bg-dark-deep"])}>
      <nav className="mx-auto max-w-1920 py-4">
        <NavigatorLink to="/teams">队伍</NavigatorLink>
        <NavigatorLink to="/leader-board">排名</NavigatorLink>
      </nav>
    </div>
  );
};

const NavigatorLink: FC<{ to: To; children: ReactNode }> = (props) => {
  return (
    <NavLink className="mx-3" to={props.to}>
      {props.children}
    </NavLink>
  );
};

export default Navigator;
