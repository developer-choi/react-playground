import Home from '../pages/without-aside/Home';
import PageNotFound from '../pages/without-aside/PageNotFound';
import {LayoutRouteProps} from '../components/LayoutRoute';
import LayoutWithoutAside from '../components/layout/LayoutWithoutAside';
import Styling from '../pages/without-aside/Styling';
import TransitionAnimationExample1 from '../pages/without-aside/TransitionAnimationExample1';

const withoutAside: LayoutRouteProps[] = [
  {path: '/styling', exact: true, component: Styling},
  {path: '/animation-example1', exact: true, component: TransitionAnimationExample1},
  {path: '/', exact: true, component: Home},
  {component: PageNotFound}
].map(route => ({...route, layout: LayoutWithoutAside}));

export default withoutAside;
