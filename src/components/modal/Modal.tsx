import React, {ReactNode} from "react";
import "./Modal.scss";

interface AppProp {
    children: ReactNode;
    openModal: boolean;
    className?: string;
}

export default function Modal(props: AppProp) {

    const display = (props.openModal) ? "block" : "none";

    if(props.openModal) {
        document.body.style.overflow = "hidden";

    } else {
        document.body.style.overflow = "auto";
    }

    return (
        <div style={{display}} className={`Modal-wrap ${props.className}`}>
            <div className="Modal-wrap-content">
                {props.children}
            </div>
        </div>
    );
}
