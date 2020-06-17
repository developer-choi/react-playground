import React, {ChangeEvent, FormEvent, useRef, useState} from "react";
import "./RefExample.scss";
import MyButton from "../../../components/form/MyButton";
import MyInput from "../../../components/form/MyInput";

export default function RefExample() {

    const [num, setNum] = useState("");
    const [result, setResult] = useState("");
    const inputRef = useRef<HTMLInputElement>();

    const setStateNum = (event: ChangeEvent<HTMLInputElement>) => {
        setNum(event.target.value);
    };

    const answerCheck = (event: FormEvent<HTMLFormElement>) => {

        if(num === "") {
            setResult("아무것도 입력하지않아서 input태그로 포커스 이동");
            inputRef.current.focus();
        }

        else
            setResult("제출 완료");

        event.preventDefault();
    };

    return (
        <div className="RefExample-wrap">
            <h1>Ref Test</h1>

            <form onSubmit={answerCheck}>
                <div>
                    <label>나이</label>
                    <MyInput ref={inputRef} inputValue={num} onChangeHandler={setStateNum}/>
                </div>
                <MyButton>제출</MyButton>
            </form>
            <span>{result}</span>
        </div>
    );
}
