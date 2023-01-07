import React, {memo, useCallback, useEffect, useState} from 'react';
import type {GetServerSideProps} from 'next';
import {range} from '@util/extend/data-type/number';
import useCheckableList from '@util/custom-hooks/useCheckableList';
import styled from 'styled-components';
import CheckBox from '@component/atom/forms/CheckBox';
import moment from 'moment';
import {isMatchKeyboardEvent} from '@util/extend/browser/keyboard-event';
import Button from '@component/atom/element/Button';
import {toast} from 'react-toastify';

interface PageProp {
  mails: Mail[];
}

function pkExtractor(mail: Mail) {
  return mail.pk;
}

export default function Page({mails}: PageProp) {
  const {onChangeChecked, haveSomeChecked, toggleAllChecked, selectedList, isCheckedItem, onMultipleChecked} = useCheckableList({list: mails, pkExtractor});

  const deleteSomeMails = useCallback(() => {
    if (!haveSomeChecked) {
      return;
    }

    if (confirm('선택한 항목을 삭제하시겠습니꺼?')) {
      toast.info(selectedList.join(', ') + ' 메일이 삭제완료되었습니다.');
    }
  }, [selectedList, haveSomeChecked]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (isMatchKeyboardEvent(event, {key: 'a', specialKeys: ['ctrlKey']})) {
        toggleAllChecked();
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
  }, [toggleAllChecked, deleteSomeMails]);

  return (
    <>
      <Button onClick={toggleAllChecked}>전체선택</Button>
      <Button onClick={deleteSomeMails}>선택삭제</Button>
      <ListWrap>
        {mails.map((mail, index) => (
          <MailListItem
            key={mail.pk}
            mail={mail}
            checked={isCheckedItem(mail.pk)}
            onChangeChecked={(checked) => onChangeChecked(checked, mail.pk)}
            onMultipleChecked={() => onMultipleChecked(index)}
          />
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
  onChangeChecked: (checked: boolean) => void;
  onMultipleChecked: () => void;
}

/**
 * 단순 체크해제 체크일때는 체크한 목록 하나만 리렌더링되고 나머지 다른 목록은 렌더링되지않기위해 memo() 사용.
 */
export const MailListItem = memo(function MailListItem({mail, checked, onChangeChecked, onMultipleChecked}: MailListItemProp) {
  const {timestamp, title} = mail;
  const [important, setImportant] = useState(mail.important);

  const onChangeImportant = useCallback((checked: boolean) => {
    try {
      // Call a API and if result is success,
      setImportant(checked);

    } catch (error) {
      handleError(error);
    }
  }, []);

  return (
    <Row>
      <CheckBox onChangeChecked={onChangeChecked} checked={checked} onShiftChecked={onMultipleChecked}/>
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
