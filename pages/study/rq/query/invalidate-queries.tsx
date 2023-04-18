import React from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Button from '@component/atom/element/Button';
import {getCourseListApi} from '@api/course-api';

export default function Page() {
  const {data} = useQuery(['getTodo'], getApi);
  const queryClient = useQueryClient();

  const mutation = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getTodo']);
    }
  });

  return (
    <>
      {data?.list.map(({pk, title}) => (
        <div key={pk}>{title}</div>
      ))}
      <Button onClick={() => mutation.mutate({content: '나 이거 해야함'})}>Add</Button>
    </>
  );
}

async function getApi(...args: any) {
  console.log('getApi call', args);
  return getCourseListApi({page: 1});
}

async function postTodo({content}: {content: string}) {
  console.log('postTodo call', content);
}
