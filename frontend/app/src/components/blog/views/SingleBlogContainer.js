import React, { Component } from "react"
import SingleBlogComponent from "./SingleBlogComponent"

export default class SingleBlogContainer extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {}
    render() {
        return <SingleBlogComponent />
    }
}
