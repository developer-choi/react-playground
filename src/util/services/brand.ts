import type {Brand} from '@type/response-sub/brand-sub';

export interface BrandListWithChar {
  brandList: Brand[];
  char: string;
}

export interface ParseBrandListResult {
  brandListWithCharList: BrandListWithChar[];
  charList: string[];
}

export function parseBrandList(brandList: Brand[], searchText: string): ParseBrandListResult {
  const searchResult = !searchText ? brandList : brandList.filter(({name}) => name.toLowerCase().includes(searchText.toLowerCase()));

  const record = searchResult.reduce((a, b) => {
    const char = b.name[0].toUpperCase();

    if (char in a) {
      a[char].push(b);

    } else {
      // eslint-disable-next-line no-param-reassign
      a[char] = [b];
    }

    return a;
  }, {} as Record<string, Brand[]>);

  const brandListWithCharList = Object.entries(record).map(([char, brandList]) => ({
    char,
    brandList
  }));

  brandListWithCharList.sort((a, b) => {
    if (a.char > b.char) {
      return 1;
    } else {
      return -1;
    }
  });

  return {
    brandListWithCharList,
    charList: brandListWithCharList.map(({char}) => char)
  };
}
