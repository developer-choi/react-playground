import * as React from "react";
import BarTexts from "./BarTexts";

export default function BeforeAfterExample() {

    return (
        <div className="BeforeAfterExample-wrap">
            <BarTexts texts={["aa"]}/>
            <BarTexts texts={["aa", "bb"]}/>
            <BarTexts texts={["aa", "bb", "cc"]}/>
            <BarTexts texts={["가나다"]}/>
            <BarTexts texts={["가나다", "가나다"]}/>
            <BarTexts texts={["가나다", "가나다", "가나다"]}/>
        </div>
    );
}
