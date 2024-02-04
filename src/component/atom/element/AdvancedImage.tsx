import Image, {ImageProps} from 'next/image';
import React, {useCallback, useEffect, useState} from 'react';

/**
 * default (기본값): 기본적으로 엑박이미지와 alt 텍스트 노출
 * replace-image: 대체이미지로 교체
 * hidden: 숨김
 */
export type FallbackBehavior = 'default' | 'replace-image' | 'hidden';

interface FallbackImageProp extends Omit<ImageProps, 'onError' | 'src'> {
  fallback?: {
    behavior?: FallbackBehavior;
    replaceImage?: string;
  };
  src: ImageProps['src'] | undefined | null;
}

export interface AdvancedImageFallbackProp extends FallbackImageProp {
  //그 외 모든 이미지에 공통적으로 적용되야하는 기능들 추가
}

export default function AdvancedImage({alt, src, fallback, ...rest}: AdvancedImageFallbackProp) {
  const {behavior = 'default', replaceImage} = fallback ?? {};
  const [isError, setIsError] = useState(false);
  const [customSrc, setCustomSrc] = useState(src ?? "");

  const onError = useCallback(() => {
    setIsError(true)

    // 기본동작으로 엑박이미지 노출
    if (behavior === 'default') {
      return;
    }

    setCustomSrc(replaceImage ?? DEFAULT_FALLBACK_IMAGE);
  }, [behavior, replaceImage]);

  useEffect(() => {
    setCustomSrc(src ?? "");
    setIsError(false)
  }, [src]);

  if (isError && (behavior === 'hidden')) {
    return null
  }

  return (
    <Image alt={alt} onError={onError} src={customSrc} {...rest}/>
  );
}

const DEFAULT_FALLBACK_IMAGE = "/images/falllback.png";
