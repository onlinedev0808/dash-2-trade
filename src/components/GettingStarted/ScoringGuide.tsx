import React from "react";
import {
  CannotFindBox,
  CheckBox,
  HeadSection,
  IconTextSection,
  TextWithImageSection,
  WarningBox,
} from "./common/components";
import whatIsPresImg from "../../../public/gettingStarted/whatIsPresImg.png";
import {
  BarChartSvg,
  BoxSvg,
  ChatBubbleSvg,
  PeopleSvg,
  WrenchSvg,
} from "../CommonSvg";

const whatIsPresText = `A presale in Crypto is a way for a crypto project to raise funds for their development. This allows early participants, who believe in the fundamentals of the project to purchase tokens, usually below the market price that the token will have once released publicly.

A presale can have many different names, such as: 
IDO, ICO, INO, IGO. Public Sale, Launchpads, SHO, to name a few.

Some of them are public, some have a whitelisting process and others have other prerequisites, such as ex holding a specific token on a launchpad. But in the end they all fill the same purpose, giving participants the opportunity to purchase a token before “the masses”.`;

const whyPresText = `Many seasoned and experienced crypto traders use presales as a part of their crypto strategy. Why? Finding a good project early on and being able to purchase their tokens below the initial market price can be very rewarding.

`;
const whyPresTextBold = `Most people in the crypto space spend on average 3 weeks researching a presale coin before they invest. Some of the factors that they look at are;
`;

const warningText =
  "There is always a greater risk in investing in new projects. That's why people spend hours upon hours of their time to properly analyze a project before deciding which project has a higher probability to become a success.";

const scoringText = `At D2T we have a team of analysts looking at and scoring current presales. We use our knowledge and expertise to do the heavy lifting for you. Our “in house developed” scoring system has over 50 criteria spanning over 5 key areas, these are: Team, Product, Marketing, Development & Tokenomics. This is combined with a unique weightage mechanism. In the end, this allows you, as our user, to save time on researching dozens of presales, looking for the right presale.

So what exactly are we looking at when analyzing a presale? Let's take a look at some of the areas.
`;
const teamText = `We begin with looking at the team behind the project. Are they public or anonymous? If public, we want to know who they are and what they have done in the past. Have they been involved in successful crypto related projects before, or do they have other relevant experience important for their specific use case.

We look at who has financially backed the project, are they big players with previous success in backing crypto projects. Or smaller unknown backers. Most important is if we can verify the sources to see if the claimed backers are true or false.

Does the crypto project have well known advisors and partners that can contribute to a successful future? We use the same methodology here as searching for and verifying the backers.

`;

const productText = `We want to know what they are trying to achieve with what they are building. How do they stand against competitors in the same field? Do they have unique features that can make them stand out? Are they trying to solve an existing problem? Or perhaps they are simply making a copy of a product that already exists? How much effort has been made to make them look representative and as an authority in this field? Is their product, and things such as web pages and white paper well made? To help us to deeper understand this area we also investigate the developer activity behind the project. Who are the developers and how active are they, or have been in actually building? Have they had third party audits on their smart contract, and if so, is the auditor 
well known?

`;

const developmentText = `Development is the heart of any crypto project. By getting an insight in the development activity we can form an opinion about how serious the team behind the project is. One way to get this insight is to see if there is an open repository on ex Github. Here we can look at who the developers are and their background, how active they are and what they have accomplished so far. Is their code 
open source and how much of their projects is publicly available for viewing.

However not all projects share their development or all parts of their development. There can be different reasons behind this. For example if they are developing something unique and they do not want competitors to see what, or exactly how they are building their solutions.

In these cases we can also look at other things to determine how active they are in building. Things such as beta versions of their product, testnets, mobile apps that are publicly available, to mention a few. A crypto project that does not show any signs of development is usually considered 
a red flag.

`;
const sentimentText = `An important area to look at is how well the project has been perceived publicly. What efforts are the team making to communicate with their audience and how well are they building a social following. More importantly is how their following, if real followers, are perceiving, and engaging with the project. How is the general sentiment online for the project, are there youtubers and blogs covering the project in a positive way?

`;
const toknomicsText = `Understanding the Tokenomics is important to get an idea of how a token might perform going forward. We can also get hints of the seriousness of the projects by looking at the tokenomics. Or if there are signs of pump & dumps or even a rug. Knowing things, such as the amount allocated to the team behind the project, the amount for early investors, public sale and if there are lockup periods and vesting schedules for these. And if so, what does the lockup and vesting look like? We look at the amount allocated for liquidity, reward systems, development, marketing and whatever there can be. Each aspect is important to take into consideration towards the final score.`;

