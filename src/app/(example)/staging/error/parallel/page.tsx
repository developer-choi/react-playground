import styles from './page.module.scss';
import {useDelay} from '@/utils/extend/library/react';
import {CustomizedError} from '@/utils/service/error';
import {CustomErrorBoundary} from '@/components/error/client';

export const revalidate = 0;

// URL: http://localhost:3000/staging/error/parallel
export default function Page() {
  return (
    <div className={styles.container}>
      <div style={{background: 'lightgray'}}>
        <CustomErrorBoundary>
          <LeftPage/>
        </CustomErrorBoundary>
      </div>
      <div style={{background: 'lightblue'}}>
        <CustomErrorBoundary>
          <RightPage/>
        </CustomErrorBoundary>
      </div>
    </div>
  );
}

function LeftPage() {
  const enabled = useDelay(100);

  if (enabled) {
    throw new CustomClientError('Some parallel left occurred');
  }
  
  return null;
}

function RightPage() {
  const enabled = useDelay(500);

  if (enabled) {
    throw new CustomClientError('Some parallel right error occurred');
  }
  
  return null;
}

class CustomClientError extends CustomizedError {
  readonly name = 'CustomClientError';
  readonly someCustomData = 'Some Custom Data';

  constructor(message: string) {
    super(message);
  }
}
