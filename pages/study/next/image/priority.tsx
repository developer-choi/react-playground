import React from 'react';
import type {GetServerSideProps} from 'next';
import Image from 'next/image';
import {IMAGE_LIST} from '@util/dummy-image';

/** Flow
 * priority 여부에 따라, 최초로딩 시점의 HTML이 약간 차이가있다.
 * priority false인 이미지는 빈화면, (공간만 차지) 이미지도 빈화면의 dataurl형태로 되어있음.
 * priority true인 이미지는 처음부터 보임.
 */

// URL: http://localhost:3000/study/next/image/priority
export default function Page() {
  return (
    <>
      <Original/>
      <Html/>
    </>
  );
}

function Original() {
  return (
    <div>
      <Image src={src} alt="배너이미지" layout="intrinsic" width={900} height={300}/>
      <Image priority src={src} alt="배너이미지" layout="intrinsic" width={900} height={300}/>
    </div>
  );
}

function Html() {
  return (
    <div dangerouslySetInnerHTML={{__html: html}}/>
  );
}

const html = `
<span
  style="
    box-sizing: border-box;
    display: inline-block;
    overflow: hidden;
    width: initial;
    height: initial;
    background: none;
    opacity: 1;
    border: 0;
    margin: 0;
    padding: 0;
    position: relative;
    max-width: 100%;
  "
>
  <span
    style="
      box-sizing: border-box;
      display: block;
      width: initial;
      height: initial;
      background: none;
      opacity: 1;
      border: 0;
      margin: 0;
      padding: 0;
      max-width: 100%;
    "
  >
    <img
      style="
        display: block;
        max-width: 100%;
        width: initial;
        height: initial;
        background: none;
        opacity: 1;
        border: 0;
        margin: 0;
        padding: 0;
      "
      alt=""
      aria-hidden="true"
      src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27900%27%20height=%27300%27/%3e"
    />
  </span>
  <img
    alt="배너이미지"
    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    decoding="async"
    data-nimg="intrinsic"
    style="
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      box-sizing: border-box;
      padding: 0;
      border: none;
      margin: auto;
      display: block;
      width: 0;
      height: 0;
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
    "
  />
  <noscript>
    <img
      alt="배너이미지"
      srcset="
        /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1080&amp;q=75 1x,
        /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1920&amp;q=75 2x
      "
      src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1920&amp;q=75"
      decoding="async"
      data-nimg="intrinsic"
      style="
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        box-sizing: border-box;
        padding: 0;
        border: none;
        margin: auto;
        display: block;
        width: 0;
        height: 0;
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        max-height: 100%;
      "
      loading="lazy"
    />
  </noscript>
</span>
<span
  style="
    box-sizing: border-box;
    display: inline-block;
    overflow: hidden;
    width: initial;
    height: initial;
    background: none;
    opacity: 1;
    border: 0;
    margin: 0;
    padding: 0;
    position: relative;
    max-width: 100%;
  "
>
  <span
    style="
      box-sizing: border-box;
      display: block;
      width: initial;
      height: initial;
      background: none;
      opacity: 1;
      border: 0;
      margin: 0;
      padding: 0;
      max-width: 100%;
    "
  >
    <img
      style="
        display: block;
        max-width: 100%;
        width: initial;
        height: initial;
        background: none;
        opacity: 1;
        border: 0;
        margin: 0;
        padding: 0;
      "
      alt=""
      aria-hidden="true"
      src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27900%27%20height=%27300%27/%3e"
    />
  </span>
  <img
    alt="배너이미지"
    srcset="
      /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1080&amp;q=75 1x,
      /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1920&amp;q=75 2x
    "
    src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1920&amp;q=75"
    decoding="async"
    data-nimg="intrinsic"
    style="
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      box-sizing: border-box;
      padding: 0;
      border: none;
      margin: auto;
      display: block;
      width: 0;
      height: 0;
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
    "
  />
</span>
`;

const src = IMAGE_LIST.bigRectangular[0];

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
    }
  };
};
