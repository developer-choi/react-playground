import type {SnsLoginResponse, SnsType, SnsUserData} from "@type/services/sns-login";

/*************************************************************************************************************
 * Exported functions
 *************************************************************************************************************/
export function getSnsLoginPopupUrl(snsType: SnsType): string {
  const redirectUrl = location.origin + SNS_CALLBACK_PATHNAME;
  const origin = SNS_LOGIN_ORIGIN_RECORD[snsType];
  const param = SNS_LOGIN_PARAM_RECORD[snsType](redirectUrl);
  return `${origin}?${new URLSearchParams(param).toString()}`;
}

export function convertSnsUserData(snsType: SnsType, response: SnsLoginResponse): SnsUserData {
  const data = CONVERTER_RECORD[snsType](response);

  REQUIRED_SNS_USER_DATA_ENTRIES.forEach(({key, message}) => {
    if (!data[key]) {
      throw new MissingRequiredSnsUserDataError(message);
    }
  });

  return {
    ...data,
    snsType
  } as SnsUserData;
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

/**
 * SNS로 부터 필수로 제공받아야하는 유저정보가 제공되지않은경우 발생하는 에러.
 * 관리자가 각 SNS별 관리자에서 정보제공동의 설정을 잘 했다면 이 에러가 발생할 수는 없지만,
 * 운영상의 이슈로 정보제공동의 설정이 잘못된 경우 발생할 수 있음.
 */
class MissingRequiredSnsUserDataError extends Error {}

type RequiredSnsUserData = Extract<keyof SnsUserData, "nickname" | "name" | "email" | "gender" | "birthYearDate">;

const REQUIRED_SNS_USER_DATA_ENTRIES: {key: RequiredSnsUserData; message: string}[] = [
  {key: "name", message: "이름 정보가 제공되지않아 SNS 회원가입이 실패하였습니다."},
  {key: "nickname", message: "닉네임 정보가 제공되지않아 SNS 회원가입이 실패하였습니다."},
  {key: "email", message: "이메일 정보가 제공되지않아 SNS 회원가입이 실패하였습니다."},
  {key: "birthYearDate", message: "생년월일 정보가 제공되지않아 SNS 회원가입이 실패하였습니다."},
  {key: "gender", message: "성별 정보가 제공되지않아 SNS 회원가입이 실패하였습니다."}
];

// TypeError (Can not read property of ... 에러 안뜨게 조심)
const CONVERTER_RECORD: Record<SnsType, (response: SnsLoginResponse) => Partial<SnsUserData>> = {
  naver: (response) => {
    const gender = response.data.user.response.gender;
    const birthyear = response.data.user.response.birthyear;
    const birthday = response.data.user.response.birthday;

    return {
      name: response.data.name,
      nickname: response.data.nickname,
      email: response.data.email,
      phone: response.data.user.response.mobile?.replaceAll("-", ""),
      gender: gender === undefined ? undefined : gender === "M" ? "male" : "female",
      birthYearDate: birthyear && birthday ? birthyear + birthday : undefined
    };
  },
  payco: () => {
    throw new Error("구현생략");
  },
  kakao: () => {
    throw new Error("구현생략");
  },
  apple: () => {
    throw new Error("구현생략");
  }
};
