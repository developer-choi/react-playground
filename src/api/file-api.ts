import {axiosInstance} from '@api/config';
import type {AxiosProgressEvent} from 'axios';

export async function postFileUploadApi(file: File, onUploadProgress: (event: AxiosProgressEvent) => void) {
  const formData = new FormData();
  formData.append('file', file);

  return axiosInstance.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  });
}
