import * as React from "react"
import {MouseEventHandler, ReactNode} from "react"
import "./Square.scss";

interface AppProp {
    square: number;
    onClickHandler?: MouseEventHandler<HTMLDivElement>
    capture: boolean;
    children?: ReactNode;
    isCenter?: boolean;
}

export default function Square(props: AppProp) {

    const cursor = props.onClickHandler ? 'pointer' : "auto";
    const center = props.isCenter ? 'center' : "";
    const style = {width: `${props.square}px`, height: `${props.square}px`, cursor: cursor};

    const onCLick = props.capture ? undefined : props.onClickHandler;
    const onCLickCapture = props.capture ? props.onClickHandler : undefined;

    return (
        <div className={`Square-wrap ${center}`} onClickCapture={onCLickCapture} onClick={onCLick} style={style}>
            {props.children}
        </div>
    )
}
