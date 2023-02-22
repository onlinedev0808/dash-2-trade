import { useContext, useRef } from "react";
import Link from "next/link";
import { CookiesSvg } from "../../CommonSvg";
import GroupsControl from "./GroupsControl";
import { CookieContext } from "../../../contexts";
import { ICookieConsentSettings } from "../../../contexts/cookies/config";
import Tooltip from "../../common/Tooltip";

const CookieConsent = (): JSX.Element => {
  const settingsRef = useRef(null);

  const cookieCtx = useContext(CookieContext);

  const getSettings = () => settingsRef.current?.getSettings();

  const handleAcceptAll = () => {
    cookieCtx.acceptAll();
  };

  const handleSave = () => {
    const settings: ICookieConsentSettings = getSettings();
    cookieCtx.update(settings);
  };

  const handleDeclineAll = () => {
    cookieCtx.declineAll();
  };

  const buttonClasses =
    "rounded-lg py-2 px-3 flex items-center text-sm justify-center cursor-pointer w-[11rem] lg:w-[14rem] h-[3.1rem] lg:h-[3.5rem] text-lg font-semibold";

  const buttonDecline = (
    <div className="flex gap-1 items-center mx-auto lg:mx-0 mb-6 lg:mb-0 justify-center lg:justify-start">
      <button
        type="button"
        className="text-2sm underline tracking-wide"
        onClick={handleDeclineAll}
      >
        I don’t want to share any cookies
      </button>
      <Tooltip
        message="Essential cookies cannot be turned off because they are necessary for the proper functioning of the platform. Clicking here will disable all non-essential cookies."
        icon
      />
    </div>
  );

  return (
    <div className="p-6 md:py-10 md:px-12 bg-highlight dark:bg-cookie-consent border-1 border-cookie-consent-b w-full rounded-[1.5rem]">
      <div className="flex flex-col xl:flex-row xl:justify-between">
        <div className="flex flex-col lg:flex-row">
          <span className="text-center lg:text-left scale-75 md:scale-100 hidden md:block">
            <CookiesSvg />
          </span>
          <div className="md:ml-10 text-center lg:text-left">
            <div className="xl:max-w-[40rem]">
              <p className="text-text-primary dark:text-text-primary-dark text-lg lg:text-1.5xl font-medium">
                This website uses your Cookies
              </p>
              <p className="text-2sm text-grey-light">
                We use Cookies to create personalised content and provide the
                best experience. Read more about{" "}
                <Link href="/cookie-policy#overview">
                  <span className="underline cursor-pointer">
                    Cookies Policy
                  </span>
                </Link>
              </p>
            </div>

            <div className="mt-10 mb-7">
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 w-max mx-auto lg:mx-0">
                <GroupsControl ref={settingsRef} />
              </div>
            </div>
            <div className="hidden lg:block">{buttonDecline}</div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center lg:flex-row gap-4 lg:gap-5 justify-center lg:justify-end">
            <button
              className={`bg-button-primary ${buttonClasses} text-white`}
              onClick={handleAcceptAll}
            >
              I ❤️ All Cookies
            </button>
            <button
              className={`bg-transparent border-1 text-text-primary dark:text-text-primary-dark ${buttonClasses}`}
              onClick={handleSave}
            >
              Save Settings
            </button>
          </div>
        </div>
        <div className="block lg:hidden mt-5">{buttonDecline}</div>
      </div>
    </div>
  );
};

export default CookieConsent;
