import * as React from "react";
import MineSweeperTr from "./MineSweeperTr";
import mineMapInit from "./mineMapInit";
import "./MineSweeper.scss";

interface AppProp {

}

interface AppState {
    mineMap: Array<Array<number>>,
}

export default class MineSweeper extends React.Component<AppProp, AppState> {

    constructor(props: any) {
        super(props);

        this.state = ({
            mineMap: mineMapInit([
                [-1, 0, 0, 0, 0],
                [0, -1, 0, 0, 0],
                [0, 0, -1, 0, 0],
                [0, -1, 0, -1, 0],
                [-1, 0, 0, 0, -1],
            ])
        });
    }



    render() {

        const mineTrs = Array(this.state.mineMap.length).fill("").map((item, index) => {

            return (
                <MineSweeperTr key={`tr-${index}`} rowIndex={index} mineMap={this.state.mineMap}/>
            );
        });

        return (
            <div className="MineSweeper-wrap">
                {mineTrs}
            </div>
        );
    }
}
