export const getCurrentTime = () => {
  return new Date().toISOString();
};

export const greet = (name) => {
  return `Hello, ${name}! Current time is ${getCurrentTime()}`;
};
