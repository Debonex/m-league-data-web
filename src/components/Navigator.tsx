import clsx from "clsx";
import { FC, ReactNode, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, To } from "react-router-dom";
import { langs } from "../utils/constants";
import { umami } from "../utils/umami";
import Menu from "./headless/Menu";
import MenuButton from "./headless/MenuButton";
import MenuItem from "./headless/MenuItem";
import MenuItems from "./headless/MenuItems";
import { ReactComponent as GithubSvg } from "./svg/github.svg";
import { ReactComponent as LangSvg } from "./svg/Lang.svg";

const Navigator: FC<{ className?: string }> = (props) => {
  const { t, i18n } = useTranslation();

  const changeLang = useCallback((itemKey: string | number) => {
    const langKey = itemKey as string;
    i18n.changeLanguage(langKey);
    localStorage.setItem("lang", langKey);
    umami(`change-lang:${langKey}`);
  }, []);

  return (
    <div
      className={clsx(
        props.className,
        "backdrop-blur-sm",
        "dark:bg-dark-deep/90"
      )}
    >
      <nav className="mx-auto flex max-w-1920 items-center py-4">
        <NavigatorLink to="/teams">{t("队伍")}</NavigatorLink>
        <NavigatorLink to="/leader-board">{t("排名")}</NavigatorLink>
        <NavigatorLink to="/history">{t("对战记录")}</NavigatorLink>

        <Menu className="relative ml-auto" onItemClick={changeLang}>
          <MenuButton>
            <LangSvg
              className={clsx(
                "ml-auto mr-6 w-6 cursor-pointer transition-colors",
                "dark:text-white/70 dark:hover:text-white"
              )}
            />
          </MenuButton>
          <MenuItems
            className={clsx(
              "absolute top-full right-0 w-max translate-y-2 rounded-sm border border-primary-outstand py-1",
              "dark:bg-dark-secondary"
            )}
          >
            {langs.map((lang) => (
              <MenuItem
                itemKey={lang.key}
                className={clsx(
                  "cursor-pointer select-none px-2 py-px transition-colors",
                  { "text-primary-main": lang.key === i18n.language },
                  "hover:bg-dark-outstand"
                )}
                key={lang.key}
              >
                {lang.label}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>

        <GithubSvg
          className={clsx(
            "mr-6 w-6 cursor-pointer transition-colors",
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
