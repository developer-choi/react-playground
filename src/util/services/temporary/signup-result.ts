import {getObjectInTemporaryStorage, setTemporarySessionStorage} from "@util/extend/browser/temporary-storage";

export interface TempSignupResultData {
  userName: string; //누구누구님 회원가입 환영해요
}

//회원가입 안거치고 바로 주소치고 회원가입 결과페이지로 가면 이 에러 보여지고 튕겨야함.
export const getTempSignupResult = getObjectInTemporaryStorage("tempSignupResult", "잘못된 접근입니다.");

/** @deprecated
 * setter는 내부적으로 특별한 처리가 필요할 때만 만들고,
 * 그게 아니라면 setTypedSessionStorage()를 직접 다른데서 호출하는게 나음.
 * 아래처럼 굳이 한번더 함수만드는건 손해인듯.
 */
const setTempJoinResultInStorage = (data: TempSignupResultData) => {
  setTemporarySessionStorage("tempSignupResult", data);
};
