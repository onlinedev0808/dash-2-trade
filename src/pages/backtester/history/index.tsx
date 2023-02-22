import type { NextPage } from "next";

import History from "../../../components/Backtester/History";

export { default as getServerSideProps } from "../../../lib/serverProps";

const Home: NextPage = () => <History />;

export default Home;
