import "next/router";

declare module "next/router" {
  export interface TransitionOptions {
    shallow?: boolean;
    locale?: string | false;
    scroll?: boolean;
    unstable_skipClientCache?: boolean;
  }
}
