import React from "react"
import commonStyles from "../FormCommon.module.css"

export function NeighborhoodDescriptorsComponent(props) {
    let addField
    return (
        <React.Fragment>
            <div id="form-8" className="form-series">
                <div className="row">
                    <div className="col-md-1" />
                    <div className="col-md-10">
                        <h1 className={commonStyles.pageTitle}>What is the neighbourhood like?</h1>
                        <div className="black-textarea">
                            <div className="row">
                                <div className="col-md-9 col-lg-9 col-xl-6">
                                    <div className="textarea">
                                        <textarea
                                            name="main-form-neighbourhood_description"
                                            rows="8"
                                            cols="40"
                                            className="form-control"
                                            id="id_main-form-neighbourhood_description"
                                            placeholder="Examples -&#10;10 min walk to university&#10;5 min walk to bus stop or train station&#10;15 min walk to shipping centre"
                                            value={props.otherDescription}
                                            onChange={e => props.onOtherDescriptionChange(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className={commonStyles.pageTitle}>What facilities are there around the area?</h1>
                        <div className="selection">
                            <div className="btn-group btn-group-toggle">
                                {Object.entries(props.data).map(data => (
                                    <NeighbourhoodDescriptor
                                        data={data[1]}
                                        key={data[0].toString()}
                                        onChange={props.onNBDescriptorChange}
                                        objReference={data[0]}
                                    />
                                ))}
                            </div>

                            <div className="row" style={{ marginTop: "50px" }}>
                                <div className="col-md-6">
                                    <div className="input big no-background">
                                        <input
                                            type="text"
                                            className="form-control anything-else"
                                            placeholder="Add other facilities"
                                            ref={input => {
                                                addField = input
                                            }}
                                            onKeyPress={e => {
                                                if (e.key === "Enter") {
                                                    props.onNBDescriptorAdd(addField)
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <button
                                        type="button"
                                        className="default-button-style"
                                        onClick={() => props.onNBDescriptorAdd(addField)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1" />
                </div>
            </div>
        </React.Fragment>
    )
}

function NeighbourhoodDescriptor(props) {
    return (
        <label className={"nearby-facility btn btn-link" + (props.data.getData("checked") ? " active" : "")}>
            <input
                type="checkbox"
                className="nearby-facility"
                onChange={e => {
                    props.onChange(props.objReference, e.target.checked)
                }}
                checked={props.data.getData("checked")}
            />
            {props.data.getData("verbose")}
        </label>
    )
}
