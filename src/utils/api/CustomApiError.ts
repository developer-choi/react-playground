export class CustomApiError extends Error {
  readonly status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const UN_EXPECTED_MESSAGE = '잠시후 다시 시도해주세요.';
