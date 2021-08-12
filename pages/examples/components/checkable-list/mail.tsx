import React, {memo} from 'react';
import Head from 'next/head';
import type {GetServerSideProps} from 'next';
import {getNumberArray} from '../../../../src/utils/extend/number';
import useCheckableList, {UseCheckableListResult} from '../../../../src/utils/custom-hooks/useCheckableList';
import styled from 'styled-components';
import CheckBox from '@components/atom/CheckBox';
import moment from 'moment';
import {isMatchKeyboardEvent} from '../../../../src/utils/extend/keyboard-event';
import { Button } from '@components/atom/button/button-presets';
import {toast} from 'react-toastify';

interface PageProp {
  mails: Mail[];
}

function pkExtractor(mail: Mail) {
  return mail.pk;
}

export default function MailListPage({mails}: PageProp) {
  const {onChangeChecked, checkedList, selectAll} = useCheckableList({list: mails, pkExtractor});
  const haveSomeChecked = checkedList.length > 0;
  
  const deleteSomeMails = React.useCallback(() => {
    if (!haveSomeChecked) {
      return;
    }
    
    if (confirm('선택한 항목을 삭제하시겠습니꺼?')) {
      toast.info(checkedList.join(', ') + ' 쪽지가 삭제완료되었습니다.');
    }
  }, [checkedList, haveSomeChecked]);
  
  React.useEffect(() => {
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
          {mails.map(mail => (
              <MailListItem key={mail.pk} mail={mail} checked={checkedList.includes(mail.pk)} onChangeChecked={onChangeChecked}/>
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

const DUMMY_MAILS = getNumberArray(1, 10).map(value => ({
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
  onChangeChecked: UseCheckableListResult<Mail>['onChangeChecked'];
}

/**
 * 단순 체크해제 체크일때는 체크한 목록 하나만 리렌더링되고 나머지 다른 목록은 렌더링되지않기위해 memo() 사용.
 */
export const MailListItem = memo(function MailListItem({mail, checked, onChangeChecked}: MailListItemProp) {
  const {pk, timestamp, title} = mail;
  const [important, setImportant] = React.useState(mail.important);
  
  const _onChangeChecked = React.useCallback((checked: boolean) => {
    onChangeChecked(checked, pk)
  }, [onChangeChecked, pk]);
  
  const onChangeImportant = React.useCallback((checked: boolean) => {
    try {
      // Call a API and if result is success,
      setImportant(checked);
      
    } catch (error) {
      handleError(error);
    }
  }, []);
  
  return (
      <Row>
        <CheckBox onChangeChecked={_onChangeChecked} checked={checked}/>
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
