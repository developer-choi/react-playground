import HelloWorld from '../../pages/app-main/doc/HelloWorld';
import IntroducingJsx from '../../pages/app-main/doc/IntroducingJsx';
import {RouteProps} from 'react-router';
import AutoFocusWhenMount from '../../pages/app-main/doc/AutoFocusWhenMount';

export const DOC_FIRST_PATH = '/doc';

const doc: RouteProps[] = [
  {path: [DOC_FIRST_PATH, `${DOC_FIRST_PATH}/hello-world`], component: HelloWorld},
  {path: `${DOC_FIRST_PATH}/introducing-jsx`, component: IntroducingJsx},
  {path: `${DOC_FIRST_PATH}/auto-focus-when-mount`, component: AutoFocusWhenMount},
];
export default doc;
