import React from 'react';
import AsideNavLinks from './AsideNavLinks';
import component, {COMPONENT_FIRST_PATH} from '../../routes/app-main/component';

export default function ComponentAside() {

  return (
      <AsideNavLinks firstPath={COMPONENT_FIRST_PATH} routes={component}/>
  );
}
