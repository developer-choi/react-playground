import Head from 'next/head';

export interface TwitterMetaProp {
  /**
   * https://cards-dev.twitter.com/validator
   * https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards
   * summary: 1:1, 144 or more
   * summary_large_image: 2:1, column 157 or more
   *
   * The image is must include protocol and domain
   * reference: https://webmasters.stackexchange.com/a/129139
   * example: https://example.com/images/example.png (not /images/example.png)
   */
  cardType: 'summary' | 'summary_large_image'; //app and player are not available currently in this component.
  image: string;
  title: string;
  description: string;
}

export default function TwitterMeta({image, description, title, cardType}: TwitterMetaProp) {
  const _image = image.includes('http') ? image : `${process.env.NEXT_PUBLIC_ORIGIN}${image}`;
  return (
    <Head>
      <meta key="twitter:card" name="twitter:card" content={cardType} />
      <meta key="twitter:image" name="twitter:image" content={_image} />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
    </Head>
  );
}
