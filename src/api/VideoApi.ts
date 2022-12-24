import BaseApi from '@api/BaseApi';
import type {AxiosResponse} from 'axios';
import type {VideoResponse, VideoListResponse} from '@type/response/video';

export default class VideoApi extends BaseApi {
  constructor() {
    super(undefined, {
      baseURL: "http://localhost:8000/video"
    });
  }
  
  getOne(pk: number | string): Promise<AxiosResponse<VideoResponse>> {
    return this.axios.get(`/${pk}`, {params: {pk}});
  }
  
  getList(): Promise<AxiosResponse<VideoListResponse>> {
    return this.axios.get('/list');
  }
}
