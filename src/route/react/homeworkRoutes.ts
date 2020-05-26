import {RouteProps} from "react-router";
import Homework from "../../containers/react/example/homework/Homework";
import CardDetail from "../../containers/react/example/homework/CardDetail";

const homeworkRoutes: RouteProps[] = [
    {path: "/homework", component: Homework},
    {path: "/card-example", component: CardDetail},
].map(route => ({...route, exact: true}));

export default homeworkRoutes;
