import {RouteProps} from "react-router";
import {CSS_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";
import FlexWrapExample from "../../containers/css/instead-flex/FlexWrapExample";

const path = `${CSS_FIRST_PATH_DIRECTORY_NAME}/instead-flex`;

const insteadFlexRoutes: RouteProps[] = [
    {
        path: `${path}/example`,
        component: FlexWrapExample
    },
].map(route => ({...route, exact: true}));

export default insteadFlexRoutes;
