import type {Kakao} from "@type/etc/kakao";

export {};

declare global {
  interface Window extends Kakao {
    ignoreForceLogin: boolean | undefined;
  }
}
