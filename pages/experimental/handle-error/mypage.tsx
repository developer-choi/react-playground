import type {GetServerSideProps} from "next";
import {USER_INFO_QUERY_KEY} from "@util/services/auth/auth-user";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {getUserInfoOneApi} from "@api/user-api";
import {handleServerSideError} from "@util/services/handle-error/server-side-error";
import {getLoginTokenInCookie, useLogout} from '@util/services/auth/auth-core';

export default function Page() {
  const logout = useLogout()

  return (
    <div>
      <button onClick={() => logout()}>로그아웃</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  try {
    const loginToken = getLoginTokenInCookie({
      context,
      throwable: true
    });

    /**
     * 1. private 페이지마다 이 코드가 꼬박 들어갈 예정.
     * (1) 다른데 안들르고 이 페이지만 바로 들어올 수 있기 때문에, 결국 private page마다 SSR단계에서 API를 부를 수밖에 없음.
     * (2) public 페이지 왔다갔다 하면서 유저정보 캐시데이터로 재사용하다가 여기오면 최신화된 데이터로 보여줘야함.
     */
    await queryClient.prefetchQuery({
      queryKey: [USER_INFO_QUERY_KEY],
      queryFn: () => getUserInfoOneApi(loginToken.userPk, context)
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };
  } catch (error) {
    return handleServerSideError(error);
  }
};
