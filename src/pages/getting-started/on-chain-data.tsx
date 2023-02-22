import type { NextPage } from "next";

import GSLayout from "../../components/GettingStarted/Layout";
import OnChainData from "../../components/GettingStarted/OnChainData";

export { default as getServerSideProps } from "../../lib/serverProps";

const GettingStartedPage: NextPage = () => (
  <GSLayout>
    <OnChainData />
  </GSLayout>
);

export default GettingStartedPage;
