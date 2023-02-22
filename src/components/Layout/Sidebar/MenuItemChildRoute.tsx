import { useRouter } from "next/router";
import React, { useContext } from "react";
import ThemeContext, { ColorsEnum, THEMES } from "../../../theme";
import { NavigationSvg } from "../../CommonSvg";

const MenuItemChildRoute = ({ item, isSidebarOpen, isActive, handleClick }) => {
  const { route } = useRouter();
  const [theme] = useContext(ThemeContext);
  const isLightTheme = theme === THEMES.LIGHT;

  const isCurrentRoute =
    (!item.isSeparateRoute && route.startsWith(item.url)) ||
    route === item.link ||
    route.startsWith(item.suburl);

  const colorItem = "text-text-primary dark:text-text-primary-dark";

  const svgColor = isLightTheme
    ? ColorsEnum.TextSecondaryLight
    : ColorsEnum.TextSecondaryDark;

  const renderExternalLink = () => (
    <a href={item.link} target="_blank" rel="noreferrer">
      <div className="p-2 pl-12 flex justify-between align-middle">
        <span className="flex align-center hover:cursor-pointer">
          {item.icon && <NavigationSvg name={item.icon} />}
          <span className="self-center ml-3 text-sm text-text-secondary dark:text-text-secondary-dark">
            {item.title}
          </span>
        </span>
      </div>
    </a>
  );

  const renderInternalLink = () => {
    const wrapperClasses = `p-2 mr-4 rounded-sm flex justify-between align-middle 
                        ${isCurrentRoute ? "text-button-primary" : ""} 
                        ${
                          isSidebarOpen && isCurrentRoute
                            ? "bg-highlight dark:bg-highlight-dark"
                            : ""
                        } 
                        ${isSidebarOpen ? "ml-11" : "ml-4"}`;
    return (
      <div onClick={() => handleClick(item)}>
        <div className={wrapperClasses}>
          <span className="flex items-center hover:cursor-pointer">
            {item.icon && (
              <NavigationSvg
                name={item.icon}
                color={isCurrentRoute ? ColorsEnum.Primary : svgColor}
              />
            )}
            <span
              className={`self-center ml-3 text-sm ${
                isActive
                  ? colorItem
                  : "text-text-secondary dark:text-text-secondary-dark"
              }`}
            >
              {isSidebarOpen && item.title}
            </span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment key={item.id}>
      {item.isExternal ? renderExternalLink() : renderInternalLink()}
    </React.Fragment>
  );
};

export default MenuItemChildRoute;
