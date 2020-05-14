import * as React from "react";
import {useState} from "react";
import MyHeader from "./MyHeader";
import MySection from "./MySection";
import MyFooter from "./MyFooter";
import {reactHeader} from "./header/ReactHeader";
import {cssHeader} from "./header/CssHeader";
import HeaderInfo from "../../classes/layout/HeaderInfo";
import {getPathDirectoryName} from "../../utils/common/UrlUtil";

export default function Layout() {

    const getHeader = (firstPath: string): Array<Array<HeaderInfo>> => {

        switch (firstPath) {
            case "css":
                return cssHeader;

            default:
                return reactHeader;
        }
    };

    const [headerUls, setHeaderUls] = useState(() => {

        const firstPath = getPathDirectoryName(location.pathname, 0);
        return getHeader(firstPath);
    });

    const headerChange = (headerInfo: HeaderInfo) => {

        const firstPath = getPathDirectoryName(headerInfo.to, 0);
        const header = getHeader(firstPath);
        setHeaderUls(header);
    };

    return (
        <>
            <MyHeader headerUls={headerUls} headerChange={headerChange}/>
            <MySection/>
            <MyFooter/>
        </>
    );
};
