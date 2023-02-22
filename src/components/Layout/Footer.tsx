import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {
  CookiesSvg,
  DiscordSvg,
  FacebookWithoutBackgroundSvg,
  InstagramSvg,
  TwitterSvg,
} from "../CommonSvg";

const SocialButton = ({ children }) => (
  <button className="rounded-full border-border-primary border-solid border-1 flex justify-center items-center w-[3.375rem] h-[3.375rem]">
    {children}
  </button>
);

const List = ({ title, links }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="flex flex-col gap-5 lg:gap-6 items-start">
      <button
        onClick={() => {
          if (isTabletOrMobile) setIsOpened(!isOpened);
        }}
        className="flex justify-between w-full"
      >
        {title}
        {isTabletOrMobile && (
          <FontAwesomeIcon icon={faCaretDown} className="w-4 h-4" />
        )}
      </button>

      {!isTabletOrMobile && (
        <ul className="flex flex-col gap-3.5 text-text-secondary dark:text-text-secondary-dark text-sm">
          {links.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {isTabletOrMobile && (
        <ul
          className={`transition-all ease-in-out duration-300 ${
            isOpened ? "max-h-[12.8rem]" : "max-h-0"
          } overflow-y-hidden h-auto text-text-secondary dark:text-text-secondary-dark text-sm flex flex-col gap-3.5`}
        >
          {links.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Footer = ({ onClick }) => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gradient-to-b from-[#5367fe4d] to-[#5367fe00] lg:ml-5  pt-12 lg:pt-14 px-5 lg:px-14 pb-6 lg:pb-10 rounded-t-2xl flex flex-col items-center gap-20">
      <div className="w-full flex flex-col lg:flex-row justify-between gap-10">
        <div className="flex flex-col gap-8 lg:gap-10 items-center lg:items-start">
          <div className="text-center lg:text-left flex flex-col gap-2">
            <h3 className="text-xl lg:text-3xl">What’s on your mind?</h3>
            <p className="text-text-secondary dark:text-text-secondary-dark">
              Submit your email address and our team will get in touch with you
              within 48 hours.
            </p>
          </div>

          <div className="relative w-full max-w-[26rem]">
            <input
              className="bg-[#0000000d] dark:bg-[#ffffff0d] rounded-[14px] w-full pl-6 py-3.5 outline-none placeholder:text-text-primary placeholder:dark:text-text-primary-dark"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="absolute right-0 rounded-[14px] py-3.5 px-9 dark:text-background-dark bg-white">
              Submit
            </button>
          </div>

          <div className="flex gap-2">
            <SocialButton>
              <DiscordSvg />
            </SocialButton>
            <SocialButton>
              <div className="w-4 h-4 flex items-center justify-center">
                <TwitterSvg />
              </div>
            </SocialButton>
            <SocialButton>
              <div className="w-4 h-4 flex items-center justify-center">
                <FacebookWithoutBackgroundSvg />
              </div>
            </SocialButton>
            <SocialButton>
              <div className="w-4 h-4 flex items-center justify-center">
                <InstagramSvg />
              </div>
            </SocialButton>
          </div>
        </div>

        <div className="flex gap-6 lg:gap-16 flex-col lg:flex-row">
          <List
            title="Dashboard"
            links={["My Dashboard", "Tokens", "Chains", "Presale"]}
          />
          <List
            title="Tools"
            links={["Backtester", "Auto Trader", "Social Trading"]}
          />
          <List
            title="Tournament"
            links={["Contests", "Rewards", "Contest Rules"]}
          />
          <List title="Help" links={["Contact Us", "Guides", "FAQs"]} />
        </div>
      </div>
      <div className="flex justify-between items-center flex-row-reverse lg:flex-row w-full">
        <div className="flex gap-10">
          <h6 className="hidden lg:block">&copy; 2023 Dash2Trade</h6>
          <Link href="/privacy-policy#overview">
            <h6 className="cursor-pointer">Privacy Policy</h6>
          </Link>
        </div>

        <button
          type="button"
          className="flex gap-3.5 items-center flex-row-reverse lg:flex-row"
          onClick={onClick}
        >
          <h6>Cookies</h6>
          <div className="scale-75">
            <CookiesSvg />
          </div>
        </button>
      </div>

      <h6 className="block lg:hidden text-text-secondary dark:text-text-secondary-dark">
        &copy; 2023 Dash2Trade
      </h6>
    </footer>
  );
};

export default Footer;
