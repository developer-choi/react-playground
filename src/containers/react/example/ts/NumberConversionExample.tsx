import React from "react";
import "./NumberConversionExample.scss";
import NumberConversionTable from "../../../../components/number/NumberConversionTable";

export default function NumberConversionExample() {

    const inputs1 = ["123456", "-123456", "+123456"];
    const inputs2 = ["123.456", "123abc", "  123456  "];
    const functions = [parseInt, parseFloat, Number];

    return (
        <div className="NumberConversionExample-wrap">
            <h3>정수(양수, 음수)</h3>
            <NumberConversionTable inputs={inputs1} functions={functions}/>
            <h3>소수, 문자포함숫자, 공백포함숫자</h3>
            <NumberConversionTable inputs={inputs2} functions={functions}/>

            <h3>결론(기능)</h3>
            <ul className="list-style-inside">
                <li>parseInt()는 정수형으로 바꿔주고,</li>
                <li>Number()는 parseFloat과 제일 비슷하고,</li>
                <li>Number vs parseXXX는 숫자가 나오는 곳 까지 파싱을 해준다는 차이가 있다.</li>
            </ul>

            <h3>결론(타입)</h3>
            <ul className="list-style-inside">
                <li>parseXXX(str: string)인데, </li>
                <li>Number(val: any)라는 차이가 있다.</li>
            </ul>
        </div>
    );
}
