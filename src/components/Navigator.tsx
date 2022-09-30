import clsx from "clsx";
import Menu from "components/headless/Menu";
import MenuButton from "components/headless/MenuButton";
import MenuItem from "components/headless/MenuItem";
import MenuItems from "components/headless/MenuItems";
import { ReactComponent as GithubSvg } from "components/svg/github.svg";
import { ReactComponent as LangSvg } from "components/svg/Lang.svg";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { langs } from "utils/constants";
import { umami } from "utils/umami";

const navItems = [
  { link: "/teams", label: "队伍" },
  { link: "/leader-board", label: "排名" },
  { link: "/history", label: "对战记录" },
  { link: "/league", label: "联盟" },
];

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
        <NavigatorLinks />
        <LangButton className="ml-auto" />
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

const NavigatorLinks: FC = () => {
  const { t } = useTranslation();
  const [indicatorState, setIndicatorState] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });
  const root = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const links = navItems.map(() => useRef<HTMLAnchorElement>(null));

  const location = useLocation();

  useEffect(() => {
    const observer = new ResizeObserver(updateIndicator);
    if (root.current) {
      observer.observe(root.current);
      return () => {
        observer.unobserve(root.current);
      };
    }
    updateIndicator();
  }, [location]);

  const activeIdx = navItems.findIndex(
    (item) => item.link === location.pathname
  );

  const updateIndicator = useCallback(() => {
    if (activeIdx >= 0) {
      const activeLink = links[activeIdx];
      if (activeLink.current && root.current) {
        const linkRect = activeLink.current.getClientRects()[0];
        const rootRect = root.current.getClientRects()[0];
        setIndicatorState({
          width: linkRect.width,
          left: linkRect.x - rootRect.x,
        });
      }
    }
  }, [activeIdx]);

  return (
    <div className="relative px-3 pb-2" ref={root}>
      {navItems.map((item, idx) => (
        <NavLink
          className={clsx("px-3 transition-colors", {
            "dark:text-primary-main": activeIdx === idx,
            "dark:text-white/70 dark:hover:text-white": activeIdx !== idx,
          })}
          to={item.link}
          key={idx}
          ref={links[idx]}
        >
          {t(item.label)}
        </NavLink>
      ))}
      <span
        ref={indicator}
        className="absolute bottom-0 left-0 h-0.5 bg-primary-main transition-transform duration-300"
        style={{
          width: indicatorState.width,
          transform: `translateX(${indicatorState.left}px)`,
        }}
      />
    </div>
  );
};

const LangButton: FC<{ className?: string }> = ({ className }) => {
  const { i18n } = useTranslation();

  const changeLang = useCallback((itemKey: string | number) => {
    const langKey = itemKey as string;
    i18n.changeLanguage(langKey);
    localStorage.setItem("lang", langKey);
    umami(`change-lang:${langKey}`);
  }, []);

  return (
    <Menu className={clsx(className, "relative")} onItemClick={changeLang}>
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
  );
};

export default Navigator;
