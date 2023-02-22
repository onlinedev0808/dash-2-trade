import type { NextPage } from "next";
import LatestListing from "../../components/LatestListing";
import DexMain from "../../components/Dex";
import Card from "../../components/common/Card";
import CardWrapper from "../../components/common/Wrapper";

export { default as getServerSideProps } from "../../lib/serverProps";

const Home: NextPage = () => (
  <Card>
    <CardWrapper>
      <LatestListing />
      <DexMain />
    </CardWrapper>
  </Card>
);

export default Home;
