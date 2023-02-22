import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/router";
import PaywallDialog from "../../PaywallDialog";
import MenuItem from "./MenuItem";
import ToggleForm, { ToggleTheme } from "../../Setting/ToggleForm";
import ThemeContext, { THEME_PROPERTY, THEMES } from "../../../theme";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { updateUserData } from "../../../redux/reducers/UserSlice";
import ThemeSwitcher from "../../Setting/ThemeSwitcher";
// import { BlockList } from "net";

const NAVIGATION = [
  {
    id: 1,
    icon: "HomeIcon",
    title: "Dashboard",
    childRoutes: [
      {
        id: 1,
        icon: "TokensIcon",
        url: "/tokens",
        link: "/",
        title: "Tokens",
      },
      {
        id: 2,
        icon: "ChainsIcon",
        url: "/chains",
        link: "/chains",
        title: "Chains",
      },
      {
        id: 3,
        icon: "PresaleTokensIcon",
        url: "/presale-tokens",
        link: "/presale-tokens",
        suburl: "/presale-token-info",
        title: "Presale",
      },
      // {
      //   id: 4,
      //   icon: "EventIcon",
      //   url: "/events",
      //   link: "/events",
      //   title: "Events",
      // },
    ],
  },
  {
    id: 2,
    icon: "ToolIcon",
    title: "Tools",
    childRoutes: [
      // {
      //   id: 1,
      //   icon: "StarIcon",
      //   url: "/watchlists",
      //   link: "/watchlists",
      //   title: "Watchlists",
      // },
      {
        id: 2,
        icon: "BacktesterIcon",
        url: "/backtester",
        link: "/backtester",
        title: "Backtester",
      },
      // {
      //   id: 3,
      //   icon: "RiskIcon",
      //   url: "/risk-profiler",
      //   link: "/risk-profiler",
      //   title: "Risk Profiler",
      // },
      {
        id: 4,
        icon: "ToolIcon",
        url: "/trading-stats",
        link: "/trading-stats",
        title: "Trading stats",
      },
    ],
  },
  {
    id: 3,
    icon: "StarIcon",
    title: "Watchlist",
    childRoutes: [
      {
        id: 1,
        icon: "StarIcon",
        url: "/watchlists",
        link: "/watchlists",
        title: "Watchlists",
      },
      {
        id: 4,
        icon: "EventIcon",
        url: "/events",
        link: "/events",
        title: "Events",
      },
    ],
  },
  {
    id: 4,
    icon: "LuanchIcon",
    title: "Guide",
    url: "/getting-started",
    childRoutes: [
      {
        id: 1,
        url: "/getting-started",
        link: "/getting-started",
        title: "Onboarding",
        isSeparateRoute: true,
      },
      {
        id: 2,
        url: "/getting-started/how-to-start",
        link: "/getting-started/how-to-start",
        title: "How to Start",
      },
      {
        id: 3,
        url: "/getting-started/presale-markets",
        link: "/getting-started/presale-markets",
        title: "Presale Markets",
      },
      {
        id: 4,
        url: "/getting-started/technical-indicators",
        link: "/getting-started/technical-indicators",
        title: "Technical Indicators",
      },
      {
        id: 5,
        url: "/getting-started/on-chain-data",
        link: "/getting-started/on-chain-data",
        title: "On-Chain Data",
      },
      {
        id: 6,
        url: "/getting-started/backtesting",
        link: "/getting-started/backtesting",
        title: "Backtesting",
      },
      {
        id: 7,
        url: "/getting-started/scoring-guide",
        link: "/getting-started/scoring-guide",
        title: "Scoring Guide",
      },
    ],
  },
  {
    id: 5,
    icon: "CommunityIcon",
    title: "Community",
    url: "/community",
    childRoutes: [
      {
        id: 1,
        icon: "DiscordIcon",
        url: "https://discord.gg/pqynxhnQA2",
        link: "https://discord.gg/pqynxhnQA2",
        title: "Discord",
        isExternal: true,
      },
    ],
  },
  {
    id: 6,
    icon: "HelpIcon",
    title: "Help",
    url: "/help/faq",
    childRoutes: [
      {
        id: 1,
        icon: "HelpCircleIcon",
        url: "/help/faq",
        link: "/help/faq",
        title: "FAQs",
      },
      {
        id: 2,
        icon: "HeadPhonesIcon",
        url: "/help",
        link: "/help",
        title: "Contact us",
      },
      {
        id: 3,
        icon: "AlertTriangleIcon",
        url: "/help",
        link: "/help",
        title: "Report a problem",
      },
    ],
  },
];

