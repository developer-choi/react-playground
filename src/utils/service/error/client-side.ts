import {useModal} from '@/utils/extend/modal';
import {useRouter} from 'next/navigation';
import {DEFAULT_HOME_URL} from '@/utils/service/auth/redirect';
import * as Sentry from '@sentry/nextjs';
import {CustomizedError, FetchError, GuestError, LoginError,} from '@/utils/service/error/index';
import type {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {QueryClient, useQueryClient} from '@tanstack/react-query';
import {useCallback} from 'react';
import {useLogout} from '@/utils/service/auth/hooks';

export function useHandleClientSideError() {
  const modal = useModal();
  const queryClient = useQueryClient();
  const router = useRouter();
  const logout = useLogout();

  return useCallback((error: unknown) => {
    const context: HandlingErrorContext = {
      modal,
      queryClient,
      router,
    };

    const errorHandlerMap: ErrorHandlerTable = {
      GuestError: (error) => handleGuestError(error, context),
      LoginError: (error) => handleLoginError(error, logout, context),
      FetchError: (error) => handleFetchError(error, context),
    };

    if (error instanceof CustomizedError) {
      const handler = errorHandlerMap[error.name as ErrorName];
      if (handler) {
        handler(error as any);
        return;
      }
    }

    handleUnexpectedError(error, context);
  }, [logout, modal, queryClient, router]);
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
interface ErrorInstances {
  GuestError: GuestError;
  LoginError: LoginError;
  FetchError: FetchError;
}

type ErrorName = keyof ErrorInstances;

type ErrorHandlerTable = {
  [K in ErrorName]: (error: ErrorInstances[K]) => void;
};

interface HandlingErrorContext {
  modal: ReturnType<typeof useModal>;
  router: AppRouterInstance;
  queryClient: QueryClient;
}

function handleUnexpectedError(error: any, {modal}: HandlingErrorContext) {
  console.error(error);

  // TODO 여기서 에러를 던져야하는데 별도 커스텀클래스에 우선순위는 제일높은걸로 던져야할거같음. 에러클래스 분리 어떻게 해야할지까지 결정되고나서 확정
  Sentry.captureException(error);

  modal.open.alert({
    title: '요청이 실패했어요.',
    content: '해당 현상이 지속되면 고객센터로 문의 해주세요.',
  });
}

function handleGuestError(_: GuestError, {router}: HandlingErrorContext) {
  // 현재 예상되는 시나리오가 없어서 일단 유저피드백없이 홈페이지 이동
  router.replace(DEFAULT_HOME_URL);
}

function handleLoginError(
  error: LoginError,
  logout: ReturnType<typeof useLogout>,
  {modal, router}: HandlingErrorContext,
) {
  /** TODO
   * 로그아웃 사이드이펙트로 되야했던것들도 여기서 같이해야함. RQ 쓰고잇다면 특정 유저관련 캐시를 다 여기서 날려야하고.
   * ==>
   * 이거 관련 별도 문서 정리한게 있었는데, 로그아웃 / 로그인 사이드이펙트 관련 문서 잘 정리하고 여기 반영하기.
   * 그러려면 useLogout()도 따로 만들고 그 안에서 또다시 useClientSideLogout() 이런거 만들어야겠다 ㅠㅠ
   */

  modal.open.alert({
    title: '모달 제목',
    content: '로그인 후 이용이 가능합니다',
    confirm: {
      children: '로그인 하러가기',
      onClick: async (onClose) => {
        onClose();
        await logout();
        router.replace(error.loginUrlWithRedirect);
      },
    },
  });
}

function handleFetchError(error: FetchError, {modal}: HandlingErrorContext) {
  switch (error.response.status) {
    case 403:
      modal.open.alert({
        title: '접근 권한이 없어요',
        content: error.message,
      });
      break;

    default:
      // 주로 폼 제출 후 API에서 유효성검증 하다 오류난 경우, 기본적인 처리로 그냥 API에서 응답한 오류메시지 그대로 보여주는 처리 넣었음.
      modal.open.alert({
        title: '요청이 실패했어요.',
        content: error.apiErrorInfo?.message ?? '해당 현상이 지속되면 고객센터로 문의 해주세요.',
      });
  }
}
