import React, {useCallback, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import List, {ListRef} from 'rc-virtual-list';
import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form';
import Button from '@component/atom/element/Button';
import type {GetServerSideProps} from 'next';
import type {Brand} from '@type/response-sub/brand-sub';
import {parseBrandList} from '@util/services/brand';
import {handleServerSideError} from '@util/services/handle-error/server-side-error';
import BrandApi from '@api/BrandApi';

interface PageProp {
  brandList: Brand[];
}

export default function Page({brandList}: PageProp) {
  const {handleSubmit, register} = useForm<Data>();
  const [searchText, setSearchText] = useState('');
  const listRef = useRef<ListRef>(null);

  const onSubmit: SubmitHandler<Data> = (data) => {
    listRef.current?.scrollTo(0);
    setSearchText(data.searchText);
  };

  const onError: SubmitErrorHandler<Data> = (errors) => {
    console.log('errors', errors);
  };

  const {brandListWithCharList, charList} = useMemo(() => parseBrandList(brandList, searchText), [brandList, searchText]);

  const scrollToAlphabet = useCallback((alphabet: string) => {
    const index = charList.findIndex(original => original === alphabet);
    listRef.current?.scrollTo({
      index,
      align: 'top'
    });
  }, [charList]);

  return (
    <Wrap>
      <ShortcutsWrap>
        {brandListWithCharList.map(({char}) => char).map(alphabet => (
          <Shortcut key={alphabet} onClick={() => scrollToAlphabet(alphabet)}>{alphabet}</Shortcut>
        ))}
      </ShortcutsWrap>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <input {...register('searchText')}/>
        <Button>검색</Button>
      </Form>
      <List ref={listRef} data={brandListWithCharList} itemHeight={1000} height={200} itemKey="char">
        {({char, brandList}) => (
          <Item>
            <Char>{char}</Char>
            {brandList.map(brand => (
              <BrandName key={brand.pk}>{brand.name}</BrandName>
            ))}
          </Item>
        )}
      </List>
    </Wrap>
  );
}

export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  const api = new BrandApi();

  try {
    const {data: {list}} = await api.getList();

    return {
      props: {
        brandList: list
      }
    };

  } catch (error) {
    return handleServerSideError(error);
  }
};

const ShortcutsWrap = styled.div`
  
`;

const Shortcut = styled.button`
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
`;

interface Data {
  searchText: string;
}

const Wrap = styled.div`
`;

const Item = styled.div`

`;

const Char = styled.div`
  background: red;
  height: 20px;
`;

const BrandName = styled.div`
  background: lightcoral;
  height: 16px;
  border: 1px solid black;
`;
