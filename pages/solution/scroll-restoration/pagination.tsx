import React from "react";
import BasicPagination from "@component/molecules/pagination/BasicPagination";
import {range} from "@util/extend/data-type/number";
import {timeoutPromise} from "@util/extend/test";
import {dehydrate, DehydratedPageProps, QueryClient, useQuery} from "@tanstack/react-query";
import type {GetServerSideProps} from "next";
import styled from "styled-components";
import {flexCenter} from "@util/services/style/css";
import {useScrollRestoration} from "@util/extend/scroll-restoration";
import Link from "next/link";
import {validateNumber} from "@util/extend/browser/query-string";
import {handleServerSideError} from "@util/services/handle-error/server-side-error";

interface PageProp {
  page: number;
}

// URL: http://localhost:3000/solution/scroll-restoration/pagination?page=1
export default function Page({page}: PageProp) {
  useScrollRestoration();

  const {data} = useExampleQuery(page);

  if (!data) {
    return null;
  }

  const half = data.list.slice(0, MAX_ARTICLE_PER_PAGE / 2);
  const rest = data.list.slice(MAX_ARTICLE_PER_PAGE / 2, MAX_ARTICLE_PER_PAGE);

  return (
    <>
      <BasicPagination linkProps={{replace: true}} currentPage={page} methods="defaultPageToHref" total={data.total} config={{pagePerView: 5, articlePerPage: MAX_ARTICLE_PER_PAGE}} />

      {half.map(({pk, title}) => (
        <Row key={pk}>{title}</Row>
      ))}

      <Link href="/" passHref>
        <Row as="a">메인페이지로 가는 링크</Row>
      </Link>

      {rest.map(({pk, title}) => (
        <Row key={pk}>{title}</Row>
      ))}

      <BasicPagination currentPage={page} methods="defaultPageToHref" total={data.total} config={{pagePerView: 5, articlePerPage: MAX_ARTICLE_PER_PAGE}} />
    </>
  );
}

const Row = styled.div`
  border: 5px solid blue;
  height: 200px;
  ${flexCenter};
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const getServerSideProps: GetServerSideProps<DehydratedPageProps & PageProp> = async ({query}) => {
  const queryClient = new QueryClient();

  try {
    const page = validateNumber(query.page);

    await queryClient.prefetchQuery({
      queryKey: ["my-solution/pagination", page],
      queryFn: () => getApi(page)
    });

    return {
      props: {
        page,
        dehydratedState: dehydrate(queryClient)
      }
    };
  } catch (error) {
    return handleServerSideError(error, {
      notifyRedirect: {
        destination: "/solution/scroll-restoration/pagination?page=1"
      }
    });
  }
};

const MAX_ARTICLE_PER_PAGE = 10;

function useExampleQuery(page: number) {
  return useQuery({
    queryKey: ["my-solution/pagination", page],
    queryFn: () => getApi(page),
    keepPreviousData: true,
    staleTime: 1000
  });
}

async function getApi(page: number) {
  await timeoutPromise(500);

  const list = range(MAX_ARTICLE_PER_PAGE * (page - 1) + 1, MAX_ARTICLE_PER_PAGE * page).map((value) => ({
    pk: value,
    title: `${value}-title`
  }));

  return {
    list,
    total: 100
  };
}
