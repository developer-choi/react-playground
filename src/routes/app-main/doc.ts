import HelloWorld from '../../pages/app-main/doc/HelloWorld';
import IntroducingJsx from '../../pages/app-main/doc/IntroducingJsx';
import {RouteProps} from 'react-router';

const doc: RouteProps[] = [
  {path: ['/doc', '/doc/hello-world'], component: HelloWorld},
  {path: '/doc/introducing-jsx', component: IntroducingJsx},
];
export default doc;
