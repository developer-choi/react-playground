import React from 'react';
import 'swiper/css';
import styled from 'styled-components';
import type {SwiperProps} from 'swiper/react';
import {Swiper, SwiperSlide} from 'swiper/react';
import Image from 'next/image';
import {IMAGE} from '@util/dummy-image';

/**
 * priority true로 설정하면,
 * 1. 죄초로딩시점에
 * 2. 맨왼쪽 이미지는 아무것도안보이고
 * 3. 가운데는 6번째 (마지막 직전) 이미지가 보이고
 * 4. 우측은 7번째 (마지막) 이미지가 보임
 */

// URL: http://localhost:3000/study/other-libraries/react-swiper/priority-bug
export default function Page() {
  return (
    <>
      <Solved/>
      <Original/>
      <NonPriorityRender/>
      <BugRender/>
    </>
  );
}

function Solved() {
  return (
    <SolvedWrap>
      <Swiper {...swiperProps}>
        {IMAGE.list.bigRectangular.map(image => (
          <SwiperSlide key={image}>
            <Image
              src={image}
              alt="banner"
              width={1143}
              height={475}
              layout="responsive"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SolvedWrap>
  );
}

function Original() {
  return (
    <Wrap>
      <Swiper {...swiperProps}>
        {IMAGE.list.bigRectangular.map(image => (
          <SwiperSlide key={image}>
            <Image
              src={image}
              alt="banner"
              width={1143}
              height={475}
              layout="responsive"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrap>
  );
}

const swiperProps: SwiperProps = {
  slidesPerView: 1,
  centeredSlides: true,
  loop: true,
  loopedSlides: 2,
};

function NonPriorityRender() {
  return (
    <Wrap dangerouslySetInnerHTML={{__html: nonPriorityHtml}}/>
  );
}

function BugRender() {
  return (
    <Wrap dangerouslySetInnerHTML={{__html: initialHtml}}/>
  );
}

const Wrap = styled.div`
  .swiper {
    padding: 0 20%;
  }
`;

const SolvedWrap = styled(Wrap)`
  .swiper:not(.swiper-initialized) .swiper-slide-duplicate {
    display: none;
  }
`;

const initialHtml = `
<div class="swiper">
  <div class="swiper-wrapper">
    <div
      class="swiper-slide swiper-slide-duplicate"
      data-swiper-slide-index="5"
    >
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          sizes="100vw"
          srcset="
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=640&amp;q=75   640w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=750&amp;q=75   750w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=828&amp;q=75   828w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=1080&amp;q=75 1080w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=1200&amp;q=75 1200w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=1920&amp;q=75 1920w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=2048&amp;q=75 2048w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=3840&amp;q=75 3840w
          "
          src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=3840&amp;q=75"
          decoding="async"
          data-nimg="responsive"
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
    </div>
    <div
      class="swiper-slide swiper-slide-duplicate"
      data-swiper-slide-index="6"
    >
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          sizes="100vw"
          srcset="
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=640&amp;q=75   640w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=750&amp;q=75   750w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=828&amp;q=75   828w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=1080&amp;q=75 1080w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=1200&amp;q=75 1200w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=1920&amp;q=75 1920w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=2048&amp;q=75 2048w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=3840&amp;q=75 3840w
          "
          src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=3840&amp;q=75"
          decoding="async"
          data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="0">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          sizes="100vw"
          srcset="
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=640&amp;q=75   640w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=750&amp;q=75   750w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=828&amp;q=75   828w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1080&amp;q=75 1080w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1200&amp;q=75 1200w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1920&amp;q=75 1920w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=2048&amp;q=75 2048w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=3840&amp;q=75 3840w
          "
          src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=3840&amp;q=75"
          decoding="async"
          data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="1">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          sizes="100vw"
          srcset="
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=640&amp;q=75   640w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=750&amp;q=75   750w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=828&amp;q=75   828w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=1080&amp;q=75 1080w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=1200&amp;q=75 1200w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=1920&amp;q=75 1920w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=2048&amp;q=75 2048w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=3840&amp;q=75 3840w
          "
          src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=3840&amp;q=75"
          decoding="async"
          data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="2">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          sizes="100vw"
          srcset="
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=640&amp;q=75   640w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=750&amp;q=75   750w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=828&amp;q=75   828w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=1080&amp;q=75 1080w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=1200&amp;q=75 1200w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=1920&amp;q=75 1920w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=2048&amp;q=75 2048w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=3840&amp;q=75 3840w
          "
          src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=3840&amp;q=75"
          decoding="async"
          data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="3">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          sizes="100vw"
          srcset="
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=640&amp;q=75   640w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=750&amp;q=75   750w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=828&amp;q=75   828w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=1080&amp;q=75 1080w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=1200&amp;q=75 1200w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=1920&amp;q=75 1920w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=2048&amp;q=75 2048w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=3840&amp;q=75 3840w
          "
          src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=3840&amp;q=75"
          decoding="async"
          data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="4">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          sizes="100vw"
          srcset="
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=640&amp;q=75   640w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=750&amp;q=75   750w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=828&amp;q=75   828w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=1080&amp;q=75 1080w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=1200&amp;q=75 1200w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=1920&amp;q=75 1920w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=2048&amp;q=75 2048w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=3840&amp;q=75 3840w
          "
          src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=3840&amp;q=75"
          decoding="async"
          data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="5">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          sizes="100vw"
          srcset="
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=640&amp;q=75   640w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=750&amp;q=75   750w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=828&amp;q=75   828w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=1080&amp;q=75 1080w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=1200&amp;q=75 1200w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=1920&amp;q=75 1920w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=2048&amp;q=75 2048w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=3840&amp;q=75 3840w
          "
          src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=3840&amp;q=75"
          decoding="async"
          data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="6">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          sizes="100vw"
          srcset="
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=640&amp;q=75   640w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=750&amp;q=75   750w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=828&amp;q=75   828w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=1080&amp;q=75 1080w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=1200&amp;q=75 1200w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=1920&amp;q=75 1920w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=2048&amp;q=75 2048w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=3840&amp;q=75 3840w
          "
          src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=3840&amp;q=75"
          decoding="async"
          data-nimg="responsive"
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
    </div>
    <div
      class="swiper-slide swiper-slide-duplicate"
      data-swiper-slide-index="0"
    >
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          sizes="100vw"
          srcset="
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=640&amp;q=75   640w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=750&amp;q=75   750w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=828&amp;q=75   828w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1080&amp;q=75 1080w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1200&amp;q=75 1200w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1920&amp;q=75 1920w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=2048&amp;q=75 2048w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=3840&amp;q=75 3840w
          "
          src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=3840&amp;q=75"
          decoding="async"
          data-nimg="responsive"
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
    </div>
    <div
      class="swiper-slide swiper-slide-duplicate"
      data-swiper-slide-index="1"
    >
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          sizes="100vw"
          srcset="
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=640&amp;q=75   640w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=750&amp;q=75   750w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=828&amp;q=75   828w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=1080&amp;q=75 1080w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=1200&amp;q=75 1200w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=1920&amp;q=75 1920w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=2048&amp;q=75 2048w,
            /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=3840&amp;q=75 3840w
          "
          src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=3840&amp;q=75"
          decoding="async"
          data-nimg="responsive"
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
    </div>
  </div>
</div>
`;

const nonPriorityHtml = `
<div class="swiper">
  <div class="swiper-wrapper">
    <div
      class="swiper-slide swiper-slide-duplicate"
      data-swiper-slide-index="5"
    >
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          decoding="async"
          data-nimg="responsive"
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
            alt="banner"
            sizes="100vw"
            srcset="
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=640&amp;q=75   640w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=750&amp;q=75   750w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=828&amp;q=75   828w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=1080&amp;q=75 1080w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=1200&amp;q=75 1200w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=1920&amp;q=75 1920w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=2048&amp;q=75 2048w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=3840&amp;q=75 3840w
            "
            src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=3840&amp;q=75"
            decoding="async"
            data-nimg="responsive"
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
    </div>
    <div
      class="swiper-slide swiper-slide-duplicate"
      data-swiper-slide-index="6"
    >
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          decoding="async"
          data-nimg="responsive"
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
            alt="banner"
            sizes="100vw"
            srcset="
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=640&amp;q=75   640w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=750&amp;q=75   750w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=828&amp;q=75   828w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=1080&amp;q=75 1080w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=1200&amp;q=75 1200w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=1920&amp;q=75 1920w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=2048&amp;q=75 2048w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=3840&amp;q=75 3840w
            "
            src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=3840&amp;q=75"
            decoding="async"
            data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="0">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          decoding="async"
          data-nimg="responsive"
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
            alt="banner"
            sizes="100vw"
            srcset="
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=640&amp;q=75   640w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=750&amp;q=75   750w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=828&amp;q=75   828w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1080&amp;q=75 1080w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1200&amp;q=75 1200w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1920&amp;q=75 1920w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=2048&amp;q=75 2048w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=3840&amp;q=75 3840w
            "
            src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=3840&amp;q=75"
            decoding="async"
            data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="1">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          decoding="async"
          data-nimg="responsive"
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
            alt="banner"
            sizes="100vw"
            srcset="
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=640&amp;q=75   640w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=750&amp;q=75   750w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=828&amp;q=75   828w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=1080&amp;q=75 1080w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=1200&amp;q=75 1200w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=1920&amp;q=75 1920w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=2048&amp;q=75 2048w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=3840&amp;q=75 3840w
            "
            src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=3840&amp;q=75"
            decoding="async"
            data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="2">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          decoding="async"
          data-nimg="responsive"
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
            alt="banner"
            sizes="100vw"
            srcset="
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=640&amp;q=75   640w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=750&amp;q=75   750w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=828&amp;q=75   828w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=1080&amp;q=75 1080w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=1200&amp;q=75 1200w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=1920&amp;q=75 1920w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=2048&amp;q=75 2048w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=3840&amp;q=75 3840w
            "
            src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_02_47_55%2Fd76cf9869d664832.JPG&amp;w=3840&amp;q=75"
            decoding="async"
            data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="3">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          decoding="async"
          data-nimg="responsive"
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
            alt="banner"
            sizes="100vw"
            srcset="
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=640&amp;q=75   640w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=750&amp;q=75   750w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=828&amp;q=75   828w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=1080&amp;q=75 1080w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=1200&amp;q=75 1200w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=1920&amp;q=75 1920w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=2048&amp;q=75 2048w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=3840&amp;q=75 3840w
            "
            src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_29_04_35_06%2F61f319ab6a834ae5.JPG&amp;w=3840&amp;q=75"
            decoding="async"
            data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="4">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          decoding="async"
          data-nimg="responsive"
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
            alt="banner"
            sizes="100vw"
            srcset="
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=640&amp;q=75   640w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=750&amp;q=75   750w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=828&amp;q=75   828w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=1080&amp;q=75 1080w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=1200&amp;q=75 1200w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=1920&amp;q=75 1920w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=2048&amp;q=75 2048w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=3840&amp;q=75 3840w
            "
            src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_02_34_11%2F5cb8ef5975b44471.JPG&amp;w=3840&amp;q=75"
            decoding="async"
            data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="5">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          decoding="async"
          data-nimg="responsive"
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
            alt="banner"
            sizes="100vw"
            srcset="
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=640&amp;q=75   640w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=750&amp;q=75   750w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=828&amp;q=75   828w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=1080&amp;q=75 1080w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=1200&amp;q=75 1200w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=1920&amp;q=75 1920w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=2048&amp;q=75 2048w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=3840&amp;q=75 3840w
            "
            src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_01_21_27%2F361dabc757d5424b.JPG&amp;w=3840&amp;q=75"
            decoding="async"
            data-nimg="responsive"
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
    </div>
    <div class="swiper-slide" data-swiper-slide-index="6">
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          decoding="async"
          data-nimg="responsive"
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
            alt="banner"
            sizes="100vw"
            srcset="
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=640&amp;q=75   640w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=750&amp;q=75   750w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=828&amp;q=75   828w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=1080&amp;q=75 1080w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=1200&amp;q=75 1200w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=1920&amp;q=75 1920w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=2048&amp;q=75 2048w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=3840&amp;q=75 3840w
            "
            src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_30_03_39_11%2F2b6649be247641cc.JPG&amp;w=3840&amp;q=75"
            decoding="async"
            data-nimg="responsive"
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
    </div>
    <div
      class="swiper-slide swiper-slide-duplicate"
      data-swiper-slide-index="0"
    >
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          decoding="async"
          data-nimg="responsive"
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
            alt="banner"
            sizes="100vw"
            srcset="
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=640&amp;q=75   640w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=750&amp;q=75   750w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=828&amp;q=75   828w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1080&amp;q=75 1080w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1200&amp;q=75 1200w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=1920&amp;q=75 1920w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=2048&amp;q=75 2048w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=3840&amp;q=75 3840w
            "
            src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_07_20_55%2F581d90d3503b4469.JPG&amp;w=3840&amp;q=75"
            decoding="async"
            data-nimg="responsive"
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
    </div>
    <div
      class="swiper-slide swiper-slide-duplicate"
      data-swiper-slide-index="1"
    >
      <span
        style="
          box-sizing: border-box;
          display: block;
          overflow: hidden;
          width: initial;
          height: initial;
          background: none;
          opacity: 1;
          border: 0;
          margin: 0;
          padding: 0;
          position: relative;
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
            padding-top: 41.5573053368329%;
          "
        ></span>
        <img
          alt="banner"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          decoding="async"
          data-nimg="responsive"
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
            alt="banner"
            sizes="100vw"
            srcset="
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=640&amp;q=75   640w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=750&amp;q=75   750w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=828&amp;q=75   828w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=1080&amp;q=75 1080w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=1200&amp;q=75 1200w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=1920&amp;q=75 1920w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=2048&amp;q=75 2048w,
              /_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=3840&amp;q=75 3840w
            "
            src="/_next/image?url=https%3A%2F%2Fad-img.gmarket.com%2FADS%2FContents_%2F2023_03_31_11_51_47%2Fcf533c6230cc4367.JPG&amp;w=3840&amp;q=75"
            decoding="async"
            data-nimg="responsive"
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
    </div>
  </div>
</div>
`;
