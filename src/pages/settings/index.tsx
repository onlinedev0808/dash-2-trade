import type { NextPage } from "next";

import Setting from "../../components/Setting/index";

export { default as getServerSideProps } from "../../lib/serverProps";

const Home: NextPage = () => <Setting />;

export default Home;
