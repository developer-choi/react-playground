import VerticalAlignExample from "../../containers/css/properties/VerticalAlignExample";
import {CSS_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";
import TableLayoutExample from "../../containers/css/properties/TableLayoutExample";

const path = `${CSS_FIRST_PATH_DIRECTORY_NAME}/properties`;

export const propertiesRoutes = [
    {
        path: `${path}/vertilcal-align`,
        component: VerticalAlignExample
    },
    {
        path: `${path}/table-layout`,
        component: TableLayoutExample
    },
];
