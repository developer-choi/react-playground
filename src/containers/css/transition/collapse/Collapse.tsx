import * as React from "react";
import {Component} from "react";
import MyButton from "../../../../components/form/MyButton";
import "./Collapse.scss";

interface AppProp {

}

interface AppState {

}

export default class Collapse extends Component<AppProp, AppState> {

    toggleCollapse() {
        document.querySelector(".collapse-content").classList.toggle("open");
    }

    render() {
        return (
            <div className="Collapse-wrap">
                <div>
                    <h2>Collapsible Box</h2>
                    <div className="collapse-btn">
                        <MyButton onClickHandler={this.toggleCollapse}>Toggle Collapse</MyButton>
                    </div>
                    <div className="collapse-content">
                        내용<br/>
                        내용<br/>
                        내용<br/>
                        내용<br/>
                        내용<br/>
                        내용<br/>
                        내용<br/>
                        내용<br/>
                        내용<br/>
                        내용<br/>
                        내용<br/>
                    </div>
                </div>
            </div>
        );
    }
}
