import React from "react";
import MyAside from "./MyAside";
import AppMain from "./AppMain";

export default function MySection() {

    return (
        <section className="MySection-wrap">
            <MyAside/>
            <AppMain/>
        </section>
    );
}
