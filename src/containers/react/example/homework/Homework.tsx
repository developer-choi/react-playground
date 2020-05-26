import * as React from "react";
import "./Homework.scss";
import {imageInfo, loremText} from "../../../../components/homework/dummy";
import HorizontalCard from "../../../../components/homework/HorizontalCard";
import VerticalCard from "../../../../components/homework/VerticalCard";
import {Link} from "react-router-dom";

export default function Homework() {

    return (
        <div className="Homework-wrap">
            <h3>과제 1. 카드 UI</h3>
            <HorizontalCard imageInfo={imageInfo}
                            title={loremText}
                            content={loremText}
                            starPoint={3}
                            author="John Doe"/>
            <div className="item-wrap">
                <div className="item">
                    <VerticalCard imageInfo={imageInfo}
                                  label="Card Label"
                                  title="Card Title"
                                  hightlight="Hightlight"
                                  crossOut="Cross Out"
                                  starPoint={3}
                                  content={loremText}
                                  showAdditional={true}
                                  showContent={true}/>
                </div>
                <div className="item">
                    <VerticalCard imageInfo={imageInfo}
                                  label="Card Label"
                                  title="Card Title"
                                  hightlight="Hightlight"
                                  crossOut="Cross Out"
                                  starPoint={3}
                                  content={loremText}
                                  showAdditional={true}/>
                </div>
                <div className="item">
                    <VerticalCard imageInfo={imageInfo}
                                  label="Card Label"
                                  title="Card Title"
                                  hightlight="Hightlight"
                                  crossOut="Cross Out"
                                  starPoint={3}
                                  content={loremText}/>
                </div>
            </div>
            <ul>
                <li>가로형 / 세로형 카드를 따로 구현했습니다.</li>
                <li>세로형 카드는 크기가 가변형이라서, 컨테이너 안에 넣어서 표시했습니다.</li>
                <li><Link to="/card-example">카드컴포넌트 상세보기 페이지</Link></li>
            </ul>
        </div>
    );
}
