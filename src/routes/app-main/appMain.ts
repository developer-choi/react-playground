import api from './api';
import doc from './doc';
import {LayoutRouteProps} from '../../components/LayoutRoute';
import LayoutWithAside from '../../components/layout/LayoutWithAside';
import component from './component';

export default api.concat(doc, component).map(route => ({...route, exact: true, layout: LayoutWithAside})) as LayoutRouteProps[];
