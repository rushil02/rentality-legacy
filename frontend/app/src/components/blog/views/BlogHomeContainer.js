import React, { Component } from "react"
import BlogHomeComponent from "./BlogHomeComponent"
import { PopularArticleInfo } from "../models"
import { getPopularArticles } from "../services"
import { APIModelListAdapter } from "core/utils/ModelHelper"

export default class BlogHomeContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "loading",
            popularArticles: new APIModelListAdapter([], PopularArticleInfo, "slug", "empty"),
        }
    }
    componentDidMount() {
        this.setState(prevState => ({ status: "loading" }))

        getPopularArticles().then(result => {
            this.setState(prevState => ({
                ...prevState,
                status: "done",
                popularArticles: new APIModelListAdapter(result, PopularArticleInfo, "slug", "saved"),
            }))
        })
    }
    render() {
        return <BlogHomeComponent popularArticles={this.state.popularArticles} />
    }
}
