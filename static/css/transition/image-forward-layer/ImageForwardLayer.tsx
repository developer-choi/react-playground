import React from "react";
import "../../util.scss";
import "../../color.scss";
import "./ImageForwardLayer.scss";

export default function ImageForwardLayer() {

    return (
        <div className="ImageForwardLayer-container hover-container forward-layer-container">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrYLqm52KIn6zAH25GbsJDnYEkuEgkIYwLxPz0uEpot0UgxGIr" alt=""/>
            <div className="background-black forward-layer">
                <div className="text-layer">
                    hello world
                </div>
            </div>
        </div>
    );
}
