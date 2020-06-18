import React, { Component } from "react"
import BlogHomeComponent from "./BlogHomeComponent"

export default class BlogHomeContainer extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {}
    render() {
        return <BlogHomeComponent />
    }
}
