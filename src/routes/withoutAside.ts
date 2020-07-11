import Home from '../pages/without-aside/Home';
import PageNotFound from '../pages/without-aside/PageNotFound';
import {LayoutRouteProp} from '../components/LayoutRoute';
import LayoutWithoutAside from '../components/layout/LayoutWithoutAside';

const withoutAside: LayoutRouteProp[] = [
  {path: '/', exact: true, component: Home},
  {component: PageNotFound}
].map(route => ({...route, layout: LayoutWithoutAside}));

export default withoutAside;
