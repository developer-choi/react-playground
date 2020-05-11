import {RouteProps} from "react-router";
import LineBreakExample from "../../containers/css/other/LineBreakExample";
import {CSS_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";

const path = `${CSS_FIRST_PATH_DIRECTORY_NAME}/other`;

const otherRoutes: RouteProps[] = [
    {path: `${path}/line-break`, component: LineBreakExample},
].map(route => ({...route, exact: true}));

export default otherRoutes;
