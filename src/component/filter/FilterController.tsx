import React from 'react';
import FilterForm from '@component/filter/FilterForm';
import {FormProvider, useForm} from 'react-hook-form';
import CheckedFilterList from '@component/filter/CheckedFilterList';
import {DEFAULT_FILTER_FORM_DATA} from '@util/services/product-filter/filter-form';
import type {FilterFormData} from '@type/services/filter';

export default function FilterController() {
  const methods = useForm<FilterFormData>({
    defaultValues: DEFAULT_FILTER_FORM_DATA
  });

  return (
    <FormProvider {...methods}>
      <CheckedFilterList/>
      <FilterForm/>
    </FormProvider>
  );
}
