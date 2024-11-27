import {ComponentPropsWithoutRef, forwardRef} from 'react';

export type HiddenInputProps = ComponentPropsWithoutRef<'input'>;

export default forwardRef<HTMLInputElement, HiddenInputProps>(function HiddenInput({style, ...rest}, ref) {
  return (
    <input ref={ref} style={{width: 0, height: 0, appearance: 'none', position: 'absolute', ...style}} {...rest}/>
  );
});
