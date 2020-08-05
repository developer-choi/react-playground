import DocAside from '../pages/aside/DocAside';
import ApiAside from '../pages/aside/ApiAside';
import Aside from '../components/layout/Aside';
import {LayoutRouteProps} from '../components/LayoutRoute';
import ComponentAside from '../pages/aside/ComponentAside';

const aside: LayoutRouteProps[] = [
  {path: '/doc', component: DocAside, layout: Aside},
  {path: '/api', component: ApiAside, layout: Aside},
  {path: '/component', component: ComponentAside, layout: Aside},
].map(route => ({...route}));

export default aside;
