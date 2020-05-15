import * as React from "react";
import {useEffect} from "react";
import axios from "axios";

export default function ReactMain() {

    useEffect(() => {
        axios.get("http://hello-world.iptime.org:3000/select/array").then(res => {
            console.log(res);
        });
    });

    return (
        <div>
            Css Main화면입니다.
        </div>
    );
}
