import * as React from "react";
import {MouseEvent, MouseEventHandler, ReactNode} from "react";
import "./form.scss";

interface AppProp {
    onClickHandler: MouseEventHandler<HTMLButtonElement>
    className: string,
    children: ReactNode,
    type?: "button" | "submit" | "reset";
    disable: boolean
}

export default function MyButton(props: AppProp) {

    const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {

        if (!props.disable)
            props.onClickHandler(event);

        else
            event.preventDefault();
    };

    return (
        <button type={props.type} className={`my-button ${props.className} ${ props.disable ? "button-disable" : ""}`} onClick={onClickHandler}>
            {(props.children) ? props.children : '버튼'}
        </button>
    )
};

MyButton.defaultProps = {
    className: "",
    children: "버튼",
    disable: false
};
