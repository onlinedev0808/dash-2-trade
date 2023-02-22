import type { NextPage } from "next";

import GSLayout from "../../components/GettingStarted/Layout";
import PresaleMarkets from "../../components/GettingStarted/PresaleMarkets";

export { default as getServerSideProps } from "../../lib/serverProps";

const GettingStartedPage: NextPage = () => (
  <GSLayout>
    <PresaleMarkets />
  </GSLayout>
);

export default GettingStartedPage;
