import React, {memo, useCallback, useEffect, useRef} from 'react';
import Head from 'next/head';
import type {GetServerSideProps} from 'next';
import {range} from '@util/extend/number';
import useCheckableList from '@util/custom-hooks/useCheckableList';
import styled from 'styled-components';
import CheckBox from '@component/atom/CheckBox';
import moment from 'moment';
import {isMatchKeyboardEvent} from '@util/extend/keyboard-event';
import {Button} from '@component/atom/button/button-presets';
import {toast} from 'react-toastify';
import {useState} from 'react';

interface PageProp {
  mails: Mail[];
}

function pkExtractor(mail: Mail) {
  return mail.pk;
}

export default function MailListPage({mails}: PageProp) {
  const {onChangeChecked, checkedList, selectAll, onMultipleChecked} = useCheckableList({list: mails, pkExtractor});
  const haveSomeChecked = checkedList.length > 0;
  const latestCheckedRef = useRef<number | null>(null);
  
  const _onChangeChecked = useCallback((checked: boolean, mailPk: number, index: number) => {
    onChangeChecked(checked, mailPk);
    latestCheckedRef.current = index;
  }, [onChangeChecked]);
  
  const deleteSomeMails = useCallback(() => {
    if (!haveSomeChecked) {
      return;
    }
    
    if (confirm('선택한 항목을 삭제하시겠습니꺼?')) {
      toast.info(checkedList.join(', ') + ' 쪽지가 삭제완료되었습니다.');
    }
  }, [checkedList, haveSomeChecked]);
  
  const _onMultipleChecked = useCallback((index: number) => {
    const latestIndex = latestCheckedRef.current;
  
    if (latestIndex === null) {
      return;
    }
    
    const [startIndex, endIndex] = latestIndex < index ? [latestIndex, index] : [index, latestIndex];
    
    const multipleChecks = mails.slice(startIndex, endIndex).map(mail => mail.pk);
    onMultipleChecked(multipleChecks);
  }, [mails, onMultipleChecked]);
  
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (isMatchKeyboardEvent(event, {key: 'a', matchKeys: ['ctrlKey']})) {
        selectAll();
        toast.info('전체 목록이 선택되었습니다.');
        event.preventDefault();
      }
  
      if (isMatchKeyboardEvent(event, {key: 'Delete'})) {
        deleteSomeMails();
        event.preventDefault();
      }
    };
  
    window.addEventListener('keydown', handler);
  
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [selectAll, deleteSomeMails]);
  
  return (
      <>
        <Head>
          <title>mail</title>
        </Head>
        <Button onClick={selectAll}>전체선택</Button>
        <Button onClick={deleteSomeMails}>선택삭제</Button>
        <ListWrap>
          {mails.map((mail, index) => (
              <MailListItem key={mail.pk} index={index} mail={mail} checked={checkedList.includes(mail.pk)} onChangeChecked={_onChangeChecked} onMultipleChecked={_onMultipleChecked}/>
          ))}
        </ListWrap>
      </>
  );
};

interface Mail {
  pk: number;
  important: boolean;
  title: string;
  timestamp: number;
}

const DUMMY_MAILS = range(1, 10).map(value => ({
  pk: value,
  title: `메일제목${value} `.repeat(5),
  important: value % 2 === 0,
  timestamp: new Date(2021, 12 - value, 10, 24 - value).getTime()
}));

export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  return {
    props: {
      mails: DUMMY_MAILS
    }
  };
};

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  row-gap: 20px;
`;

export interface MailListItemProp {
  mail: Mail;
  checked: boolean;
  onChangeChecked: (checked: boolean, mailPk: number, index: number) => void;
  onMultipleChecked: (index: number) => void;
  index: number;
}

/**
 * 단순 체크해제 체크일때는 체크한 목록 하나만 리렌더링되고 나머지 다른 목록은 렌더링되지않기위해 memo() 사용.
 */
export const MailListItem = memo(function MailListItem({mail, checked, onChangeChecked, onMultipleChecked, index}: MailListItemProp) {
  const {pk, timestamp, title} = mail;
  const [important, setImportant] = useState(mail.important);
  
  const _onChangeChecked = useCallback((checked: boolean) => {
    onChangeChecked(checked, pk, index);
  }, [onChangeChecked, pk, index]);
  
  const onChangeImportant = useCallback((checked: boolean) => {
    try {
      // Call a API and if result is success,
      setImportant(checked);
      
    } catch (error) {
      handleError(error);
    }
  }, []);
  
  const _onMultipleChecked = useCallback(() => {
    onMultipleChecked(index);
  }, [onMultipleChecked, index]);
  
  return (
      <Row>
        <CheckBox onChangeChecked={_onChangeChecked} checked={checked} onShiftChecked={_onMultipleChecked}/>
        <CheckBox className="important-checkbox" onChangeChecked={onChangeImportant} checked={important}/>
        <Title>{title}</Title>
        <DateText>{moment(timestamp).format('YYYY.MM.DD HH:mm:ss')}</DateText>
      </Row>
  );
});

function handleError(error: any) {
  console.error(error);
}

const Row = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  
  .important-checkbox {
    input {
      appearance: none;
    }
    
    ::before {
      content: '';
      background-image: url("/images/important-inactive.svg");
      background-repeat: no-repeat;
      background-size: contain;
      width: 18px;
      height: 18px;
    }
    
    &.checked::before {
      background-image: url("/images/important-active.svg");
    }
  }
`;

const Title = styled.span`

`;

const DateText = styled.span`
  color: gray;
  font-size: 12px;
`;
