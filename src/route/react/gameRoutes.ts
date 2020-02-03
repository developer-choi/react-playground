import MultiplicationTableQuiz from "../../study/react/game/MultiplicationTable/MultiplicationTableQuiz";
import EndingWordGame from "../../study/react/game/EndingWord/EndingWordGame";
import MineSweeper from "../../study/react/game/MineSweeper/MineSweeper";
import TicTacToe from "../../study/react/game/tictactoe/TicTacToe";

export const gameRoutes = [
    {
        path: "/react/game/multiplication-table",
        component: MultiplicationTableQuiz,
        exact: true
    },
    {
        path: "/react/game/ending-game",
        component: EndingWordGame,
        exact: true
    },
    {
        path: "/react/game/mine-sweeper",
        component: MineSweeper,
        exact: true
    },
    {
        path: "/react/game/tic-tac-toe",
        component: TicTacToe,
        exact: true
    },
];