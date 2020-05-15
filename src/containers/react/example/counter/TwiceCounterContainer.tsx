import * as React from "react";
import {connect} from "react-redux";
import TwiceCounter from "../../../../components/redux/TwiceCounter";
import {notChange, TwiceCounterState, twiceDecrease, twiceIncrease} from "../../../../redux/modules/twiceCounter";
import {RootState} from "../../../../redux/store";
import {NumberType} from "../../../../interfaces/NumberType";

export interface TwiceCounterProp extends NumberType {
    twiceIncrease: typeof twiceIncrease;
    twiceDecrease: typeof twiceDecrease;
    notChange: typeof notChange;
}

function TwiceCounterContainer(props: TwiceCounterProp) {

    return <TwiceCounter {...props}/>;
}

function mapState(rootState: RootState): TwiceCounterState {

    console.log("twice counter map state call");

    return {
        primitive: rootState.twiceCounter.primitive,
    };
}

const mapDispatch = {
    twiceIncrease, twiceDecrease, notChange
};

export default connect(mapState, mapDispatch)(TwiceCounterContainer);
