import BlackDesertUserInfo from "./BlackDesertUserInfo";

export enum Item {

    //펄템(= 캐쉬템)은 거래수수료 면제
    PEARL_ITEM = "pearl-item",

    //펄템(= 캐쉬템)이 아니면 거래수수료 적용
    NOT_PEARL_ITEM = "not-pearl-item"
}

export const HERALDRY_FAME_ARRAY = [1000, 4000, 7000];

//기본적으로 거래소에서 계산시 거래액의 30%를 수수료로 지불됨
const TRADE_MARKET_FEE = 0.3;

//기본적으로 영지세금 5%도 함께 지불됨.
const COMMANDERY_FEE = 0.05;

//밸륲패키지가 있을경우, 정산금액의 30%를 추가로 돌려받을 수 있음.
const VALUE_PACKAGE_PAY_BACK = 0.3;

//가문명성 등급에 따라, 정산금액의 0.5%p, 1.0%p, 1.5%p를 추가로 돌려받을 수 있음.
const HERALDRY_FAME_PERCENT_POINTS = [0.005, 0.01, 0.015];

export function sellTrade(item: Item, userInfo: BlackDesertUserInfo, sellMount: number | string) {

    switch (item) {
        case Item.PEARL_ITEM:
            return sellMount;

        case Item.NOT_PEARL_ITEM:
            let settlementRate = 1 - (TRADE_MARKET_FEE + COMMANDERY_FEE);

            if(userInfo.haveValuePackage)
                settlementRate =  settlementRate * (1 + VALUE_PACKAGE_PAY_BACK);

            const heraldryFameStep = getHeraldryFameStep(userInfo.heraldryFame);
            debugger;

            settlementRate += heraldryFameStep !== -1 ? HERALDRY_FAME_PERCENT_POINTS[heraldryFameStep] : 0;

            return Number(sellMount) * settlementRate;
    }
}

export function getHeraldryFameStep(userHeraldryFame: number): number {
    return HERALDRY_FAME_ARRAY.findIndex(HERALDRY_FAME => userHeraldryFame < HERALDRY_FAME) - 1;
}
