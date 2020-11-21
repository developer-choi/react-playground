type CallbackProp = Function | undefined;

export function getResultCallback<T>(defaultCallback: T, customCallback: T, eachCallbacks: CallbackProp[]): T {

  const needDefaultCallback = eachCallbacks.every(callback => callback === undefined);

  if (needDefaultCallback) {
    return defaultCallback;

  } else {
    return customCallback;
  }
}
