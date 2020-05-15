import * as React from "react";
import {TwiceCounterProp} from "../../containers/react/example/counter/TwiceCounterContainer";
import TwoDataTypeInfo from "./TwoDataTypeInfo";
import MyButton from "../form/MyButton";

export default function TwiceCounter(props: TwiceCounterProp) {

    console.log("twice counter rendered");

    return (
        <div className="TwiceCounter-wrap">
            <TwoDataTypeInfo primitive={props.primitive} message="2배씩 증감하는 카운터"/>
            <MyButton onClickHandler={props.twiceIncrease}>+</MyButton>
            <MyButton onClickHandler={props.twiceDecrease}>-</MyButton>
            <MyButton onClickHandler={props.notChange}>Not Change</MyButton>
        </div>
    );
}
