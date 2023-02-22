import type { NextPage } from "next";

import TokensTopCards from "../components/TokensTopCards";
import TokenTableContainer from "../components/TokenTable";

export { default as getServerSideProps } from "../lib/serverProps";

const Home: NextPage = () => (
  <div className="flex flex-col gap-y-8">
    <TokensTopCards />
    <TokenTableContainer />
  </div>
);

export default Home;
