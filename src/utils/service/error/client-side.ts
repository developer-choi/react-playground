import {useCallback} from 'react';
import {useOpenModal} from '@/utils/extend/modal';
import {useRouter} from 'next/navigation';
import {DEFAULT_HOME_URL} from '@/utils/service/auth/redirect';
import * as Sentry from '@sentry/nextjs';
import {GuestError, LoginError, ServicePermissionDeniedError} from '@/utils/service/error/both-side';

export function useHandleClientSideError() {
  const {openAlertModal} = useOpenModal();
  const {replace} = useRouter();
  
  return useCallback(async (error: any) => {
    if (error instanceof GuestError) {
      replace(DEFAULT_HOME_URL);

    } else if(error instanceof ServicePermissionDeniedError) {
      openAlertModal({
        title: '권한 오류',
        content: error.message,
      });

    } else if(error instanceof LoginError) {
      /** TODO
       * 1. Client Side Logout을 여기서 시켜야함. next auth로 로그아웃도 해야하고
       * 2. 로그아웃 사이드이펙트로 되야했던것들도 여기서 같이해야함. RQ 쓰고잇다면 특정 유저관련 캐시를 다 여기서 날려야하고.
       * ==>
       * 이거 관련 별도 문서 정리한게 있었는데, 로그아웃 / 로그인 사이드이펙트 관련 문서 잘 정리하고 여기 반영하기.
       * 그러려면 useLogout()도 따로 만들고 그 안에서 또다시 useClientSideLogout() 이런거 만들어야겠다 ㅠㅠ
       */

      openAlertModal({
        title: '모달 제목',
        content: '로그인 후 이용이 가능합니다',
        confirm: {
          children: '로그인 하러가기',
          onClick: (onClose) => {
            onClose();
            replace(error.loginUrlWithRedirect);
          },
        }
      });

    } else {
      // TODO 여기서 에러를 던져야하는데 별도 커스텀클래스에 우선순위는 제일높은걸로 던져야할거같음. 에러클래스 분리 어떻게 해야할지까지 결정되고나서 확정
      Sentry.captureException(error);
      
      openAlertModal({
        title: '모달 제목',
        content: '해당 현상이 지속되면 고객센터로 문의 해주세요.',
      });
    }
  }, [openAlertModal, replace]);
}
