import type { NextPage } from "next";

import GSLayout from "../../components/GettingStarted/Layout";
import Overview from "../../components/GettingStarted/Overview";

export { default as getServerSideProps } from "../../lib/serverProps";

const GettingStartedPage: NextPage = () => (
  <GSLayout>
    <Overview />
  </GSLayout>
);

export default GettingStartedPage;
