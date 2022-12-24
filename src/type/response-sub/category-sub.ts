export interface Category {
  pk: number;
  name: string;
  children: Category[];
}
