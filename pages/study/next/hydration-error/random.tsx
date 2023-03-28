import React, {useMemo} from 'react';
import type {GetServerSideProps} from 'next';
import {shuffleArray} from '@util/extend/random';

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
