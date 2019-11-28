import React, {Component} from "react";
import styles from "./HouseDetailPage.css";
import Modal from "react-bootstrap/Modal";

import Slider from "react-slick";
import "./ImageCarousel.css";


export default class ImageCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showImageModal: false,
            clickedImage: 1, // random Default
        };
    }

    handleImageModalClose = () => {
        this.setState({showImageModal: false})
    };

    render() {
        const settingsSlider = {
            autoplay: true,
            variableWidth: true,
            autoplaySpeed: 2000,
            cssEase: "linear",
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            swipeToSlide: true,
            className: "mainSlider"
        };

        const settingsModalSlider = {
            accessibility: true,
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: true,
            className: "modalSlider"
        };
        return (
            <div>
                <Modal show={this.state.showImageModal} onHide={this.handleImageModalClose}
                       dialogClassName={styles.imageDisplayModal} backdropClassName={styles.imageDisplayBackdrop}
                       centered>
                    <Slider {...settingsModalSlider} initialSlide={this.state.clickedImage}>
                        {Object.entries(this.props.images.getObjectList()).map((item, index) =>
                            <img src={item[1].getData('image')} alt={item[0]} key={item[0]}/>
                        )}
                    </Slider>
                </Modal>
                <Slider {...settingsSlider}>
                    {Object.entries(this.props.images.getObjectList()).map((item, index) =>

                        <img src={item[1].getData('image')} alt={item[0]} key={item[0]}
                             onClick={() => this.setState({showImageModal: true, clickedImage: index})}/>
                    )}
                </Slider>
            </div>
        );
    }
}