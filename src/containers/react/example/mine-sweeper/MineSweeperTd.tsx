import React from "react";

interface AppProp {

    rowIndex: number,
    columnIndex: number,
    mineMap: Array<Array<number>>
}

interface AppState {

}

export default class MineSweeperTd extends React.Component<AppProp, AppState> {

    render() {
        return (
            <div className="mine-td">
                {this.props.mineMap[this.props.rowIndex][this.props.columnIndex]}
            </div>
        );
    }
}
