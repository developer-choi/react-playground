import styles from './page.module.scss';
import {useDelay} from '@/utils/extend/library/react';
import {CustomizedError} from '@forworkchoe/core/utils';
import {CustomErrorBoundary} from '@/components/error/client';

export const revalidate = 0;

/**
 * URL: http://localhost:3000/staging/error/parallel
 * Doc: https://docs.google.com/document/d/1fZMQM2K6BaFh4KScvHqraM1s1Y31sp82u9ZsjeDQT18/edit?tab=t.0#heading=h.qpa582km21d4
 */
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
