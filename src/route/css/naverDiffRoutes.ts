import {RouteProps} from "react-router";
import {CSS_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";
import NaverDiffMine from "../../containers/css/naver-diff/NaverDiffMine";

const path = `${CSS_FIRST_PATH_DIRECTORY_NAME}/naver-diff`;

const naverDiffRoutes: RouteProps[] = [
    {
        path: `${path}/home`,
        component: NaverDiffMine,
    }
].map(route => ({...route, exact: true}));

export default naverDiffRoutes;
