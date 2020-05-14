import HeaderInfo from "../../../classes/layout/HeaderInfo";
import {mainHeader} from "./MainHeader";
import exampleRoutes from "../../../route/react/exampleRoutes";
import renderRoutes from "../../../route/react/renderRoutes";
import {hoverableHeaderList} from "../../../utils/header/header";
import reduxRoutes from "../../../route/react/reduxRoutes";
import eventRoutes from "../../../route/react/eventRoutes";

export const reactHeader: Array<Array<HeaderInfo>> = mainHeader.concat([

    hoverableHeaderList("Example", exampleRoutes),
    hoverableHeaderList("Render", renderRoutes),
    hoverableHeaderList("Redux", reduxRoutes),
    hoverableHeaderList("Event", eventRoutes),
]);
