import React from 'react';
import SomeLayout from '@component/layouts/SomeLayout';
import {useLayout} from '@store/reducers/layout';

// URL: http://localhost:3000/experimental/layout/1
export default function Page() {
  useLayout('layout1 page header');

  return (
    <>
      layout1 page
    </>
  );
}

Page.layout = SomeLayout;
