import React, {MouseEventHandler} from "react";
import Square from "./Square";

interface AppProp {
    currentIndex: number;
    squareArray: Array<{
        square: number,
        onClickHandler: MouseEventHandler<HTMLDivElement>
        capture?: boolean;
    }>;
}

export default function OverlapSquare(props: AppProp) {

    const currentSquare = props.squareArray[props.currentIndex];

    if (props.currentIndex < props.squareArray.length) {

        return (
            <Square square={currentSquare.square} isCenter={props.currentIndex > 0}
                    onClickHandler={currentSquare.onClickHandler} capture={currentSquare.capture}>
                <OverlapSquare currentIndex={props.currentIndex + 1} squareArray={props.squareArray}/>
            </Square>
        );

    } else {
        return null;
    }
}

OverlapSquare.defaultProps = {
    currentIndex: 0
};
