import {ComponentPropsWithoutRef, forwardRef, Ref, SyntheticEvent, useCallback} from 'react';

export interface ImgProp extends Omit<ComponentPropsWithoutRef<'img'>, 'onError'> {
  errorSrc?: string;
}

export default forwardRef(function Img({errorSrc, src, ...rest}: ImgProp, ref: Ref<HTMLImageElement>) {
  const _onError = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    if (errorSrc) {
      // eslint-disable-next-line no-param-reassign
      (event.target as HTMLImageElement).src = errorSrc;
    }
  }, [errorSrc]);
  
  return (
    <img ref={ref} src={src} onError={_onError} {...rest}/>
  );
});
