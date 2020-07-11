import Home from '../pages/without-aside/Home';
import PageNotFound from '../pages/without-aside/PageNotFound';
import {LayoutRouteProps} from '../components/LayoutRoute';
import LayoutWithoutAside from '../components/layout/LayoutWithoutAside';

const withoutAside: LayoutRouteProps[] = [
  {path: '/', exact: true, component: Home},
  {component: PageNotFound}
].map(route => ({...route, layout: LayoutWithoutAside}));

export default withoutAside;
