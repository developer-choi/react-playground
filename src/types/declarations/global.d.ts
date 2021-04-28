export {};

declare global {
  interface Window {
    ignoreForceLogin: boolean | undefined;
  }
}
