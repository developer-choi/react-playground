import BaseApi from '@api/BaseApi';
import {getCurrentlyLoginUserInfo} from '@util/auth/auth';

export default class SomeApi extends BaseApi {
  
  /**
   * I have to add a session to the header just before calling the API.
   */
  somePrivateApi() {
    return this.axios.get('', {headers: {...getCurrentlyLoginUserInfo()}});
  }
}
