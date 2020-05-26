import * as React from "react";
import "./HorizontalCard.scss";
import {ImageInfo} from "./ImageInfo";
import StarPoint from "./StarPoint";
import RatioImage from "./RatioImage";

export interface HorizontalCardProp {
    imageInfo: ImageInfo;
    title: string;
    content: string;
    starPoint: number;
    author: string;
}

export default function HorizontalCard({imageInfo, author, content, starPoint, title}: HorizontalCardProp) {

    return (
        <div className="HorizontalCard-wrap">
            <RatioImage src={imageInfo.src}/>
            <div className="right-wrap">
                <div className="title">{title}</div>
                <div className="content">{content}</div>
                <div className="star-author-wrap">
                    <StarPoint value={starPoint}/>
                    <span className="author">{author}</span>
                </div>
            </div>
        </div>
    );
}
