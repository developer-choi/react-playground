import {RouteProps} from "react-router";
import {REACT_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";
import CounterApp from "../../containers/react/redux/counter/CounterApp";

const path = `${REACT_FIRST_PATH_DIRECTORY_NAME}/redux`;

const reduxRoutes: RouteProps[] = [
    {
        path: `${path}/counter`,
        component: CounterApp,
        meta: {
            name: "Counter"
        }
    }
].map(route => ({...route, exact: true}));

export default reduxRoutes;
