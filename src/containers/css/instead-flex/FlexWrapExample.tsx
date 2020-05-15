import * as React from "react";
import InputItem from "../../../components/form/InputItem";
import MyButton from "../../../components/form/MyButton";
import "./FlexWrapExample.scss";

export default function FlexWrapExample() {

    return (
        <div className="FlexWrapExample-wrap">
            <div className="vertical-align-top background-wheat" style={{marginBottom: "-20px"}}>
                <form className="trade-market-form display-inline-block">
                    <fieldset className="form-header">거래정보 입력</fieldset>
                    <InputItem labelText="투자 금액" onChangeHandler={() => {}} inputValue={123}/>
                    <InputItem labelText="구매 금액" onChangeHandler={() => {}} inputValue={123}/>
                    <InputItem labelText="판매 금액" onChangeHandler={() => {}} inputValue={123}/>
                    <MyButton onClickHandler={()=>{}}>조회</MyButton>
                </form>
                <form className="trade-market-form display-inline-block">
                    <fieldset className="form-header">거래정보 입력</fieldset>
                    <InputItem labelText="투자 금액" onChangeHandler={() => {}} inputValue={123}/>
                    <InputItem labelText="구매 금액" onChangeHandler={() => {}} inputValue={123}/>
                    <InputItem labelText="판매 금액" onChangeHandler={() => {}} inputValue={123}/>
                    <MyButton onClickHandler={()=>{}}>조회</MyButton>
                </form>
                <form className="trade-market-form display-inline-block">
                    <fieldset className="form-header">거래정보 입력</fieldset>
                    <InputItem labelText="투자 금액" onChangeHandler={() => {}} inputValue={123}/>
                    <InputItem labelText="최대 수량" onChangeHandler={() => {}} inputValue={123}/>
                    <InputItem labelText="판매 금액" onChangeHandler={() => {}} inputValue={123}/>
                    <MyButton onClickHandler={()=>{}}>조회</MyButton>
                </form>
                <form className="trade-market-form display-inline-block">
                    <fieldset className="form-header">거래정보 입력</fieldset>
                    <InputItem labelText="투자 금액" onChangeHandler={() => {}} inputValue={123}/>
                    <InputItem labelText="구매 금액" onChangeHandler={() => {}} inputValue={123}/>
                    <InputItem labelText="판매 금액" onChangeHandler={() => {}} inputValue={123}/>
                    <MyButton onClickHandler={()=>{}}>조회</MyButton>
                </form>
            </div>
            <ul className="mb-30">
                <li>flex-wrap효과 흉내로 좌우에서 세로로 내릴 수는 있으나, 맨 마지막 줄의 item의 margin-bottom때문에,</li>
                <li>container에서 margin-bottom으로 음수마진을 주는쪽으로 보완을 해봤음.</li>
            </ul>
        </div>
    );
}
