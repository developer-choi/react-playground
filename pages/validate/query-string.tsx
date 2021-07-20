import React from 'react';
import Head from 'next/head';
import type {GetServerSideProps} from 'next';
import {getYyyymmddOrDefault} from '../../src/utils/extend/query-string';
import Link from 'next/link';
import styled from 'styled-components';

interface PageProp {
  yyyymmdd: string;
}

export const getServerSideProps: GetServerSideProps<PageProp> = async ({query}) => {
  
  /**
   * 재직중인 회사에서, moment를 지양하고 직접 javascript로 유효성검증을 진행해야하다보니,
   * alphaConvertBeta() 필요하고
   * betaConvertAlpha() 필요하고
   *
   * alphaConvertBeta() 만들때도,
   * convert하다가 유효하지않으면
   * 1. throw하는 경우 있고,
   * 2. default value를 반환하는 경우 있고,
   * 3. 위의 1번과 2번같은 유효성검증을 하지않고 그냥 반환하는 경우가 있다.
   *
   * 그래서 서로 변환해야하는 데이터 한 쌍 (alpha, beta)가 생기면
   * 이에 대해 파생되는 함수가 6개씩 생긴다.
   *
   * 아래에서 사용되는 케이스는 moment로 깔끔하게 거의 대다수 대체가 되긴하지만,
   * 직접 만들어야한다면 moment 라이브러리 필요한부분만큼만 클론코딩하는게 나을듯.
   * 내가 만든 인터페이스보다는 유명한 라이브러리에서 만든 인터페이스가 더 개발자 친화적이기 떄문이니까.
   */
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
