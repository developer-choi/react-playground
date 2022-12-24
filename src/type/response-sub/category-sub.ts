export class Category {
  pk: number;
  name: string;
  childrens: Category[];

  constructor(pk: number, name: string, childrens?: Category[]) {
    this.pk = pk;
    this.name = name;
    this.childrens = childrens ?? [];
  }
}
