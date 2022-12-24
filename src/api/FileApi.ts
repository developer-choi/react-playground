import BaseApi from './BaseApi';

export default class FileApi extends BaseApi {
  constructor() {
    super('/file');
  }

  postUpload(file: File, onUploadProgress: (event: ProgressEvent) => void) {
    const formData = new FormData();
    formData.append('file', file);

    return this.axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })
  }
}
