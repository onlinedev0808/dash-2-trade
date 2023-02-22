import type { NextPage } from "next";

import CreateStrategy from "../../../components/Backtester/CreateStrategy";

export { default as getServerSideProps } from "../../../lib/serverProps";

const Home: NextPage = () => <CreateStrategy />;

export default Home;
