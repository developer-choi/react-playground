import React, {useEffect} from "react";
import type {GetServerSideProps} from "next";
import {getLoginTokenClientSide} from "@util/services/auth/auth";
import {handleClientSideError} from "@util/services/handle-error/client-side-error";

export default function Page({resolvedUrl}: any) {

  useEffect(() => {
    try {
      getLoginTokenClientSide();
    } catch (error) {
      handleClientSideError(error);
    }
  }, []);

  return <span>{resolvedUrl}</span>;
}

export const getServerSideProps: GetServerSideProps = async ({resolvedUrl}) => {
  return {
    props: {
      resolvedUrl
    }
  };
};
