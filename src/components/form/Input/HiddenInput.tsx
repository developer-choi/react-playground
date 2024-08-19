import type {ComponentPropsWithoutRef, Ref} from 'react';
import {forwardRef} from 'react';

export default forwardRef(function HiddenInput({style, ...rest}: ComponentPropsWithoutRef<'input'>, ref: Ref<HTMLInputElement>) {
  return (
    <input ref={ref} style={{width: 0, height: 0, appearance: 'none', position: 'absolute', ...style}} {...rest}/>
  );
});
