import React, {useMemo} from 'react';
import type {GetServerSideProps} from 'next';
import {shuffleArray} from '@util/extend/random';

/**
 * 관리자에서 랜덤노출을 설정하면,
 * 화면에서 새로고침 할 때마다 랜덤하게 나열순서가 변경되야하는기능을 구현하다가
 * Hydration error를 겪어서 예제를 확보했음.
 */

// URL: http://localhost:3000/study/next/hydration-error/random
interface PageProp {
  nameList: string[];
  enableRandom: boolean;
}

export default function Page({nameList, enableRandom}: PageProp) {
  const result = useMemo(() => {
    if (enableRandom) {
      return shuffleArray(nameList);

    } else {
      return nameList;
    }
  }, [enableRandom, nameList]);

  return (
    <>
      {result.map(name => (
        <div key={name}>
          {name}
        </div>
      ))}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProp> = async () => {
  return {
    props: {
      nameList: NAME_LIST,
      enableRandom: true
    }
  };
};

const NAME_LIST = [
  'John',
  'Jessica',
  'Adam',
  'Aria'
];
