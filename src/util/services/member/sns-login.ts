/*************************************************************************************************************
 * Exported functions
 *************************************************************************************************************/
export function getSnsLoginPopupUrl(snsType: SnsType): string {
  const redirectUrl = location.origin + SNS_CALLBACK_PATHNAME;
  const origin = SNS_LOGIN_ORIGIN_RECORD[snsType];
  const param = SNS_LOGIN_PARAM_RECORD[snsType](redirectUrl);
  return `${origin}?${new URLSearchParams(param).toString()}`;
}

export type SnsType = "naver" | "kakao" | "apple" | "payco";

export interface NaverLoginResult {
  code: string;
  state: string;
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
const CSRF_TOKEN = "scvasdcqacx";

const SNS_CALLBACK_PATHNAME = "/experimental/member/sns-callback";

const SNS_LOGIN_ORIGIN_RECORD: Record<SnsType, string> = {
  naver: "https://nid.naver.com/oauth2.0/authorize",
  apple: "https://appleid.apple.com/auth/authorize",
  kakao: "https://kauth.kakao.com/oauth/authorize",
  payco: "https://id.payco.com/oauth2.0/authorize"
};

const SNS_LOGIN_PARAM_RECORD: Record<SnsType, (redirectUrl: string) => Record<string, string>> = {
  naver: (redirectUrl) => ({
    response_type: "code",
    client_id: "dsazcxasdqweqwr",
    redirect_uri: redirectUrl,
    state: CSRF_TOKEN
  }),
  payco: (redirectUrl) => ({
    response_type: "code",
    client_id: "asdzxcqawqwfasd",
    redirect_uri: redirectUrl,
    serviceProviderCode: "FRIENDS",
    userLocale: "ko_KR"
  }),
  kakao: (redirectUrl) => ({
    response_type: "code",
    client_id: "zxcasqdqwcqefqweg",
    redirect_uri: redirectUrl
  }),
  apple: (redirectUrl) => ({
    client_id: "a.b.c.e.d.f.g",
    redirect_uri: redirectUrl,
    response_type: "code id_token",
    scope: "name email",
    response_mode: "form_post"
  })
};
