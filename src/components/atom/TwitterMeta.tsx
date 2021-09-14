import Head from 'next/head';

export interface TwitterMetaProp {
  /**
   * https://cards-dev.twitter.com/validator
   * https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards
   * summary: 1:1, 144 or more
   * summary_large_image: 2:1, column 157 or more
   * app
   * player
   */
  cardType: 'summary' | 'summary_large_image';
  image: string;
  title: string;
  description: string;
}

export default function TwitterMeta({image, description, title, cardType}: TwitterMetaProp) {
  return (
    <Head>
      <meta key="twitter:card" name="twitter:card" content={cardType} />
      <meta key="twitter:image" name="twitter:image" content={image} />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
    </Head>
  );
}
