import { CookieGroupsEnum } from "./enums";

export interface ICookieConsentSettings {
  analytics?: boolean;
  marketing?: boolean;
  externalMedia?: boolean;
  essential?: boolean;
}

/*export interface ICookieConsentSettings {
  [CookieGroupsEnum.Analytics]: boolean;
  [CookieGroupsEnum.Marketing]: boolean;
  [CookieGroupsEnum.ExternalMedia]: boolean;
  [CookieGroupsEnum.Essential]: boolean;
}*/
