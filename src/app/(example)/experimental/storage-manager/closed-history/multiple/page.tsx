'use client';

import React, {useCallback, useEffect, useState} from 'react';
import {ComposedModalProps, ModalContainer} from '@/components/modal/container';
import {useModal} from '@/utils/extend/modal';
import {getDiffDate} from '@forworkchoe/core/utils';
import {Button} from '@forworkchoe/core';
import {ClosedHistoryManager} from '@/utils/extend/date/closed-history';

/**
 * URL: http://localhost:3000/experimental/storage-manager/closed-history/multiple
 * Doc: https://docs.google.com/document/d/13gkrex798BO5tF2MnZOpom2HdgO3p8Eh1VUHT1NYJoI/edit#heading=h.oauybibldcx5
 */
export default function Page() {
  const {open} = useModal();
  const activeEventPopupData = useActiveEventPopupInClosedHistory();
  const [someOpened, setSomeOpened] = useState(false);

  useEffect(() => {
    if (!someOpened && activeEventPopupData) {
      setSomeOpened(true);
      open.custom({
        Component: EventPopup,
        props: {
          data: activeEventPopupData,
          closeDuringOneDay: () => manager.closeDuringSpecificPeriod(activeEventPopupData.pk)
        }
      });
    }
  }, [activeEventPopupData, open, someOpened]);

  const onClick = useCallback(() => {
    manager.addManuallyClosedHistory(2, getDiffDate(new Date(), [0, 0, 0, -1]).getTime()); //n시간전 기록 강제생성
    // manager.addManuallyClosedHistory('special-event-1', getDiffDate(new Date(), [0, 0, -1]).getTime()); //n일전 기록생성
  }, []);

  return (
    <Button onClick={onClick}>테스트용 기록생성</Button>
  );
}

interface EventPopupProp extends Omit<ComposedModalProps, 'children'> {
  closeDuringOneDay: () => void;
  data: SpecialEvent;
}

function EventPopup({closeDuringOneDay, data, ...rest}: EventPopupProp) {
  const onClick = useCallback(() => {
    closeDuringOneDay();
    rest.onClose();
  }, [closeDuringOneDay, rest]);

  return (
    <ModalContainer {...rest}>
      <span style={{fontSize: 20}}>{data.name}</span>
      <div>
        <Button onClick={rest.onClose}>그냥닫기</Button>
        <Button onClick={onClick}>1일간 보지않기</Button>
      </div>
    </ModalContainer>
  );
}

const manager = new ClosedHistoryManager('some-special-event2');

/**
 * TODO 이만큼의 코드가 대부분 중복될거같은데 이 hooks 자체를 closed-history에 추가해야할듯.
 * 어느 페이지를 가건 이벤트 팝업 기획전팝업 기타 팝업 어드민팝업 무슨팝업 할 때마다
 * 데이터 불러오고 find로 뒤져서 띄울 팝업 반환하는게 다 동일할거같음.
 */
function useActiveEventPopupInClosedHistory() {
  const [data, setData] = useState<SpecialEvent[]>();

  useEffect(() => {
    getSpecialEventListApi().then(result => {
      setData(result);
    });
  }, []);

  if (!data) {
    return undefined;
  }

  const activePk = manager.getActiveInClosedHistory({
    pkList: data.map(event => event.pk),
    closePeriod: {
      value: 1,
      diffType: 'date'
    }
  });

  if (activePk) {
    return data.find(({pk}) => pk === activePk);
  }
}

interface SpecialEvent {
  pk: number;
  name: string;
}

async function getSpecialEventListApi() {
  const response: SpecialEvent[] = [
    {
      pk: 1,
      name: '할인율 10% 이벤트'
    },
    {
      pk: 2,
      name: '할인율 20% 이벤트'
    },
  ];

  return response;
}
