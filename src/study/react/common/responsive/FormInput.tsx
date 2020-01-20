import * as React from "react";

interface AppProp {
    labelText: string
}

interface AppState {

}

export default class FormInput extends React.Component<AppProp, AppState> {

    static defaultProps = {
        labelText: ""
    };

    renderLabel = (this.props.labelText) ? <label htmlFor="">{this.props.labelText}</label> : '';

    render() {
        return (
            <div className="form-item">
                {this.renderLabel}
                <input/>
            </div>
        )
    }
}
