import * as React from "react";
import "./StarPoint.scss";

interface StarPointProp {
    value: number,
    max?: number,
    starLength?: number;
    setStarValue?: (value: number) => void;
}

export default function StarPoint({value, max, starLength, setStarValue}: StarPointProp) {

    const valuePerStar = Math.floor(max / starLength);

    const buttons = new Array(starLength).fill("").map((val, index) => {

        const starValue = valuePerStar * (index + 1);

        if(starValue <= value)
            return <button onClick={() => setStarValue?.(starValue)} key={`btn-${index}`} type="button" className={`active ${setStarValue ? "pointer" : ""}`}/>

        else
            return <button onClick={() => setStarValue?.(starValue)} key={`btn-${index}`} type="button" className={`${setStarValue ? "pointer" : ""}`}/>

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
