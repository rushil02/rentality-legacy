import React, { Component } from "react"
import styles from "./Blog.module.css"

export default class RightSide extends Component {
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <React.Fragment>
                <div className="col-md-5 col-lg-4 col-xl-4">
                    <div className={styles.rightPost}>
                        <div className={styles.title}>New Posts</div>
                        {/* loop through popular posts */}
                        <GetPopularBlogPost />
                    </div>
                    <div className={styles.rightTag}>
                        <div className={styles.title}>Tag</div>
                        <ul className="list-inline">
                            {/* loop through tags */}
                            <GetTag />
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function GetTag(props) {
    // let tag = props.tag
    return (
        <li className="list-inline-item">
            <a href="">exchange nigerian naira</a>
        </li>
    )
}

function GetPopularBlogPost(props) {
    // let blogPost = props.blogPost
    return (
        <div className={styles.post}>
            <a href="#">
                <div className="row">
                    <div className="col-4">
                        <img src="/static/image/page-blog/right-post/1.png" className="w-100" alt="" title="" />
                    </div>
                    <div className="col-8">
                        <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</h1>
                        <p>October 15, 2017 </p>
                    </div>
                </div>
            </a>
        </div>
    )
}
