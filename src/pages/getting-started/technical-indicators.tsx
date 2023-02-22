import type { NextPage } from "next";

import GSLayout from "../../components/GettingStarted/Layout";
import TechnicalIndicators from "../../components/GettingStarted/TechnicalIndicators";

export { default as getServerSideProps } from "../../lib/serverProps";

const GettingStartedPage: NextPage = () => (
  <GSLayout>
    <TechnicalIndicators />
  </GSLayout>
);

export default GettingStartedPage;
