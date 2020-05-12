import {RouteProps} from "react-router";
import {REACT_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";
import CaptureAndBubble from "../../containers/react/event/CaptureAndBubble";

const path = `${REACT_FIRST_PATH_DIRECTORY_NAME}/event`;

const eventRoutes: RouteProps[] = [
    {
        path: `${path}/capture-and-bubble`,
        component: CaptureAndBubble,
    },
].map(route => ({...route, exact: true}));

export default eventRoutes;
