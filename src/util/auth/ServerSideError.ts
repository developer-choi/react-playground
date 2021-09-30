import type {GetServerSidePropsResult} from 'next';

/**
 * This is Error where occurred in getServerSideProps().
 * This error indicate what to return in getServerSideProps().
 *
 * @property result What returned in getServerSideProps().
 * @property message Why an error has occurred.
 */
export default class ServerSideError<P> extends Error {
  readonly result: GetServerSidePropsResult<P>;
  
  constructor(message: string, result: GetServerSidePropsResult<P>) {
    super(message);
    this.result = result;
  }
}
