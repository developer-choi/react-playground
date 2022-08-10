import BaseApi from '@api/BaseApi';

export default class SomeApi extends BaseApi {
  constructor() {
    super('/some');
  }

  /** Naming Rule
   * [HTTP-METHOD] + [API URL (Without root path)]
   * GET /some/alpha/beta/gamma ==> getAlphaBetaGamma()
   */
  getList() {
    return this.axios.get('/list'); // ==> /some/list
  }

  postAlphaBeta({}: SomeAlphaBetaParam) {
    return this.axios.post('/alpha/beta'); // ==> /some/alpha/beta
  }
}

/** Naming Rule
 * [api path] + Param
 */
export interface SomeAlphaBetaParam {

}
