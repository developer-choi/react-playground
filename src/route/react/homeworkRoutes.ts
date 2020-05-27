import {RouteProps} from "react-router";
import Homework from "../../containers/react/example/homework/Homework";
import CardDetail from "../../containers/react/example/homework/CardDetail";
import InputFormDetail from "../../containers/react/example/homework/InputFormDetail";

const homeworkRoutes: RouteProps[] = [
    {path: "/homework", component: Homework},
    {path: "/card-detail", component: CardDetail},
    {path: "/input-form-detail", component: InputFormDetail},
].map(route => ({...route, exact: true}));

export default homeworkRoutes;
