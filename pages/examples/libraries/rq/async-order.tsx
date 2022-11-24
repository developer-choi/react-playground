import React from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import CourseApi from '@api/CourseApi';
import Button from '@component/atom/button/Button';
import {timeoutPromise} from '@util/extend/promise';

export default function Page() {
  const {data} = useQuery(['getTodo'], getCourseList);

  const mutation = useMutation(addCourse, {
    onMutate: (variables) => {
      console.log('onMutate', variables);
      return {
        onMutationData: 'hello world'
      };
    },
    onError: (error, variables, context) => {
      console.log('onError', error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      console.log('on Success', data, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      console.log('onSettled', data, error, variables, context);
    }
  });

  return (
    <>
      {data?.data?.list.map(({pk, title}) => (
        <div key={pk}>{title}</div>
      ))}
      <Button onClick={() => mutation.mutate({param1: 1, param2: 2})}>Add Course</Button>
    </>
  );
}

async function getCourseList(...args: any) {
  console.log('getCourseList call', args);
  const courseApi = new CourseApi();
  return courseApi.getList(1, {});
}

async function addCourse({param1, param2}: {param1: number, param2: number}) {
  console.log('addCourse call', param1, param2);
  await timeoutPromise(2000);
  return {
    status: 200
  };
}
