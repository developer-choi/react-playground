import React, {useCallback, useEffect} from 'react';
import Modal, {ModalProp} from '@component/molecules/modal/Modal';
import Button from '@component/atom/element/Button';
import {useDispatchOpenModal} from '@store/reducers/modal';
import styled from 'styled-components';
import {getDiffDate} from '@util/extend/date/date-util';
import {
  ClosedHistoryManager,
  forceClearClosedHistory,
} from '@util/extend/date/closed-history';

// URL: http://localhost:3000/solution/components/closed-history/single
export default function Page() {
  const {openModal} = useDispatchOpenModal();
  const activeApplePopupPk = manager.getActiveInClosedHistory({
    pkList: [PK],
    closePeriod: {
      value: 1,
      diffType: 'date'
    }
  });

  useEffect(() => {
    if (activeApplePopupPk) {
      openModal({
        Component: ApplePopup,
        props: {
          disableEasilyClose: false,
          closeDuringOneDay: () => manager.closeDuringSpecificPeriod(activeApplePopupPk)
        }
      });
    }
  }, [activeApplePopupPk, openModal]);

  const onClick = useCallback(() => {
    manager.addManuallyClosedHistory(PK, getDiffDate(new Date(), [0, 0, 0, -26]).getTime()); //n시간전 기록생성
    // manager.addManuallyClosedHistory(PK, getDiffDate(new Date(), [0, 0, -6]).getTime()); //n일전 기록생성
  }, []);

  return (
    <div>
      <Button onClick={onClick}>테스트용 기록생성</Button>
      <Button onClick={forceClearClosedHistory}>초기화</Button>
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

const manager = new ClosedHistoryManager();
