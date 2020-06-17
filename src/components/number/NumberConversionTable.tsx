import React from "react";
import "./NumberConversionTable.scss";

export interface NumberConversionTableProp {
    inputs: Array<string | number>;
    functions: Array<(input: string | number) => number>;
}

export default function NumberConversionTable({inputs, functions}: NumberConversionTableProp) {

    const _functions = [undefined, ...functions];

    const firstTr = (
        <tr>
            {_functions.map((item, index) => (
                <td key={`func-${index}`}>
                    {index === 0 ? "Input / Function" : item.name}
                </td>
            ))}
        </tr>
    );

    const restTr = (
        inputs.map((val, rowIndex) => (
            <tr key={`tr-${rowIndex}`}>
                {_functions.map((func, columnIndex) => (
                    <td key={`td-${columnIndex}`}>
                        {columnIndex === 0 ?
                            typeof val === "string" ? <span className="string">{`"${val}"`}</span> : <span className="number">{val}</span>
                            // @ts-ignore
                            : <span className="number">{func(val).toString()}</span>}
                    </td>
                ))}
            </tr>
        ))
    );

    return (
        <table className="NumberConversionTable-wrap">
            <tbody>
                {firstTr}
                {restTr}
            </tbody>
        </table>
    );
}
