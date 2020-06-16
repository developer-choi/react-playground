import {RouteProps} from "react-router";
import {REACT_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";
import CounterApp from "../../containers/react/example/counter/CounterApp";
import NumberConversionExample from "../../containers/react/example/ts/NumberConversionExample";
import PublicExample from "../../containers/react/example/auth/PublicExample";
import PrivateExample from "../../containers/react/example/auth/PrivateExample";
import LoginExample from "../../containers/react/example/auth/LoginExample";
import PrivateExampleContainer from "../../containers/react/example/auth/PrivateExampleContainer";

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
    },
    {
        path: `${path}/public`,
        component: PublicExample
    },
    {
        path: `${path}/private`,
        component: PrivateExampleContainer,
        meta: {
            name: "PrivateExample"
        }
    },
    {
        path: `${path}/login`,
        component: LoginExample
    }
].map(route => ({...route, exact: true}));

export default exampleRoutes;
