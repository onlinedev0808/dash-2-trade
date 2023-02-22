/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearUserData } from "../../redux/reducers/UserSlice";
import Layout from "./index";

import { allowedCookieList } from "../../utils/cookie-consent";
import { CookieContext } from "../../contexts";

type IMainProps = {
  children: ReactNode;
  meta: ReactNode;
};

const LayoutWrapper = ({ children, meta }: IMainProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const [isOpened, setIsOpened] = useState(false);

  const cookieCtx = useContext(CookieContext);

  const removeCookie = useCallback(async (cookies: string[] | []) => {
    try {
      const response = await axios.post("/api/cookies", { cookies });
      //console.log("deleted", response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const triggerRemoveCookie = (isNewRout = false) => {
      const settings = isNewRout ? false : cookieCtx.settings;
      const allowedCookie = allowedCookieList(settings);
      removeCookie(allowedCookie);
    };

    const handleRouteChangeComplete = () => triggerRemoveCookie(true);

    if (cookieCtx.isUserSettings === true) triggerRemoveCookie();

    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [cookieCtx.settings, cookieCtx.isUserSettings, router.events]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.post("/api/login/check-session");

        if (!!response.data?.isSessionExist === false) {
          dispatch(clearUserData());
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userData?.id) {
      // Clear UserStorage if session doesn't exist for some reasons
      checkSession();
    }
  }, [userData?.id]);

  useEffect(() => {
    setIsOpened(userData?.id);
  }, [userData]);

  return (
    <div>
      <Layout meta={meta} user={userData.id ? userData : null}>
        {isOpened ? (
          <>{children}</>
        ) : (
          <div className="flex flex-col gap-[inherit]">{children}</div>
        )}
      </Layout>
    </div>
  );
};

export default LayoutWrapper;
