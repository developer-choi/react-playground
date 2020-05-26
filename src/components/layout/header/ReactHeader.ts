import HeaderInfo from "../../../classes/layout/HeaderInfo";
import {mainHeader} from "./MainHeader";
import exampleRoutes from "../../../route/react/exampleRoutes";
import renderRoutes from "../../../route/react/renderRoutes";
import {hoverableHeaderList} from "../../../utils/header/header";
import eventRoutes from "../../../route/react/eventRoutes";
import homeworkRoutes from "../../../route/react/homeworkRoutes";

export const reactHeader: Array<Array<HeaderInfo>> = mainHeader.concat([

    hoverableHeaderList("Example", exampleRoutes),
    hoverableHeaderList("Render", renderRoutes),
    hoverableHeaderList("Event", eventRoutes),
    hoverableHeaderList("Homework", homeworkRoutes),
]);
