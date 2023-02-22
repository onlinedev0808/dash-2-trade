import type { NextPage } from "next";
import PresaleTokenInfo from "../../components/PresaleTokenInfo";

export { default as getServerSideProps } from "../../lib/serverProps";

const Home: NextPage = () => <PresaleTokenInfo />;

export default Home;
