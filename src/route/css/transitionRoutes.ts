import {RouteProps} from "react-router";
import Collapse from "../../containers/css/transition/collapse/Collapse";
import Enlargement from "../../containers/css/transition/enlargement/Enlargement";
import ImageForwardLayer from "../../containers/css/transition/image-forward-layer/ImageForwardLayer";
import {CSS_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";

const path = `${CSS_FIRST_PATH_DIRECTORY_NAME}/transition`;

const transitionRoutes: RouteProps[] = [
    {
        path: `${path}/collapse`,
        component: Collapse
    },
    {
        path: `${path}/enlargement`,
        component: Enlargement
    },
    {
        path: `${path}/image-forward-layer`,
        component: ImageForwardLayer
    }
].map(route => ({...route, exact: true}));

export default transitionRoutes;
