import React from 'react';
import Head from 'next/head';

export interface OgMetaProps {
  /**
   * https://devtalk.kakao.com/t/url/29679/2
   * 800x400 (2:1)
   *
   * https://developers.facebook.com/docs/sharing/best-practices#images
   * https://developers.facebook.com/tools/debug/
   * row 600 or more, square support, 1.91:1 ratio if not square (ex: 600x314).
   */
  image: string;
  title: string;
  description: string;
}

export default function OgMeta({image, description, title}: OgMetaProps) {
  
  /**
   * https://nextjs.org/docs/api-reference/next/head
   * wrapped into maximum one level of <React.Fragment>
   */
  return (
    <Head>
      <meta key="og:image" property="og:image" content={image}/>
      <meta key="og:title" property="og:title" content={title}/>
      <meta key="og:description" property="og:description" content={description}/>
    </Head>
  );
};
