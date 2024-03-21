import React, {useCallback, useEffect} from 'react';
import {useDispatchOpenModal} from '@store/reducers/modal';
import {ClosedHistoryManager} from '@util/extend/date/closed-history';
import {getDiffDate} from '@util/extend/date/date-util';
import Button from '@component/atom/element/Button';
import Modal, {ModalProp} from '@component/molecules/modal/Modal';
import styled from 'styled-components';
import {useQuery} from '@tanstack/react-query';

// URL: http://localhost:3000/solution/components/closed-history/multiple
export default function Page() {
  const {openModal} = useDispatchOpenModal();
  const activeEventPopupData = useActiveEventPopupInClosedHistory();

  useEffect(() => {
    if (activeEventPopupData) {
      openModal({
        Component: EventPopup,
        props: {
          disableEasilyClose: false,
          data: activeEventPopupData,
          closeDuringOneDay: () => manager.closeDuringSpecificPeriod(activeEventPopupData.pk)
        }
      });
    }
  }, [activeEventPopupData, openModal]);

  const onClick = useCallback(() => {
    manager.addManuallyClosedHistory(2, getDiffDate(new Date(), [0, 0, 0, -1]).getTime()); //n시간전 기록 강제생성
    // manager.addManuallyClosedHistory('special-event-1', getDiffDate(new Date(), [0, 0, -1]).getTime()); //n일전 기록생성
  }, []);

  return (
    <Button onClick={onClick}>테스트용 기록생성</Button>
  );
}

interface EventPopupProp extends Omit<ModalProp, 'children'> {
  closeDuringOneDay: () => void;
  data: SpecialEvent;
}

function EventPopup({closeDuringOneDay, data, ...rest}: EventPopupProp) {
  const _closeDuringOneDay = useCallback(() => {
    closeDuringOneDay();
    rest.closeModal();
  }, [closeDuringOneDay, rest]);

  return (
    <Wrap {...rest}>
      <Title>{data.name}</Title>
      <div>
        <Button onClick={rest.closeModal}>그냥닫기</Button>
        <Button onClick={_closeDuringOneDay}>1일간 보지않기</Button>
      </div>
    </Wrap>
  );
}

const Wrap = styled(Modal)`
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 20px;
`;

const manager = new ClosedHistoryManager('some-special-event2');

function useActiveEventPopupInClosedHistory() {
  const {data} = useQuery({
    queryKey: ['event-popup-in-closed-history'],
    queryFn: () => getSpecialEventListApi(),
    refetchOnWindowFocus: false
  });

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
