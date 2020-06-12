import React, {Component} from "react";
import searchStyles from "search/views/forms/SearchForm.css";
import SearchField from "./fields/LocationSearch/LocationSearchField";
import DateRangePickerComponent from "core/UIComponents/DateRangePicker/DateRangePicker";
import HouseType from "./fields/HouseType/HouseType";
import Rent from "./fields/Rent";
import styles from "./SearchForm.css";
import APIRequestButton from "core/UIComponents/APIRequestButton/APIRequestButton";

export default class SearchForm extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={styles.pageMapFilter + " position-sticky sticky-top"}>
                    <div className="container">
                        <div className="row" id="searchForm">
                            <SearchField
                                value={this.props.searchForm.getData("location")}
                                onChange={this.props.onValueChange}
                                divClass="col-md-2"
                            />
                            <DateRangePickerComponent
                                startDate={this.props.searchForm.getData("startDate")}
                                endDate={this.props.searchForm.getData("endDate")}
                                onChange={this.props.onDateRangeChange}
                                inputClass={searchStyles.formControl + " " + searchStyles.date}
                                divClass={"col-md-3"}
                            ></DateRangePickerComponent>
                            <HouseType
                                value={this.props.searchForm.getData("homeType")}
                                onChange={this.props.onValueChange}
                            />
                            <Rent value={this.props.searchForm.getData("rent")} onChange={this.props.onValueChange} />
                            <div className={"col-md-2 " + styles.fixedHeight}>
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
        );
    }
}
