import React from 'react';
import FilterForm from '@component/filter/FilterForm';
import {FormProvider} from 'react-hook-form';
import CheckedFilterList from '@component/filter/CheckedFilterList';
import {useFilterFormProvider} from '@util/services/product-filter/filter-form';

export default function FilterController() {
  const methods = useFilterFormProvider()

  return (
    <FormProvider {...methods}>
      <CheckedFilterList/>
      <FilterForm/>
    </FormProvider>
  );
}