const Sidebar = ({
  isSidebarOpen,
  onSidebarOpenClose,
  user,
  isTabletOrMobile,
}) => {
  const router = useRouter();
  console.log(router.route);
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isDev, setIsDev] = useState(userData?.subscriptionTier === -1);

  useEffect(() => {
    setIsDev(userData?.subscriptionTier === -1);
  }, [userData]);

  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [, setShowMode] = useState(false);

  const [theme, setTheme] = useContext(ThemeContext);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(
    theme === THEMES.DARK
  );

  const [isCaching, setIsCaching] = useState(true);
  const handleIsCaching = async () => {
    const newCache = !isCaching;
    await axios.post("/api/test", { caching: newCache });
    setIsCaching(newCache);

    dispatch(updateUserData({ ...user, caching: newCache }));
    /*if (isCaching) {
      await axios.post("/api/test", { caching: newCache });
      setIsCaching(newCache);
    } else {
      await axios.post("/api/test", { caching: newCache });
      setIsCaching(newCache);
    }*/
  };

  const enableDarkMode = () => {
    if (isDarkModeEnabled) {
      setTheme(THEMES.LIGHT);
      localStorage.setItem(THEME_PROPERTY, THEMES.LIGHT);
    }

    if (!isDarkModeEnabled) {
      setTheme(THEMES.DARK);
      localStorage.setItem(THEME_PROPERTY, THEMES.DARK);
    }

    setIsDarkModeEnabled(!isDarkModeEnabled);
  };

  const handleSidebarOpenClose = (isOpen: boolean) => {
    onSidebarOpenClose(isOpen);
  };

  const openSidebar = (isClosed = false) => {
    handleSidebarOpenClose(isClosed);
  };

  /* useEffect(() => {
    setIcon(!isSidebarOpen ? faArrowRight : faClose);
  }, [isSidebarOpen]); */

  // Just for debugging
  useEffect(() => {
    if (!user) setIsCaching(true);
    else setIsCaching(user?.caching);
  }, [user]);

  return (
    <div
      className={`relative bottom-0 pt-6 pb-4 
      shadow-primary z-[50] rounded-sidebar
      h-max overflow-hidden
      flex flex-col justify-between 
      bg-navigation-background dark:bg-foreground-dark 
     `}
      // onMouseEnter={handleSidebarOpenClose.bind(null, false)}
      // onMouseLeave={handleSidebarOpenClose.bind(null, true)}
    >
      <div className="relative">
        <div>
          <div className="hidden lg:flex justify-end">
            <button
              onClick={() => handleSidebarOpenClose(isSidebarOpen)}
              className="px-2 text-text-secondary dark:text-text-secondary-dark"
            >
              <FontAwesomeIcon
                icon={!isSidebarOpen ? faArrowRight : faClose}
                className="w-3"
              />
            </button>
          </div>

          <div className="text-base text-text-secondary relative">
            <div className="text-base w-sidebar">
              {NAVIGATION.map((item, index) => (
                <div key={item.id}>
                  <MenuItem
                    item={item}
                    hasSeparator={index !== 0 && isSidebarOpen}
                    isSidebarOpen={isSidebarOpen}
                    openSidebar={openSidebar}
                    isTabletOrMobile={isTabletOrMobile}
                  />
                </div>
              ))}

              <PaywallDialog
                isOpen={isPaywallOpen}
                close={() => {
                  setIsPaywallOpen(false);
                  setShowMode(true);
                }}
              />
            </div>
          </div>
        </div>
        {isSidebarOpen && (
          <div>
            <div className="h-[5rem]" />
            {isDev && (
              <div className="flex justify-end items-center rounded mb-4 mx-4 px-4">
                <span className="text-xs leading-7 text-text-primary dark:text-text-primary-dark mr-3">
                  Caching
                </span>
                <ToggleForm
                  isActive={isCaching}
                  onChange={handleIsCaching}
                  toggleTheme={ToggleTheme.Small}
                />
              </div>
            )}

            <div className="flex justify-center items-center rounded mt-6 mb-4 mx-4 px-4">
              <ThemeSwitcher
                isActive={isDarkModeEnabled}
                onChange={enableDarkMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
