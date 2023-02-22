import type { NextPage } from "next";

import PresaleTokenTableContainer from "../../components/PresaleTokenTable";
import PresaleTokenTopCards from "../../components/PresaleTokenTopCards";

export { default as getServerSideProps } from "../../lib/serverProps";

const Home: NextPage = () => (
  <div className="flex flex-col gap-y-8">
    <PresaleTokenTopCards />
    <PresaleTokenTableContainer />
  </div>
);

export default Home;
