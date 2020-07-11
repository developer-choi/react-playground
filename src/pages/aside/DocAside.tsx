import React from 'react';
import doc, {DOC_FIRST_PATH} from '../../routes/app-main/doc';
import AsideNavLinks from './AsideNavLinks';

export default function DocAside() {

  return (
      <AsideNavLinks firstPath={DOC_FIRST_PATH} routes={doc}/>
  )
}
