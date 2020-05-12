import {RouteProps} from "react-router";
import PropReRenderParent from "../../containers/react/render/class/prop-re-render/PropReRenderParent";
import WhenPropUpdateParent from "../../containers/react/render/class/when-prop-update/WhenPropUpdateParent";
import {UseMemoComponent} from "../../containers/react/render/hooks/use-memo/UseMemoComponent";
import HooksSecondParam from "../../containers/react/render/hooks/hooks-second-param/HooksSecondParam";
import UseRefParent from "../../containers/react/render/hooks/use-ref/UseRefParent";
import UsePrevPropParent from "../../containers/react/render/hooks/use-prev/UsePrevPropParent";
import LiteralParent from "../../containers/react/render/common/literal/LiteralParent";
import {REACT_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";

const path = `${REACT_FIRST_PATH_DIRECTORY_NAME}/render`;

const renderRoutes: RouteProps[] = [
    {
        path: `${path}/props-re-render-test`,
        component: PropReRenderParent,
        meta: {
            name: "Props Re-render",
            hoverable: false
        }
    },
    {
        path: `${path}/when-prop-update`,
        component: WhenPropUpdateParent,
        meta: {
            name: "prop업데이트 시점"
        }
    },
    {
        path: `${path}/memo-test`,
        component: UseMemoComponent,
    },
    {
        path: `${path}/hooks-second-param`,
        component: HooksSecondParam,
    },
    {
        path: `${path}/use-ref`,
        component: UseRefParent,
    },
    {
        path: `${path}/use-prev`,
        component: UsePrevPropParent,
    },
    {
        path: `${path}/literal`,
        component: LiteralParent,
    }
].map(route => ({...route, exact: true}));

export default renderRoutes;
