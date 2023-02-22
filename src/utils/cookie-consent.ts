import { setCookie, hasCookie, getCookie } from "cookies-next";
import CookieSettings from "../components/Layout/CookieConsent/configs";
import { ICookieConsentSettings } from "../contexts/cookies/config";

const cookieConsentName = "cookieConsent";
const cookieConsentNameAge = 60 * 60 * 24 * 365;

export const getCookieConsent = () => {
  const cookie = getCookie(cookieConsentName);

  if (cookie && typeof cookie === "string") {
    const storageData = JSON.parse(cookie);

    return { ...storageData };
  }

  return null;
};

export const setCookieConsent = (configs): void => {
  setCookie(cookieConsentName, JSON.stringify(configs), {
    maxAge: cookieConsentNameAge,
  });
};

export const allowedCookieList = (
  settings: ICookieConsentSettings | false = false
) => {
  const necessaryCookies = CookieSettings?.necessaryCookies;
  let cookieConsentSettings = settings;

  if (!settings) {
    const cookieConsent = getCookieConsent();

    if (cookieConsent === null) return necessaryCookies;
    if (!cookieConsent?.isCustom) return necessaryCookies;

    cookieConsentSettings = cookieConsent?.settings;
  }

  const allowedGroups = Object.keys(cookieConsentSettings).reduce(
    (acc, key) => {
      if (cookieConsentSettings[key] === true) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  if (allowedGroups.length === 0) return necessaryCookies;

  const allowedCookies = allowedGroups.reduce((acc, groupName) => {
    const optional = CookieSettings?.optionalCookies.find(
      (item) => item.name === groupName
    );

    if (optional?.cookies) {
      acc.push(...optional.cookies);
    }

    return acc;
  }, []);

  return [...allowedCookies];
};
