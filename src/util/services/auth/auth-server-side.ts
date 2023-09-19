import type {GetServerSideProps} from "next";
import {handleServerSideError} from "@util/services/handle-error/server-side-error";
import {getLoginTokenInCookie, isLoggedInCookie} from "@util/services/auth/auth-core";

export const getSSPForNotLoggedIn: GetServerSideProps = async context => {
  if (isLoggedInCookie(context)) {
    return {
      redirect: {
        permanent: false,
        destination: '/' // main page path
      }
    };
  } else {
    return {
      props: {}
    };
  }
}

export const getSSPForLoggedIn: GetServerSideProps<{}> = async context => {
  try {
    getLoginTokenInCookie({
      context,
      throwable: true
    });

    return {
      props: {}
    };
  } catch (error) {
    return handleServerSideError(error);
  }
};