const ScoringGuide = () => (
  <div
    className="text-text-primary dark:text-text-primary-dark flex flex-col
  gap-10 md:gap-[5.3rem]
  "
  >
    {/* <div> */}
    <HeadSection title="What is a presale?" headText="Presale" classes="mb-4" />
    {/* <div className="w-full h-max rounded-2xl text-center"> */}
    {/*  <Image src={scoringGuideImg} className="rounded-2xl" /> */}
    {/* </div> */}
    {/* </div> */}
    <TextWithImageSection
      title="What is a presale?"
      text={whatIsPresText}
      image={whatIsPresImg}
      className="[&_.image-container]:min-w-[20rem]"
    />
    <section className="flex flex-col gap-12 md:gap-[5.6rem] items-start ">
      <div>
        <div className="text-3xl mb-7 relative">
          <h2
            id="why-presale"
            className="absolute top-revertMainTop left-0 text-[0px]"
          >
            Why Presale?
          </h2>
          Why Presale?
        </div>
        <p className="text-base whitespace-pre-line">
          <span className="text-text-secondary dark:text-text-secondary-dark">
            {whyPresText}
          </span>
          {whyPresTextBold}
        </p>
      </div>
      <span className="lg:flex">
        <div className="text-3xl relative">
          <h2
            id="perfect-presale"
            className="absolute top-revertMainTop left-0 text-[0px]"
          >
            How to find perfect presale?
          </h2>
        </div>
        <div className="flex flex-col gap-y-8 min-w-[20rem] mr-16 text-base mb-8 lg:mb-0">
          <CheckBox title="Whitepaper" isChecked />
          <CheckBox title="Tokenomics" />
          <CheckBox
            title="Each team member’s Linkedin profile and past experience"
            isChecked
          />
          <CheckBox title="Doxxed team, and if so, why?" />
          <CheckBox title="Can they compete in the growing crypto industry" />
          <CheckBox
            title="How many token holders are they growing everyday"
            isChecked
          />
          <CheckBox
            title="Is there developer activity online, is it growing"
            isChecked
          />
        </div>
        <div className="flex flex-col gap-y-8 min-w-[20rem] text-base">
          <CheckBox title="What is their social sentiment" />
          <CheckBox title="What's the Softcap/Hardcap?" />
          <CheckBox title="Is their social media following and activity increasing , is it real or fake?" />
          <CheckBox
            title="Does the contract have a mechanism protecting investors from a rug pull?"
            isChecked
          />
          <CheckBox title="Who is the auditor of a project, and did the issues actually get resolved?" />
          <CheckBox title="What are the people's impression about the project." />
        </div>
      </span>
    </section>
    <WarningBox text={warningText} />
    <section>
      <div className="mb-16">
        <div className="text-3xl mb-7 relative">
          <h2
            id="Scoring"
            className="absolute top-revertMainTop left-0 text-[0px]"
          >
            Scoring
          </h2>
          Scoring
        </div>
        <p className="text-base text-text-secondary dark:text-text-secondary-dark whitespace-pre-line">
          {scoringText}
        </p>
      </div>

      <div className="text-3xl relative">
        <h2
          id="important-aspects"
          className="absolute top-revertMainTop left-0 text-[0px]"
        >
          Important aspects
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[4.95rem] gap-y-[4.15rem]">
        <IconTextSection icon={<PeopleSvg />} title="Team" text={teamText} />
        <IconTextSection icon={<BoxSvg />} title="Product" text={productText} />
        <IconTextSection
          icon={<WrenchSvg />}
          title="Development"
          text={developmentText}
        />
        <IconTextSection
          icon={<ChatBubbleSvg />}
          title="Social Sentiment & Marketing"
          text={sentimentText}
        />
        <IconTextSection
          icon={<BarChartSvg />}
          title="Tokenomics"
          text={toknomicsText}
        />
      </div>
    </section>
    <CannotFindBox />
  </div>
);

export default ScoringGuide;
