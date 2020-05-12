import {RouteProps} from "react-router";
import {CSS_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";
import VerticalAlignExample from "../../containers/css/properties/VerticalAlignExample";
import TableLayoutExample from "../../containers/css/properties/TableLayoutExample";
import WordWrapBreakExample from "../../containers/css/properties/WordWrapBreakExample";
import BeforeAfterExample from "../../containers/css/properties/BeforeAfterExample";

const path = `${CSS_FIRST_PATH_DIRECTORY_NAME}/properties`;

const propertiesRoutes: RouteProps[] = [
    {
        path: `${path}/vertilcal-align`,
        component: VerticalAlignExample
    },
    {
        path: `${path}/table-layout`,
        component: TableLayoutExample
    },
    {
        path: `${path}/word-wrap-break`,
        component: WordWrapBreakExample
    },
    {
        path: `${path}/before-after`,
        component: BeforeAfterExample
    },
].map(route => ({...route, exact: true}));

export default propertiesRoutes;
