import Head from "next/head";

interface PropTypes {
  title?: string;
}

const PageHead = (props: PropTypes) => {
  const { title = "Acara" } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/images/general/logo.svg" type="image/x-icon" />
    </Head>
  );
};

export default PageHead;
