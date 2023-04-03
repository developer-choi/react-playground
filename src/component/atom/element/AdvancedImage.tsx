import Image, {ImageProps} from 'next/image';
import React, {SyntheticEvent, useCallback, useEffect, useState} from 'react';

export type FallbackBehavior = 'hidden' | 'replaced-image';

interface FallbackImageProp extends Omit<ImageProps, 'onError' | 'src'> {
  fallback?: {
    behavior?: FallbackBehavior;
    replaceImage?: string;
    customOnError?: ImageProps['onError'];
  };
  src: ImageProps['src'] | undefined | null;
}

export interface AdvancedImageFallbackProp extends FallbackImageProp {
  //그 외 모든 이미지에 공통적으로 적용되야하는 기능들 추가
}

export default function AdvancedImage({alt, src, fallback, ...rest}: AdvancedImageFallbackProp) {
  const {behavior, customOnError, replaceImage} = fallback ?? {};

  const [customSrc, setCustomSrc] = useState(src ?? "");
  const [hidden, setHidden] = useState(false);

  const _onError = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    if (customOnError) {
      customOnError(event);
      return;
    }

    // 기본동작으로 엑박이미지 노출
    if (behavior === undefined) {
      return;
    }

    if (behavior === 'hidden') {
      setHidden(true);
      return;
    }

    setCustomSrc(replaceImage ?? DEFAULT_FALLBACK_IMAGE);
  }, [behavior, customOnError, replaceImage]);

  useEffect(() => {
    setCustomSrc(src ?? "");
    setHidden(false);
  }, [src]);

  if (hidden) {
    return null;
  }

  return (
    <Image alt={alt} onError={_onError} src={customSrc} {...rest}/>
  );
}

const DEFAULT_FALLBACK_IMAGE = "/images/falllback.png";
