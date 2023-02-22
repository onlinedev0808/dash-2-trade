import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import WatchlistTokenTable from "../../components/WatchlistTokenTable";

export { default as getServerSideProps } from "../../lib/serverProps";

const Home: NextPage = ({ user }: { user: unknown }) => {
  const router = useRouter();

  const { watchlistId } = router.query;

  useEffect(() => {
    if (!user) router.push("/");
  });

  return user && <WatchlistTokenTable watchlistId={watchlistId} />;
};

export default Home;
