'use client';

import Image, {ImageProps} from 'next/image';
import styles from './index.module.scss';
import NextjsLogo from '/public/imgs/nextjs.svg';
import {ReactElement, useCallback, useEffect, useState} from 'react';
import classNames from 'classnames';

export interface CustomImageProps extends Omit<ImageProps, 'src'> {
  src: ImageProps['src'] | '' | null | undefined; // 이미지 src 출처가 API 같은 외부이고, 그 값이 유효하지않은 케이스도 대응하기 위함

  /**
   * 이미지 불러오다 실패했을 때 처리
   * (default) 기존 Image 동작 그대로 유지 (엑박이미지 노출)
   * hidden 이미지 미노출 처리
   * default-404 디자이너와 협의된 애플리케이션 기본 404 이미지 UI 노출 (이미지 노출 공간을 대체 이미지와 배경색을 포함한 박스 UI로 대체
   * replace-image 대체이미지 노출
   * replace-element 대체 UI 노출
   */
  fallback?: {
    type: 'hidden' | 'default-404';
  } | {
    type: 'replace-image';
    src: string;
  } | {
    type: 'replace-element';
    element: ReactElement;
  };
}

/**
 * 모든 이미지 (아이콘 포함)에 대해 적용되야하는 공통로직을 적용함.
 * <Video> 컴포넌트와 목적이 같음.
 * 추후 next/image의 Image를 사용하게 될 수도있고,
 * html의 기본 <img>를 사용하게 될 수도 있음.
 *
 * 이 컴포넌트의 결과적인 동작은, /(example)/module/image 하위 예제 페이지를 모두 만족해야함.
 */
export default function CustomImage({ src, fallback, onError, quality = 100, width, height, className, ...rest }: CustomImageProps) {
  const [source, setSource] = useState({
    src,
    error: !src,
  });

  const customOnError = useCallback(() => {
    if (!fallback) {
      return;
    }

    setSource({
      src: fallback.type !== 'replace-image' ? '' : fallback.src,
      error: true,
    });
  }, [fallback]);

  useEffect(() => {
    setSource({
      src,
      error: !src,
    });
  }, [src]);

  /**
   * 이미지 노출되는 케이스
   * 1. 이미지 URL 형식이 유효하고, 이미지 불러오는 과정에서 오류가 발생하지 않은경우
   * 2. 위 1번 케이스가 아니면서 fallback 따로 지정 안한경우 (기본 이미지 동작 그대로 엑박 노출)
   * 3. 위 1번 케이스가 아니면서 fallback 이미지 지정한 경우
   */
  if (!source.error || fallback === undefined || fallback.type === 'replace-image') {
    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <Image
        src={source.src as string}
        className={classNames(styles.image, className)}
        onError={onError ?? customOnError}
        quality={quality}
        width={width}
        height={height}
        {...rest}
      />
    );
  }

  if (fallback.type === 'hidden') {
    return null;
  }

  if (fallback.type === 'replace-element') {
    return fallback.element;
  }

  // 기본 엑박이미지 (주로 404 케이스)
  return <DefaultReplaceImage width={width} height={height} className={className}/>
}

function DefaultReplaceImage({width, height, className}: Pick<ImageProps, 'width' | 'height' | 'className'>) {
  const paddingInline = (Number(width) - DEFAULT_IMG_RADIUS) / 2;
  const paddingBlock = (Number(height) - DEFAULT_IMG_RADIUS) / 2;

  /**
   * 보통 이 자리에 사이트 로고가 많이 쓰임.
   * 이미지 종류, 배경색은 디자인 시스템에 정의하면됨.
   * 핵심은, 액박대체 기본이미지를 통으로 쓰는게 아니라, 이미지를 감싼 박스에 배경색을 칠하는 형태로 대체를 해야한다는것.
   * 원래 이미지가 노출되던 사이즈의 비율이 당연히 위치마다 다 다르기때문에, 이걸 통이미지로 대체하려고했다간 이미지가 상하나 좌우로 찌부됨.
   */
  return (
    <Image src={NextjsLogo} style={{paddingInline, paddingBlock}} className={classNames(styles.notFoundContainer, className)} width={width} height={height} alt="사이트 로고"/>
  );
}

const DEFAULT_IMG_RADIUS = 64;
