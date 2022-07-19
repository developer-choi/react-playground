import BaseApi from '@api/BaseApi';
import type {AxiosResponse} from 'axios';
import type {VideoResponse} from '@type/response/video';

export default class VideoApi extends BaseApi {
  constructor() {
    super('/video');
  }
  
  getVideo(pk?: number): Promise<AxiosResponse<VideoResponse>> {
    return this.axios.get('', {params: {pk}});
  }
}
