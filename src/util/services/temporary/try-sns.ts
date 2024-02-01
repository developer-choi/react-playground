import {getObjectInTemporaryStorage, setTemporarySessionStorage} from "@util/extend/browser/temporary-storage";

export interface TempTrySnsData {
  snsType: SnsType;
  purpose: "login" | "signup" | "chain-sns" | "validate";
}

export type SnsType = "naver" | "kakao";

/** @deprecated
 * setter는 내부적으로 특별한 처리가 필요할 때만 만들고,
 * 그게 아니라면 setTypedSessionStorage()를 직접 다른데서 호출하는게 나음.
 * 아래처럼 굳이 한번더 함수만드는건 손해인듯.
 */
function setTempTrySnsLogin(param: TempTrySnsData) {
  setTemporarySessionStorage("tempTrySnsLogin", param);
}

export const getTempTrySnsLoginData = getObjectInTemporaryStorage("tempTrySnsLogin", "현재 SNS 로그인을 이용하실 수 없습니다.");
