import React, { Component } from "react"
import styles from "./Blog.module.css"
import { PopularArticleInfo } from "../models"
import { APIModelListAdapter } from "core/utils/ModelHelper"
import { getRelatedArticles } from "../services"
import Slider from "react-slick"
import "./ImageCarousel.css"

export default class SingleBlog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "loading",
            relatedArticles: new APIModelListAdapter([], PopularArticleInfo, "slug", "empty"),
        }
    }

    componentDidMount() {
        let relatedTag = this.props.pageContext.article.tags[0]
        console.log(this.props.pageContext.article.tags[0])
        this.setState(prevState => ({ status: "loading" }))

        getRelatedArticles(relatedTag).then(result => {
            this.setState(prevState => ({
                ...prevState,
                status: "done",
                relatedArticles: new APIModelListAdapter(result, PopularArticleInfo, "slug", "saved"),
            }))
        })
    }

    componentWillUnmount() {}

    render() {
        const settingsSlider = {
            arrows: false,
            autoplay: true,
            variableWidth: false,
            autoplaySpeed: 5000,
            cssEase: "linear",
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            swipeToSlide: true,
        }
        let article = this.props.pageContext.article
        return (
            <React.Fragment>
                <div className={styles.pageBlog}>
                    <div className="container">
                        <div className="row">
                            <div className={"col-md-10 col-lg-9 col-xl-9 " + styles.colCentered}>
                                <div className={styles.leftDetail}>
                                    <img
                                        src={article.thumbnail}
                                        className="w-100"
                                        alt={article.thumbnail_alt_tags}
                                        title=""
                                    />
                                    <h1>{article.title}</h1>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className={styles.tag}>
                                                {article.tags.map((tag, index) => tag + ", ")}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={styles.by}>
                                                by: <a href="">Admin</a>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={styles.date}>{formatDate(article.update_time)}</p>
                                    {article.content}
                                    <div className={styles.last}>
                                        <h1>Related Blog</h1>
                                        <Slider {...settingsSlider}>
                                            {this.state.relatedArticles.getObjectList().map((article, index) => (
                                                <GetSliderRelatedPost key={article[0]} article={article[1]} />
                                            ))}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function formatDate(dateStr) {
    if (dateStr) {
        let updateDate = new Date(dateStr)
        return updateDate.getDate() + "." + updateDate.getMonth() + "." + updateDate.getFullYear()
    } else {
        return "N/A"
    }
}

function GetSliderRelatedPost(props) {
    let article = props.article
    let updateDate = article.getData("updateDate")
    return (
        <div className={styles.post}>
            <a href="">
                <img
                    src={article.getData("thumbnailSmall")}
                    className="w-100"
                    alt={article.getData("thumbnailAltTags")}
                    title=""
                />
                <h1>{article.getData("title")}</h1>
                <p>{article.getData("abstract")}</p>
                <div className="row">
                    <div className="col-6">
                        <div className={styles.tag}>{article.getData("tags").map((tag, index) => tag + ", ")}</div>
                    </div>
                    <div className="col-6">
                        <div className={styles.date}>
                            {updateDate.getDate() + "." + updateDate.getMonth() + "." + updateDate.getFullYear()}
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}
