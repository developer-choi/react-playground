import * as React from "react";
import CounterContainer from "./CounterContainer";
import TwiceCounterContainer from "./TwiceCounterContainer";

export default function CounterApp() {

    return (
        <div className="CounterApp-wrap">
            <CounterContainer/>
            <TwiceCounterContainer/>
        </div>
    );
}
