import type { NextPage } from "next";

import Backtester from "../../components/Backtester";

export { default as getServerSideProps } from "../../lib/serverProps";

const Home: NextPage = () => <Backtester />;

export default Home;
