import React, {PropsWithChildren, useCallback, useState} from 'react';
import styled from 'styled-components';
import Button from '@component/atom/element/Button';
import {myClassName} from '@util/libraries/classnames';
import {putCourseCancelLikeApi, putCourseLikeApi} from '@api/course-api';

export interface CourseLikeButtonProp {
  initial: boolean;
  pk: number;
}

export function CourseLikeButton({initial, pk}: CourseLikeButtonProp) {
  const toggleApi = useCallback((nextLike: boolean) => {

    if (nextLike) {
      return putCourseLikeApi(pk);
    } else {
      return putCourseCancelLikeApi(pk);
    }
  }, [pk]);
  
  return (
    <LikeButton initial={initial} toggleApi={toggleApi}>좋아요</LikeButton>
  );
}

interface LikeButtonProp {
  initial: boolean;
  toggleApi: (nextLike: boolean) => Promise<any>;
}

function LikeButton({children, initial, toggleApi}: PropsWithChildren<LikeButtonProp>) {
  const [like, setLike] = useState(initial);

  const toggleImmediately = useCallback(() => {
    //일단 상태바꿈
    setLike(prevState => !prevState);
  }, []);

  const onClick = useCallback(async () => {
    toggleImmediately();

    try {
      await toggleApi(!like);
    } catch (error) {
      setLike(like);
    }
  }, [like, toggleApi, toggleImmediately]);

  return (
    <StyledButton className={myClassName({active: like})} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  background-color: lightgray;
  
  &.active {
    background-color: red;
    color: white;
  }
`;
