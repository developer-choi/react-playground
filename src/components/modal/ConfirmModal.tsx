import React from "react";
import "./ConfirmModal.scss";
import Modal from "./Modal";
import MyButton from "../form/MyButton";

export interface ConfirmModalProp {
    open: boolean;
    setOpen: (open: boolean) => void;
    className: string;
    title: string;
    content: string;
    onCancel?: () => void;
    onConfirm?: () => void;
}

export default function ConfirmModal({open, setOpen, className, title, content, onCancel, onConfirm}: ConfirmModalProp) {

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
