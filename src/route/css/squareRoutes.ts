import {RouteProps} from "react-router";
import WhiteSpace from "../../containers/css/square/WhiteSpace";
import {CSS_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";

const path = `${CSS_FIRST_PATH_DIRECTORY_NAME}/square`;

const squareRoutes: RouteProps[] = [
    {
        path: `${path}/white-space`,
        component: WhiteSpace
    }
].map(route => ({...route, exact: true}));

export default squareRoutes;
