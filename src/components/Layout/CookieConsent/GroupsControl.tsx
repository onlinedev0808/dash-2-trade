import {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
  useEffect,
} from "react";

import {
  analyticsGroup,
  marketingGroup,
  essentialGroup,
  externalMediaGroup,
} from "./configs";

import GroupSwitcher from "./GroupSwitcher";
import { CookieContext } from "../../../contexts";
import { ICookieConsentSettings } from "../../../contexts/cookies/config";

const GroupsControl = forwardRef((props, ref) => {
  const cookieCtx = useContext(CookieContext);
  const cookieCtxSettings = cookieCtx.settings;

  const analyticsCtx = cookieCtxSettings[analyticsGroup.name];
  const marketingCtx = cookieCtxSettings[marketingGroup.name];
  const essentialCtx = cookieCtxSettings[essentialGroup.name];
  const externalMediaCtx = cookieCtxSettings[externalMediaGroup.name];

  const [isAnalyticsActive, setIsAnalyticsActive] = useState(analyticsCtx);

  const [isMarketingActive, setIsMarketingActive] = useState(marketingCtx);

  // const [isEssentialActive, setIsEssentialActive] = useState(essentialCtx);

  const [isExternalMediaActive, setIsExternalMediaActive] =
    useState(externalMediaCtx);

  useImperativeHandle(ref, () => ({
    getSettings(): ICookieConsentSettings {
      return {
        [essentialGroup.name]: essentialCtx,
        [analyticsGroup.name]: isAnalyticsActive,
        [marketingGroup.name]: isMarketingActive,
        [externalMediaGroup.name]: isExternalMediaActive,
      };
    },
  }));

  useEffect(() => {
    setIsAnalyticsActive(analyticsCtx);
  }, [analyticsCtx]);

  useEffect(() => {
    setIsMarketingActive(marketingCtx);
  }, [marketingCtx]);

  /*useEffect(() => {
    setIsEssentialActive(essentialCtx);
  }, [essentialCtx]);*/

  useEffect(() => {
    setIsExternalMediaActive(externalMediaCtx);
  }, [externalMediaCtx]);

  return (
    <>
      <GroupSwitcher
        title={essentialGroup.title}
        isActive={essentialCtx}
        enable={(e) => {}}
        tooltip={essentialGroup.tooltip}
      />
      <GroupSwitcher
        title={analyticsGroup.title}
        isActive={isAnalyticsActive}
        enable={(e) => {
          setIsAnalyticsActive((oldState) => !oldState);
        }}
      />
      <GroupSwitcher
        title={externalMediaGroup.title}
        isActive={isExternalMediaActive}
        enable={(e) => {
          setIsExternalMediaActive((oldState) => !oldState);
        }}
      />
      <GroupSwitcher
        title={marketingGroup.title}
        isActive={isMarketingActive}
        enable={(e) => {
          setIsMarketingActive((oldState) => !oldState);
        }}
      />
    </>
  );
});

export default GroupsControl;
