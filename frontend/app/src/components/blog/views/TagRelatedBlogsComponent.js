import React, { Component } from "react"
import styles from "./Blog.module.css"
import RightSide from "./RightSide"

export default class TagRelatedBlogsComponent extends Component {
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <React.Fragment>
                {/* <!-- page blog start --> */}
                <div className={styles.pageBlog}>
                    <div className="container">
                        <h1 class={styles.title}>Tag: Tag Name</h1>
                        <div className="row">
                            <div className="col-md-7 col-lg-8 col-xl-8">
                                <div className="lists">
                                    <div className="row">
                                        <GetTagRelatedBlog />
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

function GetTagRelatedBlog(props) {
    // let house = props.blog
    // let mainDivClass = props.mainDivClass

    return (
        <React.Fragment>
            <div className="col-md-6 col-lg-6">
                <a
                    href="singleblogurl"
                    // {reverse(routes.react.apply.houseInfo, { houseUUID: house.getData("uuid") })}
                    className={styles.list}
                >
                    <div className={styles.image}>
                        <img src="/static/image/page-blog/left-post/1.png" className="w-100" alt="" title="" />
                    </div>
                    <h1>Blog Title</h1>
                    <h2>Something Else</h2>
                </a>
            </div>
            <div className="col-md-6 col-lg-6">
                <a
                    href="singleblogurl"
                    // {reverse(routes.react.apply.houseInfo, { houseUUID: house.getData("uuid") })}
                    className={styles.list}
                >
                    <div className={styles.image}>
                        <img src="/static/image/page-blog/left-post/1.png" className="w-100" alt="" title="" />
                    </div>
                    <h1>Blog Title</h1>
                    <h2>Something Else</h2>
                </a>
            </div>
        </React.Fragment>
    )
}
