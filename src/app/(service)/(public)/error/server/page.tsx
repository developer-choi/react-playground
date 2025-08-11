import {getTestStatus401ServerApi} from '@/utils/service/common/api/test-server';

// URL: http://localhost:3000/error/server
export default async function Page() {
  await Promise.all([
    getTestStatus401ServerApi(),
    getTestStatus401ServerApi()
  ]);

  return null;
}
