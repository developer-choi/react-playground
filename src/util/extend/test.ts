import {useEffect} from "react";
import {usePrevious} from "@util/extend/react";
import {isEqual} from "lodash";

interface DebugOption {
  debug: boolean;
  messages: any;
}

export function debugLog({debug = true, messages}: DebugOption) {
  if (!debug) {
    return;
  }

  if (typeof messages === "string") {
    console.log(messages);
  } else {
    console.log(...messages);
  }
}

export function useLogWhenRendering(...messages: any[]) {
  const previousMessages = usePrevious(messages);

  useEffect(() => {
    const hasChanged = previousMessages === undefined ? true : !isEqual(previousMessages, messages);

    if (!hasChanged) {
      return;
    }

    console.log(...messages);
  }, [messages, previousMessages]);
}

export function useLogWhenAllRendering(...messages: any[]) {
  useEffect(() => {
    console.log(...messages);
  });
}

export function useLogMount(name: string) {
  useEffect(() => {
    console.log(`${name} mounted`);

    return () => {
      console.log(`${name} unmounted`);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function timeoutPromise(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
