import {RouteProps} from 'react-router';
import LayoutWithAside from '../../components/layout/LayoutWithAside';
import HowToMakeModal from '../../pages/app-main/component/HowToMakeModal';

export const COMPONENT_FIRST_PATH = '/component';

const component: RouteProps[] = [
  {path: [COMPONENT_FIRST_PATH, `${COMPONENT_FIRST_PATH}/modal`], component: HowToMakeModal},
].map(route => ({...route, layout: LayoutWithAside}));

export default component;
