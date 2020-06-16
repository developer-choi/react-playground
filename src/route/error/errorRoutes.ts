import {RouteProps} from "react-router";
import NotFound from "../../components/error/NotFound";

const errorRoutes: RouteProps[] = [
    {path: "/", component: NotFound},
];

export default errorRoutes;
