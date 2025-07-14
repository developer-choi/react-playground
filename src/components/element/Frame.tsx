import {ComponentPropsWithoutRef, ElementType} from 'react';

export type FrameProps<E extends ElementType = 'div'> = ComponentPropsWithoutRef<E> & {as?: E};

export default function Frame<E extends ElementType = 'div'>({as, ...rest}: FrameProps<E>) {
  const Component = as || 'div';
  return (
    <Component {...rest}>
      Hello World
    </Component>
  );
}
