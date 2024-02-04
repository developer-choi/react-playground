export type SnsType = 'naver' | 'kakao' | 'apple' | 'payco';

export interface SnsLoginResponse {
  data: UserDataFromNaverLogin;
}

/**
 * SNS마다 유저정보를 각기 다른 데이터타입으로 제공하고있으므로,
 * 그것을 통일한 데이터타입으로 변환하였음.
 *
 * 여기에 있는 데이터는 모두 사전에 기획과 협의된, "필수로 유저로부터 제공받아야하는 데이터 타입"과 동일해야함.
 */
export interface SnsUserData {
  snsType: SnsType;
  nickname: string;
  name: string;
  email: string;
  gender: 'male' | 'female';
  phone: string | undefined; //ex: '01012341234' 하이픈없이. 카카오는 휴대폰번호 정보를 제공해주지않아서 undefined타입 추가.
  birthYearDate: string; // ex: '19950510'
}

/**
 * https://developers.naver.com/docs/login/devguide/devguide.md#3-3-%ED%9A%8C%EC%9B%90-%EC%A0%95%EB%B3%B4-%ED%99%95%EC%9D%B8-%EB%B0%8F-%EA%B8%B0%EC%A1%B4-%ED%9A%8C%EC%9B%90%EA%B3%BC%EC%9D%98-%EC%97%B0%EB%8F%99
 * 네이버는 유저식별정보를 제외한 나머지 모든정보를 비동의할 수 있음.
 * 그러므로 네이버 개발자센터에서 관리자가 정보제공동의항목에 비필수로 체크한다거나 하면 정보가 없을 수 있으므로 모든 데이터타입에 | undefined 추가
 */
export interface UserDataFromNaverLogin {
  nickname: string | undefined;
  name: string | undefined;
  email: string | undefined;
  user: {
    response: {
      gender: 'M' | 'F' | undefined;
      mobile: string | undefined; //ex: '010-1234-1234'
      birthday: string | undefined; //ex: '05-10'
      birthyear: string | undefined; //ex: '1995'
    };
  };
}

export interface NaverLoginResult {
  code: string;
  state: string;
}
