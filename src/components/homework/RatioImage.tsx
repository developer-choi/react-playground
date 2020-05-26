import * as React from "react";
import "./RatioImage.scss";

export interface RatioImageProp {
    src: string;
}

export default function RatioImage({src}: RatioImageProp) {

    return <div style={{backgroundImage: `url(${src})`}} className="RatioImage"/>;
}
