import React from "react";
import "./TableLayoutExample.scss";

export default function TableLayoutExample() {

    return (
        <div className="TableLayoutExample-wrap">
            <TableSample className="auto"/>
            <TableSample className="fixed"/>
        </div>
    );
}

function TableSample({className} : {className : string}) {

    return (
        <table className={className}>
            <tr>
                <td>1234567890</td>
                <td>1234567890</td>
            </tr>
            <tr>
                <td>12345678901234567890</td>
                <td>12345678901234567890</td>
            </tr>
            <tr>
                <td>12345678901234567890</td>
                <td>12345678901234567890</td>
            </tr>
        </table>
    );
}
