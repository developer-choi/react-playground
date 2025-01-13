import {ServicePermissionDeniedError} from '@/utils/service/error/both-side';
import {handleServerSideError} from '@/utils/service/error/server-side';

export const revalidate = 0;

// URL: http://localhost:3000/staging/error/server
export default async function Page() {
  try {
    await someNestedFunc();

    return (
      <div>Server Page</div>
    );
  } catch (error) {
    return handleServerSideError(error);
  }
}

async function someNestedFunc() {
  if (2 > 1) {
    throw new ServicePermissionDeniedError('DASHBOARD.COMMUNITY:READ', ['DASHBOARD.PAYMENT:ALL', 'NOTICE.STUDENT:ALL']);
  }

  return 'Hello World';
}
