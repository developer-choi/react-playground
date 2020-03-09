import * as React from "react";
import {Component} from "react";
import ComponentInfo from "../../common/redux/ComponentInfo";
import {connect} from "react-redux";
import {RootState} from "../store";
import {MapStateOneAction} from "../one";
import MyButton from "../../common/form/MyButton";

interface AppProp {
    primitiveState: number,
    referenceState: Array<number>,
    increase: () => void,
    decrease: () => void
}

class OneContainer extends Component<AppProp> {

    shouldComponentUpdate(nextProps: Readonly<AppProp>, nextState: Readonly<{}>, nextContext: any): boolean {
        console.log("one container shouldComponentUpdate");
        console.log("prev, next props", this.props, nextProps);
        return true;
    }

    render() {

        console.log("one container render call");

        return (
            <div className="MapStateOneContainer-wrap">
                <ComponentInfo primitiveProp={this.props.primitiveState} referenceProp={this.props.referenceState} message={"Case 2"}/>
                <MyButton onClickHandler={this.props.increase}>dispatch increase</MyButton>
                <MyButton onClickHandler={this.props.decrease}>dispatch decrease</MyButton>
            </div>
        )
    }
}

function mapState(state: RootState) {

    return {
        primitiveState: state.one.primitiveState,
        referenceState: state.one.referenceState,
    }
}

function mapDispatch(dispatch: Function) {

    return {
        increase: () => dispatch({type: MapStateOneAction.INCREASE}),
        decrease: () => dispatch({type: MapStateOneAction.DECREASE})
    }
}

export default connect(mapState, mapDispatch)(OneContainer)