import React, {useCallback} from "react";
import type {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import type {SubmitHandler} from "react-hook-form";
import {useForm} from "react-hook-form";
import Button from "@component/atom/element/Button";
import {disassemble} from "hangul-js";

interface PageProp {
  searchText: string;
  searchResult: string[];
}

export default function Page({searchText, searchResult}: PageProp) {
  const {push} = useRouter();
  const {register, handleSubmit} = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = useCallback(
    (data) => {
      push({
        query: {
          searchText: data.searchText
        }
      });
    },
    [push]
  );

  const keyword = searchText.length === 0 ? "" : disassemble(searchText)[0];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("searchText")} />
        <Button type="submit">제출</Button>
      </form>
      <div>keyword: {keyword}</div>
      <div>
        {searchResult.map((value) => (
          <span key="some-key">{value}</span>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProp> = async ({query}) => {
  const searchText = (query.searchText as string) ?? "";
  const {list} = await getSearchResultApi();

  return {
    props: {
      searchText,
      searchResult: list
    }
  };
};

async function getSearchResultApi() {
  return {
    list: [] as string[]
  };
}

interface Data {
  searchText: string;
}
