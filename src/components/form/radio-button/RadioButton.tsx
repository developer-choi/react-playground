import React from "react";
import "./RadioButton.scss";

interface AppProp {
    children: string;
    onChangeHandler: (checkValue: string) => void;
    checkValue: string;
    currentValue: string;
}

export default function RadioButton(props: AppProp) {

    const active = (props.checkValue === props.currentValue) ? "active" : "";

    return (
        <button type="button" onClick={() => props.onChangeHandler(props.checkValue)} className={`RadioButton-wrap ${active}`}>{props.children}</button>
    );
}
