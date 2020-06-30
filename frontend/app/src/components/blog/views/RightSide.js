import React, { Component } from "react"
import styles from "./Blog.module.css"
import { APIModelListAdapter } from "core/utils/ModelHelper"
import { ArticleInfo, Tag } from "../models"
import { getLatestArticles, getPopularTags } from "../services"
import { Link } from "gatsby"

export default class RightSide extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "loading",
            latestArticles: new APIModelListAdapter([], ArticleInfo, "slug", "empty"),
            popularTags: new APIModelListAdapter([], Tag, "", "empty"),
        }
    }
    componentDidMount() {
        this.setState(prevState => ({ status: "loading" }))

        getLatestArticles().then(result => {
            this.setState(prevState => ({
                ...prevState,
                latestArticles: new APIModelListAdapter(result, ArticleInfo, "slug", "saved"),
            }))
        })

        getPopularTags().then(result => {
            this.setState(prevState => ({
                ...prevState,
                popularTags: new APIModelListAdapter(result, Tag, "", "saved"),
            }))
        })
    }

    componentWillUnmount() {}

    render() {
        return (
            <React.Fragment>
                <div className="col-md-5 col-lg-4 col-xl-4">
                    <div className={styles.rightPost}>
                        <div className={styles.title}>New Posts</div>
                        {/* loop through popular posts */}
                        {this.state.latestArticles.getObjectList().map((article, index) => (
                            <GetPopularBlogPost key={article[0]} article={article[1]} />
                        ))}
                    </div>
                    <div className={styles.rightTag}>
                        <div className={styles.title}>Tag</div>
                        <ul className={styles.listInline}>
                            {/* loop through tags */}
                            {this.state.popularTags.getObjectList().map((tag, index) => (
                                <GetTag key={tag[0]} tag={tag[1]} />
                            ))}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function formatDate(date) {
    if (date) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    } else {
        return "N/A"
    }
}

function GetTag(props) {
    let tagTitle = props.tag.getData("title")
    return (
        <li className="list-inline-item">
            <Link to={"/tags/" + tagTitle}>{tagTitle}</Link>
        </li>
    )
}

function GetPopularBlogPost(props) {
    let article = props.article
    return (
        <div className={styles.post}>
            <Link to={"/blog/" + article.getData("slug")}>
                <div className="row">
                    <div className="col-4">
                        <img src={article.getData("thumbnail")} className="w-100" alt="" title="" />
                    </div>
                    <div className="col-8">
                        <h1>{article.getData("title")}</h1>
                        <p>{formatDate(article.getData("updateDate"))} </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
