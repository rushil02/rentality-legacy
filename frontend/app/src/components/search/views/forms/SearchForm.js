import React, { Component } from "react"
import SearchField from "./fields/LocationSearch/LocationSearchField"
import DateRangePickerComponent from "core/UIComponents/DateRangePicker/DateRangePicker"
import HouseType from "./fields/HouseType/HouseType"
import Rent from "./fields/Rent"
import styles from "./SearchForm.module.css"
import APIRequestButton from "core/UIComponents/APIRequestButton/APIRequestButton"

export default class SearchForm extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={styles.pageMapFilter + " position-sticky sticky-top"}>
                    <div className="container">
                        <div className="row justify-content-center" id="searchForm">
                            <SearchField
                                value={this.props.searchForm.getData("location")}
                                onChange={this.props.onValueChange}
                                divClass="col-md-2 col-lg-2"
                            />
                            <DateRangePickerComponent
                                startDate={this.props.searchForm.getData("startDate")}
                                endDate={this.props.searchForm.getData("endDate")}
                                onChange={this.props.onDateRangeChange}
                                inputClass={styles.formControl + " " + styles.date}
                                divClass={"col-md-4 col-lg-3"}
                            />
                            <HouseType
                                value={this.props.searchForm.getData("homeType")}
                                onChange={this.props.onValueChange}
                            />
                            <Rent value={this.props.searchForm.getData("rent")} onChange={this.props.onValueChange} />
                            <div className={"col-md-3 col-lg-2 " + styles.fixedHeight + " " + styles.mt12}>
                                <APIRequestButton
                                    layoutClasses={"imp-button-style btn"}
                                    cTextOptions={{
                                        default: "Search",
                                        loading: "",
                                        done: "Search",
                                        error: "Error!",
                                    }}
                                    containerID={"searchForm"}
                                    callback={this.props.onSearchClicked}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
