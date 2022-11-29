import React, {useCallback, useEffect} from 'react';
import type {GetServerSideProps} from 'next';
import Link from 'next/link';
import {useRouter} from 'next/router';
import type {RegisterOptions, SubmitErrorHandler, SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import useToggle from '@util/custom-hooks/useToggle';
import {isStringInQueryThrowError} from '@util/extend/query-string';
import {range} from '@util/extend/number';
import Button from '@component/atom/button/Button';
import {useGetLoginUserPk} from '@util/services/auth/auth';
import {useLocalStorageArrayManager} from '@util/custom-hooks/local-storage';
import {myClassName} from '@util/libraries/classnames';
import styled from 'styled-components';
import {stopPropagation} from '@util/extend/event';

interface PageProp {
  searchText: string;
  list: Board[];
}

export default function Page({list, searchText}: PageProp) {
  const {value: visible, setTrue: open, setFalse: close} = useToggle(false);
  const {appendFirst, list: recentSearchList, removeByPk} = useRecentSearch();

  return (
    <Wrap onClick={close}>
      <h1>게시글 검색페이지</h1>

      <SearchForm searchText={searchText} appendFirst={appendFirst} openRecentSearch={open} closeRecentSearch={close}/>

      <RecentSearchList list={recentSearchList} removeByPk={removeByPk} visible={visible}/>

      {list.length === 0 ? null : (
        <>
          <h2>검색결과</h2>
          <ul>
            {list.map(({pk, title}) => (
              <li key={pk}>
                <Link href={`/some/board/view/${pk}`}>
                  <a>{title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </Wrap>
  );
}

export const getServerSideProps: GetServerSideProps<PageProp> = async ({query}) => {
  try {
    const searchText = isStringInQueryThrowError(query.searchText);
    const {list} = await getApi(searchText);
    
    return {
      props: {
        list,
        searchText
      }
    };
    
  } catch (error) {
    return {
      props: {
        list: [],
        searchText: ''
      }
    };
  }
};

interface SearchFormProp {
  appendFirst: (recentSearch: RecentSearch) => void;
  openRecentSearch: () => void;
  closeRecentSearch: () => void;
  searchText: string;
}

function SearchForm({appendFirst, openRecentSearch, closeRecentSearch, searchText}: SearchFormProp) {
  const {push} = useRouter();

  const {register, handleSubmit, setValue} = useForm<FormData>({
    defaultValues: {
      searchText
    }
  });

  useEffect(() => {
    setValue('searchText', searchText);
  }, [searchText, setValue]);

  const onError: SubmitErrorHandler<FormData> = useCallback(errors => {
    alert(errors.searchText?.message as string);
  }, []);

  const onSubmit: SubmitHandler<FormData> = useCallback(data => {
    push(`/examples/api/recent-search?searchText=${data.searchText}`);
    closeRecentSearch();
    appendFirst({searchText: data.searchText});
  }, [appendFirst, closeRecentSearch, push]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} onClick={stopPropagation}>
      <input placeholder="검색어를 입력해주세요." onFocus={openRecentSearch} onClick={openRecentSearch} {...register('searchText', {...OPTIONS})}/>
      <Button type="submit">제출</Button>
    </form>
  );
}

const OPTIONS: RegisterOptions = {
  required: {
    value: true,
    message: '검색어를 입력해주세요.'
  },
};

interface FormData {
  searchText: string;
}

async function getApi(searchText: string) {
  return {
    list: range(1, 10).map(value => ({
      pk: value,
      title: `${searchText}-${value}`
    } as Board))
  }; 
}

interface Board {
  pk: number;
  title: string;
}

interface RecentSearchListProp {
  visible: boolean;
  list: RecentSearch[];
  removeByPk: (pk: RecentSearch['searchText']) => void;
}

function RecentSearchList({visible, list, removeByPk}: RecentSearchListProp) {

  return (
    <RecentSearchListWrap className={myClassName({visible})}>
      <h2>최근검색어</h2>
      {list.length === 0 ?
      <p>최근검색어 목록이 없습니다.</p>
      :
      <ul>
        {list.map(({searchText}) => (
          <li key={searchText}>
            <Link href={`/examples/api/recent-search?searchText=${searchText}`}>
              <a>{searchText}</a>
            </Link>
            <button onClick={() => removeByPk(searchText)}>X</button>
          </li>
        ))}
      </ul>  
      }
    </RecentSearchListWrap>
  );
}

const Wrap = styled.div`
  height: 100%;
`;

const RecentSearchListWrap = styled.div`
  display: none;
  flex-direction: column;
  box-shadow: 0 0 10px #6e6e6e;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 300px;
  
  &.visible {
    display: flex;
  }
  
  button {
    margin-left: 20px;
    border: 1px solid black;
  }
`;

interface RecentSearch {
  searchText: string;
}

function useRecentSearch() {
  const userPk = useGetLoginUserPk();
  const key = `recent-search-${userPk ? userPk : 'not-logged-in'}`;
  const pkExtractor = useCallback(({searchText}: RecentSearch) => {
    return searchText;
  }, []);

  return useLocalStorageArrayManager({key, enableDuplicated: false, pkExtractor}, userPk !== 'initial');
}
