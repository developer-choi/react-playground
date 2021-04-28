import React from 'react';
import PropertyText from '@components/atom/PropertyText';
import {Story} from '@storybook/react';
import {SpanProp} from '@components/basic/Span';

export default {
  component: PropertyText,
  title: 'atom/PropertyText'
};

const Template = (props: SpanProp) => (
    <PropertyText {...props}/>
);

export const Default: Story<SpanProp> = Template.bind({});
Default.args = {
  children: 'Hello World'
};
