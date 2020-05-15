import * as React from "react";
import TwoDataTypeInfo from "./TwoDataTypeInfo";
import MyButton from "../form/MyButton";
import {CounterProp} from "../../containers/react/example/counter/CounterContainer";

export default function Counter(props: CounterProp) {

    console.log("counter render");

    return (
        <div className="Counter-wrap">
            <TwoDataTypeInfo primitive={props.primitive} message="일반 카운터"/>
            <MyButton onClickHandler={props.increase}>+</MyButton>
            <MyButton onClickHandler={props.decrease}>-</MyButton>
            <MyButton onClickHandler={props.increaseAsync}>+ 1초</MyButton>
        </div>
    );
}
