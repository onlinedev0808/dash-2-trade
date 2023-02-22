import type { NextPage } from "next";

import Results from "../../../components/Backtester/Results";

export { default as getServerSideProps } from "../../../lib/serverProps";

const Home: NextPage = () => <Results />;

export default Home;
