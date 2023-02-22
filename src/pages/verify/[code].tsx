import { useRouter } from "next/router";
import Verify from "../../components/Verify";

const Home = () => {
  const router = useRouter();
  const { code } = router.query;

  return <Verify code={code} />;
};

export default Home;
