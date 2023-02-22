import type { NextPage } from "next";
import FAQ from "../../components/Help/Faq";

export { default as getServerSideProps } from "../../lib/serverProps";

const FAQPage: NextPage = () => <FAQ />;

export default FAQPage;
