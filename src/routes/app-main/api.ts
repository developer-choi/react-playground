import UseEffect from '../../pages/app-main/api/UseEffect';
import UseState from '../../pages/app-main/api/UseState';
import Layout from '../../components/layout/Layout';
import {RouteProps} from 'react-router';

const api: RouteProps[] = [
  {path: ['/api', '/api/use-effect'], component: UseEffect},
  {path: '/api/use-state', component: UseState},
].map(route => ({...route, layout: Layout}));

export default api;
