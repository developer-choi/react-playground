/**
 * 공통: 런타임 에러
 * 1. 다양한 query-string이 있는 웹페이지에서 URL로 부터 query-string 유효성검증 하다가 잘못된 값이 있을 때
 * 2. 사용자의 입력을 받으려고하는데 잘못된 형식일 때 (ex: '업로드 가능한 확장자는 jpg png 입니다)
 * 3. 사용자에게 입력을 받아서 서버에 제츨했더니 잘못된 입력값이 있다는 응답이 왔을 때 (ex: 비밀번호가 틀렸다)
 *
 * title: 에러메시지의 주제를 나타냄.
 * API를 호출하기 전 / 후에 에러가 발생해서 내용을 팝업의 형태로 보여주려고 할 때,
 * 팝업에 내용과 제목이 둘 다 있는경우 내용은 error.message로 보여주고 제목은 error.title로 보여주려고 할 때 사용하려고 추가.
 *
 * reason: 구체적으로 에러의 원인을 나타낼 때 사용함.
 * ex: 로그인 API를 호출하기전에 유효성검증하다가 ValidateError가 발생했고, reason에 'email'로 나와있다면, 이메일 값이 문제가 있음을 나타냄.
 * 그래서 reason === 'email'이면 이메일 입력박스에 포커스를 준다거나 하는 방식으로 응용하기 위해 추가.
 */
export class ValidateError extends Error {
  title?: string;
  reason?: string;

  constructor(message: string, config?: {title?: string, reason?: string}) {
    super(message);
    this.title = config?.title;
    this.reason = config?.reason;
  }
}
