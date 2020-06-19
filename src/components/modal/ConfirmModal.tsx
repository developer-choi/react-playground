import React, {useState} from "react";
import "./ConfirmModal.scss";
import Modal from "./Modal";
import MyButton from "../form/MyButton";

export interface ConfirmModalProp {
    className: string;
    title: string;
    content: string;
    onCancel?: () => void;
    onConfirm?: () => void;
}

export default function ConfirmModal({className, title, content, onCancel, onConfirm}: ConfirmModalProp) {

    const [open, setOpen] = useState(true);

    const onCancelWrap = () => {
        setOpen(false);
        onCancel?.();
    };

    const onConfirmWrap = () => {
        setOpen(false);
        onConfirm?.();
    };

    return (
        <Modal className={`ConfirmModal-wrap ${className}`} open={open}>
            <span className="title">{title}</span>
            <span className="content">{content}</span>
            <div className="button-wrap">
                <MyButton onClickHandler={onCancelWrap}>Cancel</MyButton>
                <MyButton onClickHandler={onConfirmWrap}>Confirm</MyButton>
            </div>
        </Modal>
    );
}

ConfirmModal.defaultProps = {
    className: ""
};
