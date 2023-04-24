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
    (minPrice === undefined || minPrice === pkOriginalRecord.minPrice) ? undefined : {
      type: 'min-price',
      name: `최소 ${numberWithComma(minPrice)}원`
    },
    (maxPrice === undefined || maxPrice === pkOriginalRecord.maxPrice) ? undefined : {
      type: 'max-price',
      name: `최대 ${numberWithComma(maxPrice)}원`
    }
  ].filter(value => value !== undefined) as FilterResult[];
}
