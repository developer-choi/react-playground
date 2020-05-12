import {RouteProps} from "react-router";
import {CSS_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";
import CssMain from "../../containers/css/CssMain";
import transitionRoutes from "./transitionRoutes";
import squareRoutes from "./squareRoutes";
import naverDiffRoutes from "./naverDiffRoutes";
import propertiesRoutes from "./propertiesRoutes";
import insteadFlexRoutes from "./insteadFlexRoutes";
import otherRoutes from "./otherRoutes";

const cssRoutes: RouteProps[] = [
    {
        path: [`${CSS_FIRST_PATH_DIRECTORY_NAME}`, `${CSS_FIRST_PATH_DIRECTORY_NAME}/main`],
        component: CssMain
    }
].map(route => ({...route, exact: true}));

export default cssRoutes.concat(transitionRoutes, squareRoutes, naverDiffRoutes, propertiesRoutes, insteadFlexRoutes, otherRoutes);
