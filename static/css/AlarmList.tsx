import React, {ComponentProps, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import {Alarm, removeAlarm as deleteAlarm} from '../store/modules/alarm';
import {usePrevious} from '../utils/custom-hooks/usePrevious';

export interface AlarmListProp extends Omit<ComponentProps<'div'>, 'ref'> {
  list: Alarm[];
  removeAlarm: typeof deleteAlarm;
}

export default function AlarmList({list, removeAlarm, ...rest}: AlarmListProp) {

  const prevListLength = usePrevious(list.length);

  useEffect(() => {

    if (list.length > (prevListLength ?? 0)) {

      console.log('effect-call', list.length);
      setTimeout(() => {
        console.log('remove Alarm call');
        removeAlarm();
      }, DURATION * 1000);
    }

  }, [prevListLength, removeAlarm, list]);

  console.log(list);

  return (
      <Wrap {...rest}>
        {list.map(({content}, index) => (
            <AlarmItem className="alarm-item" key={`alarm-${index}`}>{content}</AlarmItem>
        ))}
      </Wrap>
  );
}

const DURATION = 4;
const MOVE_DOWN_HEIGHT = 70;
const RIGHT = 100;
const WIDTH = 300;

const Wrap = styled.div`
  position: fixed;
  right: 100px;
  top: 100px;
  min-height: 300px;
  width: ${WIDTH}px;
`;

const show = keyframes`
  0% {
    opacity: 0;
  }
  
  70% {
    opacity: 1;
    transform: translateY(${MOVE_DOWN_HEIGHT}px);
  }
  
  90% {
    transform: translate(${RIGHT + WIDTH}px, ${MOVE_DOWN_HEIGHT}px);
  }
  
  100% {
    width: 100%;
    transform: translate(${RIGHT + WIDTH}px, ${MOVE_DOWN_HEIGHT}px);
  }
`;

const AlarmItem = styled.div`
  animation: ${show} ${DURATION}s forwards;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.18) 0 0 10px 0;
  
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
