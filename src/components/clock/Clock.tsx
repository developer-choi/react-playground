import * as moment from "moment";
import "./Clock.scss";
import {useEffect, useState} from "react";
import * as React from "react";

export default function Clock() {

    const [dateFormat, setDateFormat] = useState(moment().format("MMMM Do YYYY, h:mm:ss a"));

    useEffect(() => {

        const intervalId = setInterval(() => {
            setDateFormat(moment().format("MMMM Do YYYY, h:mm:ss a"));
        }, 1000);

        return () => {

            clearInterval(intervalId);
        };

    }, []);

    return (
        <div className="Clock-wrap">
            <span>{dateFormat}</span>
        </div>
    );
}
