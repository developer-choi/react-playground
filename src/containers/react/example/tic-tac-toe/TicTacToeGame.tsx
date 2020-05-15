import "./TicTacToe.scss";
import TicTacToe, {GameResult} from "./TicTacToe";
import TicTacToeTd from "./TicTacToeTd";
import CircleSymbol from "../../../../components/symbol/CircleSymbol";
import {Component} from "react";
import * as React from "react";

interface AppProp {
    squareCount: number;
    playerList: [string, string];
}

interface AppState {
    message: string
}

export default class TicTacToeGame extends Component<AppProp, AppState> {

    readonly ticTacToe:TicTacToe;
    currentUserIndex: number = 0;

    constructor(props: AppProp) {
        super(props);

        this.ticTacToe = new TicTacToe(props.squareCount);

        this.state = {
            message: `현재 사용자 이름 : ${this.props.playerList[0]}`,
        };

        this.mark = this.mark.bind(this);
    }

    currentSymbol() {

        const currentUser = this.props.playerList[this.currentUserIndex];

        if(this.ticTacToe.gameResult === GameResult.PROCEEDING)
            return <CircleSymbol colorIndex={this.props.playerList.indexOf(currentUser)}/>;

        else
            return null;
    }

    mark(selectIndex: [number, number]) {

        console.log("mark call");

        if(this.ticTacToe.gameResult !== GameResult.PROCEEDING) {
            return;
        }

        const changeUserIndex = (this.currentUserIndex + 1) % 2;
        const markSuccess = this.ticTacToe.mark(selectIndex, this.props.playerList[this.currentUserIndex]);

        if(markSuccess) {

            this.currentUserIndex = changeUserIndex;

            this.setState({
                message: `현재 사용자 이름 : ${this.props.playerList[changeUserIndex]}`
            });
        }

        switch(this.ticTacToe.gameResult) {
            //@ts-ignore
            case GameResult.WHO_WIN:
                const winnerName = this.ticTacToe.winner;

                this.setState({
                    message: `결과 : ${winnerName}님이 우승하셨습니다.`,
                });
                break;

            //@ts-ignore
            case GameResult.TIE:

                this.setState({
                    message: "결과 : 무승부 입니다.",
                });
                break;
        }
    }

    trs() {
        return (
            new Array(this.props.squareCount).fill(undefined).map((val, rowIndex) => {
                return (

                  <tr key={`tr-${rowIndex}`}>
                      {new Array(this.props.squareCount).fill(undefined).map((val, columnIndex) => {

                          return (
                            <TicTacToeTd key={`td-${rowIndex}-${columnIndex}`} rowIndex={rowIndex} columnIndex={columnIndex}
                                         mark={this.mark} cellValue={this.props.playerList.indexOf(this.ticTacToe.cell2dList[rowIndex][columnIndex])}/>
                          );
                      })}
                  </tr>
                );
            })
        );
    }

    render() {

        console.log("render called");

        return (
            <>
                <div className="tic-tac-toe-top">
                    <h2>{this.state.message}</h2>
                    {this.currentSymbol()}
                </div>
                <table className="tic-tac-toe-table">
                    <tbody>
                        {this.trs()}
                    </tbody>
                </table>
            </>
        );
    }
}
