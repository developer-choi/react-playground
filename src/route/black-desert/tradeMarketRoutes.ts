import TradeMarket from "../../containers/black-desert/trade-market/TradeMarket";
import DiffBenefitDetailContainer
    from "../../containers/black-desert/trade-market/diff-benefit-detail/DiffBenefitDetailContainer";
import {RoutePropsMeta} from "../../interfaces/RoutePropsMeta";
import {BLACK_DESERT_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";

const path = `${BLACK_DESERT_FIRST_PATH_DIRECTORY_NAME}/trade-market`;

const tradeMarketRoutes: RoutePropsMeta[] = [
    {
        path: `${path}`,
        component: TradeMarket,
        meta: {
            name: "거래소 수익 계산기"
        },
    },
    {
        path: `${path}/diff-benefit-detail`,
        component: DiffBenefitDetailContainer,
        meta: {
            hoverable: false
        }
    }
].map(route => ({...route, exact: true}));

export default tradeMarketRoutes;
