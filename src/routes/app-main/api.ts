import UseEffect from '../../pages/app-main/api/UseEffect';
import UseState from '../../pages/app-main/api/UseState';
import Layout from '../../components/layout/Layout';
import {RouteProps} from 'react-router';

export const API_FIRST_PATH = '/api';

const api: RouteProps[] = [
  {path: [API_FIRST_PATH, `${API_FIRST_PATH}/use-effect`], component: UseEffect},
  {path: `${API_FIRST_PATH}/use-state`, component: UseState},
].map(route => ({...route, layout: Layout}));

export default api;
