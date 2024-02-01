import {axiosInstance} from "@api/config";

export async function postFileUploadApi(file: File, onUploadProgress: (event: ProgressEvent) => void) {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress
  });
}
