import * as React from "react";
import BarTexts from "./BarTexts";
import "./BeforeAfterExample.scss";

export default function BeforeAfterExample() {

    return (
        <div className="BeforeAfterExample-wrap">
            <BarTexts texts={["aa"]}/>
            <BarTexts texts={["aa", "bb"]}/>
            <BarTexts texts={["aa", "bb", "cc"]}/>
            <BarTexts texts={["가나다"]}/>
            <BarTexts texts={["가나다", "가나다"]}/>
            <BarTexts texts={["가나다", "가나다", "가나다"]}/>

            <ul className="list-style-inside">
                <li>margin과 padding은 둘다 요소 사이에 거리를 벌릴 수 있지만</li>
                <li>padding은 요소의 너비가 늘어나기 때문에 absolute로 |를 조절하는곳에 응용할 수 있었다는걸 배움.</li>
                <li>사람인에서 |로 단어 좌우 거리벌릴 때 padding margin을 둘다쓰는 이유가 있었음.</li>
            </ul>

            <div className="before-after-child">
                <BarTexts texts={["가나다", "가나다", "가나다"]}/>
            </div>

            <ul className="list-style-inside">
                <li>before, after를 사용하면 child로 들어가기 때문에</li>
                <li>기존거를 relative로 선언하고 before after에 absolute로 하는 패턴이 생긴듯</li>
                <li>before로 들어간 |가 display가 block이니까 마치 자식으로 block요소가 하나 생긴것처럼 화면이 그려짐.</li>
            </ul>
        </div>
    );
}
