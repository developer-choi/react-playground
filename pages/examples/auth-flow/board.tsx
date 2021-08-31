import React from 'react';
import { getServerSidePropsTemplate } from '../../../src/utils/api/server-side-error';
import BoardApi from '../../../src/api/BoardApi';

interface PageProp {
  board: {
    title: string;
  }
}

const Page = () => {
  return (
    <div>
      board Page
    </div>
  );
};

export const getServerSideProps = getServerSidePropsTemplate<PageProp>(async () => {
  const api = new BoardApi();
  
  //TODO 이거 전부 다 ServerSideError를 throw 하도록 감싸야하는데, 이부분 때문에 코드가 많이늘어나서 오히려 getServerSidePropsTemplate()을 이용하는게 손해임.
  const { title } = (await api.api1()).data;
  await api.api2();
  await api.api3();
  
  return {
    props: {
      board: {
        title
      }
    }
  };
});

export default Page;
