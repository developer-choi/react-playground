import type {TempTrySnsData} from '@util/services/temporary/try-sns';
import type {TempSignupResultData} from '@util/services/temporary/signup-result';

// 애플리케이션에서 임시로 저장하는 모든 데이터를 이 파일로 관리
interface TemporaryStorage {
  tempTrySnsLogin: TempTrySnsData
  tempSignupResult: TempSignupResultData
}

export function setTemporarySessionStorage<
  K extends keyof TemporaryStorage,
  V extends TemporaryStorage[K]
>(key: K, value: V) {
  sessionStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
}

export function getStringInTemporaryStorage<K extends keyof TemporaryStorage>(key: K, errorMessage: string) {
  return () => {
    const item = sessionStorage.getItem(key)

    if (!item) {
      throw new MissingTemporaryDataError(errorMessage)
    }

    return item
  }
}

export function getObjectInTemporaryStorage<K extends keyof TemporaryStorage, V extends TemporaryStorage[K]>(key: K, errorMessage: string) {
  return () => {
    const item = getStringInTemporaryStorage(key, errorMessage)()

    try {
      return JSON.parse(item) as V
    } catch (error) {
      console.error(error)
      sessionStorage.removeItem(key)
      throw new InvalidTemporaryDataError(errorMessage)
    }
  }
}

/**
 * 임시데이터가 없는경우 발생하는 에러
 *
 * Case1. SNS 로그인을 시도하려면 시도하기 전에 미리 snsType과 시도하려고했던 위치(pathname)을 session storage에 저장해야합니다.
 * Case2. SNS 회원가입을 시도하려면, 미리 네이버 카카오 등에서 로그인을 시도해서 성공했을 때 유저정보를 미리 session storage에 저장하고 회원가입 페이지로 진입해야합니다.
 */
export class MissingTemporaryDataError extends Error {}
export class InvalidTemporaryDataError extends Error {}

// ex: '잘못된 접근입니다' 하고나서 메인페이지 튕기는거
export function handleMissingTempDataError(error: MissingTemporaryDataError) {
  alert(error.message)

  location.replace('/')
}
