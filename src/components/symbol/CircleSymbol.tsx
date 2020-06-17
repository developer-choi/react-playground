import React, {PureComponent} from "react";
import {CircleSymbolEnum} from "./CircleSymbolEnum";
import "./CircleSymbol.scss";

interface AppProp {
    colorIndex: number
}

export default class CircleSymbol extends PureComponent<AppProp> {

    constructor(props: AppProp) {
        super(props);

        this.circleColorClass = this.circleColorClass.bind(this);
    }

    circleColorClass() {

        return CircleSymbolEnum[this.props.colorIndex];
    }

    render() {
        return (
            <div className={`CircleSymbol circle ${this.circleColorClass()}`}>
            </div>
        );
    }
}
