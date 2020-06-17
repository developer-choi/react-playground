import React from "react";
import {connect} from "react-redux";
import {RootState} from "../../redux/store";
import {setLogined} from "../../redux/modules/auth";
import MyButton from "./MyButton";
import {useHistory} from "react-router-dom";

export interface AuthButtonProp {
    logined: boolean,
    setLogined: typeof setLogined
}

function AuthButton({logined, setLogined}: AuthButtonProp) {

    const history = useHistory();

    const login = () => {
        setLogined(true);
        history.push("/react/main");
    };

    const logout = () => {
        setLogined(false);
    };

    if(logined) {
        return <MyButton className="auth-button" onClickHandler={logout}>로그아웃</MyButton>;
    } else {
        return <MyButton className="auth-button" onClickHandler={login}>로그인</MyButton>;
    }
}

function mapState(rootState: RootState) {

    return {
        logined: rootState.auth.logined
    };
}

const mapDispatch = {
    setLogined
};

export default connect(mapState, mapDispatch)(AuthButton);
