/* eslint-disable  */

import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

import Account from "./Account";
import Message from "./Message";

import LogInDialog from "../../components/LogIn/signin";
import SignUpDialog from "../../components/LogIn/signup";
import VerifyDialog from "../../components/LogIn/verify";

import { useAppSelector } from "../../redux/hooks";
import { ArrowLeft, QuantfinityLogo } from "../CommonSvg";
import { ScrollContext } from "../../contexts";
import {
  BACK_BTN_PROPERTY,
  BACK_BTN_ROUTE_PROPERTY,
} from "../../constant/localStorage";

const Navbar = ({
  user,
  isSidebarOpen,
  onSidebarOpenClose,
  className = "",
}: any) => {
  const router = useRouter();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const breadcrumbs = useAppSelector((state) => state.breadcrumbs);
  const watchlists = useAppSelector((state) => state.user.watchlists);

  const [observer, setObserver] = useState(null);

  const navRef = useRef(null);
  const barRef = useRef(null);

  const isBackBtn = localStorage.getItem(BACK_BTN_PROPERTY);
  const backBtnRoute = localStorage.getItem(BACK_BTN_ROUTE_PROPERTY);

  const [show, setShow] = useState(true);

  let pageTitle = breadcrumbs;

  const handleSidebarOpenClose = () => onSidebarOpenClose();

  const ctxScroll = useContext(ScrollContext);

  if (!breadcrumbs) {
    pageTitle =
      router.route === "/"
        ? "Tokens"
        : router.route.replace("/", "")[0].toUpperCase() +
          router.route.replace("/", "").substring(1);

    // Using Object seems to be a better solution in future
    // const breadCrumbs = {
    //   'Presale-tokens': 'Presale Tokens',
    //   'Risk-profiler': 'Risk Profiler',
    //   'Tokens/[tokenId]': pageTitle.split('/')[1],
    // }
    // pageTitle = breadCrumbs[pageTitle]

    if (pageTitle === "Presale-tokens") pageTitle = "Presales";
    if (pageTitle === "Risk-profiler") pageTitle = "Risk Profiler";
    if (pageTitle === "Tokens/[tokenId]") pageTitle = pageTitle.split("/")[1];

    const Id = router.query;
    if (Id.watchlistId) {
      const name = watchlists.filter(
        (watchlist: any) => watchlist.id === Id.watchlistId
      )[0].name;
      pageTitle = pageTitle.replace("[watchlistId]", name);
    }

    if (Id.tokenId) {
      pageTitle = pageTitle.replace("[tokenId]", Id.tokenId.toString());
    }
  }

  // For Login State
  const [isLogInDialogOpen, setLogInDialogOpen] = useState(false);
  const [isSignUpDialogOpen, setSignUpDialogOpen] = useState(false);
  const [isVerifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");

  const closeLogInDialog = () => {
    setLogInDialogOpen(false);
  };

  const openSignIn = () => {
    setSignUpDialogOpen(false);
    setVerifyDialogOpen(false);
    setLogInDialogOpen(true);
  };

  const openSignUp = () => {
    setVerifyDialogOpen(false);
    setLogInDialogOpen(false);
    setSignUpDialogOpen(true);
  };

  const openVerify = (email: any) => {
    setLogInDialogOpen(false);
    setSignUpDialogOpen(false);
    setVerifyDialogOpen(true);
    email && setVerifyEmail(email);
  };

  useEffect(() => {
    if (user || pageTitle === "Verify") setLogInDialogOpen(false);
    else setLogInDialogOpen(true);
  }, [user]);

  useEffect(() => {
    !isTabletOrMobile ? setShow(true) : setShow(false);
  }, [isTabletOrMobile]);

  useEffect(() => {
    ctxScroll.handleIsModalOpen(
      isLogInDialogOpen || isSignUpDialogOpen || isVerifyDialogOpen
    );
  }, [isLogInDialogOpen, isSignUpDialogOpen, isVerifyDialogOpen]);

  const observe = (entries) => {
    if (!barRef?.current) return;

    if (isTabletOrMobile) {
      barRef.current.style = null;
      return;
    }

    // no intersection
    if (entries[0].intersectionRatio === 0) {
      barRef.current.style =
        "margin-left: 0; border-radius: none; height: 5rem; padding-left: 1rem; margin-top: 0; width: 100%;";
    }

    // fully intersects
    else if (entries[0].intersectionRatio === 1) {
      barRef.current.style =
        "margin-left: 1rem; border-radius: 16px; height: 4rem; padding-left: 0; margin-top: 1rem; width: calc(100% - 2rem);";
    }
  };

  useEffect(() => {
    if (observer) {
      observer.unobserve(navRef.current);
    }

    const newObserver = new IntersectionObserver(observe, {
      threshold: [0, 1],
    });
    setObserver(newObserver);

    newObserver.observe(navRef.current);
  }, [isTabletOrMobile]);

  return (
    <>
      <div
        className={`sticky top-0 left-0 z-[50] ${
          show &&
          "bg-background dark:bg-gradient-to-b dark:from-[#0A0A0A] dark:to-[#0F1213]"
        } ease-in-out transition-all duration-300 flex h-max`}
      >
        <nav
          ref={barRef}
          className={`h-navbar z-[20] w-full
        bg-navigation-background dark:bg-navigation-background-dark transition-all py-2
        duration-300 ease-in-out ${className}`}
        >
          <div className="h-full w-full p-4 flex justify-between items-center rounded-[16px]">
            <div className="h-full flex items-center">
              <button
                className="relative w-5 h-full lg:hidden"
                onClick={handleSidebarOpenClose}
              >
                <div
                  className={`block absolute w-5 h-0.5 bg-primary dark:bg-white transform transition duration-500 ease-in-out ${
                    !isSidebarOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                ></div>
                <div
                  className={`block absolute w-5 h-0.5 bg-primary dark:bg-white transform transition duration-500 ease-in-out ${
                    !isSidebarOpen ? "opacity-0" : " "
                  }`}
                ></div>
                <div
                  className={`block absolute w-5 h-0.5 bg-primary dark:bg-white transform transition duration-500 ease-in-out ${
                    !isSidebarOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                ></div>
              </button>

              <div className="w-sidebar h-navbar bg-navigation-background dark:bg-navigation-background-dark">
                <div
                  className={`ml-[0.29rem] w-full h-full flex items-center
                ${show ? "justify-start" : "justify-center"}`}
                >
                  <Link href="/">
                    <a>
                      <QuantfinityLogo width="11.5rem" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            {isBackBtn ? (
              <div
                className="flex items-center justify-center
               h-full min-w-[32px] min-h-[32px]
                px-1 py-1.5 ml-2 md:ml-8
                bg-button-primary-highlight rounded-md cursor-pointer"
                onClick={() => router.push(backBtnRoute)}
              >
                <ArrowLeft w={16} h={16} />
              </div>
            ) : (
              <span className="w-6"></span>
            )}
            <div className="h-full w-full p-4 flex justify-end items-center">
              <div
                className={`mr-auto ml-12 ${
                  !show && isSidebarOpen ? "hidden" : ""
                }`}
              >
                {pageTitle}
              </div>
              <div
                className={`flex flex-row items-center ${
                  show ? "gap-6" : "gap-6"
                } ${!show && !isSidebarOpen ? "hidden" : ""}`}
              >
                <Message />
                <Message notification />
                <Account />
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div ref={navRef} className="navigation-ref" />
      {isSignUpDialogOpen && (
        <SignUpDialog openVerify={openVerify} openSignIn={openSignIn} />
      )}
      {isLogInDialogOpen && (
        <LogInDialog
          openVerify={openVerify}
          openSignUp={openSignUp}
          close={closeLogInDialog}
        />
      )}
      {isVerifyDialogOpen && (
        <VerifyDialog openSignIn={openSignIn} verifyEmail={verifyEmail} />
      )}
    </>
  );
};

export default Navbar;
