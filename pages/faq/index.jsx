import FaqPage from "@/components/faqPage/FaqPage";
import Head from "next/head";

function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ | GDSC MU</title>
        <meta name="description" content="Read our FAQ" />
        <meta property="og:title" content="FAQ | GDSC MU" />
        <meta property="og:description" content="Read our FAQ" />
        <meta property="og:image" content={"/images/gdsc_fallback.png"} />
      </Head>
      <FaqPage />
    </>
  );
}

export default FAQ;
