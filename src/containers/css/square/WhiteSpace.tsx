import * as React from "react";
import "./WhiteSpace.scss";

interface AppProp {

}

interface AppState {

}

export default class WhiteSpace extends React.Component<AppProp, AppState> {

    render() {
        return (
            <div>
                <div className="white-space-container">
                    <div className="white-space-item">
                        <span>inline-block으로 바꾼 span</span>
                    </div>

                    <div className="white-space-item">
                        <button>버튼</button>
                    </div>

                    <div className="white-space-item">
                        <input type="text"/>
                    </div>

                    <div className="white-space-item">
                        <input type="button" value="input-button"/>
                    </div>

                    <div className="white-space-item">
                        <div>div를 inline-block으로.</div>
                    </div>

                    <div className="white-space-item naver-search">
                <span>
                    <input/>
                </span>
                        <button>버튼</button>
                    </div>
                </div>
            </div>
        );
    }
}
