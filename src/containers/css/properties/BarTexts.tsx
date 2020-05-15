import * as React from "react";
import "./BarTexts.scss";

export interface BarTextsProp {
    texts: string[];
}

export default function BarTexts({texts}: BarTextsProp) {

    return (
        <div className="BarTexts-wrap">
            {texts.map((text, index) => <span key={`text-${index}`} className="with-bar">{text}</span>)}
        </div>
    );
}
