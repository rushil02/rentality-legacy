import React, { Component } from "react"
import HouseComponent from "./HouseComponent"
import { ComponentLoadingSpinner, ResponseLoadingSpinner } from "core/UIComponents/loadingSpinners/LoadingSpinner"
import styles from "./HouseComponent.module.css"

export default class SearchPageContent extends Component {
    componentDidMount() {
        window.addEventListener("scroll", this.props.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.props.handleScroll)
    }

    render() {
        if (this.props.loading) {
            return <ComponentLoadingSpinner />
        } else {
            if (!this.props.houses.getList().length) {
                return (
                    <React.Fragment>
                        <div
                            className="container"
                            style={{
                                padding: "24vh 0",
                            }}
                        >
                            <div className="row">
                                <div className="col-sm-3" />
                                <div className="col-sm-6">
                                    <p
                                        className="card-text"
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        Sorry, We couldn't find anything relevant to your preference.
                                    </p>
                                </div>

                                <div className="col-sm-3" />
                            </div>
                        </div>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <div className={styles.pageMap}>
                            <div className="container">
                                <div className="lists">
                                    <div className="row" id="search-results">
                                        {this.props.houses.getObjectList().map(data => {
                                            return <HouseComponent key={data[0]} house={data[1]} />
                                        })}
                                    </div>
                                </div>
                            </div>
                            {this.props.loadMore ? <ResponseLoadingSpinner /> : null}
                        </div>
                    </React.Fragment>
                )
            }
        }
    }
}
