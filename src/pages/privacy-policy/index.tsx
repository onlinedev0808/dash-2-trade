import { NextPage } from "next";
import { useRef } from "react";
import { HeadSection } from "../../components/GettingStarted/common/components";
import PageNavMenu from "../../components/GettingStarted/PageNavMenu";
import Section from "../../components/Policy/common";

export { default as getServerSideProps } from "../../lib/serverProps";

const SECTIONS = [
  {
    id: 1,
    title: "Information We Collect",
    link: "information-we-collect",
    text: "We will collect and process the following personal information about you:",
    list: [{ id: 1, title: "email" }],
  },
  {
    id: 2,
    title: "How We Collect Your Information",
    link: "how-we-collect-your-information",
    text: `We collect/receive information about you in the following manner: 
    When a user fills up the registration form or otherwise submits personal information Interacts with the website From public sources`,
  },
  {
    id: 3,
    title: "How We Use Your Information",
    link: "how-we-use-your-information",
    text: "We will use the information that we collect about you for the following purposes:",
    list: [
      { id: 1, title: "Marketing/ Promotional" },
      { id: 2, title: "Creating user account" },
      { id: 3, title: "Customer feedback collection" },
      { id: 4, title: "Administration info" },
      { id: 5, title: "Targeted advertising" },
      { id: 6, title: "Site protection" },
      { id: 7, title: "User to user comments" },
    ],
  },
  {
    id: 4,
    title: "How We Share Your Information",
    link: "how-we-share-your-information",
    text: "If we want to use your information for any other purpose, we will ask you for consent and will use your information only on receiving your consent and then, only for the purpose(s) for which grant consent unless we are required to do otherwise by law. How We Share Your Information: We will not transfer your personal information to any third party without seeking your consent, except in limited circumstances as described below:",
  },
  {
    id: 5,
    title: "Analytics",
    link: "analytics",
    text: "We require such third party's to use the personal information we transfer to them only for the purpose for which it was transferred and not to retain it for longer than is required for fulfilling the said purpose. We may also disclose your personal information for the following: (1) to comply with applicable law, regulation, court order or other legal process; (2) to enforce your agreements with us, including this Privacy Policy; or (3) to respond to claims that your use of the Service violates any third-party rights. If the Service or our company is merged or acquired with another company, your information will be one of the assets that is transferred to the new owner.",
  },
  {
    id: 6,
    title: "Retention Of Your Information",
    link: "retention-of-your-information",
    text: "We will retain your personal information with us for 90 days to 2 years after users terminate their accounts or for as long as we need it to fulfill the purposes for which it was collected as detailed in this Privacy Policy. We may need to retain certain information for longer periods such as record-keeping / reporting in accordance with applicable law or for other legitimate reasons like enforcement of legal rights, fraud prevention, etc. Residual anonymous information and aggregate information, neither of which identifies you (directly or indirectly), may be stored indefinitely.",
  },
  {
    id: 7,
    title: "Your Rights",
    link: "your-rights",
    text: "Depending on the law that applies, you may have a right to access and rectify or erase your personal data or receive a copy of your personal data, restrict or object to the active processing of your data, ask us to share (port) your personal information to another entity, withdraw any consent you provided to us to process your data, a right to lodge a complaint with a statutory authority and such other rights as may be relevant under applicable laws. To exercise these rights, you can write to us at privacy@dash2trade.com. We will respond to your request in accordance with applicable law. You may opt-out of direct marketing communications or the profiling we carry out for marketing purposes by writing to us at privacy@dash2trade.com. Do note that if you do not allow us to collect or process the required personal information or withdraw the consent to process the same for the required purposes, you may not be able to access or use the services for which your information was sought.",
  },
  {
    id: 8,
    title: "Cookies Etc.",
    link: "cookies",
    text: "To learn more about how we use these and your choices in relation to these tracking technologies, please refer to our Cookie Policy.",
  },
  {
    id: 9,
    title: "Security",
    link: "security",
    text: "The security of your information is important to us and we will use reasonable security measures to prevent the loss, misuse or unauthorised alteration of your information under our control. However, given the inherent risks, we cannot guarantee absolute security and consequently, we cannot ensure or warrant the security of any information you transmit to us and you do so at your own risk.",
  },
  {
    id: 10,
    title: "Grievance / Data Protection Officer",
    link: "grievance-data-protection-officer",
    text: "If you have any queries or concerns about the processing of your information that is available with us, you may email our Grievance Officer at dash2trade, Ajeltake Island, email: privacy@dash2trade.com. We will address your concerns in accordance with applicable law.",
  },
];

const PrivacyPolicy: NextPage = () => {
  const pageContentEl = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-12 relative">
      <div className="grid grid-cols-[1fr_0] md:grid-cols-[1fr_13rem] mx-4">
        <div ref={pageContentEl} className="md:w-3/4 md:mx-auto">
          <HeadSection
            title="Privacy Policy"
            headText="Terms & Privacy"
            description="Last Updated On 04-Jan-2023 | Effective Date 04-Jan-2023"
            hideSocialLinks
          />
          <div className="flex flex-col gap-12 mb-12">
            <p className="text-sm whitespace-pre-line text-text-secondary dark:text-[#B0B4C8]">
              This Privacy Policy describes the policies of Dash2trade, Ajeltake
              Island, Majuro MH96960, Marshall Islands (the), email:
              privacy@dash2trade.com, on the collection, use and disclosure of
              your information that we collect when you use our website (
              https://dash2trade.com ). (the {`"Service"`}). By accessing or
              using the Service, you are consenting to the collection, use and
              disclosure of your information in accordance with this Privacy
              Policy. If you do not consent to the same, please do not access or
              use the Service. We may modify this Privacy Policy at any time
              without any prior notice to you and will post the revised Privacy
              Policy on the Service. The revised Policy will be effective 180
              days from when the revised Policy is posted in the Service and
              your continued access or use of the Service after such time will
              constitute your acceptance of the revised Privacy Policy. We
              therefore recommend that you periodically review this page.
            </p>
            {SECTIONS.map((section) => (
              <Section
                key={section.id}
                title={section.title}
                link={section.link}
                text={section.text}
                list={section.list}
              />
            ))}
          </div>
        </div>
        <div className="hidden md:block">
          <PageNavMenu contentElRef={pageContentEl} topPosition={90} />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
