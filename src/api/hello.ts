import {makeRandomString} from '../utils/random';

export async function apiGetHelloUser(userPk: number) {
  console.log('api call parameter', userPk);
  return {
    name: makeRandomString(['a', 'b', 'c'], 5),
  };
}