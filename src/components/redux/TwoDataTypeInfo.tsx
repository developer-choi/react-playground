import * as React from "react";

interface TwoDataTypeInfoProp {
    message: string;
    primitive: number;
    reference?: number[];
}

export default function TwoDataTypeInfo(props: TwoDataTypeInfoProp) {

    return (
        <div className="TwoDataTypeInfo-wrap">
            <h1>{props.message}</h1>
            <span>{props.primitive}</span><br/>
            <span>{props.reference}</span>
        </div>
    );
}
