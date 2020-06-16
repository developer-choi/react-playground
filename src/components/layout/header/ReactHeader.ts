import HeaderInfo from "../../../classes/layout/HeaderInfo";
import {mainHeader} from "./MainHeader";
import exampleRoutes from "../../../route/react/exampleRoutes";
import renderRoutes from "../../../route/react/renderRoutes";
import {hoverableHeaderList} from "../../../utils/header/header";
import eventRoutes from "../../../route/react/eventRoutes";
import authRoutes from "../../../route/react/authRoutes";

export const reactHeader: Array<Array<HeaderInfo>> = mainHeader.concat([

    hoverableHeaderList("Example", exampleRoutes),
    hoverableHeaderList("Auth", authRoutes),
    hoverableHeaderList("Render", renderRoutes),
    hoverableHeaderList("Event", eventRoutes),
]);
