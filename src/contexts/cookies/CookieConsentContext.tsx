import React, { useState, useMemo, useEffect } from "react";

import { setCookieConsent, getCookieConsent } from "../../utils/cookie-consent";

import { ICookieConsentSettings } from "./config";

import {
  analyticsGroup,
  essentialGroup,
  externalMediaGroup,
  marketingGroup,
} from "../../components/Layout/CookieConsent/configs";

const initEssentialData = {
  [essentialGroup.name]: essentialGroup.recommendedState,
};

const initData: ICookieConsentSettings = {
  [analyticsGroup.name]: analyticsGroup.recommendedState,
  [marketingGroup.name]: marketingGroup.recommendedState,
  [externalMediaGroup.name]: externalMediaGroup.recommendedState,
  ...initEssentialData,
};

const initContext = {
  settings: { ...initData },
  isUserSettings: false,
  update: (settings: ICookieConsentSettings) => {},
  acceptAll: () => {},
  declineAll: () => {},
};

const CookieContext = React.createContext(initContext);

export const CookieContextProvider = (props) => {
  const [settings, setSettings] = useState<ICookieConsentSettings>({
    ...initData,
  });

  const [isUserSettings, setIsUserSettings] = useState(false);

  const updateSettings = (newSettings) => {
    setIsUserSettings(true);
    setSettings((oldSettings) => ({
      ...oldSettings,
      ...newSettings,
      ...initEssentialData,
    }));
  };

  const acceptAll = () => {
    const newState = Object.keys(initData).reduce((accumulator, key) => {
      return { ...accumulator, [key]: true };
    }, {});

    setIsUserSettings(true);
    setSettings(newState as ICookieConsentSettings);
  };

  const declineAll = () => {
    const newState = Object.keys(initData).reduce((accumulator, key) => {
      return { ...accumulator, [key]: false };
    }, {});

    setIsUserSettings(true);
    setSettings({
      ...newState,
      ...initEssentialData,
    } as ICookieConsentSettings);
  };

  useEffect(() => {
    const cookieConsent = getCookieConsent();

    if (!cookieConsent) return;

    setSettings(cookieConsent.settings);
    setIsUserSettings(cookieConsent?.isCustom);
  }, []);

  useEffect(() => {
    if (isUserSettings === false) return;
    const configs = { settings, isCustom: isUserSettings };

    setCookieConsent(configs);
  }, [settings, isUserSettings]);

  const providerValue = useMemo(
    () => ({
      settings,
      isUserSettings,
      acceptAll,
      declineAll,
      update: updateSettings,
    }),
    [settings]
  );

  return (
    <CookieContext.Provider value={providerValue}>
      {props.children}
    </CookieContext.Provider>
  );
};

export default CookieContext;
