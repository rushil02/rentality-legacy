import React, { Component } from "react"
import styles from "./Blog.module.css"
import { APIModelListAdapter } from "core/utils/ModelHelper"
import { LatestArticleInfo, Tag } from "../models"
import { getLatestArticles, getPopularTags } from "../services"
import { formatDateMDY } from "core/UIComponents/helpers"
import { Link } from "gatsby"
import { navigate } from "gatsby"

export default class RightSide extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "loading",
            searchValue: "",
            latestArticles: new APIModelListAdapter([], LatestArticleInfo, "slug", "empty"),
            popularTags: new APIModelListAdapter([], Tag, "", "empty"),
        }
    }
    componentDidMount() {
        this.setState(prevState => ({ status: "loading" }))

        getLatestArticles().then(result => {
            this.setState(prevState => ({
                ...prevState,
                latestArticles: new APIModelListAdapter(result, LatestArticleInfo, "slug", "saved"),
            }))
        })

        getPopularTags().then(result => {
            this.setState(prevState => ({
                ...prevState,
                popularTags: new APIModelListAdapter(result, Tag, "", "saved"),
            }))
        })
    }

    onFieldChange = value => {
        this.setState(prevState => ({
            ...prevState,
            searchValue: value,
        }))
    }

    handleSearch = e => {
        navigate("/blog/search?q=" + this.state.searchValue)
    }

    componentWillUnmount() {}

    render() {
        return (
            <React.Fragment>
                <div className="col-md-5 col-lg-4 col-xl-4">
                    <div className={styles.rightSearch}>
                        <div className={styles.title}>Search</div>
                        <div className={styles.form}>
                            <div className="row">
                                <div className="col-md-7 col-lg-8">
                                    <input
                                        type="text"
                                        name=""
                                        className={styles.formControl}
                                        placeholder="Type here to search"
                                        onChange={e => this.onFieldChange(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-5 col-lg-4">
                                    <button
                                        type="button"
                                        className={styles.btn + " btn-link btn-block"}
                                        onClick={this.handleSearch}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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

function slugify(verbose) {
    return verbose
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
}

function GetTag(props) {
    let tagVerbose = props.tag.getData("title")
    return (
        <li className="list-inline-item">
            <Link to={"/blog/tag/" + slugify(tagVerbose)}>{tagVerbose}</Link>
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
                        <img
                            src={article.getData("thumbnail")}
                            className="w-100"
                            alt={article.getData("thumbnailAltTags")}
                            title=""
                        />
                    </div>
                    <div className="col-8">
                        <h1>{article.getData("title")}</h1>
                        <p>{formatDateMDY(article.getData("updateDate"))} </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
