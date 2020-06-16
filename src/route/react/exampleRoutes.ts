import {RouteProps} from "react-router";
import {REACT_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";
import CounterApp from "../../containers/react/example/counter/CounterApp";
import NumberConversionExample from "../../containers/react/example/ts/NumberConversionExample";

const path = `${REACT_FIRST_PATH_DIRECTORY_NAME}/example`;

const exampleRoutes: RouteProps[] = [
    {
        path: `${path}/counter`,
        component: CounterApp,
        meta: {
            name: "Counter"
        }
    },
    {
        path: `${path}/number-test`,
        component: NumberConversionExample
    }
].map(route => ({...route, exact: true}));

export default exampleRoutes;
