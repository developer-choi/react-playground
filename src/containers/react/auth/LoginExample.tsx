import AuthButton from "../../../components/form/AuthButton";
import InputItem from "../../../components/form/InputItem";
import React, {ChangeEvent, useState} from "react";

export default function LoginExample() {

    const [id, setId] = useState("ididididididididid");

    const [password, setPassword] = useState("************************");

    const setStateId = (event: ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    };

    const setStatePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div className="LoginExample-wrap">
            <InputItem inputValue={id} labelText="아이디" onChangeHandler={setStateId}/>
            <InputItem inputValue={password} labelText="비밀번호" onChangeHandler={setStatePassword}/>
            <AuthButton/>
        </div>
    );
}
