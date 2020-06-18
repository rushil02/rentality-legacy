import React, { Component } from "react"
import { Router } from "@reach/router"
import ComponentErrorBoundary from "core/errorHelpers/ComponentErrorBoundary"
import BlogHomeContainer from "./views/BlogHomeContainer"
import SingleBlogContainer from "./views/SingleBlogContainer"
import TagRelatedBlogsContainer from "./views/TagRelatedBlogsContainer"
import Error404 from "core/errorHelpers/Error404"

export default class BlogRouter extends Component {
    render() {
        return (
            <React.Fragment>
                <ComponentErrorBoundary>
                    <Router basepath={"/blog"}>
                        <BlogHomeContainer path="/" />
                        <SingleBlogContainer path="/single" />
                        <TagRelatedBlogsContainer path="/tag/tag_name" />
                        <Error404 default />
                    </Router>
                </ComponentErrorBoundary>
            </React.Fragment>
        )
    }
}
