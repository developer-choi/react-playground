import * as React from "react";
import "./StarPoint.scss";
import {MouseEvent} from "react";

interface StarPointProp {
    value: number,
    max?: number,
    starLength?: number;
    setStarValue?: (value: number) => void;
}

export default function StarPoint({value, max, starLength, setStarValue}: StarPointProp) {

    const valuePerStar = Math.floor(max / starLength);

    const firstButtonOnClick = (event: MouseEvent<HTMLButtonElement>) => {

        if (value === valuePerStar && (event.target as HTMLButtonElement).classList.contains("active")) {
            setStarValue?.(0);
        } else {
            setStarValue?.(valuePerStar);
        }
    }

    const buttons = new Array(starLength).fill("").map((val, index) => {

        const starValue = valuePerStar * (index + 1);

        if (index === 0)
            return <button onClick={firstButtonOnClick} key={`btn-${index}`} type="button"
                           className={`${starValue <= value ? "active" : " "} ${setStarValue ? "pointer" : ""}`}/>;

        else
            return <button onClick={() => setStarValue?.(starValue)} key={`btn-${index}`} type="button"
                           className={`${starValue <= value ? "active" : " "} ${setStarValue ? "pointer" : ""}`}/>;

    });

    return (
        <div className="StarPoint-wrap">
            {buttons}
        </div>
    );
}

StarPoint.defaultProps = {
    max: 5,
    starLength: 5
}
