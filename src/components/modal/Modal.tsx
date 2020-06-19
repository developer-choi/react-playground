import React, {ReactNode} from "react";
import "./Modal.scss";

export interface ModalProp {
    open: boolean;
    children: ReactNode;
    className: string;
}

export default function Modal({open, children, className}: ModalProp) {

    if(open)
        document.body.style.overflow = "hidden";

    else
        document.body.style.overflow = "initial";

    return (
        <div className={`Modal-wrap ${className} ${open ? "open": ""}`}>
            <div className={`modal-content ${className}`}>
                {children}
            </div>
        </div>
    );
}

Modal.defaultProps = {
    className: ""
};
