import React, {Component} from "react";
import "./Alert.css";

function adjustHeight(height) {
    var aTop = $(".menu").outerHeight() + 10;
    if (height >= aTop) {
        $(".alerts-holder").css({position: "fixed", top: "10px"});
    } else {
        $(".alerts-holder").css({position: "absolute", top: aTop + "px"});
    }
}

export default class AlertComponent extends Component {
    constructor(props) {
        super(props);
    }

    getClasses() {
        let klassString = "alert alert-" + this.props.details.alertType;

        if (this.props.details.autoHide) {
            klassString += " alert-auto-hide";
        }
        return klassString;
    }

    componentDidMount() {
        $('.alert-auto-hide:not(".no-auto-hide")').delay(4000).slideUp("slow");
        adjustHeight($(window).scrollTop());
        $(window).scroll(function () {
            adjustHeight($(this).scrollTop());
        });
    }

    render() {
        const details = this.props.details;

        return (
            <React.Fragment>
                <div className="alert-row">
                    <div className={this.getClasses()} role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <p className="mb-0">{details.message}</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
