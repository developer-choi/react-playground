import 'react';
import {ComponentProps} from 'react';

type OmitRefComponentType<T> = Omit<ComponentProps<T>, 'span'>

declare module 'react' {
  export type SpanProp = OmitRefComponentType<'span'>;
}
