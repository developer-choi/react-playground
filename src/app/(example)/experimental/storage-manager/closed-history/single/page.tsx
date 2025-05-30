'use client';

import React, {useCallback, useEffect} from 'react';
import {getDiffDate} from '@/utils/extend/date/util';
import Button from '@/components/element/Button';
import {ClosedHistoryManager} from '@/utils/extend/date/closed-history';
import {ComposedModalProps, ModalContainer} from '@/components/modal/container';
import {useModal} from '@/utils/extend/modal';

/**
 * URL: http://localhost:3000/experimental/storage-manager/closed-history/single
 * Doc: https://docs.google.com/document/d/13gkrex798BO5tF2MnZOpom2HdgO3p8Eh1VUHT1NYJoI/edit#heading=h.oauybibldcx5
 */
export default function Page() {
  const {open} = useModal();
  const activeApplePopupPk = manager.getActiveInClosedHistory({
    pkList: [PK],
    closePeriod: {
      value: 1,
      diffType: 'date'
    }
  });

  useEffect(() => {
    if (activeApplePopupPk) {
      open.custom({
        Component: ApplePopup,
        props: {
          closeDuringOneDay: () => manager.closeDuringSpecificPeriod(activeApplePopupPk)
        }
      });
    }
  }, [activeApplePopupPk, open]);

  const onClick = useCallback(() => {
    manager.addManuallyClosedHistory(PK, getDiffDate(new Date(), [0, 0, 0, -26]).getTime()); //n시간전 기록생성
    // manager.addManuallyClosedHistory(PK, getDiffDate(new Date(), [0, 0, -6]).getTime()); //n일전 기록생성
  }, []);

  return (
    <Button onClick={onClick}>테스트용 기록생성</Button>
  );
}

interface ApplePopupProp extends Omit<ComposedModalProps, 'children'> {
  closeDuringOneDay: () => void;
}

function ApplePopup({closeDuringOneDay, ...rest}: ApplePopupProp) {
  const onClick = useCallback(() => {
    closeDuringOneDay();
    rest.onClose();
  }, [closeDuringOneDay, rest]);

  return (
    <ModalContainer {...rest}>
      <Button onClick={rest.onClose}>그냥닫기</Button>
      <Button onClick={onClick}>1일간 보지않기</Button>
    </ModalContainer>
  );
}

const PK = 'apple-popup';
const manager = new ClosedHistoryManager();
