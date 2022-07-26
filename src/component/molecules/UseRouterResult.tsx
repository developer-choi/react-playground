import React from 'react';
import {useRouter} from 'next/router';
import PropertyText from '@component/atom/PropertyText';
import Link from 'next/link';
import styled from 'styled-components';

export default function UseRouterResult() {
  
  const {asPath, pathname, route} = useRouter();

  return (
    <div>
      {links.map(link => (
        <Link key={link} href={`/examples/use-router${link}`} passHref>
          <Anchor>{link}</Anchor>
        </Link>
      ))}
      <PropertyText>asPath = {asPath}</PropertyText>
      <PropertyText>pathname = {pathname}</PropertyText>
      <PropertyText>route = {route}</PropertyText>
    </div>
  );
}

const Anchor = styled.a`
  display: block;
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
`;

const query = '?key=value&key2=value2';
const hash = '#hash-value'

const links: string[] = [
  '/basic-use-router' + query + hash,
  '/param' + query + hash,
  '/param/123' + query + hash,
  '/param/123/abc' + query + hash,
  '/catch-all' + query + hash,
  '/catch-all/123' + query + hash,
  '/catch-all/123/123' + query + hash,
  '/catch-all-optional' + query + hash,
  '/catch-all-optional/123' + query + hash,
  '/catch-all-optional/123/abc' + query + hash,
];
