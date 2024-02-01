import React, {createContext, useContext} from "react";
import type {GetServerSideProps} from "next";
import {ErrorBoundary} from "react-error-boundary";
import {useAppSelector} from "@store/hooks";

// URL: http://localhost:3000/study/react/error-in-component/throw-in-component

export default function Page() {
  return (
    <TestContext.Provider value={{data: "hello world"}}>
      <CatchExample />
    </TestContext.Provider>
  );
}

const TestContext = createContext({
  data: "hello world"
});

function CatchExample() {
  try {
    return ErrorComponent();
  } catch (error) {
    return <div>Error is occurred</div>;
  }
}

function DontCatchExample1() {
  try {
    return <ErrorComponent />;
  } catch (error) {
    return <div>Error is occurred</div>;
  }
}

function DontCatchExample2() {
  return (
    <ErrorBoundary fallback={<div>Error is occurred</div>}>
      <ErrorComponent />
    </ErrorBoundary>
  );
}

function ErrorComponent(): null {
  const state = useAppSelector((state) => state);
  console.log("state", state);

  const context = useContext(TestContext);
  console.log("context", context);

  throw new Error("Error occurred");
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  };
};
