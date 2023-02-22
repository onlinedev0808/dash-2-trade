import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "./session";

const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const user = req.session.user;
  if (user === undefined) {
    return { props: {} };
  }

  return {
    props: { user: req.session.user },
  };
}, sessionOptions as any);

export default getServerSideProps;
