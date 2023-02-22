import type { NextPage } from "next";
import Contests from "../../components/Contests";

const Home: NextPage = () => (
  <div className="py-10 md:pl-5 md:pr-2">
    <Contests />
  </div>
);

export default Home;
