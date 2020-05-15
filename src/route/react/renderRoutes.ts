import {RouteProps} from "react-router";
import LiteralParent from "../../containers/react/render/literal/LiteralParent";
import {REACT_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";

const path = `${REACT_FIRST_PATH_DIRECTORY_NAME}/render`;

const renderRoutes: RouteProps[] = [
    {
        path: `${path}/literal`,
        component: LiteralParent,
    }
].map(route => ({...route, exact: true}));

export default renderRoutes;
