import * as React from "react";
import "./VerticalCard.scss";
import {ImageInfo} from "./ImageInfo";
import RatioImage from "./RatioImage";
import StarPoint from "./StarPoint";

export interface VerticalCardProp {
    imageInfo: ImageInfo;
    label: string;
    title: string;
    hightlight: string;
    crossOut: string;
    starPoint: number;
    content: string;
    showAdditional: boolean;
    showContent: boolean;
}

export default function VerticalCard({imageInfo, hightlight, content, crossOut, label, showContent, showAdditional, starPoint, title}: VerticalCardProp) {

    console.log(showAdditional, showContent);

    return (
        <div className="VerticalCard-wrap">
            <RatioImage src={imageInfo.src}/>
            <div className="middle-wrap">
                <div className="label">{label}</div>
                <div className="title">{title}</div>
                <div className="hightlight-cross-out">
                    <span className="hightlight">{hightlight}</span>
                    <span className="cross-out">{crossOut}</span>
                </div>
                {showAdditional && <div className="bottom-wrap">
                    <StarPoint value={starPoint}/>
                    {showContent && <div className="content">{content}</div>}
                </div>}
            </div>
        </div>
    );
}

VerticalCard.defaultProps = {
    showAdditional: false,
    showContent: false
};
