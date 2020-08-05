import api from './api';
import doc from './doc';
import {LayoutRouteProps} from '../../components/LayoutRoute';
import Layout from '../../components/layout/Layout';
import component from './component';

export default api.concat(doc, component).map(route => ({...route, exact: true, layout: Layout})) as LayoutRouteProps[];
