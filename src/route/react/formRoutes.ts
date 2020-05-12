import {RouteProps} from "react-router";
import {REACT_FIRST_PATH_DIRECTORY_NAME} from "../firstPath";
import UserList from "../../containers/react/form/user/UserList";
import UserForm from "../../containers/react/form/user/UserForm";
import {PageType} from "../../utils/common/PageType";
import UsefulFormBug from "../../containers/react/form/UsefulFormBug";

const path = `${REACT_FIRST_PATH_DIRECTORY_NAME}/form`;

const formRoutes: RouteProps[] = [
    {
        path: `${path}/user/list`,
        component: UserList,
        meta: {
            name: "회원목록",
        }
    },
    {
        path: `${path}/user/modify/:id`,
        component: UserForm,
        meta: {
            name: "회원수정",
            hoverable: false
        }
    },
    {
        path: `${path}/user/create`,
        component: UserForm,
        meta: {
            name: "회원추가",
            pageType: PageType.INSERT
        }
    },
    {
        path: `${path}/basic`,
        component: UsefulFormBug,
        meta: {
            hoverable: false
        }
    },
].map(route => ({...route, exact: true}));

export default formRoutes;
