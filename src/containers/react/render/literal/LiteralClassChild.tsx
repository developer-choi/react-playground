import * as React from "react";
import {LiteralTestProp} from "./LiteralTestProp";
import {Component} from "react";

export default class LiteralClassChild extends Component<LiteralTestProp> {

    shouldComponentUpdate(nextProps: Readonly<LiteralTestProp>, nextState: Readonly<{}>, nextContext: any): boolean {

        console.log("class literal--", this.props.literalFunc === nextProps.literalFunc);
        console.log("class notLiteral--", this.props.notLiteralFunc === nextProps.notLiteralFunc);
        return true;
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        console.log("class component updated");
    }

    render() {
        return (
            <div className="LiteralClassChild-wrap">
                class child
            </div>
        );
    }
}
