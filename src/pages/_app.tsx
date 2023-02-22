/* eslint-disable react/jsx-props-no-spreading */
import { useMemo, useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NextPage } from "next";
import { persistor, store } from "../redux/store";
import "../styles/globals.scss";
import ThemeContext, { DEFAULT_THEME, ThemeValueType } from "../theme";
import {
  ScrollContextProvider,
  TooltipContext,
  CookieContextProvider,
} from "../contexts";
import { TooltipValueType } from "../contexts/TooltipContext";
import { Meta } from "../components/Meta";
import Layout from "../components/Layout";
import ErrorBoundary from "../components/ErrorBoundary";

import LayoutWrapper from "../components/Layout/Wrapper";
import { getCookieConsent, allowedCookieList } from "../utils/cookie-consent";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  hasNoLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: {
    user?: unknown;
  };
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const cookieConsent = getCookieConsent();
  const isUserPreference = cookieConsent?.isCustom || false;

  /*const removeCookie = useCallback(async (cookies: string[] | []) => {
    await axios.post("/api/cookies", { cookies });
  }, []);

  useEffect(() => {
    const allowedCookie = allowedCookieList();
    removeCookie(allowedCookie);
  }, []);*/

  const [theme, setTheme] = useState<string>(DEFAULT_THEME);
  const themeValue: ThemeValueType = useMemo(() => [theme, setTheme], [theme]);

  const [activeTooltip, setActiveTooltip] = useState<HTMLElement>(null);
  const activeTooltipValue: TooltipValueType = useMemo(
    () => [activeTooltip, setActiveTooltip],
    [activeTooltip]
  );

  return (
    <Provider store={store}>
      <CookieContextProvider>
        <ThemeContext.Provider value={themeValue}>
          <TooltipContext.Provider value={activeTooltipValue}>
            <ScrollContextProvider>
              <PersistGate loading={null} persistor={persistor}>
                {Component.hasNoLayout ? (
                  <Component {...pageProps} />
                ) : (
                  <LayoutWrapper
                    meta={
                      <Meta title="Quantfinity" description="quantfinity" />
                    }
                  >
                    {/* <Layout
                    meta={
                      <Meta title="Quantfinity" description="quantfinity" />
                    }
                    user={pageProps.user}
                  > */}
                    <ErrorBoundary>
                      <Component {...pageProps} />
                    </ErrorBoundary>
                    {/* </Layout> */}
                  </LayoutWrapper>
                )}
              </PersistGate>
            </ScrollContextProvider>
          </TooltipContext.Provider>
        </ThemeContext.Provider>
      </CookieContextProvider>
    </Provider>
  );
};

export default MyApp;
