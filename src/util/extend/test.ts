export function debugLog(debug: boolean, message: string) {
  if (debug) {
    console.log(message);
  }
}

export function timeoutPromise(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
