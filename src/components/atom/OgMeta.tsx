import React from 'react';
import Head from 'next/head';

export interface OgMetaProps {
  title: string;
  image: string;
  description: string;
}

export default function OgMeta({image, description, title}: OgMetaProps) {
  
  /**
   * https://nextjs.org/docs/api-reference/next/head
   * wrapped into maximum one level of <React.Fragment>
   */
  return (
    <Head>
      <meta key="og:title" property="og:title" content={title}/>
      <meta key="og:image" property="og:image" content={image}/>
      <meta key="og:description" property="og:description" content={description}/>
    </Head>
  );
};
