export default function Page() {
  throw new CustomServerError('CustomServerError occurred.');
}

class CustomServerError extends Error {
  constructor(message: string) {
    super(message);
  }
}
