import Home from '../pages/without-aside/Home';
import PageNotFound from '../pages/without-aside/PageNotFound';
import {LayoutRouteProps} from '../components/LayoutRoute';
import LayoutWithoutAside from '../components/layout/LayoutWithoutAside';
import Styling from '../pages/without-aside/Styling';

const withoutAside: LayoutRouteProps[] = [
  {path: '/styling', exact: true, component: Styling},
  {path: '/', exact: true, component: Home},
  {component: PageNotFound}
].map(route => ({...route, layout: LayoutWithoutAside}));

export default withoutAside;
