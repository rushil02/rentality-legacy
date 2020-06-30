import React, { Component } from "react"
import BlogHomeComponent from "./BlogHomeComponent"
import { ArticleInfo } from "../models"
import { getPopularArticles } from "../services"
import { APIModelListAdapter } from "core/utils/ModelHelper"

export default class BlogHomeContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "loading",
            popularArticles: new APIModelListAdapter([], ArticleInfo, "slug", "empty"),
        }
    }
    componentDidMount() {
        this.setState(prevState => ({ status: "loading" }))

        getPopularArticles().then(result => {
            this.setState(prevState => ({
                ...prevState,
                status: "done",
                popularArticles: new APIModelListAdapter(result, ArticleInfo, "slug", "saved"),
            }))
        })
    }
    render() {
        return <BlogHomeComponent popularArticles={this.state.popularArticles} />
    }
}
