import React, { Component } from "react"
import styles from "./Blog.module.css"
import RightSide from "./RightSide"
import queryString from "query-string"
import { Link } from "gatsby"
import { APIModelListAdapter } from "core/utils/ModelHelper"
import { LatestArticleInfo } from "../models"
import { getSearchArticles } from "../services"

export default class BlogSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "loading",
            searchArticles: new APIModelListAdapter([], LatestArticleInfo, undefined, "empty", ["_source"]),
            searchParam: queryString.parse(this.props.location.search),
        }
    }
    componentDidMount() {
        let searchVal = this.state.searchParam.q
        this.setState(prevState => ({ status: "loading" }))

        getSearchArticles(searchVal.q).then(result => {
            this.setState(prevState => ({
                ...prevState,
                searchArticles: new APIModelListAdapter(result, LatestArticleInfo, undefined, "saved", ["_source"]),
            }))
        })
    }

    componentWillUnmount() {}

    render() {
        let searchArticles = this.state.searchArticles
        let searchVal = this.state.searchParam.q

        return (
            <React.Fragment>
                {/* <!-- page blog start --> */}
                <div className={styles.pageBlog}>
                    <div className="container">
                        <h1 className={styles.title}>Search results for: {searchVal}</h1>
                        <div className="row">
                            <div className="col-md-7 col-lg-8 col-xl-8">
                                <div className="lists">
                                    <div className="row">
                                        {searchArticles.getObjectList().map((article, index) => (
                                            <GetSearchBlogs key={article[0]} article={article[1]} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <RightSide />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function GetSearchBlogs(props) {
    let article = props.article

    return (
        <React.Fragment>
            <div className="col-md-6 col-lg-6">
                <Link to={"/blog/" + article.getData("slug")} className={styles.list}>
                    <div className={styles.image}>
                        <img
                            src={article.getData("thumbnail")}
                            className="w-100"
                            alt={article.getData("thumbnailAltTags")}
                            title=""
                        />
                    </div>
                    <h1>{article.getData("title")}</h1>
                    <h2>{article.getData("abstract")}</h2>
                </Link>
            </div>
        </React.Fragment>
    )
}
