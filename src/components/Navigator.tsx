import clsx from "clsx";
import { FC, ReactNode } from "react";
import { NavLink, To } from "react-router-dom";
import { ReactComponent as GithubSvg } from "./svg/github.svg";

const Navigator: FC<{ className?: string }> = (props) => {
  return (
    <div
      className={clsx(
        props.className,
        "backdrop-blur-sm",
        "dark:bg-dark-deep/90"
      )}
    >
      <nav className="mx-auto flex max-w-1920 items-center py-4">
        <NavigatorLink to="/teams">队伍</NavigatorLink>
        <NavigatorLink to="/leader-board">排名</NavigatorLink>

        <GithubSvg
          className={clsx(
            "ml-auto mr-6 w-8 cursor-pointer transition-colors",
            "dark:text-white/70 dark:hover:text-white"
          )}
          onClick={() => {
            window.open(
              "https://github.com/Debonex/m-league-data-web",
              "_blank"
            );
          }}
        />
      </nav>
    </div>
  );
};

const NavigatorLink: FC<{ to: To; children: ReactNode }> = (props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        clsx("ml-6 transition-colors", {
          "border-b-2 dark:border-white dark:text-white": isActive,
          "dark:text-white/70 dark:hover:text-white": !isActive,
        })
      }
      to={props.to}
    >
      {props.children}
    </NavLink>
  );
};

export default Navigator;
