import React, {Component} from 'react';
import Select from "react-select";
import ScriptLoader from "./PaymentPanel";
import styles from "./HouseDetailPage.css";


const genderSelectStyles = {
    option: (provided, state) => ({
        ...provided,
    }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {...provided, opacity, transition};
    },
    control: (provided, state) => ({
        border: "none",
        cursor: "text",
        display: "flex",
        "flexWrap": "wrap",
        "paddingTop": "6px",
        "paddingBbottom": "6px",
        'height': 'calc(2.25rem + 15px)',
    }),

    container: (provided, state) => ({
        "position": "relative",
        "fontSize": "15px",
        "color": "#495057",
        fontWeight: '400',
        "borderBottom": state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
        "paddingLeft": "0",
        "WebkitTransition": "all 0.30s ease-in-out",
        "Moztransition": "all 0.30s ease-in-out",
        "msTransition": "all 0.30s ease-in-out",
        "OTransition": "all 0.30s ease-in-out",
        "boxShadow": state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial",
    })
};

const genders = {
    'M': 'Male', 'F': 'Female', 'O': 'Other'
};


export default class ApplyPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const getError = (inputKey) => {
            if (props.errors.hasOwnProperty(inputKey)) {
                let errorList = props.errors[inputKey];
                let disp = [];
                for (let i = 0; i < errorList.length; i++) {
                    disp.push(<div key={i} className="invalid-feedback">{props.errors[inputKey]}</div>)
                }
                return <React.Fragment>{disp}</React.Fragment>
            } else {
                return null
            }
        };

        let genderList = [];
        Object.entries(genders).map((item) => {
            genderList.push({value: item[0], label: item[1]})
        });

        const application = this.props.application;

        return (
            <React.Fragment>
                <h3 className={styles.hl3} style={{marginTop: "30px"}}>About Yourself</h3>
                <div className="row">
                    <div className="col-md-5">
                        <div className="input no-background top-margin">
                            <input type="text" className="form-control" placeholder={"First name"}
                                   value={application.getData('firstName')}
                                   onChange={(e) => this.props.onFieldChange("firstName", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="input no-background">
                            <input type="text" className="form-control" placeholder="Last name"
                                   value={application.getData('lastName')}
                                   onChange={(e) => this.props.onFieldChange("lastName", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-1"/>
                    <div className="col-md-5">
                        <div className="input no-background">
                            <input type="text" className="form-control" placeholder="Email Address"
                                   value={application.getData('email')}
                                   onChange={(e) => this.props.onFieldChange("email", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="input no-background">
                            <input type="text" className="form-control" placeholder="Phone number"
                                   value={application.getData('contactNum')}
                                   onChange={(e) => this.props.onFieldChange("contactNum", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-1"/>
                    <div className="col-md-5 col-lg-5">
                        <Select
                            styles={genderSelectStyles}
                            options={genderList}
                            placeholder="Select Gender"
                            onChange={(e) => this.props.onFieldChange("sex", e.value)}
                            value={application.getData('sex') !== "" ?
                                {value: application.getData('sex'), label: genders[application.getData('sex')]}
                                : null
                            }
                        />
                    </div>
                </div>
                <h3 className={styles.hl4}>Message for {this.props.homeOwnerName}</h3>
                <textarea className="form-control" rows="4"
                          placeholder="Who are you? Are you a Student? What do you do?&#10;What're you like as a tenant? Are you quiet? Extrovert?&#10;What brings you here?"
                          value={this.props.application.getData('message')}
                                   onChange={(e) => this.props.onFieldChange("message", e.target.value)}
                />

                <h2 className={styles.hl3} style={{marginTop: "40px"}}>Payment</h2>

                <ScriptLoader/>

                <div className="checkbox auto-width" style={{marginTop: '60px'}}>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" id="checkbox-1" className="custom-control-input"/>
                                <label className="custom-control-label" htmlFor="checkbox-1">I agree to abide by the
                                    owner's house rules</label>
                            </div>
                        </li>
                        <li className="list-inline-item">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" id="checkbox-2" className="custom-control-input"/>
                                <label className="custom-control-label" htmlFor="checkbox-2">I agree to pay the total
                                    amount shown if the host accepts my application</label>
                            </div>
                        </li>
                        <li className="list-inline-item">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" id="checkbox-3" className="custom-control-input"/>
                                <label className="custom-control-label" htmlFor="checkbox-3">I accept Rentality's Terms
                                    and Conditions</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}