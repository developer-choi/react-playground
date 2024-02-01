import {axiosInstance} from "./config";
import type {FilterListResponse} from "@type/response/filter";
import type {ProductListPageParam} from "@type/services/filter";

export type FilterListApiParam = Omit<ProductListPageParam, "page">;

export async function getFilterListApi(params: FilterListApiParam) {
  const {data} = await axiosInstance.get<FilterListResponse>("/filter/list", {params});
  return data;
}
