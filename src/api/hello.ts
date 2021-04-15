import {makeRandomString} from '../utils/web-api-extend/random';

export async function apiGetHelloUser(userPk: number) {
  console.log('api call parameter', userPk);
  return {
    name: makeRandomString(['a', 'b', 'c'], 5),
  };
}
