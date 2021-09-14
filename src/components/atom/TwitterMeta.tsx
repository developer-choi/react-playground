import Head from 'next/head';

export interface TwitterMetaProp {
  title: string;
  image: string;
  description: string;
}

export default function TwitterMeta({image, description, title}: TwitterMetaProp) {
  return (
    <Head>
      <meta key="twitter:card" name="twitter:card" content="summary" />
      <meta key="twitter:image" name="twitter:image" content={image} />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
    </Head>
  );
}
