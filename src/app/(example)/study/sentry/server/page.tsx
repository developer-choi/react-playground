export const revalidate = 0;

// URL: http://localhost:3000/test/study/server
export default function Page() {
  return (
    <div>
      {someNestedFunc()}
    </div>
  );
}

class CustomServerError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function someNestedFunc() {
  if (2 > 1) {
    throw new CustomServerError('CustomServerError occurred.');
  }

  return 'Hello World';
}
