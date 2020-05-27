import * as React from "react";
import "./Homework.scss";
import {imageInfo, loremText} from "../../../../components/homework/dummy";
import HorizontalCard from "../../../../components/homework/HorizontalCard";
import VerticalCard from "../../../../components/homework/VerticalCard";
import {Link} from "react-router-dom";
import InputForm from "../../../../components/homework/InputForm";

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
                <li><Link to="/card-detail">입력컴포넌트 상세보기 페이지</Link></li>
            </ul>

            <h3>과제 2. 입력 폼 UI</h3>
            <InputForm initialInputValue="초기값이 있을 수 있습니다." onSubmit={(content => alert(`제출내용 : ${content}`))}/>
            <InputForm initialInputValue="주문 요청 사항을 입력해주세요." disabled/>
            <InputForm initialInputValue="readonly 상태입니다." readonly/>
            <ul>
                <li>첫 입력을 하기 전에는, 버튼이 보이지 않습니다.</li>
                <li>첫 입력을 하고 나서야 버튼이 보이게 됩니다.</li>
                <li>이후 버튼은 사라지지 않습니다.</li>
                <li><Link to="/input-form-detail">카드컴포넌트 상세보기 페이지</Link></li>
            </ul>
        </div>
    );
}
