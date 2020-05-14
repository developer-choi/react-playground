import * as React from "react";
import {ChangeEventHandler, forwardRef, RefObject} from "react";

interface AppProp {
    onChangeHandler: ChangeEventHandler<HTMLInputElement>
    inputValue: string | number,
    className?: string,
    type?: string,
    showIncreaseDecreaseButton?: boolean
}

export const MyInput = forwardRef((props: AppProp, ref: RefObject<HTMLInputElement>) => {

    return (
        <input type={props.type} ref={ref}
               value={props.inputValue} onChange={props.onChangeHandler}
               className={`my-input ${props.className} ${ props.showIncreaseDecreaseButton ? "" : "hidden-increase-decrease-button" }`}/>
    )
});

MyInput.defaultProps = {
    className: ""
};

