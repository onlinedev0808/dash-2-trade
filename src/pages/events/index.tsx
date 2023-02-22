import type { NextPage } from "next";
import Events from "../../components/Events";

export { default as getServerSideProps } from "../../lib/serverProps";

const Home: NextPage = () => <Events />;

export default Home;
