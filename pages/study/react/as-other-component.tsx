import React, {ComponentType} from 'react';

export default function AsOtherComponentPage() {
  return (
    <>
      <AsOtherComponent/>
      <AsOtherComponent as="a"/>
      <AsOtherComponent as={OtherComponent}/>
    </>
  );
}

interface AsOtherComponentProps {
  as?: keyof JSX.IntrinsicElements | ComponentType;
}

function AsOtherComponent({as: AsComponent = 'div', ...rest}: AsOtherComponentProps) {
  return (
    <AsComponent {...rest}/>
  );
}

function OtherComponent(props: any) {
  return (
    <div {...props}/>
  );
}
