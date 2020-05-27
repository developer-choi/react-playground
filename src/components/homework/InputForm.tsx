import * as React from "react";
import {ChangeEvent, FormEvent, useState} from "react";
import "./InputForm.scss";

export interface InputFormProp {
    onSubmit?: (content: string) => void;
    placeholder?: string;
    initialInputValue?: string;
    maxContentLength?: number;
    readonly?: boolean;
    disabled?: boolean;
}

export default function InputForm({placeholder, onSubmit, disabled, initialInputValue, maxContentLength, readonly}: InputFormProp) {

    const [content, setContent] = useState(initialInputValue);
    const [firstInput, setFirstInput] = useState(false);

    const hasInputExceed = inputExceed(content, maxContentLength);
    const canSubmit = !(initialInputValue === content) && content !== "" && !hasInputExceed;

    const getRestInput = (value: string) => {

        if(disabled || readonly) {
            return maxContentLength;

        } else if(inputExceed(value, maxContentLength)) {
            return `최대글자수 를 초과하였습니다. (+${value.length - maxContentLength})`;

        } else {
            return (maxContentLength - value.length).toString();
        }
    };

    const [restInput, setRestInput] = useState(() => getRestInput(initialInputValue));

    const setStateContent = (event: ChangeEvent<HTMLTextAreaElement>) => {

        if(firstInput === false)
            setFirstInput(true);

        setContent(event.target.value);
        setRestInput(getRestInput(event.target.value));
    };

    const onSubmitWrap = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(canSubmit)
            onSubmit?.(content);
    };

    return (
        <form className="InputForm-wrap" onSubmit={onSubmitWrap}>
            <div className="textarea-wrap">
                <textarea placeholder={placeholder} value={content} onChange={setStateContent} disabled={disabled} readOnly={readonly}/>
                <span className={`rest ${hasInputExceed ? "exceed" : ""}`}>{restInput}</span>
            </div>
            {firstInput && <button className={`${canSubmit ? "" : "disable"}`} disabled={disabled}>Save</button>}
        </form>
    );
}

InputForm.defaultProps = {
    initialInputValue: "",
    placeholder: "",
    maxContentLength: 500,
    readonly: false,
    disable: false
};

function inputExceed(value: string, max: number) {
    return value.length > max;
}
