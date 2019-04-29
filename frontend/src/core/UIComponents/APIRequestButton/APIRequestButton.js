import React, {Component} from 'react';

import {PulseLoader} from "react-spinners";

const textOptions = {
    save: {
        default: 'Save',
        loading: 'Saving',
        done: 'Saved',
        error: 'Error!'
    }
};

export default class APIRequestButton extends Component {
    constructor(props) {
        super(props);
        this.textOptions = textOptions[props.textOption] || props.cTextOptions;
        this.state = {
            loading: false,
            text: this.textOptions.default
        }
    }

    onActionClick = (e) => {
        this.setState({loading: true, text: this.textOptions.loading});
        this.props.callback(e)()
            .then(() => {
                this.setState({loading: false, text: this.textOptions.done})
            })
            .catch(() => {
                this.setState({loading: false, text: this.textOptions.error})
            })
    };

    render() {
        return (
            <a type="button"
               className={this.props.layoutClasses || ""}
               onClick={this.onActionClick}
            ref={(btnLink)=> this.btnLink = btnLink}>

                {this.state.loading ?
                    <div style={{
                        "textAlign": "center",
                        float: "left",
                        position: "relative",
                        width: "40%",
                        "paddingRight": "10px"
                    }}>
                        <PulseLoader
                            // css={override}
                            sizeUnit={"px"}
                            size={this.props.loaderSize || 8}
                            color={this.props.loaderColor || '#3fc692'}
                            loading={true}
                        />
                    </div>
                    : null
                }
                <div style={{"textAlign": "center", float: "right", position: "relative", width: "auto"}}>
                    {this.state.text}
                </div>
            </a>
        )
    }
}