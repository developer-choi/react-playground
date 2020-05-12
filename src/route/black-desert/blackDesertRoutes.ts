import tradeMarketRoutes from "./tradeMarketRoutes";
import {BLACK_DESERT_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";
import BlackDesertMain from "../../containers/black-desert/BlackDesertMain";
import {RoutePropsMeta} from "../../interfaces/RoutePropsMeta";

export const blackDesertRoutes: RoutePropsMeta[] = [
    {
        path: `${BLACK_DESERT_FIRST_PATH_DIRECTORY_NAME}/main`,
        component: BlackDesertMain,
        meta: {
            name: "검은사막"
        }
    }
].map(route => ({...route, exact: true}));

export default blackDesertRoutes.concat(tradeMarketRoutes);
