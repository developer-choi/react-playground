import React from 'react';
import Link from 'next/link';

const links = ['./prevent-in-server', './prevent-in-server?block=false', './prevent-in-client', './prevent-in-client?block=false']

export default function EndPage() {
  return (
    links.map(link => (
      <Link key={link} prefetch={false} href={link}>
        <a>{link}</a>
      </Link>
    ))
  );
}
