import React, {useState} from "react";
import "./EventTypeExample.scss";
import RadioButton from "../../../components/form/radio-button/RadioButton";

export default function EventTypeExample() {

    const [fruit, setFruit] = useState("Apple");

    const onChangeHandler = (checkValue: string) => {
        setFruit(checkValue);
    };

    return (
        <div className="EventTypeExample-wrap">
            <RadioButton onChangeHandler={onChangeHandler} checkValue={"Apple"} currentValue={fruit}>Apple</RadioButton>
            <RadioButton onChangeHandler={onChangeHandler} checkValue={"Banana"} currentValue={fruit}>Banana</RadioButton>
            <RadioButton onChangeHandler={onChangeHandler} checkValue={"Cucumber"} currentValue={fruit}>Cucumber</RadioButton>
        </div>
    );
}
