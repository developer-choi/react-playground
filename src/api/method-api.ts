import type {MethodGetSomeResponse, MethodPostSomeBody} from "@type/response/method";
import {axiosInstance} from "@api/config";

export async function getMethodSomeApi() {
  const {data} = await axiosInstance.get<MethodGetSomeResponse>("/method/some");
  return data;
}

export async function postMethodSomeApi(body: MethodPostSomeBody) {
  return axiosInstance.post("/method/some", body);
}
