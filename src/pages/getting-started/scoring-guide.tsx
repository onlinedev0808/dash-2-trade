import type { NextPage } from "next";
import ScoringGuide from "../../components/GettingStarted/ScoringGuide";
import GSLayout from "../../components/GettingStarted/Layout";

export { default as getServerSideProps } from "../../lib/serverProps";

const GettingStartedPage: NextPage = () => (
  <GSLayout
    prevPageTitle="How to Start"
    prevPageLink="/getting-started/how-to-start#overview"
    nextPageTitle="Presale Markets"
  >
    <ScoringGuide />
  </GSLayout>
);

export default GettingStartedPage;
