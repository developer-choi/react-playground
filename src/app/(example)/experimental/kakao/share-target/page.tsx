import React from 'react';
import {ServerComponentProps} from '@/types/declaration/next';

const Page = (props: ServerComponentProps) => {
  const {pk} = props.searchParams;

  return (
    <div>
      pk = {pk}
    </div>
  );
};

export default Page;
