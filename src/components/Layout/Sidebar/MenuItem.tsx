import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { MenuItemArrow, NavigationSvg } from "../../CommonSvg";
import MenuItemChildRoute from "./MenuItemChildRoute";
import ThemeContext, { ColorsEnum, THEMES } from "../../../theme";

interface IMenuItemProps {
  item: {
    id: number;
    icon: string;
    title: string;
    url?: string;
    childRoutes: IChildRoute[];
  };
  hasSeparator: boolean;
  isSidebarOpen: boolean;
  openSidebar: (isClosed?: boolean) => void;
  isTabletOrMobile: boolean;
}

interface IChildRoute {
  id: number;
  icon?: string;
  url: string;
  suburl?: string;
  link: string;
  title: string;
  isExternal?: boolean;
  isSeparateRoute?: boolean;
}

const MenuItem = ({
  item: { childRoutes, title, icon, url, id },
  hasSeparator,
  isSidebarOpen,
  isTabletOrMobile,
  openSidebar,
}: IMenuItemProps) => {
  const router = useRouter();

  const [isDropOpen, setIsDropOpen] = useState(false);
  const [theme] = useContext(ThemeContext);
  const isLightTheme = theme === THEMES.LIGHT;

  const svgColor = isLightTheme
    ? ColorsEnum.TextSecondaryLight
    : ColorsEnum.TextSecondaryDark;

  const isActive = Boolean(
    childRoutes.find(
      (item) =>
        item.link === router.pathname ||
        router.route.startsWith(item.url) ||
        router.route.startsWith(item.suburl)
    ) || router.route.startsWith(url)
  );

  const navigateTo = (link) => router.push(link);

  const handleParentClick = () => {
    setIsDropOpen(!isDropOpen);
  };

  const handleChildClick = (item: IChildRoute) => {
    if (isTabletOrMobile) {
      openSidebar(true);
    }
    navigateTo(item.link);
  };

  useEffect(() => {
    if (isDropOpen) openSidebar();
  }, [isDropOpen]);

  useEffect(() => {
    if (!isSidebarOpen) setIsDropOpen(false);
  }, [isSidebarOpen]);

  return (
    <div className={`parent-menu-item-${id} text-sm`}>
      <div
        className="flex align-center cursor-pointer"
        onClick={handleParentClick}
      >
        <div
          className={`transition duration-250 linear h-9 border-l-4 mt-2.5 ${
            isActive ? "border-button-primary" : "border-transparent"
          }`}
        />
        <div
          className={`mx-4 flex justify-between grow border-t-1 border-solid pt-2 cursor-pointer ${
            hasSeparator
              ? "border-highlight dark:border-highlight-dark"
              : "border-transparent"
          }
            `}
        >
          <div className="py-2 cursor-pointer">
            <span className="flex items-center cursor-pointer h-5">
              <NavigationSvg
                name={icon}
                color={isActive ? ColorsEnum.Primary : svgColor}
              />
              <span
                className={`ml-4 cursor-pointer h-5 ${
                  isActive
                    ? "text-text-primary dark:text-text-primary-dark"
                    : "text-text-secondary dark:text-text-secondary-dark"
                }`}
              >
                {isSidebarOpen && title}
              </span>
            </span>
          </div>
          <div className="flex">
            <div
              className={`grow flex align-center transition duration-250 linear ${
                isDropOpen ? "rotate-90" : ""
              }`}
            >
              {isSidebarOpen && <MenuItemArrow />}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`font-normal transition-all ease-in-out duration-300 ${
          isDropOpen ? "max-h-screen" : "max-h-0"
        } overflow-hidden h-auto mb-2`}
      >
        {childRoutes.map((item) => (
          <MenuItemChildRoute
            key={item.url}
            item={item}
            isSidebarOpen={isSidebarOpen}
            isActive={isActive}
            handleClick={handleChildClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuItem;
