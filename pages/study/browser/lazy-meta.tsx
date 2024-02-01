import React from "react";
import OgMeta from "@component/atom/OgMeta";
import {useDelay} from "@util/extend/time";
import Head from "next/head";

// URL: http://localhost:3000/study/browser/lazy-meta
export default function Page() {
  const enabled = useDelay(1000);

  return (
    <>
      {!enabled ? null : (
        <>
          <Head>
            <title>lazy-title</title>
          </Head>
          <OgMeta image="/images/600x314.png" title={`Custom Facebook Title-lazy`} description={`Custom Facebook Description-lazy`} />
        </>
      )}

      <div>Open Graph Lazy Test Page lazy seconds</div>
    </>
  );
}
