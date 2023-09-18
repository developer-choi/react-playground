import {makeAxiosInstance} from './config';

const axiosInstance = makeAxiosInstance({
  baseURL: '/file'
});

export async function postFileUploadApi(file: File, onUploadProgress: (event: ProgressEvent) => void) {
  const formData = new FormData();
  formData.append('file', file);

  return axiosInstance.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  })
}
