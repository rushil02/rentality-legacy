import { Component } from "react"
import React from "react"
import { ComponentLoadingSpinner } from "core/UIComponents/loadingSpinners/LoadingSpinner"
import Error404 from "./Error404"

export default class RequestErrorBoundary extends Component {
    /**
     Accepts status prop with options - ['done', 'error', 'loading']
     */

    render() {
        if (this.props.status === "loading") {
            return <ComponentLoadingSpinner />
        } else if (this.props.status === "error") {
            return <Error404 />
        } else if (this.props.status === "done") {
            // Normally, just render children
            return this.props.children
        }
    }
}
