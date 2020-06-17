import React, {ChangeEvent} from "react";

interface AppProp {
    valueAndLabelArray: Array<{value: string | number, label: string | number}>,
    radioGroupName: string,
    selectValue?: string | number,
    selectHandler: (checkValue: string) => void
}

export default function RadioGroup(props: AppProp) {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.selectHandler(event.target.value);
    };

    const lis = () => {
        return (
            props.valueAndLabelArray.map((valueAndLabel, index) => {

                return (
                    <li key={`li-${index}`}>
                        <input type="radio" name="radioGroupName" value={valueAndLabel.value} onChange={onChangeHandler} checked={props.selectValue == valueAndLabel.value}/>
                        <label>{valueAndLabel.label}</label>
                    </li>
                );

            })
        );
    };

    return (
        <ul className="RadioGroup-wrap">
            {lis()}
        </ul>
    );
}
