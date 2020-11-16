import {ComponentProps, JSXElementConstructor} from 'react';

type OmitedComponentProp<Tag extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Omit<ComponentProps<Tag>, 'ref'>;

export type DivProp = OmitedComponentProp<'div'>;
export type ButtonProp = OmitedComponentProp<'button'>;
export type InputProp = OmitedComponentProp<'input'>;
export type SectionProp = OmitedComponentProp<'section'>;
export type HeaderProp = OmitedComponentProp<'header'>;
export type FooterProp = OmitedComponentProp<'footer'>;
export type AsideProp = OmitedComponentProp<'aside'>;
export type SvgProp = OmitedComponentProp<'svg'>;
export type FieldSetProp = OmitedComponentProp<'fieldset'>;
export type FormProp = OmitedComponentProp<'form'>;
