import React from "react";

export default class UsefulFormBug extends React.Component {

    render() {
        return (
            <form onSubmit={() => window.alert("submitted")}>
                <input type="text" style={{border: "1px solid black"}}/>
                <button style={{border: "1px solid black"}}>제출</button>
            </form>
        );
    }
}
