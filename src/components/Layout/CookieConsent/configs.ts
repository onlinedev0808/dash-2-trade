import { CookieGroupsEnum } from "../../../contexts/cookies/enums";

export const CookieConsentSettings = {
  necessaryCookies: ["cookieConsent", "DashBoardX"],
};

export const analyticsGroup = {
  name: CookieGroupsEnum.Analytics,
  title: "Analytics",
  cookies: [],
  recommendedState: true,
  isRequired: false,
};

export const marketingGroup = {
  name: CookieGroupsEnum.Marketing,
  title: "Marketing",
  cookies: [],
  recommendedState: true,
  isRequired: false,
};

export const externalMediaGroup = {
  name: CookieGroupsEnum.ExternalMedia,
  title: "External Media",
  cookies: [],
  recommendedState: true,
  isRequired: false,
};

export const essentialGroup = {
  name: CookieGroupsEnum.Essential,
  title: "Essential Cookies",
  cookies: [...CookieConsentSettings.necessaryCookies],
  recommendedState: true,
  isRequired: true,
  tooltip: {
    message:
      "Essential cookies cannot be turned off because they are necessary for the proper functioning of the platform.",
  },
};

const CookieSettings = {
  ...CookieConsentSettings,
  optionalCookies: [
    { ...essentialGroup },
    { ...analyticsGroup },
    { ...externalMediaGroup },
    { ...marketingGroup },
  ],
};

export default CookieSettings;
