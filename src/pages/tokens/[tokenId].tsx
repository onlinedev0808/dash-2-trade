import { useRouter } from "next/router";
import TokenDetails from "../../components/TokenDetails";

export { default as getServerSideProps } from "../../lib/serverProps";

const Token = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  return <TokenDetails token={{ tokenId }} />;
};

export default Token;
