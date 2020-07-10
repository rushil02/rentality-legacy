import React, { Component } from "react"
import styles from "./Blog.module.css"
import { Link } from "gatsby"
import RightSide from "./RightSide"

export default class TagRelatedBlogs extends Component {
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        let tagVerbose = this.props.pageContext.tagAndArticles.verbose
        let articleSet = this.props.pageContext.tagAndArticles.article_set

        return (
            <React.Fragment>
                {/* <!-- page blog start --> */}
                <div className={styles.pageBlog}>
                    <div className="container">
                        <h1 className={styles.title}>Tag: {tagVerbose}</h1>
                        <div className="row">
                            <div className="col-md-7 col-lg-8 col-xl-8">
                                <div className="lists">
                                    <div className="row">
                                        {articleSet.map((article, index) => (
                                            <GetTagRelatedBlog key={index} article={article} />
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

function GetTagRelatedBlog(props) {
    let article = props.article

    return (
        <React.Fragment>
            <div className="col-md-6 col-lg-6">
                <Link to={"/blog/" + article.slug} className={styles.list}>
                    <div className={styles.image}>
                        <img src={article.thumbnail} className="w-100" alt={article.thumbnail_alt_tags} title="" />
                    </div>
                    <h1>{article.title}</h1>
                    <h2>{article.abstract}</h2>
                </Link>
            </div>
        </React.Fragment>
    )
}
