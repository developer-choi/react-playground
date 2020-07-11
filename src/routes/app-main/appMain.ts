import api from './api';
import doc from './doc';
import {LayoutRouteProp} from '../../components/LayoutRoute';
import Layout from '../../components/layout/Layout';

export default api.concat(doc).map(route => ({...route, exact: true, layout: Layout})) as LayoutRouteProp[];
