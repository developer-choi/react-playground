import type {CategoryFilter, GeneralFilter} from "@type/response-sub/filter-sub";

export interface FilterListResponse {
  categoryList: CategoryFilter[];
  sizeList: GeneralFilter[];
  colorList: GeneralFilter[];
  brandList: GeneralFilter[];
  maxPrice: number;
  minPrice: number;
}
