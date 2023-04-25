import {useFormContext} from 'react-hook-form';
import type {FilterFormData, FilterPkOriginalRecord, PriceFilterValue} from '@type/services/filter';
import {
  INITIAL_FILTER_PK_ORIGINAL_RECORD,
  useFilterPkOriginalRecordQuery
} from '@util/services/product-filter/filter-common';
import type {CustomSliderProp, MinMaxRange} from '@component/atom/forms/CustomSlider';
import {useCallback, useEffect, useMemo, useState} from 'react';
import type {FilterResult} from '@type/services/filter';
import {numberWithComma} from '@util/extend/data-type/number';

/*************************************************************************************************************
 * Exported functions
 *************************************************************************************************************/

export function usePriceFilterControl(): CustomSliderProp & {enabled: boolean} {
  const originalData = useFilterPkOriginalRecordQuery();
  const settingRange: MinMaxRange = useMemo<MinMaxRange>(() => {
    return {
      min: originalData.minPrice,
      max: originalData.maxPrice
    };
  }, [originalData.maxPrice, originalData.minPrice]);

  const {setValue, watch} = useFormContext<FilterFormData>();
  const minPriceInForm = watch()['min-price'];
  const maxPriceInForm = watch()['max-price'];

  const rangeInForm = useMemo<MinMaxRange>(() => {
    return {
      min: minPriceInForm ?? settingRange.min,
      max: maxPriceInForm ?? settingRange.max
    };
  }, [minPriceInForm, maxPriceInForm, settingRange]);

  const [range, setRange] = useState<MinMaxRange>(rangeInForm);

  useEffect(() => {
    setRange(rangeInForm);
  }, [rangeInForm]);

  const applyForm = useCallback(({min, max}: MinMaxRange) => {
    setValue('min-price', min === settingRange.min ? undefined : min);
    setValue('max-price', max === settingRange.max ? undefined : max);
  }, [setValue, settingRange.max, settingRange.min]);

  return {
    enabled: (settingRange.max !== INITIAL_FILTER_PK_ORIGINAL_RECORD.maxPrice) || (settingRange.min !== INITIAL_FILTER_PK_ORIGINAL_RECORD.minPrice),
    settingRange,
    value: range,
    onChange: setRange,
    onAfterChange: applyForm
  };
}

export function priceToFilterResult(priceFilter: PriceFilterValue, pkOriginalRecord: FilterPkOriginalRecord): FilterResult[] {
  const minPrice = priceFilter['min-price'];
  const maxPrice = priceFilter['max-price'];

  return [
    !validateMinPrice(minPrice, pkOriginalRecord.minPrice) ? undefined : {
      type: 'min-price',
      name: `최소 ${numberWithComma(minPrice as number)}원`
    },
    !validateMaxPrice(maxPrice, pkOriginalRecord.maxPrice) ? undefined : {
      type: 'max-price',
      name: `최대 ${numberWithComma(maxPrice as number)}원`
    }
  ].filter(value => value !== undefined) as FilterResult[];
}

/**
 * 쿼리스트링에 있던 가격필터값으로 폼데이터 가격필터값을 복원
 *
 * 만약, 가격필터값이
 * 1. 없거나
 * 2. 원본 가격 필터값과 똑같거나 (= 복원 할 이유가 없음)
 * 3. 원본 가격필터값의 범위를 벗어나는 경우 (= 복원 할 이유가 없음)
 *
 * 해당 가격필터값을 복원하지않습니다. (= 해당 키값으로 undefined를 넣어서 반환합니다.)
 */
export function restorePriceFilter(value: PriceFilterValue, pkOriginalRecord: FilterPkOriginalRecord): PriceFilterValue {
  const minPrice = value['min-price'];
  const maxPrice = value['max-price'];

  return {
    'min-price': !validateMinPrice(minPrice, pkOriginalRecord.minPrice) ? undefined : minPrice,
    'max-price': !validateMaxPrice(maxPrice, pkOriginalRecord.maxPrice) ? undefined : maxPrice,
  };
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/

function validateMinPrice(minPrice: number | undefined, originalPrice: number): boolean {
  return minPrice !== undefined && minPrice > originalPrice;
}

function validateMaxPrice(maxPrice: number | undefined, originalPrice: number): boolean {
  return maxPrice !== undefined && maxPrice < originalPrice;
}
