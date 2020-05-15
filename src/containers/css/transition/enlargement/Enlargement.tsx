import * as React from "react";
import "../../util.scss";
import "./Enlargement.scss";
import {SH_IMG_1} from "../../imageSrcs";

export default function Enlargement() {

    return (
        <div className="Enlargement-container">
            <h1>hover됬을 때 이미지 확대 2가지방법</h1>
            <div className="grid-container">
                <div className="hover-container hover-scale-container">
                    <div className="background-image-default hover-scale-item"
                         style={{backgroundImage: `url(${SH_IMG_1})`}}/>
                </div>

                <div className="hover-container hover-scale-container">
                    <img className="hover-scale-item" src={SH_IMG_1} alt=""/>
                </div>
            </div>
        </div>
    );
}
