import Head from "next/head";

const Meta = ({title, keywords, description}) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <meta name="keywords" content={keywords}></meta>
      <meta name="description" content={description}></meta>
      <meta charSet="utf-8"></meta>
      <link rel="icon" href="/favicon.ico"></link>
      <title>{title}</title>
    </Head>
  );
}
Meta.defaultProps = {
  title: "App for Travellers",
  keywords: "traveller, app",
  description: "App for Travellers",
  ogTitle: "App for Travellers"
}
export default Meta;