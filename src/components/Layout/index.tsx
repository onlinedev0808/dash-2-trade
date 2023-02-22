import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useScrollDirection } from "react-use-scroll-direction";

import { useMediaQuery } from "react-responsive";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ThemeContext, { THEMES } from "../../theme";
import "react-toastify/dist/ReactToastify.css";
import CardWrapper from "../common/Wrapper";
import { ScrollContext } from "../../contexts";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";

type IMainProps = {
  children: ReactNode;
  meta: ReactNode;
  user?: unknown;
};

const Layout = ({ user, children }: IMainProps) => {
  const cookieConsentRef = useRef(null);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const [isSidebarClosed, setIsSidebarClosed] = useState(
    isTabletOrMobile // isMobile === undefined ? false : isMobile
  );

  const [minContentHeight, setMinContentHeight] = useState("min-h-[522px]");

  const [isMobileMode, setIsMobileMode] = useState(false);

  const toggleSidebar = (isOpen = null) => {
    if (isOpen === null) {
      setIsSidebarClosed((prevState) => !prevState);
    } else {
      setIsSidebarClosed(isOpen);
    }
  };

  const [theme] = useContext(ThemeContext);
  const ctxScroll = useContext(ScrollContext);

  const [isUpScroll, setIsUpScroll] = useState(true);

  const sideBarContainerRef = useRef<HTMLDivElement>();

  const { isScrollingUp, isScrollingY } = useScrollDirection();

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(THEMES.DARK);
    root.classList.remove(THEMES.LIGHT);
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (
      !isScrollingY ||
      window?.scrollY <= 0 ||
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    )
      return;

    setIsUpScroll(isScrollingUp);
  }, [isScrollingUp, isScrollingY]);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [isSidebarClosed]);

  useEffect(() => {
    if (!isMobileMode) return;
    ctxScroll.handleIsSidebarOpen(!isSidebarClosed);
  }, [isSidebarClosed, isMobileMode]);

  useEffect(() => {
    if (!isTabletOrMobile) {
      setIsMobileMode(false);
      // setIsSidebarClosed(false);
      return;
    }

    setIsMobileMode(true);
    // setIsSidebarClosed(true);
  }, [isTabletOrMobile]);

  const triggerCookieConsent = () =>
    cookieConsentRef.current.triggerOpenClose();

  useEffect(() => {
    if (sideBarContainerRef.current && !isSidebarClosed) {
      let height = sideBarContainerRef.current.offsetHeight;
      const style = window.getComputedStyle(sideBarContainerRef.current);
      height +=
        parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);

      setMinContentHeight(`min-h-[${height}px]`);
    }
  }, [isSidebarClosed]);

  return (
    <div className="text-text-primary dark:text-text-primary-dark w-full min-h-screen h-max bg-background dark:bg-background-dark">
      <Navbar
        isSidebarOpen={isSidebarClosed}
        user={user}
        onSidebarOpenClose={toggleSidebar}
        className={`transform ${
          isMobileMode && (isUpScroll ? "translate-y-0" : "-translate-y-[100%]")
        }`}
      />
      <ToastContainer />
      <div className={`relative flex w-full h-max ${minContentHeight}`}>
        <div
          ref={sideBarContainerRef}
          className={`pt-4
           mb-4 lg:ml-4 h-max 
           ${isMobileMode ? " absolute top-4 z-[50]" : " sticky top-mainTop "}
        ${
          isSidebarClosed
            ? " -translate-x-[100%] lg:translate-x-[0] w-sidebar-closed"
            : "w-sidebar"
        }
         transition-all duration-300 ease-in-out`}
        >
          <Sidebar
            isSidebarOpen={!isSidebarClosed}
            onSidebarOpenClose={toggleSidebar}
            user={user}
            isTabletOrMobile={isTabletOrMobile}
          />
        </div>
        <div
          onClick={() => {
            setIsSidebarClosed(true);
          }}
          className={`fixed top-0 left-0 bottom-0 right-0 z-30 bg-black/50 backdrop-blur-sm ${
            !isSidebarClosed && isMobileMode ? "flex overflow-hidden" : "hidden"
          }`}
        />
        <div
          className={`${
            !isMobileMode && "pt-4 "
          } w-full h-max bg-background dark:bg-background-dark`}
        >
          <main
            className={`p-2.5 lg:px-4 lg:pt-0 relative h-fit
            ${isMobileMode ? "min-h-[100vh]" : "h-fit"}
            ${
              !isMobileMode && !isSidebarClosed
                ? // ? "ml-mainLeft w-navbar"
                  // : "lg:ml-mainLeftSmall w-full lg:w-navbar-closed"
                  ""
                : ""
            }`}
          >
            <CardWrapper classes="h-full">{children}</CardWrapper>
          </main>
        </div>
        <CookieConsent ref={cookieConsentRef} />
      </div>
      <Footer onClick={triggerCookieConsent} />
    </div>
  );
};

export default Layout;
