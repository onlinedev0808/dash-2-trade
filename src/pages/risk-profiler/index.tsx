import type { NextPage } from "next";

import RiskProfiler from "../../components/RiskProfiler";
import ComingSoonModal from "../../components/common/ComingSoonModal";

export { default as getServerSideProps } from "../../lib/serverProps";

const Home: NextPage = () => (
  <div className="my-5">
    <ComingSoonModal isOpen />
    <RiskProfiler />
  </div>
);

export default Home;
