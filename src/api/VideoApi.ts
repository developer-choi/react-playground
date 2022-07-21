import BaseApi from '@api/BaseApi';
import type {AxiosResponse} from 'axios';
import type {VideoResponse, VideosResponse} from '@type/response/video';

export default class VideoApi extends BaseApi {
  constructor() {
    super('/video');
  }
  
  getVideo(pk?: number): Promise<AxiosResponse<VideoResponse>> {
    return this.axios.get('/one', {params: {pk}});
  }
  
  getAllVideos(): Promise<AxiosResponse<VideosResponse>> {
    return this.axios.get('/all');
  }
}
