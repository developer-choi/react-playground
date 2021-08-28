import React, {useCallback, useState} from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import CheckBox from '@components/atom/CheckBox';
import {Button} from '@components/atom/button/button-presets';
import {toast} from 'react-toastify';
import useCheckableList from '../../../../src/utils/custom-hooks/useCheckableList';
import {range} from '../../../../src/utils/extend/number';
import type {GetServerSideProps} from 'next';

type PageProp = TermsOfUseProp & MailListProp;

export default function CheckableListPage({mails, terms}: PageProp) {
  return (
      <>
        <Head>
          <title>checkable-list</title>
        </Head>
        <GridContainer>
          <LegacyTermsOfUse terms={terms}/>
          <NewTermsOfUse terms={terms}/>
          <LegacyMailList mails={mails}/>
          <NewMailList mails={mails}/>
        </GridContainer>
      </>
  );
};

interface Mail {
  pk: number;
  title: string;
  content: string;
}

interface TermsOfUse {
  pk: number;
  content: string;
  required: boolean;
}

export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  const terms: TermsOfUse[] = range(1, 10).map(value => {
    const required = value % 2 === 0;
    return {
      pk: value,
      required,
      content: `약관${value} ${required ? '(필수)' : ''}`
    };
  });
  
  const mails: Mail[] = range(1, 10).map(value => ({
    pk: value,
    important: value % 2 === 0,
    title: `메일제목${value}`,
    content: `메일내용${value}`,
  }));
  
  return {
    props: {
      terms, mails
    }
  };
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 40px;
  padding: 30px;
`;

const GridItem = styled.div`

`;

const ListItem = styled.div`
  display: flex;
`;

interface TermsOfUseProp {
  terms: TermsOfUse[];
}

// 배열에 checked property를 추가해서 만드는 방식
function LegacyTermsOfUse({terms}: TermsOfUseProp) {
  
  // 단점1. initialState 작성할 때 배열 한번 순회해서 checked property를 만들어야함.
  const [checkableTerms, setCheckableTerms] = useState<(TermsOfUse & { checked: boolean; })[]>(() => {
    return terms.map(term => ({...term, checked: false}));
  });
  
  /**
   * 단점2. CheckableList에서 가장많이 이루어지는 작업은 목록 하나를 체크하거나 체크해제하는 비용이 아래 방법보다 높음.
   * 이 단점을 무마하기 위해서 추가적인 코딩이 들어가야함. (index, targetIndex가 같으면 바꾸고 나머지 뒷부분은 더이상 순회하지 않는다거나 등)
   * 결과적으로 코드가 아래 방법보다 길어짐.
   */
  const onChangeChecked = useCallback((targetIndex: number, checked: boolean) => {
    setCheckableTerms(prevState => prevState.map((term, index) => {
      if (targetIndex === index) {
        return {
          ...term,
          checked
        };
      } else {
        return term;
      }
    }));
  }, []);
  
  // 단점3. CheckableList는 대체로 페이징처리가 되어있음. (메일목록 쪽지목록 등) 이 경우 페이지가 바뀌면 목록이 바뀌는데 이 때 또다시 checked property를 추가해야함.
  // useEffect(() => {
  //   setCheckableTerms(terms.map(term => ({...term, checked: false})));
  // }, [terms]);
  
  const selectAll = useCallback(() => {
    setCheckableTerms(prevState => prevState.every(({checked}) => checked) ? prevState : prevState.map(term => ({
      ...term,
      checked: true
    })));
  }, []);
  
  const isSelectRequiredAll = checkableTerms.every(({checked, required}) => !required || checked);
  
  const onSubmit = useCallback(() => {
    if (!isSelectRequiredAll) {
      toast.error('필수 약관을 모두 동의해주셔야합니다.');
    } else {
      toast.info('약관 체크 통과');
    }
  }, [isSelectRequiredAll]);
  
  return (
      <GridItem>
        <Button onClick={selectAll}>전체선택</Button>
        {checkableTerms.map(({checked, pk, content}, index) => (
            <ListItem key={pk}>
              <CheckBox onChangeChecked={(checked) => onChangeChecked(index, checked)} label={content} checked={checked}/>
            </ListItem>
        ))}
        <Button onClick={onSubmit}>회원가입 진행</Button>
      </GridItem>
  );
}

function termPkExtractor(term: TermsOfUse) {
  return term.pk;
}

function NewTermsOfUse({terms}: TermsOfUseProp) {
  const {checkedList, onChangeChecked, selectAll} = useCheckableList({list: terms, pkExtractor: termPkExtractor});
  
  const isSelectRequiredAll = terms.every(term => !term.required || checkedList.includes(term.pk));
  
  const onSubmit = useCallback(() => {
    if (!isSelectRequiredAll) {
      toast.error('필수 약관을 모두 동의해주셔야합니다.');
    } else {
      toast.info('약관 체크 통과');
    }
  }, [isSelectRequiredAll]);
  
  return (
      <GridItem>
        <Button onClick={selectAll}>전체선택</Button>
        {terms.map(({content, pk}) => (
            <ListItem key={pk}>
              <CheckBox onChangeChecked={checked => onChangeChecked(checked, pk)} label={content} checked={checkedList.includes(pk)}/>
            </ListItem>
        ))}
        <Button onClick={onSubmit}>회원가입 진행</Button>
      </GridItem>
  );
}

interface MailListProp {
  mails: Mail[];
}

function LegacyMailList({mails}: MailListProp) {
  const [checkableMails, setCheckableMails] = useState<(Mail & { checked: boolean; })[]>(() => {
    return mails.map(mail => ({...mail, checked: false}));
  });
  
  const onChangeChecked = useCallback((targetIndex: number, checked: boolean) => {
    setCheckableMails(prevState => prevState.map((term, index) => {
      if (targetIndex === index) {
        return {
          ...term,
          checked
        };
      } else {
        return term;
      }
    }));
  }, []);
  
  const selectAll = useCallback(() => {
    setCheckableMails(prevState => prevState.every(({checked}) => checked) ? prevState : prevState.map(term => ({
      ...term,
      checked: true
    })));
  }, []);
  
  return (
      <GridItem>
        <Button onClick={selectAll}>전체선택</Button>
        {checkableMails.map(({checked, pk, title}, index) => (
            <ListItem key={pk}>
              <CheckBox onChangeChecked={(checked) => onChangeChecked(index, checked)} label={title} checked={checked}/>
            </ListItem>
        ))}
      </GridItem>
  );
}

function mailPkExtractor(item: Mail) {
  return item.pk;
}

function NewMailList({mails}: MailListProp) {
  const {checkedList, onChangeChecked, selectAll} = useCheckableList({list: mails, pkExtractor: mailPkExtractor});
  
  return (
      <GridItem>
        <Button onClick={selectAll}>전체선택</Button>
        {mails.map(({pk, title}) => (
            <ListItem key={pk}>
              <CheckBox onChangeChecked={checked => onChangeChecked(checked, pk)} label={title} checked={checkedList.includes(pk)}/>
            </ListItem>
        ))}
      </GridItem>
  );
}
