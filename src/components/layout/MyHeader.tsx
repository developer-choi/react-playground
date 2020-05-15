import * as React from "react";
import "./Layout.scss";
import {Link} from "react-router-dom";
import HeaderInfo from "../../classes/layout/HeaderInfo";

interface AppProp {
    headerUls: Array<Array<HeaderInfo>>,
    headerChange: Function
}

export default function MyHeader(props: AppProp) {

    const headerUls = (
        props.headerUls.map((headerUl, ulIndex) => {
            return (
                <ul key={`ul-${ulIndex}`} className="dropdown-ul">
                    {headerUl.map((headerInfo, liIndex) => {

                        if(ulIndex === 0) {
                            return (
                                <li key={`li-${liIndex}`} onClickCapture={() => props.headerChange(headerInfo)} className="dropdown-li"><Link to={headerInfo.to}>{headerInfo.text}</Link></li>
                            );
                        }

                        return (
                            <li key={`li-${liIndex}`} className="dropdown-li"><Link to={headerInfo.to}>{headerInfo.text}</Link></li>
                        );
                    })}
                </ul>
            );
        })
    );

    return (
        <header className="MyHeader-wrap">
            <nav className="dropdown-nav">
                {headerUls}
            </nav>
        </header>
    );
}
