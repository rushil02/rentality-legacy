import React from 'react';
import {ComponentLoadingSpinner} from "core/loadingSpinners/LoadingSpinner";
import styles from "./Rules.css";
import commonStyles from "../FormCommon.css"


export function RulesComponent(props) {
    if (Object.entries(props.data).length === 0) {
        return <ComponentLoadingSpinner/>
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-1"/>
                <div className="col-md-10">
                    <h1 className={commonStyles.pageTitle}>What are your house rules ?</h1>
                    <div className="big-list">
                        {Object.entries(props.data).map((item) =>
                            <ChoiceRuleDOM data={item[1]} key={item[0]}
                                           onCommentChange={props.onCommentChange}
                                           onOptionChange={props.onOptionChange}
                            />
                        )}
                    </div>
                    <div>
                        <h2 className={styles.title}>Is there anything else that your guest need to be be aware of? </h2>
                        <div className="row">
                            <div className="col-md-9 col-lg-9 col-xl-6">
                                <div className="textarea">
                                    <textarea
                                        rows="10"
                                        className={"form-control " + styles.otherRules }
                                        placeholder="Examples -&#10;Noise level&#10;Shared spaces&#10;Animals living on the premise ?&#10;No Shoes in the house ?"
                                        cols="40"
                                        value={props.otherRules}
                                        onChange={(e) => props.onOtherRulesChange(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <p className={styles.noteInfo}>Please Note: these house rules will be accepted by the guest before they book your
                            accommodation.</p>
                    </div>
                </div>
                <div className="col-md-1"/>
            </div>
        </React.Fragment>
    )
}

function ChoiceRuleDOM(props) {
    let options = props.data.getData('options');
    let verbose = props.data.getData('verbose');
    let ruleID = props.data.getData('ruleID');
    let selected = props.data.getData('selected');
    let comment = props.data.getData('comment');
    const getError = (inputKey) => {
        if (props.data.errors.hasOwnProperty(inputKey)) {
            let errorList = props.data.errors[inputKey];
            let disp = [];
            for (let i = 0; i < errorList.length; i++) {
                disp.push(<div key={i} className="invalid-feedback">{props.data.errors[inputKey]}</div>)
            }
            return <React.Fragment>{disp}</React.Fragment>
        } else {
            return null
        }
    };
    return (
        <div className={styles.rule}>
            <h2 className={styles.ruleVerbose}>{verbose}</h2>
            <div className="row">
                <div className="col-md-12 col-lg-12 col-xl-5">
                    <div className="checkbox" style={{marginTop:'23px'}}>
                        {getError('selected')}
                        <ul className="list-inline" style={{marginBottom: '0'}}>
                            {options.map((data) =>
                                <li className={"list-inline-item " + styles.autoWidth} key={data}>
                                    <div className="custom-control">
                                        <div className="form-check" style={{paddingLeft: 0}}>
                                            <input className="form-check-input custom-radio-button" type="radio"
                                                   checked={selected === data} onChange={(e) => {
                                                props.onOptionChange(ruleID, e.target.value)
                                            }}
                                                   id={`${ruleID}-${data}`} name={ruleID} value={data}/>
                                            <label className="form-check-label" htmlFor={`${ruleID}-${data}`}>
                                                {data} </label>
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="col-md-12 col-lg-12 col-xl-7">
                    <div className="input no-background">
                        <input type="text" className={"form-control " + styles.comments}
                               placeholder="Comment or Special Instructions"
                               value={comment} onChange={(e) => {
                            props.onCommentChange(ruleID, e.target.value)
                        }}
                        />
                        {getError('comment')}
                    </div>
                </div>
            </div>
        </div>
    )
}