import React from "react";
import MineSweeperTd from "./MineSweeperTd";

interface AppProp {
    rowIndex:number,
    mineMap: Array<Array<number>>
}

interface AppState {

}

export default class MineSweeperTr extends React.Component<AppProp, AppState> {

    render() {

        const mineTds = new Array(this.props.mineMap[this.props.rowIndex].length).fill("").map((item, index) => {
            return <MineSweeperTd key={`td-${index}`} rowIndex={this.props.rowIndex} columnIndex={index} mineMap={this.props.mineMap}/>;
        });

        return (
            <div className="mine-tr">
                {mineTds}
            </div>
        );
    }
}
