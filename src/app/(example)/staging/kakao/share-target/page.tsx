import React from 'react';
import {PageServerComponentProps} from '@/types/declaration/next';

const Page = (props: PageServerComponentProps) => {
  const {pk} = props.searchParams;

  return (
    <div>
      pk = {pk}
    </div>
  );
};

export default Page;
