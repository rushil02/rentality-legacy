import React, { Component } from "react"
import Slider from "react-slick"
import { UserContext } from "core/auth/userContext"
import { reverse } from "named-urls"
import { PageRoutes } from "components/routes"
import styles from "./App.module.css"
import "./ImageCarousel.css"
import theme from "./SearchInput.module.css"
import Button from "react-bootstrap/Button"
import DateRangePickerComponent from "core/UIComponents/DateRangePicker/DateRangePicker"
import LocationSearchField from "core/UIComponents/LocationESAutosuggest/LocationSearchField"
import { SubscriptionSection } from "./Subscription/SubscriptionSection"
import featuredLogo1 from "images/featured-logo/1.png"
import featuredLogo2 from "images/featured-logo/3.png"
import featuredLogo3 from "images/featured-logo/4.png"
import featuredLogo4 from "images/featured-logo/5.png"
import featuredLogo5 from "images/featured-logo/6.png"

import rentHouse from "images/start-now/1.png"
import lookingForHouse from "images/start-now/2.png"
import melbourneHomePage from "images/cities/melbourne-home-page.jpg"
import perthHomePage from "images/cities/perth-home-page.jpg"
import sydneyHomePage from "images/cities/sydney-home-page.jpg"

function GetRecommendedHouse(props) {
    let house = props.house
    let mainDivClass = props.mainDivClass

    return (
        <div className={mainDivClass}>
            <a href={reverse(PageRoutes.apply.houseInfo, { houseUUID: house.getData("uuid") })} className={styles.list}>
                <div className={styles.image}>
                    <img src={house.getData("thumbnail")} className="w-100" alt="" title="" />
                    <div className="{% if house.is_marked_leased %} leased-img-tag {% else %} d-none {% endif %}">
                        LEASED
                    </div>
                </div>
                <h1>
                    {house.getData("title")}
                    <br />
                    {house.getData("homeType")}
                </h1>
                <h2>{house.getData("location")}</h2>
                <div>
                    Min<span>{house.getData("minStay")}</span>
                </div>
                <div>
                    Rent<span>{house.getData("rent")} AUD/week</span>
                </div>
            </a>
        </div>
    )
}

export default class AppComponent extends Component {
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        const logoImages = [
            { src: featuredLogo1, alt: "" },
            { src: featuredLogo2, alt: "" },
            { src: featuredLogo3, alt: "" },
            { src: featuredLogo4, alt: "" },
            { src: featuredLogo5, alt: "" },
        ]
        const settingsSlider = {
            arrows: false,
            autoplay: true,
            variableWidth: false,
            autoplaySpeed: 2000,
            cssEase: "linear",
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 780,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        }

