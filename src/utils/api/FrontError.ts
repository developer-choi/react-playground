export type FrontErrorType = 'Permission Denied';

export class FrontError extends Error {
  type: FrontErrorType;

  constructor(type: FrontErrorType, message: string) {
    super();
    this.type = type;
    this.message = message;
  }
}
