import React from 'react';
import Head from 'next/head';
import {GetServerSideProps} from 'next';
import {getYyyymmddOrDefault} from '../../src/utils/extend/query-string';
import Link from 'next/link';
import styled from 'styled-components';

interface PageProp {
  yyyymmdd: string;
}

export const getServerSideProps: GetServerSideProps<PageProp> = async ({query}) => {
  return {
    props: {
      yyyymmdd: getYyyymmddOrDefault(query.date)
    }
  };
};

const test = ['a', '12345678', '20211515', '20210101'];

export default function QueryStringPage({yyyymmdd}: PageProp) {
  
  return (
      <>
        <Head>
          <title>querystring</title>
        </Head>
        <div>
          <ResultText>date={yyyymmdd}</ResultText>
          <LinkWrap>
            {test.map(value => (
                <Link href={`?date=${value}`} key={value}>
                  <TestLink>?date={value}</TestLink>
                </Link>
            ))}
          </LinkWrap>
        </div>
      </>
  );
}

const ResultText = styled.span`
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 18px;
`;

const LinkWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TestLink = styled.a`
  text-decoration: underline;
  
  :not(:last-child) {
    margin-bottom: 5px;
  }
`;