        return (
            <UserContext.Consumer>
                {userContext => (
                    <React.Fragment>
                        {/* <!-- header start --> */}
                        <div className={styles.header + " d-flex"}>
                            <div className="w-100 align-self-center">
                                <div className="container">
                                    <h1 className={styles.title}>
                                        Creating a Global Community for <br /> Mid-Term Rental
                                    </h1>
                                    <h2 className={styles.subTitle}>Book your Home for the next few months </h2>
                                </div>
                            </div>
                            <div className={styles.search}>
                                <div className={"container-fluid " + styles.searchContainer}>
                                    <div className="row">
                                        <div className="col-xl-1" />
                                        <div className="col-12 col-xl-10">
                                            <div>
                                                <div className={styles.detail}>
                                                    <div className="row" style={{ paddingLeft: "10px" }}>
                                                        <LocationSearchField
                                                            value={this.props.searchForm.getData("location")}
                                                            onChange={this.props.onValueChange}
                                                            divClass={"col-md-5"}
                                                            theme={theme}
                                                        />
                                                        {/* <input
                                                    type="text"
                                                    id="locationID"
                                                    name="location"
                                                    className={
                                                        styles.formControl + " " + styles.marker + " " + styles.search
                                                    }
                                                    placeholder="City, State, Post code"
                                                    required
                                                /> */}
                                                        <DateRangePickerComponent
                                                            startDate={this.props.searchForm.getData("startDate")}
                                                            endDate={this.props.searchForm.getData("endDate")}
                                                            onChange={this.props.onDateRangeChange}
                                                            inputClass={styles.formControl + " " + styles.date}
                                                            divClass={"col-md-4"}
                                                        />
                                                        {/* <div styles="position: relative">
                                                        <div className={styles.dropdown}>
                                                            <input
                                                                type="text"
                                                                id="placeholder-date"
                                                                name="date"
                                                                className={styles.formControl + " " + styles.date}
                                                                readOnly
                                                                required
                                                            />
                                                            <div className="dropdown-menu">
                                                                <div className="calendar"></div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                        <div className="col-md-3">
                                                            <Button
                                                                className={styles.btn + " btn-link btn-block"}
                                                                onClick={this.props.handleSearch}
                                                            >
                                                                Search
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.cityTags}>
                                                <div id="city" className={styles.city}>
                                                    <button
                                                        className={styles.btn + " btn-link"}
                                                        onClick={this.props.handleCityLabel}
                                                    >
                                                        Melbourne
                                                    </button>
                                                    <button
                                                        className={styles.btn + " btn-link"}
                                                        onClick={this.props.handleCityLabel}
                                                    >
                                                        Sydney
                                                    </button>
                                                    <button
                                                        className={styles.btn + " btn-link"}
                                                        onClick={this.props.handleCityLabel}
                                                    >
                                                        Brisbane
                                                    </button>
                                                    <button
                                                        className={styles.btn + " btn-link"}
                                                        onClick={this.props.handleCityLabel}
                                                    >
                                                        Adelaide
                                                    </button>
                                                    <button
                                                        className={styles.btn + " btn-link"}
                                                        onClick={this.props.handleCityLabel}
                                                    >
                                                        Canberra
                                                    </button>
                                                    <button
                                                        className={styles.btn + " btn-link"}
                                                        onClick={this.props.handleCityLabel}
                                                    >
                                                        Perth
                                                    </button>
                                                    <button
                                                        className={styles.btn + " btn-link"}
                                                        onClick={this.props.handleCityLabel}
                                                    >
                                                        Gold Coast
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- header end --> */}

                        {/* <!-- bests start --> */}
                        <div className={styles.bests}>
                            <div className="container">
                                <h1 className={styles.title}>Recommended for you</h1>
                                <div className={styles.lists}>
                                    <div className="row">
                                        {this.props.houses
                                            .getObjectList()
                                            .slice(0, 8)
                                            .map((house, index) => (
                                                <GetRecommendedHouse
                                                    key={house[0]}
                                                    house={house[1]}
                                                    mainDivClass={"col-md-4 col-lg-3"}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- bests end --> */}

                        {/* <!-- video demo --> */}
                        <div className={styles.videoDemo}>
                            <div className="container">
                                <div className={styles.videoHeader}>
                                    <h1 className={styles.title}>How does Rentality Work?</h1>
                                    <h2 className={styles.subTitle}>
                                        Check out the video below to see exactly how easy it is to rent with Rentality.
                                    </h2>
                                </div>
                                <div className={styles.videoContainer}>
                                    <iframe
                                        title={"How Does Rentality Work?"}
                                        src="https://www.youtube.com/embed/2JOkRAdTDNE"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <!-- video demo end --> */}

                        {/* <!-- cities start --> */}
                        <div className={styles.cities}>
                            <div className="container">
                                <h1 className={styles.title}>Discover Furnished Apartments</h1>
                                <div className={styles.bigLists}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <a href="/rep/search/?location=Melbourne" className={styles.bigList}>
                                                <div className={styles.image}>
                                                    <img src={melbourneHomePage} className="w-100" alt="" title="" />
                                                    <div className={styles.bottom}>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <h1>
                                                                    Melbourne
                                                                    <br />
                                                                    Australia
                                                                </h1>
                                                            </div>
                                                            <div className="col-6 align-self-center text-right" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-md-6">
                                            <div className={styles.bigListsRight}>
                                                <a href="/rep/search/?location=Perth" className={styles.bigList}>
                                                    <div className={styles.image}>
                                                        <img src={perthHomePage} className="w-100" alt="" title="" />
                                                        <div className={styles.bottom}>
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <h1>
                                                                        Perth
                                                                        <br />
                                                                        Australia
                                                                    </h1>
                                                                </div>
                                                                <div className="col-6 align-self-center text-right" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="/rep/search/?location=Sydney" className={styles.bigList}>
                                                    <div className={styles.image}>
                                                        <img src={sydneyHomePage} className="w-100" alt="" title="" />
                                                        <div className={styles.bottom}>
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <h1>
                                                                        Sydney
                                                                        <br />
                                                                        Australia
                                                                    </h1>
                                                                </div>
                                                                <div className="col-6 align-self-center text-right"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8"></div>
                                    <div className="col-md-4 text-right">
                                        <a href="/rep/search/" className={styles.loadMore}>
                                            Load More
                                        </a>
                                    </div>
                                </div>
                                <div className={styles.lists}>
                                    <div className="row">
                                        {this.props.houses
                                            .getObjectList()
                                            .slice(8, 11)
                                            .map((house, index) => (
                                                <GetRecommendedHouse
                                                    key={house[0]}
                                                    house={house[1]}
                                                    mainDivClass={"col-md-4"}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- cities end --> */}

                        {/* logo start   */}
                        <div className={styles.logo}>
                            <Slider {...settingsSlider}>
                                {logoImages.map((item, index) => (
                                    <div className={styles.item} key={index}>
                                        <div className={styles.list}>
                                            <img src={item["src"]} alt={item["alt"]} />
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        {/*  logo end  */}

                        {/* start now start */}
                        <div className={styles.startNow}>
                            <div className="container">
                                <div className={styles.lists}>
                                    <div className="row">
                                        <div className="col-md-1"></div>
                                        <div className="col-md-4">
                                            <a
                                                href="/rep/house/list/create/"
                                                className={styles.list + " " + styles.left}
                                            >
                                                <div className={styles.image}>
                                                    <img src={rentHouse} className="w-100" alt="" title="" />
                                                </div>
                                                <h1>Rent your House</h1>
                                            </a>
                                        </div>
                                        <div className="col-md-2"></div>
                                        <div className="col-md-4">
                                            <a href="/rep/search/" className={styles.list + " " + styles.right}>
                                                <div className={styles.image}>
                                                    <img src={lookingForHouse} className="w-100" alt="" title="" />
                                                </div>
                                                <h1>Looking for a House</h1>
                                            </a>
                                        </div>
                                        <div className="col-md-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* start now end */}
                        {userContext.isAuthenticated ? null : <SubscriptionSection />}
                    </React.Fragment>
                )}
            </UserContext.Consumer>
        )
    }
}
