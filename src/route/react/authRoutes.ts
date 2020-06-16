import {RouteProps} from "react-router";
import PublicExample from "../../containers/react/auth/PublicExample";
import PrivateExampleContainer from "../../containers/react/auth/PrivateExampleContainer";
import LoginExample from "../../containers/react/auth/LoginExample";
import {REACT_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";

const path = `${REACT_FIRST_PATH_DIRECTORY_NAME}/auth`;

const authRoutes: RouteProps[] = [
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

export default authRoutes;
