import HeaderInfo from "../../../classes/layout/HeaderInfo";
import {mainHeader} from "./MainHeader";
import {hoverableHeaderList} from "../../../utils/header/header";
import tradeMarketRoutes from "../../../route/black-desert/tradeMarketRoutes";

export const blackDesertHeader: Array<Array<HeaderInfo>> = mainHeader.concat([

    hoverableHeaderList("Trade", tradeMarketRoutes),
]);
