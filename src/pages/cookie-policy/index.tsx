import { NextPage } from "next";
import { useRef } from "react";
import {
  AlertSvg,
  CookiesSvg,
  PerformanceSvg,
  SettingsSvg,
  TargetSvg,
} from "../../components/CommonSvg";
import {
  CannotFindBox,
  HeadSection,
} from "../../components/GettingStarted/common/components";
import PageNavMenu from "../../components/GettingStarted/PageNavMenu";
import GroupsControl from "../../components/Layout/CookieConsent/GroupsControl";
import Section from "../../components/Policy/common";

export { default as getServerSideProps } from "../../lib/serverProps";

const GRID_COLUMNS = "grid px-5 grid-cols-[32%_minmax(0,_1fr)_16%]";

const Table = ({ head, rows }) => (
  <div className="border-1 border-solid border-[#24293F] rounded-[14px] overflow-hidden">
    <div
      className={`${GRID_COLUMNS}  bg-highlight dark:bg-background-secondary-dark`}
    >
      {head.map((item) => (
        <div
          className="py-3 uppercase text-text-secondary dark:text-text-secondary-dark text-xs text-center"
          key={item.id}
        >
          {item.title}
        </div>
      ))}
    </div>

    <div>
      {rows.map((item) => (
        <div
          key={item.id}
          className={`${GRID_COLUMNS} border-t-1 border-t-solid border-t-[#24293F]`}
        >
          {item.values.map(({ value, id, isSecondary }) => (
            <div
              className={` py-4 ${
                isSecondary
                  ? "text-text-secondary dark:text-text-secondary-dark break-words"
                  : ""
              } `}
              key={id}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const SectionWithImage = ({ title, text, image }) => (
  <section className="grid grid-cols-[2.5rem_minmax(0,_1fr)] gap-4">
    {image}
    <div className="flex flex-col items-start">
      <div className="relative">
        <span className="leading-6 ">{title}</span>
      </div>
      <p className="leading-6 text-sm whitespace-pre-line text-text-secondary dark:text-[#B0B4C8]">
        {text}
      </p>
    </div>
  </section>
);

const CookiePolicy: NextPage = () => {
  const pageContentEl = useRef<HTMLDivElement>(null);
  const settingsRef = useRef(null);

  return (
    <div className="mt-12 relative">
      <div className="grid grid-cols-[1fr_0] md:grid-cols-[1fr_13rem] mx-4">
        <div ref={pageContentEl} className="md:w-3/4 md:mx-auto">
          <HeadSection
            title="Cookies Policy"
            description='Dash2Trade, ("Company") collects anonymous data from cookies in accordance with applicable laws and regulations, in particular the Swiss Federal Act on Data Protection ("FADP") and the General Data Protection Regulation (EU/2016/679) (General Data Protection Regulation, "GDPR"), both defined as "privacy regulations".'
            hideSocialLinks
            headIcon={
              <div className="scale-75">
                <CookiesSvg />
              </div>
            }
          />

          <div className="flex flex-col gap-10 mb-10">
            <Section
              title="Definitions"
              link="definitions"
              text={`No, those cookies are not sweet ☹️ In fact cookies are small text files that websites can put on a computer or mobile device to track who comes to the website. The cookie helps the website recognise when that device revisits the website. Cookies set by the website operator are called "first party cookies". Cookies set by parties other than the website operator are called "third party cookies".`}
            />

            <div className="flex flex-col gap-8">
              <div className="relative">
                <h2
                  id="4-type-of-cookies"
                  className="text-[0px] absolute top-[-6rem] left-0"
                >
                  4 type of cookies
                </h2>
                <span className="leading-6 ">
                  There are four types of cookies:
                </span>
              </div>

              <SectionWithImage
                image={<AlertSvg />}
                title="Strictly Necessary Cookies"
                text="Those which cannot be switched off and are needed to have the website working correctly."
              />

              <SectionWithImage
                image={<PerformanceSvg />}
                title="Performance/Analytics Cookies:"
                text="Which collects anonymous data and are used to measure and improve the performance of a website."
              />

              <SectionWithImage
                image={<SettingsSvg />}
                title="Functionality Cookies:"
                text="Which remember the choices you make on our website (e.g., country or language selection) for next visit."
              />

              <SectionWithImage
                image={<TargetSvg />}
                title="Targeting/Advertising Cookies"
                text="Which are specifically designed to gather information from you on your device to display advertisements to you based on relevant topics that interest you, someone likes it, someone not."
              />
            </div>

            <Section
              title="Cookies used by our website"
              link="cookies-used-by-our-website"
              text="Beside Strictly Necessary Cookies, we use only Performance/Analytics Cookies; and Functionality Cookies. We do not use Targeting/Advertising Cookies. The cookies used are listed below:"
            />

            <div className="flex flex-col gap-4">
              <h2 className="leading-6 ">Own Cookies</h2>
              <Table
                head={[
                  { id: 1, title: "Name of the cookie" },
                  { id: 2, title: "Function of the cookie" },
                  { id: 3, title: "Retention" },
                ]}
                rows={[
                  {
                    id: 1,
                    values: [
                      { id: 1, value: "cookieConsent" },
                      {
                        id: 2,
                        value:
                          "stores your cookie preferences and it is necessary for the correct functioning of the website.",
                        isSecondary: true,
                      },
                      { id: 3, value: "1 year", isSecondary: true },
                    ],
                  },
                  {
                    id: 2,
                    values: [
                      { id: 1, value: "DashBoardX" },
                      {
                        id: 2,
                        value:
                          "necessary for the website to function and cannot be switched off in our systems.",
                        isSecondary: true,
                      },
                      { id: 3, value: "15 days", isSecondary: true },
                    ],
                  },
                ]}
              />
            </div>

            {/* <div className="flex flex-col gap-4">
              <h2 className="leading-6 ">Third party cookies</h2>
              <Table
                head={[
                  { id: 1, title: "Name of the cookie" },
                  { id: 2, title: "Function of the cookie" },
                  { id: 3, title: "Retention" },
                ]}
                rows={[
                  {
                    id: 1,
                    values: [
                      { id: 1, value: "bm_sv" },
                      {
                        id: 2,
                        value: "https://mailchimp.com/legal/cookies/",
                        isSecondary: true,
                        isLink: true,
                      },
                      {
                        id: 3,
                        value: "2 hours",
                        isSecondary: true,
                      },
                    ],
                  },
                  {
                    id: 2,
                    values: [
                      { id: 1, value: "ak_bmsc" },
                      {
                        id: 2,
                        value: "https://mailchimp.com/legal/cookies/",
                        isSecondary: true,
                        isLink: true,
                      },
                      {
                        id: 3,
                        value: "2 hours",
                        isSecondary: true,
                      },
                    ],
                  },
                  {
                    id: 3,
                    values: [
                      { id: 1, value: "_abck" },
                      {
                        id: 2,
                        value: "https://mailchimp.com/legal/cookies/",
                        isSecondary: true,
                        isLink: true,
                      },
                      {
                        id: 3,
                        value: "1 year",
                        isSecondary: true,
                      },
                    ],
                  },
                  {
                    id: 4,
                    values: [
                      { id: 1, value: "bm_sz" },
                      {
                        id: 2,
                        value: "https://mailchimp.com/legal/cookies/",
                        isSecondary: true,
                        isLink: true,
                      },
                      {
                        id: 3,
                        value: "4 hours",
                        isSecondary: true,
                      },
                    ],
                  },
                ]}
              />
            </div> */}

            <div className="flex flex-col gap-8">
              <Section
                title="My Preferences"
                link="my-preferences"
                text="Essential cookies cannot be turned off because they are necessary for the proper functioning of the platform."
              />
              <div className="flex flex-col gap-3 lg:gap-5 w-max">
                <GroupsControl ref={settingsRef} />
              </div>
            </div>

            <CannotFindBox title="Got any questions?" />
          </div>
        </div>
        <div className="hidden md:block">
          <PageNavMenu contentElRef={pageContentEl} topPosition={90} />
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
