import React from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import CourseApi from '@api/CourseApi';
import {Button} from '@component/atom/button/button-presets';

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
      {data?.data?.list.map(({pk, title}) => (
        <div key={pk}>{title}</div>
      ))}
      <Button onClick={() => mutation.mutate({content: '나 이거 해야함'})}>Add</Button>
    </>
  );
}

async function getApi(...args: any) {
  console.log('getApi call', args);
  const courseApi = new CourseApi();
  return courseApi.getList(1, {});
}

async function postTodo({content}: {content: string}) {
  console.log('postTodo call', content);
}
