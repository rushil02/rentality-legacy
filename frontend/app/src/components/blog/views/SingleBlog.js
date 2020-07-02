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
            arrows: true,
            autoplay: true,
            variableWidth: false,
            autoplaySpeed: 2000,
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
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
                                        omnis iste
                                    </p>
                                    <p>
                                        natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                                        dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                                        aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                                        dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                                        tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
                                        omnis iste
                                    </p>
                                    <p>
                                        natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                                        dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                                        aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                                        dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                                        tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
                                        omnis iste
                                    </p>
                                    <p>
                                        natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                                        dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                                        aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                                        dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                                        tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                    </p>
                                    <div className={styles.video} data-toggle="modal" data-target="#video">
                                        <img
                                            src="/static/image/page-blog/left-detail/video.png"
                                            className="w-100"
                                            alt=""
                                            title=""
                                        />
                                        <div className="play"></div>
                                    </div>
                                    <div id="video" className="modal fade">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <iframe
                                                    width="600"
                                                    height="400"
                                                    src="https://www.youtube.com/embed/WNeLUngb-Xg"
                                                    frameBorder="0"
                                                    allow="autoplay; encrypted-media"
                                                    allowFullScreen=""
                                                ></iframe>
                                            </div>
                                        </div>
                                    </div>
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
