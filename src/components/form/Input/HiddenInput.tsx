import {ComponentPropsWithoutRef, ForwardedRef, forwardRef} from 'react';

export default forwardRef(function HiddenInput({style, ...rest}: ComponentPropsWithoutRef<'input'>, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <input ref={ref} style={{width: 0, height: 0, appearance: 'none', position: 'absolute', ...style}} {...rest}/>
  );
});
