import React, {useCallback} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import CourseApi from '@api/CourseApi';
import Button from '@component/atom/element/Button';
import {useToggle} from '@util/extend/react';

export default function Page() {
  const {setTrue: hide, value: isHide} = useToggle(false);

  if (isHide) {
    return null;
  }

  return <Sub hide={hide}/>;
}

export function Sub({hide}: {hide: () => void}) {
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
      hide();
    }
  });

  const someMutate = useCallback(() => {
    mutation.mutate({param1: 1, param2: 2}, {
      onSuccess: (data, varaibles, context) => {
        console.log('mutate onSucess', data, varaibles, context);
      },
      onSettled: (data, error, variables, context) => {
        console.log('mutate onSettled', data, error, variables, context);
      }
    });
  }, [mutation]);

  return (
    <>
      {data?.data?.list.map(({pk, title}) => (
        <div key={pk}>{title}</div>
      ))}
      <Button onClick={someMutate}>Add Course</Button>
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

  return {
    status: 200
  };
}
