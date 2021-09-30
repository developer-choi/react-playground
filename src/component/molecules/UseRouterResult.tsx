import React from 'react';
import {useRouter} from 'next/router';
import PropertyText from '@component/atom/PropertyText';

export default function UseRouterResult() {
  
  const {asPath, pathname, route} = useRouter();
  
  return (
      <div>
        <PropertyText>asPath = {asPath}</PropertyText>
        <PropertyText>pathname = {pathname}</PropertyText>
        <PropertyText>route = {route}</PropertyText>
      </div>
  );
}
