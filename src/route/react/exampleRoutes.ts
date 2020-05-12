import {RouteProps} from "react-router";
import {REACT_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";
import TicTacToeHome from "../../containers/react/example/tic-tac-toe/TicTacToeHome";
import RenderProp from "../../containers/react/example/render-prop/RenderProp";

const path = `${REACT_FIRST_PATH_DIRECTORY_NAME}/example`;

const exampleRoutes: RouteProps[] = [
    {
        path: `${path}/tic-tac-toe`,
        component: TicTacToeHome,
    },
    {
        path: `${path}/render-prop`,
        component: RenderProp,
    },
].map(route => ({...route, exact: true}));

export default exampleRoutes;
