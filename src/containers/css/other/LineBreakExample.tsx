import * as React from "react";
import "./LineBreakExample.css";

export default function LineBreakExample() {

    return (
        <div className="LineBreakExample-wrap">
            <h3>normal</h3>
            <Sample className="normal"/>

            <h3>white-space-preline</h3>
            <Sample className="white-space-preline"/>

            <h3>white-space-pre</h3>
            <Sample className="white-space-pre"/>
        </div>
    );
}

function Sample({className = "normal"}: {className: string}) {

    const test = "aa\naa";
    const test2 = `aa
                aa`;
    const test3 = `aa
aa`;

    return (
        <div className={`${className}`}>
            <div className="text-view">
                aaaaaaaaaaaa
                aaaaaaaaaaaa
            </div>
            <div className="text-view">
aaaaaaaaaaaa
aaaaaaaaaaaa
            </div>
            <div className="text-view">{test}</div>
            <div className="text-view">{test2}</div>
            <div className="text-view">{test3}</div>
        </div>
    );
}
