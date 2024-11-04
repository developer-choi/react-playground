export class ValidateError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function handleClientSideError(error: any) {
  console.error(error);
}
