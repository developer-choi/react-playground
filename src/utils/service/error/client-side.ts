import {useCallback} from 'react';
import {useOpenModal} from '@/utils/extend/modal';
import {useRouter} from 'next/navigation';
import {DEFAULT_HOME_URL, LoginError} from '@/utils/service/auth/redirect';

export function useHandleClientSideError() {
  const {openAlertModal} = useOpenModal();
  const {replace} = useRouter();
  
  return useCallback(async (error: any) => {
    if (error instanceof GuestError) {
      replace(DEFAULT_HOME_URL);

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
      openAlertModal({
        title: '모달 제목',
        content: '해당 현상이 지속되면 고객센터로 문의 해주세요.',
      });
    }
  }, [openAlertModal, replace]);
}

/**
 * 로그인이 되어있는 상태에서
 * 로그인이 안되야만 가능한 액션을 했을 때 발생하는 에러.
 * Client Side에서만 발생할것같아서 여기 파일에 작성했고,
 * 에러처리 방법은 대부분 (아무런 피드백없이) 기본 홈 페이지로 보내면 될것같음!
 */
export class GuestError extends Error {
  constructor(message = '이미 로그인이 되어있어서 해당 동작을 실행할 수 없습니다.') {
    super(message);
  }
}
