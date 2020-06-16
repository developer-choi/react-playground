import * as React from "react";
import PrivateExample from "./PrivateExample";
import {RootState} from "../../../redux/store";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

export interface PrivateExampleProp {
    logined: boolean
}

function PrivateExampleContainer(props: PrivateExampleProp) {

    if(!props.logined) {
        return <Redirect to="/react/auth/login"/>;

    } else
        return <PrivateExample/>;
}

function mapState(rootState: RootState) {

    return {
        logined: rootState.auth.logined
    };
}

export default connect(mapState)(PrivateExampleContainer);
