import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CookieConsent from "./CookieConsent";
import { CookiesSvg } from "../../CommonSvg";
import { CookieContext } from "../../../contexts";
import useMountTransition from "../../../hooks/useMountTransition";
import { ICookieConsentSettings } from "../../../contexts/cookies/config";
import {
  analyticsGroup,
  essentialGroup,
  externalMediaGroup,
  marketingGroup,
} from "./configs";

const CookieConsentPortal = ({ isOpen }) => {
  const isTransitioning = useMountTransition(isOpen, 350);

  if (!isTransitioning && !isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-10 w-[90%] z-50 right-[50%] translate-x-[50%] duration-300 ${
        isTransitioning && isOpen ? "translate-y-0" : "translate-y-[130%]"
      }`}
    >
      <CookieConsent />
    </div>
  );
};

const CookieWrapper = forwardRef((props, ref) => {
  const cookieCtx = useContext(CookieContext);
  const [isOpen, setIsOpen] = useState(false);

  // const handleClick = () => {
  //   setIsOpen((state) => !state);
  // };

  useEffect(() => {
    if (cookieCtx.isUserSettings === false) {
      setIsOpen(true);
      return;
    }
    setIsOpen(!cookieCtx.isUserSettings);
  }, [cookieCtx.isUserSettings, cookieCtx.settings]);

  useImperativeHandle(ref, () => ({
    triggerOpenClose() {
      setIsOpen((state) => !state);
    },
  }));

  return <CookieConsentPortal isOpen={isOpen} />;
});

export default CookieWrapper;
