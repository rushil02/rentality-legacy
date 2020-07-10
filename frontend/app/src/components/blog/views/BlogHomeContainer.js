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
            activePageNo: 1,
            articlesCount: 0,
        }
    }
    componentDidMount() {
        let paginationStart = this.state.activePageNo - 1
        let paginationEnd = this.state.activePageNo + 6
        this.setState(prevState => ({ status: "loading" }))

        getPopularArticles(paginationStart, paginationEnd).then(result => {
            this.setState(prevState => ({
                ...prevState,
                status: "done",
                popularArticles: new APIModelListAdapter(result.data, PopularArticleInfo, "slug", "saved"),
                articlesCount: result.total,
            }))
        })
    }

    handlePagination = pageNo => {
        let noOfPages = Math.ceil(this.state.articlesCount / 7)
        if (pageNo > 0 && pageNo <= noOfPages) {
            let paginationStart = (pageNo - 1) * 7
            let paginationEnd = pageNo * 7
            this.setState(prevState => ({ status: "loading" }))

            getPopularArticles(paginationStart, paginationEnd).then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    status: "done",
                    popularArticles: new APIModelListAdapter(result.data, PopularArticleInfo, "slug", "saved"),
                    activePageNo: pageNo,
                }))
            })
        }
    }
    render() {
        return (
            <BlogHomeComponent
                popularArticles={this.state.popularArticles}
                activePageNo={this.state.activePageNo}
                articlesCount={this.state.articlesCount}
                handlePagination={this.handlePagination}
            />
        )
    }
}
