import {ComponentPropsWithoutRef, forwardRef, Ref, SyntheticEvent, useCallback, useEffect, useState} from 'react';

export interface ImgProp extends Omit<ComponentPropsWithoutRef<'img'>, 'onError'> {
  errorSrc?: string;
  behaviorWhenError?: undefined | 'show-default-img' | 'hidden';
}

export default forwardRef(function Img({errorSrc, src, behaviorWhenError, style, ...rest}: ImgProp, ref: Ref<HTMLImageElement>) {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [src]);

  const _onError = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    setIsError(true);

    if (behaviorWhenError === 'show-default-img') {
      // eslint-disable-next-line no-param-reassign
      (event.target as HTMLImageElement).src = errorSrc ?? DEFAULT_IMAGE;
      return;
    }
  }, [behaviorWhenError, errorSrc]);

  const _style = {
    ...style,
    display: isError && behaviorWhenError === 'hidden' ? "none" : style?.display
  };

  return (
    <img ref={ref} src={src} onError={_onError} style={_style} {...rest}/>
  );
});

const DEFAULT_IMAGE = '/images/picture.png';
