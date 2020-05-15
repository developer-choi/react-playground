import * as React from "react";
import {LiteralTestProp} from "./LiteralTestProp";
import {Component} from "react";

export default class LiteralPureChild extends Component<LiteralTestProp> {

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        console.log("pure component updated");
    }

    render() {
        return (
            <div className="LiteralPureChild-wrap">
                pure component child
            </div>
        );
    }
}
