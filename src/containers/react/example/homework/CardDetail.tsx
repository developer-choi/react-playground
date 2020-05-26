import * as React from "react";
import "./CardDetail.scss";
import {useState} from "react";
import StarPoint from "../../../../components/homework/StarPoint";
import {
    horizonImageInfo,
    imageInfo, longText,
    middleText,
    shortText,
    verticalImageInfo
} from "../../../../components/homework/dummy";
import RatioImage from "../../../../components/homework/RatioImage";
import HorizontalCard from "../../../../components/homework/HorizontalCard";
import VerticalCard from "../../../../components/homework/VerticalCard";

export default function CardDetail() {

    const [starValue, setStarValue] = useState(3);

    const setStateStarValue = (value: number) => {
        setStarValue(value);
    };

    return (
        <div className="CardDetail-wrap">

            <h3>테스트에 사용된 이미지 원본 사이즈</h3>
            <div className="item">
                <img src={imageInfo.src}/>
                <img src={verticalImageInfo.src}/>
                <img src={horizonImageInfo.src}/>
            </div>

            <h3>RatioImage 컴포넌트</h3>

            <div className="item ratio-info">
                <RatioImage src={imageInfo.src}/>
                <RatioImage src={verticalImageInfo.src}/>
                <RatioImage src={horizonImageInfo.src}/>
            </div>
            <ul>
                <li>이미지 비율을 1대1에 맞게 가운데만 보여줍니다.</li>
            </ul>

            <div className="item">

            </div>

            <h3>StarPoint 컴포넌트</h3>
            <div className="item">
                별점 : {starValue}
                <StarPoint value={starValue} setStarValue={setStateStarValue}/>
            </div>
            <ul>
                <li>클릭 또는 탭으로 이동 후 엔터했을 때 별점을 리렌더링 하는 기능도 같이 넣었습니다.</li>
                <li>하지만 과제에서는 별점을 보여주는 역할만 수행합니다.</li>
            </ul>

            <h3>텍스트 길이 & 가변형</h3>
            <div className="item">
                <HorizontalCard imageInfo={verticalImageInfo} title={shortText} content={shortText} starPoint={2} author={shortText}/>
                <HorizontalCard imageInfo={horizonImageInfo} title={middleText} content={middleText} starPoint={2} author={middleText}/>
                <HorizontalCard imageInfo={imageInfo} title={longText} content={longText} starPoint={2} author={longText}/>
            </div>
            <div className="item">
                <div className="small">
                    <VerticalCard label={longText} starPoint={1} content={longText} crossOut={longText} hightlight={longText} imageInfo={imageInfo} title={longText}/>
                </div>
                <div className="middle">
                    <VerticalCard label={middleText} starPoint={1} content={middleText} crossOut={middleText} hightlight={middleText} imageInfo={imageInfo} title={middleText}/>
                </div>
                <div className="big">
                    <VerticalCard label={shortText} starPoint={1} content={shortText} crossOut={shortText} hightlight={shortText} imageInfo={imageInfo} title={shortText}/>
                </div>
            </div>
            <ul>
                <li>가로형 카드는 가변이 되는게 어색하다고 판단하여, 세로형 카드만 가변이 되도록 구현하였습니다.</li>
                <li>세로형 카드는 컨테이너의 width 100%만큼 늘어납니다. (예시는 컨테이너에 padding 부여)</li>
                <li>세로형 카드의 내용, 별점이 안보이는 조건이 언제일지 전혀 예측되지 않아서, boolean prop으로 숨기고 보이는것으로 구현했습니다.</li>
            </ul>
        </div>
    );
}
