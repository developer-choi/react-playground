import * as React from "react";
import "./InputFormDetail.scss";
import InputForm from "../../../../components/homework/InputForm";

export default function InputFormDetail() {

    const initialValue = "this is initial value";
    const placeholderValue = "this is placeholder";
    const onSubmit = (content: string) => {
        alert(`제출된 내용 : ${content}`);
    };

    return (
        <div className="InputFormDetail-wrap">
            <h3>최대 글자 수(30)</h3>
            <InputForm initialInputValue={initialValue} onSubmit={onSubmit} maxContentLength={30}/>
            <h3>최대 글자 수(100)</h3>
            <InputForm placeholder={placeholderValue} onSubmit={onSubmit} maxContentLength={100}/>
            <ul>
                <li>최대 글자 수는 컴포넌트의 prop으로 설정이 가능합니다. (기본값 500)</li>
                <li>초과시 버튼 비활성화 및 안내문구가 강조되어 출력됩니다.</li>
                <li>기타 버튼 비활성화 조건을 만족하는 모든 경우, 키보드로 조작해도 submit은 진행되지 않습니다.</li>
                <li>초기값, 입력값 둘 다 없으면 placeholder가 표시됩니다.</li>
            </ul>

            <h3>disabled상태 (최대 글자 수 500) </h3>
            <InputForm initialInputValue={initialValue} disabled/>

            <h3>readonly상태 (최대 글자 수 500) </h3>
            <InputForm initialInputValue={initialValue} readonly/>

            <h3>(둘 다 아닐 때) 최대 글자 수(5)</h3>
            <InputForm initialInputValue={initialValue} onSubmit={onSubmit} maxContentLength={5}/>

            <ul>
                <li>disable, readonly상태의 경우 초기값은 남은입력글자수 계산에 포함되지않습니다.</li>
                <li>과제에서 disable상태일 때 초기값이 입력되어있는대, 남은 입력글자수가 500으로 표시되는것으로 확인했습니다.</li>
                <li>이 두가지 상태가 아니면, 초기 잔여 입력가능 글자수는 초기값으로 계산되며, 초기값이 초과되도 안내문구가 나옵니다.</li>
            </ul>

            <h3>반응형</h3>
            <div className="item width-300">
                <InputForm initialInputValue={initialValue}/>
            </div>
            <div className="item width-500">
                <InputForm initialInputValue={initialValue}/>
            </div>
            <div className="item width-1000">
                <InputForm initialInputValue={initialValue}/>
            </div>
            <ul>
                <li>컨테이너에 맞게 늘어나지만, 최대길이를 제한했습니다.</li>
            </ul>
        </div>
    );
}
