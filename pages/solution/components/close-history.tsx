import React, {useCallback, useEffect} from 'react';
import Modal, {ModalProp} from '@component/molecules/modal/Modal';
import Button from '@component/atom/element/Button';
import {useDispatchOpenModal} from '@store/reducers/modal';
import styled from 'styled-components';
import {getDiffDate} from '@util/extend/date/date-util';
import {forceAddCloseHistory, forceClearAddCloseHistory, useCloseHistory} from '@util/extend/date/close-history';

export default function Page() {
  const {openModal} = useDispatchOpenModal();
  const apple = useAppleCloseHistory();

  useEffect(() => {
    if (apple.target) {
      openModal({
        Component: ApplePopup,
        props: {
          disableEasilyClose: false,
          closeDuringOneDay: apple.closeDuringSpecificPeriod
        }
      });
    }
  }, [apple.closeDuringSpecificPeriod, apple.target, openModal]);

  const onClick = useCallback(() => {
    forceAddCloseHistory(PK, getDiffDate(new Date(), [0, 0, 0, -26]).getTime()); //26시간전 기록생성
    // forceAddCloseHistory(PK, getDiffDate(new Date(), [0, 0, -1]).getTime()); //1일전 기록생성
    // forceAddCloseHistory(PK, getDiffDate(new Date(), [0, 0, -2]).getTime()); //2일전 기록생성
  }, []);

  return (
    <div>
      <Button onClick={onClick}>테스트용 기록생성</Button>
      <Button onClick={forceClearAddCloseHistory}>초기화</Button>
    </div>
  );
}

interface ApplePopupProp extends Omit<ModalProp, 'children'> {
  closeDuringOneDay: () => void;
}

function ApplePopup({closeDuringOneDay, ...rest}: ApplePopupProp) {
  const _closeDuringOneDay = useCallback(() => {
    closeDuringOneDay();
    rest.closeModal();
  }, [closeDuringOneDay, rest]);

  return (
    <Wrap {...rest}>
      <Button onClick={rest.closeModal}>그냥닫기</Button>
      <Button onClick={_closeDuringOneDay}>1일간 보지않기</Button>
    </Wrap>
  );
}

const Wrap = styled(Modal)`
  width: 300px;
  height: 200px;
  display: flex;
  align-items: flex-end;
`;

const PK = 'apple-popup';

function useAppleCloseHistory() {
  return useCloseHistory({
    pkList: [PK],
    closePeriod: {
      value: 1,
      diffType: 'date'
    },
  });
}
