import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import MyWatchlists from "../../components/Watchlist/MyWatchlists";

export { default as getServerSideProps } from "../../lib/serverProps";

const Home: NextPage = ({ user }: { user: unknown }) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/");
  });

  return user && <MyWatchlists />;
};

export default Home;
