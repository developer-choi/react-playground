import React, {useCallback, useRef, useState} from "react";
import {range} from "@util/extend/number";
import styled from "styled-components";
import List, {ListRef} from "rc-virtual-list";
import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import Button from "@component/atom/button/Button";

export default function Page() {
  const {handleSubmit, register} = useForm<Data>();
  const [searchText, setSearchText] = useState('');
  const listRef = useRef<ListRef>(null);

  const onSubmit: SubmitHandler<Data> = (data) => {
    listRef.current?.scrollTo(0);
    setSearchText(data.searchText);
  };

  const onError: SubmitErrorHandler<Data> = (errors) => {
    console.log("errors", errors);
  };

  const list = !searchText ? BRAND_ITEMS : BRAND_ITEMS.reduce((a, b) => {
    const match = b.brands.filter(brand => brand.toLowerCase().includes(searchText.toLowerCase()));
    if (match.length === 0) {
      return a;
    }
    return a.concat({char: b.char, brands: match});
  }, [] as Brand[]);

  const scrollToAlphabet = useCallback((alphabet: string) => {
    const index = alphabets.findIndex(original => original === alphabet);
    listRef.current?.scrollTo({
      index,
      align: "top"
    });
  }, []);

  return (
    <Wrap>
      <ShortcutsWrap>
        {list.map(({char}) => char).map(alphabet => (
          <Shortcut key={alphabet} onClick={() => scrollToAlphabet(alphabet)}>{alphabet}</Shortcut>
        ))}
      </ShortcutsWrap>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <input {...register('searchText')}/>
        <Button>검색</Button>
      </Form>
      <List ref={listRef} data={list} itemHeight={1000} height={200} itemKey="char">
        {({char, brands}) => (
          <Item>
            <Char>{char}</Char>
            {brands.map(brand => (
              <BrandName key={brand}>{brand}</BrandName>
            ))}
          </Item>
        )}
      </List>;
    </Wrap>
  );
}

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

const alphabets = range("A".charCodeAt(0), "Z".charCodeAt(0)).map(value => String.fromCharCode(value));

function makeBrands(prefix: string) {
  return range(1, prefix.charCodeAt(0)).map(value => `${prefix}-${value}`);
}

interface Brand {
  char: string;
  brands: string[];
}

const BRAND_ITEMS: Brand[] = alphabets.map(alphabet => ({
  char: alphabet,
  brands: makeBrands(`${alphabet}-brand`)
}));
