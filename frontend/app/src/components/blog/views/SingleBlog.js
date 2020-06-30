import React, { Component } from "react"
import styles from "./Blog.module.css"
import RightSide from "./RightSide"

export default class SingleBlog extends Component {
    componentDidMount() {
        console.log(this.props.pageContext)
    }

    componentWillUnmount() {}

    render() {
        console.log(this.props.pageContext)
        return (
            <React.Fragment>
                <div className={styles.pageBlog}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7 col-lg-8 col-xl-8">
                                <div className={styles.leftDetail}>
                                    <img
                                        src="/static/image/page-blog/left-detail/1.png"
                                        className="w-100"
                                        alt=""
                                        title=""
                                    />
                                    <h1>Houses for you by a travel</h1>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className={styles.tag}>exchange nigerian naira, naira to dolar</div>
                                        </div>
                                        <div className="col-6">
                                            <div className={styles.by}>
                                                by: <a href="">Admin</a>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={styles.date}>20.07.2018</p>
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
                                        <h1>Latest Blog</h1>
                                        <div className="loop owl-carousel owl-theme">
                                            <div className="item">
                                                <div className="row">
                                                    <div className="col-md-12 col-lg-6 col-xl-6">
                                                        <div className={styles.post}>
                                                            <a href="">
                                                                <img
                                                                    src="/static/image/page-blog/left-detail/last-1.png"
                                                                    className="w-100"
                                                                    alt=""
                                                                    title=""
                                                                />
                                                                <h1>
                                                                    Runaway black market - gap between exchange rates
                                                                    near widest since devaluation
                                                                </h1>
                                                                <p>
                                                                    One of the pertinent factors that contribute to the
                                                                    aesthetics and vividness of a city is its lighting.
                                                                    Proper illumination of the urban space after the
                                                                    sunset makes the city
                                                                </p>
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <div className={styles.tag}>
                                                                            exchange nigerian naira, naira to dolar
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className={styles.date}>10.11.2018</div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 col-lg-6 col-xl-6">
                                                        <div className={styles.post}>
                                                            <a href="">
                                                                <img
                                                                    src="/static/image/page-blog/left-detail/last-2.png"
                                                                    className="w-100"
                                                                    alt=""
                                                                    title=""
                                                                />
                                                                <h1>
                                                                    Nigerian foreign reserves fall 20.5 pct to $23.95
                                                                    bln by Oct. 27 -central bank – Reuters
                                                                </h1>
                                                                <p>
                                                                    One of the pertinent factors that contribute to the
                                                                    aesthetics and vividness of a city is its lighting.
                                                                    Proper illumination of the urban space after the
                                                                    sunset makes the city
                                                                </p>
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <div className={styles.tag}>
                                                                            exchange nigerian naira, naira to dolar
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className={styles.date}>10.11.2018</div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
