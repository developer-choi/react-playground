export function getDefaultFunctionWhenError<Return, Value>(converter: (value: Value) => Return): (value: Value, defaultValue: Return) => Return {

  return function (value, defaultValue) {
    try {
      return converter(value);
    } catch (error) {
      console.error(`error occurred, return defaultValue=${defaultValue}\n\n`, error);
      return defaultValue;
    }
  }
}
