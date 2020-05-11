import HeaderInfo from "../../../classes/layout/HeaderInfo";
import {mainHeader} from "./MainHeader";
import {hoverableHeaderList} from "../../../utils/header/header";
import {naverDiffRoutes} from "../../../route/css/naverDiffRoutes";
import {transitionRoutes} from "../../../route/css/transitionRoutes";
import {propertiesRoutes} from "../../../route/css/propertiesRoutes";
import {insteadFlexRoutes} from "../../../route/css/insteadFlexRoutes";
import otherRoutes from "../../../route/css/otherRoutes";

export const cssHeader: Array<Array<HeaderInfo>> = mainHeader.concat([

  hoverableHeaderList("Naver Diff", naverDiffRoutes),
  hoverableHeaderList("Transition", transitionRoutes),
  hoverableHeaderList("Properties", propertiesRoutes),
  hoverableHeaderList("Instead Flex", insteadFlexRoutes),
  hoverableHeaderList("Other", otherRoutes),
]);
