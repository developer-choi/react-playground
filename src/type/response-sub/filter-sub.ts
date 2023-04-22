export interface GeneralFilter {
  pk: number;
  name: string;
}

export interface CategoryFilter extends GeneralFilter {
  children: CategoryFilter[];
}
