import {ComponentProps, JSXElementConstructor} from 'react';

type OmittedComponentProp<Tag extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Omit<ComponentProps<Tag>, 'ref'>;

declare module 'react' {
  export type DivProp = OmittedComponentProp<'div'>;
  export type ButtonProp = OmittedComponentProp<'button'>;
  export type InputProp = OmittedComponentProp<'input'>;
  export type SectionProp = OmittedComponentProp<'section'>;
  export type HeaderProp = OmittedComponentProp<'header'>;
  export type FooterProp = OmittedComponentProp<'footer'>;
  export type AsideProp = OmittedComponentProp<'aside'>;
  export type SvgProp = OmittedComponentProp<'svg'>;
  export type FieldSetProp = OmittedComponentProp<'fieldset'>;
  export type FormProp = OmittedComponentProp<'form'>;
}
