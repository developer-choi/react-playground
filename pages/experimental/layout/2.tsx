import React, {useCallback, useEffect, useState} from "react";
import SomeLayout from "@component/layouts/SomeLayout";
import {setHeaderActionCreator} from "@store/reducers/layout";
import {useAppDispatch} from "@store/hooks";
import Button from "@component/atom/element/Button";

// URL: http://localhost:3000/experimental/layout/2
export default function Page() {
  const [number, setNumber] = useState(1);
  const dispatch = useAppDispatch();

  const increase = useCallback(() => {
    setNumber((prevState) => prevState + 1);
    dispatch(
      setHeaderActionCreator({
        title: `dynamic-title-${number}`
      })
    );
  }, [dispatch, number]);

  useEffect(() => {
    dispatch(
      setHeaderActionCreator({
        title: "initial page header",
        height: 80,
        backgroundColor: "red",
        onClickHeader: () => {
          alert("The header clicked");
        }
      })
    );
  }, [dispatch]);

  return (
    <>
      layout2 page
      <Button onClick={increase}>동적으로 레이아웃 바꾸기</Button>
    </>
  );
}

Page.layout = SomeLayout;
