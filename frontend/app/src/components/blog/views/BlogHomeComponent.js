import React, { Component } from "react"
import styles from "./Blog.module.css"
import RightSide from "./RightSide"

export default class BlogHomeComponent extends Component {
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <React.Fragment>
                {/* <!-- page blog start --> */}
                <div className={styles.pageBlog}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7 col-lg-8 col-xl-8">
                                <div className={styles.leftSlide}>
                                    <div className="loop owl-carousel owl-theme">
                                        {/* loop through main slider blogs */}
                                        <GetSliderBlogPost />
                                    </div>
                                </div>
                                <div className={styles.leftPost}>
                                    <div className="row">
                                        {/* loop through normal blog posts */}
                                        <GetLatestBlogPost />
                                    </div>
                                </div>
                                <div className={styles.leftPage}>
                                    <ul className="list-inline">
                                        <li className="list-inline-item left">
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
                                        <li className="list-inline-item right">
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
    // let blogPost = props.blogPost
    return (
        <div className="col-md-12 col-lg-6 col-xl-6">
            <div className={styles.post}>
                <a href="">
                    <img src="/static/image/page-blog/left-post/1.png" className="w-100" alt="" title="" />
                    <h1>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna
                    </h1>
                    <p>
                        One of the pertinent factors that contribute to the aesthetics and vividness of a city is its
                        lighting. Proper illumination of the urban space after the sunset makes the city
                    </p>
                    <div className="row">
                        <div className="col-6">
                            <div className={styles.tag}>exchange nigerian naira, naira to dolar</div>
                        </div>
                        <div className="col-6">
                            <div className={styles.date}>10.11.2018</div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}

function GetSliderBlogPost(props) {
    //let blogPost = props.blogPost
    return (
        <div className="item">
            <div className={styles.slide}>
                <img src="/static/image/page-blog/left-slide/1.png" alt="" title="" />
                <div className={styles.title}>Over 1,000 firms bid for 2017 railway projects</div>
            </div>
        </div>
    )
}
