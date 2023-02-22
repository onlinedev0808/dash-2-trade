import type { NextPage } from "next";

import GSLayout from "../../components/GettingStarted/Layout";
import HowToStart from "../../components/GettingStarted/HowToStart/HowToStart";

export { default as getServerSideProps } from "../../lib/serverProps";

const GettingStartedPage: NextPage = () => (
  <GSLayout
    prevPageTitle="Onboarding"
    nextPageTitle="Scoring Guide"
    nextPageLink="/getting-started/scoring-guide#overview"
  >
    <HowToStart />
  </GSLayout>
);
export default GettingStartedPage;
