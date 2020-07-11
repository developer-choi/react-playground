import React from 'react';
import AsideNavLinks from './AsideNavLinks';
import api, {API_FIRST_PATH} from '../../routes/app-main/api';

export default function ApiAside() {

  return (
      <AsideNavLinks firstPath={API_FIRST_PATH} routes={api}/>
  );
}
