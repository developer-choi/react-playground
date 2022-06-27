const BASIC_REVENUE = 0.65;
const VALUE_PACKAGE_BONUS = BASIC_REVENUE * 0.3;
export const GOYUGYEOL_COUNT_BY_1HOUR = 500; //고유결을 1시간동안 500개 깐다고 가정합니다.

export interface DroughtyRevenueTable {
  value: number;
  meaning: string;
  revenue: number;
}

export const DROUGHTY_REVENUE_TABLES = [
  {
    value: 999,
    meaning: '1000 미만',
    revenue: BASIC_REVENUE + VALUE_PACKAGE_BONUS
  },
  {
    value: 3999,
    meaning: '1000 ~ 3999',
    revenue: BASIC_REVENUE + VALUE_PACKAGE_BONUS + BASIC_REVENUE * 0.005
  },
  {
    value: 6999,
    meaning: '4000 ~ 6999',
    revenue: BASIC_REVENUE + VALUE_PACKAGE_BONUS + BASIC_REVENUE * 0.01
  },
  {
    value: 9999,
    meaning: '7000 이상',
    revenue: BASIC_REVENUE + VALUE_PACKAGE_BONUS + BASIC_REVENUE * 0.015
  }
];

export interface GoyugyeolRevenueParam {
  goyugyeolPrice: number;
  goyugyeolCount?: number;
  droughty: number;
  gipaPrice: number;
}

export function goyugyeolRevenue({goyugyeolPrice, gipaPrice, droughty}: GoyugyeolRevenueParam) {
  if ([goyugyeolPrice, gipaPrice, droughty].includes(0)) {
    return 0;
  }
  
  const {revenue} = DROUGHTY_REVENUE_TABLES.find(({value}) => {
    return droughty <= value;
  }) as DroughtyRevenueTable;
  
  const totalGipaPrice = gipaPrice * GOYUGYEOL_COUNT_BY_1HOUR;
  const totalGoyugyeolPrice = goyugyeolPrice * GOYUGYEOL_COUNT_BY_1HOUR;
  return totalGipaPrice * revenue - totalGoyugyeolPrice;
}
