import * as React from "react";
import {connect} from "react-redux";
import PrivateExample from "./PrivateExample";
import {RootState} from "../../../../redux/store";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";

export interface PrivateExampleProp {
    logined: boolean
}

function PrivateExampleContainer(props: PrivateExampleProp) {

    const history = useHistory();

    useEffect(() => {

        if(!props.logined) {
            history.replace("/react/example/login");
        }

    }, []);

    return <PrivateExample/>;
}

function mapState(rootState: RootState) {

    return {
        logined: rootState.auth.logined
    };
}

export default connect(mapState)(PrivateExampleContainer);
