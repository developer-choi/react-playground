import "./VerticalAlignExample.scss";
import * as React from "react";
import {SH_IMG_1} from "../imageSrcs";

export default function VerticalAlignExample() {

    return (
        <div className="VerticalAlignExample-wrap">

            <b>가볍게 속성 다 둘러봄</b>
            <div className="all-properties-wrap">
                <div className="all-properties-item display-inline-block middle">middle</div>
                <div className="all-properties-item display-inline-block top">top</div>
                <div className="all-properties-item display-inline-block bottom">bottom</div>
                <div className="all-properties-item display-inline-block vertical-align-30px">vertical align 30px</div>
            </div>

            <ul className="list-style-inside mb-30">
                <li>vertical align은 container가 아닌 item에 거는 속성이고,</li>
                <li>위 예제처럼 item끼리 서로 vertical align이 다른 example은 하나도찾지못했으니</li>
                <li>{".top < * { vertical-align: top } 이런식으로 사용할것으로 예상됨."}</li>
            </ul>

            <b>use case는 텍스트와 이미지 정렬</b>
            <div className="all-properties-wrap">
                <span>toptoptoptoptoptop</span>
                <img className="top" src={SH_IMG_1} width="100px" height="100px" alt="우리서현이이미지"/>
            </div>

            <div className="all-properties-wrap">
                <span>bottombottombottombottom</span>
                <img className="bottom" src={SH_IMG_1} width="100px" height="100px" alt="우리서현이이미지"/>
            </div>

            <div className="all-properties-wrap">
                <span>middlemiddlemiddlemiddlemiddle</span>
                <img className="middle" src={SH_IMG_1} width="100px" height="100px" alt="우리서현이이미지"/>
            </div>

            <b>table cell안에서의 정렬 이 있다고함.</b>
            <table>
                <tbody>
                    <tr>
                        <td className="top">top</td>
                        <td className="bottom">bottom</td>
                    </tr>
                    <tr>
                        <td className="baseline">baseline</td>
                        <td className="middle">middle</td>
                    </tr>
                </tbody>
            </table>

            <ul className="list-style-inside mb-30">
                <li>MDN 한국어에서는 inline, table-cell만 된다고하지만, 실제로는 inline-block도 가능.</li>
                <li>MDN 영어에서는 inline, inline-block, table-cell 3개로 명시하고있으니 번역잘못.</li>
                <li>inline-block요소는 흐르기때문에 flex-wrap과 비슷한 효과를 낼 수 있음.</li>
                <li>하지만 여전히 inline-block의 여백은 해결해야하는 문제.</li>
            </ul>

            <div className="all-properties-wrap" style={{height: "300px"}}>
                <div className="all-properties-item display-inline-block top">top</div>
                <div className="all-properties-item display-inline-block bottom">bottom</div>
            </div>

            <ul className="list-style-inside mb-30">
                <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align">These values vertically align the element relative to its parent element:</a></li>
                <li>분명 기준은 부모요소라고 했지만 실제로는 그렇지않음.</li>
                <li>부모요소 height 키워놓고 top bottom vertical align조정했는데 저럼.</li>
            </ul>

            <div className="all-properties-wrap">
                <div className="all-properties-item display-inline-block top" style={{height: "100px"}}>top</div>
                <div className="all-properties-item display-inline-block bottom" style={{height: "300px"}}>bottom</div>
            </div>

            <div className="all-properties-wrap">
                <div className="all-properties-item display-inline-block top" style={{height: "300px"}}>top</div>
                <div className="all-properties-item display-inline-block bottom" style={{height: "100px"}}>bottom</div>
            </div>

            <ul className="list-style-inside mb-30">
                <li>그래서 현재 내 생각은, 기준이 부모의 높이가 아니라,</li>
                <li><b>형제태그의 height로 인해 늘어난 부모의</b> bottom margin edge가 기준이라고 생각함.</li>
            </ul>

            <h3 className="mb-30">vertical align 정리</h3>
            <ul className="list-style-inside mb-30">
                <li>inline, inline-block, table-cell에 적용</li>
                <li>Container가 아닌 Item에 적용하는 속성.</li>

                <li><b>형제태그의 height로 인해 늘어난 부모의</b> bottom margin edge가 기준이라고 이해하고 당분간 활용할 계획이지만, 이게 정답이 아님.</li>
                <li>flex-wrap 흉내가능. 흐르는 성질을 갖고있으므로.</li>
            </ul>

            <div className="pre-line">
                {`.vertical-align-top > * {
                    vertical-align: top;
                }
                
                Code Example은, 하나의 컨테이너 안에있는 자식(손자제외)은 
                모두 같은 vertical-align속성을 갖는 예제가 제일 많았으므로,
                나도 이와 동일하게 적용할 예정.

                같은컨테이너인대 누구는 vertical-align이 top인데 누구는 bottom인 경우는 본적없음.
                `}
            </div>
        </div>
    );
}
