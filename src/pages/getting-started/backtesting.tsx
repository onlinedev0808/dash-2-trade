import type { NextPage } from "next";

import GSLayout from "../../components/GettingStarted/Layout";
import Backtesting from "../../components/GettingStarted/Backtesting";

export { default as getServerSideProps } from "../../lib/serverProps";

const GettingStartedPage: NextPage = () => (
  <GSLayout>
    <Backtesting />
  </GSLayout>
);

export default GettingStartedPage;
