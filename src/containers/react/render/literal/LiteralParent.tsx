import React, {useState} from "react";
import LiteralClassChild from "./LiteralClassChild";
import LiteralHooksChild from "./LiteralHooksChild";
import MyButton from "../../../../components/form/MyButton";
import LiteralPureChild from "./LiteralPureChild";

export default function LiteralParent() {

    //@ts-nocheck
    const [forceUpdate, setForceUpdate] = useState([]);

    function setStateForceUpdate() {
        setForceUpdate([]);
    }

    function notLiteralFunc() {
    }

    return (
        <div className="LiteralParent-wrap">
            <LiteralClassChild notLiteralFunc={notLiteralFunc} literalFunc={function () {}}/>
            <LiteralHooksChild notLiteralFunc={notLiteralFunc} literalFunc={function () {}}/>
            <LiteralPureChild notLiteralFunc={notLiteralFunc} literalFunc={function () {}}/>
            <MyButton onClickHandler={setStateForceUpdate}>자식컴포넌트2개 렌더링하기</MyButton>
        </div>
    );
}
