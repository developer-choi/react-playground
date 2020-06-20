import React, {useState} from "react";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import MyButton from "../../../../components/form/MyButton";

export default function ConfirmModalExample() {

    const [open, setOpen] = useState(false);
    const title = "모달제목";
    const content = "모달내용";

    return (
        <div className="ConfirmModalExample-wrap">
            <MyButton onClickHandler={() => setOpen(true)}>모달 띄우기</MyButton>
            <ConfirmModal open={open} setOpen={setOpen} title={title} content={content}/>
            <div>
                뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>
                뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>
                뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>
                뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>
                뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>
                뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>
                뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>
                뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>뒷배경내용<br/>
            </div>
        </div>
    );
}
