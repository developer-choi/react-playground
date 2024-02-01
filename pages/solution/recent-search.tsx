import React, {useCallback, useEffect} from "react";
import type {GetServerSideProps} from "next";
import Link from "next/link";
import {useRouter} from "next/router";
import type {RegisterOptions, SubmitErrorHandler, SubmitHandler} from "react-hook-form";
import {useForm} from "react-hook-form";
import {range} from "@util/extend/data-type/number";
import Button from "@component/atom/element/Button";
import {LocalStorageArrayManager, useLocalStorageArrayManager} from "@util/extend/browser/local-storage-array";
import styled from "styled-components";
import {validateString} from "@util/extend/browser/query-string";

// URL: http://localhost:3000/solution/recent-search
interface PageProp {
  searchText: string;
  searchResult: Board[];
}

export default function Page({searchResult, searchText}: PageProp) {
  const {appendFirst, list: recentSearchList, removeByPk} = useRecentSearch();
  const {push} = useRouter();

  const onSearch = useCallback(
    (text: string) => {
      push({
        query: {
          searchText: text
        }
      });
      appendFirst({searchText: text});
    },
    [appendFirst, push]
  );

  return (
    <Wrap>
      <h1>게시글 검색페이지</h1>

      <SearchForm searchText={searchText} onSearch={onSearch} />

      <RecentSearchList list={recentSearchList} removeItem={removeByPk} />

      {searchResult.length === 0 ? null : (
        <div>
          <h2>검색결과</h2>
          <ul>
            {searchResult.map(({pk, title}) => (
              <li key={pk}>
                <Link href={`/some/board/view/${pk}`}>
                  <a>{title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Wrap>
  );
}

export const getServerSideProps: GetServerSideProps<PageProp> = async ({query}) => {
  try {
    const searchText = validateString(query.searchText);
    const {list} = await getApi(searchText);

    return {
      props: {
        searchResult: list,
        searchText
      }
    };
  } catch (error) {
    return {
      props: {
        searchResult: [],
        searchText: ""
      }
    };
  }
};

interface SearchFormProp {
  onSearch: (text: string) => void;
  searchText: string;
}

function SearchForm({onSearch, searchText}: SearchFormProp) {
  const {register, handleSubmit, setValue} = useForm<FormData>({
    defaultValues: {
      searchText
    }
  });

  useEffect(() => {
    setValue("searchText", searchText);
  }, [searchText, setValue]);

  const onError: SubmitErrorHandler<FormData> = useCallback((errors) => {
    alert(errors.searchText?.message as string);
  }, []);

  const onSubmit: SubmitHandler<FormData> = useCallback(
    (data) => {
      onSearch(data.searchText);
    },
    [onSearch]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input placeholder="검색어를 입력해주세요." autoComplete="off" {...register("searchText", {...OPTIONS})} />
      <Button type="submit">제출</Button>
    </form>
  );
}

const OPTIONS: RegisterOptions = {
  required: {
    value: true,
    message: "검색어를 입력해주세요."
  }
};

interface FormData {
  searchText: string;
}

async function getApi(searchText: string) {
  return {
    list: range(1, 10).map(
      (value) =>
        ({
          pk: value,
          title: `${searchText}-${value}`
        }) as Board
    )
  };
}

interface Board {
  pk: number;
  title: string;
}

interface RecentSearchListProp {
  list: RecentSearch[];
  removeItem: (pk: RecentSearch["searchText"]) => void;
}

function RecentSearchList({list, removeItem}: RecentSearchListProp) {
  return (
    <RecentSearchListWrap>
      <h2>최근검색어</h2>
      {list.length === 0 ? (
        <p>최근검색어 목록이 없습니다.</p>
      ) : (
        <ul>
          {list.map(({searchText}) => (
            <li key={searchText}>
              <Link href={`/solution/recent-search?searchText=${searchText}`}>
                <a>{searchText}</a>
              </Link>
              <button type="button" onClick={() => removeItem(searchText)}>
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </RecentSearchListWrap>
  );
}

const Wrap = styled.div`
  height: 100%;
`;

const RecentSearchListWrap = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px #6e6e6e;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px;

  button {
    margin-left: 20px;
    border: 1px solid black;
  }
`;

interface RecentSearch {
  searchText: string;
}

const manager = new LocalStorageArrayManager({
  key: "recent-search",
  enableDuplicated: false,
  pkExtractor: ({searchText}: RecentSearch) => {
    return searchText;
  }
});

export function useRecentSearch() {
  return useLocalStorageArrayManager(manager);
}
