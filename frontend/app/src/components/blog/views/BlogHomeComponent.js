import React, { Component } from "react"
import styles from "./Blog.module.css"
import RightSide from "./RightSide"
import Slider from "react-slick"
import { Link } from "gatsby"
import "./ImageCarousel.css"

export default class BlogHomeComponent extends Component {
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        const settingsSlider = {
            arrows: false,
            autoplay: true,
            variableWidth: false,
            autoplaySpeed: 2000,
            cssEase: "linear",
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: true,
        }

        return (
            <React.Fragment>
                {/* <!-- page blog start --> */}
                <div className={styles.pageBlog}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7 col-lg-8 col-xl-8">
                                <div className={styles.leftSlide}>
                                    <Slider {...settingsSlider}>
                                        {this.props.popularArticles
                                            .getObjectList()
                                            .slice(0, 3)
                                            .map((article, index) => (
                                                <GetSliderBlogPost key={article[0]} article={article[1]} />
                                            ))}
                                    </Slider>
                                </div>
                                <div className={styles.leftPost}>
                                    <div className="row">
                                        {this.props.popularArticles
                                            .getObjectList()
                                            .slice(3, 7)
                                            .map((article, index) => (
                                                <GetLatestBlogPost key={article[0]} article={article[1]} />
                                            ))}
                                    </div>
                                </div>
                                <div className={styles.leftPage}>
                                    <ul className={styles.listInline}>
                                        <li className={"list-inline-item " + styles.left}>
                                            <a href=""></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">1</a>
                                        </li>
                                        <li className="list-inline-item active">
                                            <a href="">2</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">3</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">4</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">5</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">6</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">7</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">8</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">9</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">10</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">11</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">12</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">13</a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="">14</a>
                                        </li>
                                        <li className={"list-inline-item " + styles.right}>
                                            <a href=""></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <RightSide />
                        </div>
                    </div>
                </div>
                {/* <!-- page blog end --> */}
            </React.Fragment>
        )
    }
}

function GetLatestBlogPost(props) {
    let article = props.article
    let updateDate = props.article.getData("updateDate")
    return (
        <div className="col-md-12 col-lg-6 col-xl-6">
            <div className={styles.post}>
                <Link to={"/blog/" + article.getData("slug")}>
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
                </Link>
            </div>
        </div>
    )
}

function GetSliderBlogPost(props) {
    let article = props.article

    return (
        <div className={styles.slide}>
            <img src={article.getData("thumbnailLarge")} alt={article.getData("thumbnailAltTags")} title="" />
            <div className={styles.title}>{article.getData("title")}</div>
        </div>
    )
}
