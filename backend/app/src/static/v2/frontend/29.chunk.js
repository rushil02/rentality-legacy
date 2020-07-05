(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ "./node_modules/css-loader/dist/cjs.js!./src/apply/views/houseDetail/DateRangeCalendar.css":
/*!*************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/apply/views/houseDetail/DateRangeCalendar.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".rdrMonth {\n    width: 100%;\n}\n\n.rdrCalendarWrapper {\n    width: 100%;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/apply/views/houseDetail/ImageCarousel.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/apply/views/houseDetail/ImageCarousel.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "/* Slider */\n.slick-slider {\n    position: relative;\n\n    display: block;\n    box-sizing: border-box;\n\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n\n    -webkit-touch-callout: none;\n    -ms-touch-action: pan-y;\n    touch-action: pan-y;\n    -webkit-tap-highlight-color: transparent;\n    /*max-height: 33vh;*/\n}\n\n.slick-list {\n    position: relative;\n\n    display: block;\n    overflow: hidden;\n\n    margin: 0;\n    padding: 0;\n    height: 100%;\n}\n\n.slick-list:focus {\n    outline: none;\n}\n\n.slick-list.dragging {\n    cursor: hand;\n}\n\n.slick-slider .slick-track,\n.slick-slider .slick-list {\n    -webkit-transform: translate3d(0, 0, 0);\n    -moz-transform: translate3d(0, 0, 0);\n    -ms-transform: translate3d(0, 0, 0);\n    -o-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n}\n\n.slick-track {\n    position: relative;\n    top: 0;\n    left: 0;\n\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.slick-track:before,\n.slick-track:after {\n    display: table;\n\n    content: \"\";\n}\n\n.slick-track:after {\n    clear: both;\n}\n\n.slick-loading .slick-track {\n    visibility: hidden;\n}\n\n.slick-slide {\n    display: none;\n    float: left;\n\n    height: 100%;\n    vertical-align: middle;\n    min-height: 1px;\n    padding: 0 2px 0 2px;\n}\n\n[dir=\"rtl\"] .slick-slide {\n    float: right;\n}\n\n.modalSlider .slick-slide img {\n    display: block !important;\n    max-height: 90vh;\n    max-width: 100%;\n    margin: auto;\n    width: unset !important;\n}\n\n.mainSlider .slick-slide img {\n    display: block !important;\n    max-height: 33vh;\n    max-width: 100%;\n    margin: auto;\n    width: unset !important;\n}\n\n.slick-slide.slick-loading img {\n    display: none;\n}\n\n.slick-slide.dragging img {\n    pointer-events: none;\n}\n\n.slick-initialized .slick-slide {\n    display: block;\n}\n\n.slick-loading .slick-slide {\n    visibility: hidden;\n}\n\n.slick-vertical .slick-slide {\n    display: block;\n\n    height: auto;\n\n    border: 1px solid transparent;\n}\n\n.slick-arrow.slick-hidden {\n    display: none;\n}\n\n/* Slider */\n/*.slick-loading .slick-list*/\n/*{*/\n/*    background: #fff url('./ajax-loader.gif') center center no-repeat;*/\n/*}*/\n\n/* Icons */\n/*@font-face*/\n/*{*/\n/*    font-family: 'slick';*/\n/*    font-weight: normal;*/\n/*    font-style: normal;*/\n\n/*    src: url('./fonts/slick.eot');*/\n/*    src: url('./fonts/slick.eot?#iefix') format('embedded-opentype'), url('./fonts/slick.woff') format('woff'), url('./fonts/slick.ttf') format('truetype'), url('./fonts/slick.svg#slick') format('svg');*/\n/*}*/\n/* Arrows */\n.slick-prev,\n.slick-next {\n    font-size: 0;\n    line-height: 0;\n\n    position: absolute;\n    top: 45%;\n\n    display: block;\n\n    width: 40px;\n    height: 40px;\n    padding-bottom: 5px;\n    /*-webkit-transform: translate(0, -50%);*/\n    /*-ms-transform: translate(0, -50%);*/\n    /*transform: translate(0, -50%);*/\n\n    cursor: pointer;\n    border-radius: 99px;\n    opacity: 0.7;\n\n    color: black;\n    border: none;\n    outline: none;\n    background: whitesmoke;\n    z-index: 10;\n}\n\n.slick-prev:hover,\n.slick-prev:focus,\n.slick-next:hover,\n.slick-next:focus {\n    color: black;\n    opacity: 1;\n}\n\n.slick-prev:hover:before,\n.slick-prev:focus:before,\n.slick-next:hover:before,\n.slick-next:focus:before {\n    opacity: 1;\n}\n\n.slick-prev.slick-disabled:before,\n.slick-next.slick-disabled:before {\n    opacity: 0.25;\n}\n\n.slick-prev:before,\n.slick-next:before {\n    font-size: 20px;\n    line-height: 1;\n\n    opacity: 0.75;\n    color: black;\n\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n.slick-prev {\n    left: 25px;\n}\n\n[dir=\"rtl\"] .slick-prev {\n    right: -25px;\n    left: auto;\n}\n\n.slick-prev:before {\n    content: \"←\";\n}\n\n[dir=\"rtl\"] .slick-prev:before {\n    content: \"→\";\n}\n\n.slick-next {\n    right: 25px;\n}\n\n[dir=\"rtl\"] .slick-next {\n    right: auto;\n    left: -25px;\n}\n\n.slick-next:before {\n    content: \"→\";\n}\n\n[dir=\"rtl\"] .slick-next:before {\n    content: \"←\";\n}\n\n/* Dots */\n.slick-dotted.slick-slider {\n    margin-bottom: 30px;\n}\n\n.slick-dots {\n    position: absolute;\n    bottom: -25px;\n\n    display: block;\n\n    width: 100%;\n    padding: 0;\n    margin: 0;\n\n    list-style: none;\n\n    text-align: center;\n}\n\n.slick-dots li {\n    position: relative;\n\n    display: inline-block;\n\n    width: 20px;\n    height: 20px;\n    margin: 0 5px;\n    padding: 0;\n\n    cursor: pointer;\n}\n\n.slick-dots li button {\n    font-size: 0;\n    line-height: 0;\n\n    display: block;\n\n    width: 20px;\n    height: 20px;\n    padding: 5px;\n\n    cursor: pointer;\n\n    color: black;\n    border: 0;\n    outline: none;\n    background: transparent;\n}\n\n.slick-dots li button:hover,\n.slick-dots li button:focus {\n    outline: none;\n}\n\n.slick-dots li button:hover:before,\n.slick-dots li button:focus:before {\n    opacity: 1;\n}\n\n.slick-dots li button:before {\n    font-size: 20px;\n    line-height: 20px;\n\n    position: absolute;\n    top: 0;\n    left: 0;\n\n    width: 20px;\n    height: 20px;\n\n    content: \"•\";\n    text-align: center;\n\n    opacity: 0.25;\n    color: black;\n\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n\n.slick-dots li.slick-active button:before {\n    opacity: 0.75;\n    color: black;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/apply/views/houseDetail/BookingInfoPanel.css":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/apply/views/houseDetail/BookingInfoPanel.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "._3HqdBuepG_HKPR-0IFeKfi {\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n    border-bottom: 1px solid #e9ebf0;\n}\n\n._3VRcsSLT601OITl7YAhPZl h1 {\n    font-size: 17px;\n    font-weight: 700;\n    color: #000000;\n    margin-bottom: 10px;\n}\n\n._3VRcsSLT601OITl7YAhPZl p {\n    font-size: 15px;\n    font-weight: 400;\n    color: #a2a2a2;\n    margin-bottom: 0;\n}\n\n._3oFU48zvt_3X65GlKQJMIi {\n    font-size: 15px;\n    font-weight: 400;\n    color: #2a2b32;\n}\n\n._12ucbcTUO-Rz-lcM1pksUx {\n    font-size: 15px;\n    font-weight: 400;\n    color: #a2a2a2;\n    border-bottom: 1px solid #e9ebf0;\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n}\n\n._2FpDllHL6JPIny2zvjkfXA {\n    float: right;\n    font-size: 15px;\n    font-weight: 400;\n    color: #a2a2a2;\n    text-decoration: underline;\n    cursor: pointer;\n    transition: color 100ms ease-in-out;\n}\n\n._2FpDllHL6JPIny2zvjkfXA:hover {\n    color: #535353;\n}\n\n._3GPSBAnXp-sqK1umxTo2EX {\n    font-size: 15px;\n    font-weight: 400;\n    color: #2a2b32;\n    padding-right: 0;\n}\n\n.hZQJkgcosRtBtmntLiYfs {\n    padding-left: 0;\n    font-size: 15px;\n    font-weight: 500;\n    color: #2a2b32;\n}\n\n._2wo_i4lAEdBT0a8Oe6TSNO {\n    font-size: 15px;\n    font-weight: 500;\n    color: #3fc692;\n    padding-right: 0;\n}\n\n._34h3sGXF1rgRJSakTv1US {\n    padding-left: 0;\n    font-size: 15px;\n    font-weight: 500;\n    color: #3fc692;\n}\n\n.YJerwDXH7iR-hL0jfE3aB {\n    border: 1px solid #d3d3d3;\n    border-radius: 4px;\n    padding: 4px;\n    transition: 100ms ease-in-out;\n}\n\n.YJerwDXH7iR-hL0jfE3aB:focus-within {\n    box-shadow: 0 0 4px -1px #3fc692 !important;\n    border: 1px solid #3fc692;\n}\n\n._1gLLhiXOstwaS97oNgLy6Z {\n    font-size: 14px;\n    font-weight: 400;\n    color: #2a2b32;\n    border: none;\n    border-bottom: 1px solid #c7cdd9;\n    border-radius: 0;\n    -webkit-transition: all 0.3s ease-in-out;\n    height: unset !important;\n    padding: 1px 1px 0 10px;\n    background: none;\n    border-bottom: none !important;\n    box-shadow: none !important;\n}\n\n._1gLLhiXOstwaS97oNgLy6Z:focus {\n    outline: 0;\n}\n\n._1VqOn0bKJknEblhQL0cisa {\n    font-size: 11px;\n    font-weight: 500;\n    color: #bcbcbc;\n    padding-top: 0;\n    padding-bottom: 0;\n    transition: 100ms ease-in-out;\n    width: auto;\n}\n\n._1VqOn0bKJknEblhQL0cisa:hover {\n    color: #3fc692;\n}\n\n._2Ls6WxCLrsYZ42Wh35_Rkr {\n    font-size: 15px;\n    font-weight: 400;\n    color: #a2a2a2;\n    padding-bottom: 10px;\n    margin-bottom: 10px;\n}\n\n._1ykhexBQeNWzUR9Bf9RcbU {\n    background-image: url(/static/image/page-detail/right-date/arrow.svg);\n    background-repeat: no-repeat;\n    background-position: center center;\n}\n\n._3S4H5AgcbqkHaNoWFWklBB {\n    font-size: 10px;\n    font-weight: 500;\n    color: #a2a2a2;\n}\n\n.-NAX9jKPYwOizBBN7Alyg {\n    border: none;\n    padding: 0;\n    background-color: transparent;\n    font-size: 15px;\n    font-weight: 500;\n    color: #2a2b32;\n}\n\n._4xHuiCzkfdx4eYvLowMhc {\n    border: none;\n}\n\n._5nhDAwK6e7EThRWRXvq8X {\n    padding: 0;\n    margin-bottom: 0;\n    background-color: initial;\n    border-bottom: none;\n}\n\n._3WO7kh8As8zajTnAi2CdZc {\n    padding: 0;\n    width: 100%;\n}\n\n._1GMVlvu1IGb7WYP9AFNFrY {\n    padding: 0;\n}\n", ""]);

// Exports
exports.locals = {
	"infoSection": "_3HqdBuepG_HKPR-0IFeKfi",
	"title": "_3VRcsSLT601OITl7YAhPZl",
	"subTitle": "_3oFU48zvt_3X65GlKQJMIi",
	"pr": "_12ucbcTUO-Rz-lcM1pksUx",
	"moreInfo": "_2FpDllHL6JPIny2zvjkfXA",
	"leftInfo": "_3GPSBAnXp-sqK1umxTo2EX",
	"rightInfo": "hZQJkgcosRtBtmntLiYfs",
	"totalLeftInfo": "_2wo_i4lAEdBT0a8Oe6TSNO",
	"totalRightInfo": "_34h3sGXF1rgRJSakTv1US",
	"discountContainer": "YJerwDXH7iR-hL0jfE3aB",
	"discountInput": "_1gLLhiXOstwaS97oNgLy6Z",
	"discountApplyBtn": "_1VqOn0bKJknEblhQL0cisa",
	"grayInfo": "_2Ls6WxCLrsYZ42Wh35_Rkr",
	"centerArrow": "_1ykhexBQeNWzUR9Bf9RcbU",
	"dateSubtitle": "_3S4H5AgcbqkHaNoWFWklBB",
	"dateDisplay": "-NAX9jKPYwOizBBN7Alyg",
	"dateDisplayCard": "_4xHuiCzkfdx4eYvLowMhc",
	"dateDisplayCardHeader": "_5nhDAwK6e7EThRWRXvq8X",
	"dateDisplayChangeButton": "_3WO7kh8As8zajTnAi2CdZc",
	"dateDisplayCardBody": "_1GMVlvu1IGb7WYP9AFNFrY"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/apply/views/houseDetail/CheckoutForm.css":
/*!******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/apply/views/houseDetail/CheckoutForm.css ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".CKZmffTgKhrsk_6EEcQvW {\n    box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.15), 0 4px 6px 0 rgba(112, 157, 199, 0.15);\n    padding: 10px 15px;\n    margin: 20px 0;\n    background: #fff;\n    font-size: 1px;\n    border: none;\n    border-radius: 4px;\n}\n\n.CKZmffTgKhrsk_6EEcQvW:focus-within {\n    box-shadow: 0 0 7px -1px #3fc692 !important;\n}\n", ""]);

// Exports
exports.locals = {
	"wrapper": "CKZmffTgKhrsk_6EEcQvW"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/apply/views/houseDetail/ConfirmBookingModal.css":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/apply/views/houseDetail/ConfirmBookingModal.css ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "._1F3Mwx214XRXg01Nbt8pwF {\n    padding: 40px 35px 30px 35px;\n    border: none;\n    border-radius: 10px;\n    font-size: 15px;\n    font-weight: 400;\n    color: #2a2b32;\n    background-color: #ffffff;\n    box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.25);\n}\n\n._1F3Mwx214XRXg01Nbt8pwF h1 {\n    font-size: 20px;\n    font-weight: 700;\n    color: #2a2b32;\n    margin-bottom: 40px;\n}\n\n._1F3Mwx214XRXg01Nbt8pwF p {\n    margin-top: 0;\n    margin-bottom: 2rem;\n}\n\n._3W_9Svcb14Xr3KRZ67ojse {\n    text-align: center;\n    margin-top: 25px;\n}\n", ""]);

// Exports
exports.locals = {
	"modalContent": "_1F3Mwx214XRXg01Nbt8pwF",
	"buttonGroup": "_3W_9Svcb14Xr3KRZ67ojse"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/apply/views/houseDetail/HouseDetailPage.css":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/apply/views/houseDetail/HouseDetailPage.css ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "._1Dh2g7FgR_AZRISmzWolMC {\n    margin-top: 70px;\n}\n\n._3edPP3XLBWyM8sFpluQgdC h1 {\n    font-size: 35px;\n    font-weight: 700;\n    color: #000000;\n    margin-bottom: 10px;\n}\n\n._3edPP3XLBWyM8sFpluQgdC p._2F996DY0FoE8_Z9RI22rom {\n    font-size: 16px;\n    font-weight: 400;\n    color: #717171;\n    margin-bottom: 15px;\n}\n\n.i4cqRJWSVZlcDcARmiJdc {\n    margin-bottom: 40px;\n}\n\n.i4cqRJWSVZlcDcARmiJdc ._23mi0-s4pDSRtYxewvIwYI {\n    color: #2a2b32;\n    font-size: 15px;\n    font-weight: 700;\n    text-align: center;\n    border: 1px solid #c4cbd9;\n    padding-top: 6px;\n    padding-bottom: 6px;\n}\n\n.i4cqRJWSVZlcDcARmiJdc ._3iJImUN3Gvcr5JP9b0k8QW {\n    border: 1px solid #c4cbd9;\n    padding-top: 20px;\n    padding-bottom: 20px;\n    text-align: center;\n    margin-top: 10px;\n}\n\n.i4cqRJWSVZlcDcARmiJdc .TxFPqGkNrvLf8N50kmqO6 {\n    display: inline-block;\n    height: 35px;\n    line-height: 35px;\n    margin-bottom: 20px;\n}\n\n.i4cqRJWSVZlcDcARmiJdc p._1EvGXDp908Ir_cc0VWW2A- {\n    font-size: 15px;\n    font-weight: 400;\n    color: #2a2b32;\n    margin-bottom: 0;\n}\n\n._1fA14msA350Bpp8yXanLnf {\n    border-bottom: 1px solid #d2d7e1;\n    padding-bottom: 10px;\n    margin-bottom: 30px;\n}\n\n._184IeZlNGgAr0pLxPI7NZj {\n    font-size: 20px;\n    font-weight: 700;\n    color: #3fc692;\n    margin-bottom: 30px;\n}\n\n.VaRMAlM3insqOZVdrEC2- {\n    font-size: 17px;\n    font-weight: 500;\n    color: #000000;\n    margin-bottom: 10px;\n}\n\n._3cYtGXgtVxxjP3ZZ3_Gm_R {\n    font-size: 15px;\n    font-weight: 600;\n    color: #2a2b32;\n    margin-top: 40px;\n    margin-bottom: 20px;\n}\n\n._3QPaC40d4wRPr2XD5Ncy0O {\n    font-size: 15px;\n    font-weight: 400;\n    color: #676767;\n    margin-bottom: 30px;\n    text-align: justify;\n}\n\n.FW0HawmzlhNBnqxFjWnpM {\n    border-bottom: 1px solid #d2d7e1;\n    margin-bottom: 30px;\n}\n\n._3tULqoknpIlB_YNz6gSmpv {\n    margin-bottom: 0;\n}\n\n._3tULqoknpIlB_YNz6gSmpv li {\n    background-image: url(\"/static/image/check.svg\");\n    background-repeat: no-repeat;\n    background-position: left center;\n    padding-left: 27px;\n    margin-bottom: 20px;\n    color: #676767;\n    font-size: 15px;\n    font-weight: 400;\n}\n\n._3tULqoknpIlB_YNz6gSmpv li:not(:last-child) {\n    margin-right: 30px;\n}\n\n._3hoZcMfh0QDbM3e1MCCP_F {\n    border-bottom: 1px solid #d2d7e1;\n    padding-bottom: 10px;\n    margin-bottom: 30px;\n}\n\n._3hoZcMfh0QDbM3e1MCCP_F p {\n    font-size: 15px;\n    font-weight: 400;\n    color: #676767;\n    margin-bottom: 0;\n}\n\n._3hoZcMfh0QDbM3e1MCCP_F li {\n    padding-left: 0;\n    padding-right: 0;\n    border: none;\n}\n\n.bnqd35sKXuPZbovsxfCPk {\n    width: 100%;\n    position: relative;\n    overflow: hidden;\n}\n\n._3ZZn-2ev8GZFbtsUFjIvpG {\n    max-width: 95vw;\n    max-height: 90vh;\n    overflow: hidden;\n    pointer-events: none;\n}\n\n._3ZZn-2ev8GZFbtsUFjIvpG > div {\n    background-color: transparent !important;\n    background-clip: unset;\n    border: none !important;\n    border-radius: 0;\n    outline: 0;\n}\n\n._3ySqIZQrPzIHcFGYEu_s_F {\n    opacity: 0.85 !important;\n}\n\n._19pkyBy8bmS8gwGXOnIvzs {\n    width: 100%;\n    height: 300px;\n    margin-bottom: 25px;\n}\n\n._1EcGoyz18ogKFjh991V9CP {\n    padding: 15px 20px;\n    position: -webkit-sticky;\n    position: sticky;\n    top: 50px;\n    max-height: 95vh;\n    overflow-y: auto;\n    border-left: 1px solid #d2d7e1;\n}\n\n._1EcGoyz18ogKFjh991V9CP::-webkit-scrollbar {\n    display: none;\n}\n\n._1EcGoyz18ogKFjh991V9CP ._1CqBcx0_ymf0weH8g7YuLH {\n    text-align: center;\n    border-bottom: 1px solid #dce0e8;\n    padding-bottom: 10px;\n    margin-bottom: 15px;\n}\n\n._1EcGoyz18ogKFjh991V9CP ._1CqBcx0_ymf0weH8g7YuLH h2 {\n    font-size: 15px;\n    font-weight: 700;\n    color: #252525;\n    margin-top: 12px;\n    margin-bottom: 12px;\n}\n\n._2pvtwxU5002gLh1eqQ4suP {\n    text-align: left !important;\n}\n\n._2pvtwxU5002gLh1eqQ4suP .XG6-XQDOk1MwjT6AXHmlc {\n    margin-bottom: 0;\n}\n\n._2pvtwxU5002gLh1eqQ4suP .XG6-XQDOk1MwjT6AXHmlc li {\n    margin-top: 8px;\n}\n\n._2pvtwxU5002gLh1eqQ4suP .XG6-XQDOk1MwjT6AXHmlc li a {\n    font-size: 13px;\n    font-weight: 400;\n    color: #676767;\n    border: 1px solid #dce0e8;\n    padding: 3px 12px;\n    border-radius: 99px;\n    transition: all 0.25s ease-in-out;\n}\n\n._2pvtwxU5002gLh1eqQ4suP .XG6-XQDOk1MwjT6AXHmlc li a:hover {\n    color: #3fc692;\n    border: 1px solid #3fc692;\n}\n\n._2pvtwxU5002gLh1eqQ4suP .XG6-XQDOk1MwjT6AXHmlc li a:hover,\n._2pvtwxU5002gLh1eqQ4suP .XG6-XQDOk1MwjT6AXHmlc li a:focus {\n    text-decoration: none;\n}\n\n._2pvtwxU5002gLh1eqQ4suP .XG6-XQDOk1MwjT6AXHmlc li:not(:last-child) {\n    margin-right: 5px;\n}\n\n._2L1-kf1SZIu2mLIvQPTVSQ {\n    object-fit: cover;\n    width: 125px;\n    height: 125px;\n}\n\n._1Wbs3quxAKhuCDyvIK9Lr7 {\n    padding: 7px 14px;\n    background-color: #e6e6e7;\n    box-shadow: rgba(50, 50, 93, 0.15) 0 1px 3px 0, rgba(112, 157, 199, 0.15) 0 4px 6px 0;\n    border-radius: 50% !important;\n    transition: all 0.25s ease-in-out;\n    font-weight: 400;\n    color: #535353 !important;\n    cursor: pointer;\n}\n\n._1Wbs3quxAKhuCDyvIK9Lr7:hover,\n._1Wbs3quxAKhuCDyvIK9Lr7:focus {\n    text-decoration: none;\n    background-color: #d4d4d5;\n    color: #ffffff !important;\n}\n\n.qANzegoqf8j4k10l4eXmN {\n    padding: 50px 25px;\n    border: none;\n    border-radius: 10px;\n    font-size: 15px;\n    font-weight: 400;\n    color: #2a2b32;\n    background-color: #ffffff;\n    box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.25);\n}\n\n.qANzegoqf8j4k10l4eXmN h1 {\n    font-size: 20px;\n    font-weight: 700;\n    color: #2a2b32;\n    margin-bottom: 40px;\n}\n\n._2RWwdlxp8JmL0XkMzdbsEZ {\n    text-align: center;\n    margin-top: 25px;\n}\n\n._2f51w5nPumnrdNU8qZjO-y {\n    font-size: 16px;\n    border-radius: 99px;\n    font-weight: 700;\n    color: green !important;\n    background-color: #2a2b32 !important;\n    padding: 11px 59px;\n    text-transform: uppercase;\n    transition: all 0.25s ease-in-out;\n}\n\n._2R1FhkI_dWjH3p1uru5uYV {\n    /* background-color: rgba(0, 0, 0, 0.5); */\n    z-index: 1200;\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    cursor: not-allowed;\n}\n", ""]);

// Exports
exports.locals = {
	"pageDetail": "_1Dh2g7FgR_AZRISmzWolMC",
	"title": "_3edPP3XLBWyM8sFpluQgdC",
	"address": "_2F996DY0FoE8_Z9RI22rom",
	"box": "i4cqRJWSVZlcDcARmiJdc",
	"boxTitle": "_23mi0-s4pDSRtYxewvIwYI",
	"icon": "_3iJImUN3Gvcr5JP9b0k8QW",
	"iconImage": "TxFPqGkNrvLf8N50kmqO6",
	"boxText": "_1EvGXDp908Ir_cc0VWW2A-",
	"about": "_1fA14msA350Bpp8yXanLnf",
	"hl2": "_184IeZlNGgAr0pLxPI7NZj",
	"hl3": "VaRMAlM3insqOZVdrEC2-",
	"hl4": "_3cYtGXgtVxxjP3ZZ3_Gm_R",
	"pg": "_3QPaC40d4wRPr2XD5Ncy0O",
	"infoSection": "FW0HawmzlhNBnqxFjWnpM",
	"checkList": "_3tULqoknpIlB_YNz6gSmpv",
	"rule": "_3hoZcMfh0QDbM3e1MCCP_F",
	"pageDetailGallery": "bnqd35sKXuPZbovsxfCPk",
	"imageDisplayModal": "_3ZZn-2ev8GZFbtsUFjIvpG",
	"imageDisplayBackdrop": "_3ySqIZQrPzIHcFGYEu_s_F",
	"map": "_19pkyBy8bmS8gwGXOnIvzs",
	"right": "_1EcGoyz18ogKFjh991V9CP",
	"user": "_1CqBcx0_ymf0weH8g7YuLH",
	"tagList": "_2pvtwxU5002gLh1eqQ4suP",
	"listInline": "XG6-XQDOk1MwjT6AXHmlc",
	"userImage": "_2L1-kf1SZIu2mLIvQPTVSQ",
	"rightScrollNavBtn": "_1Wbs3quxAKhuCDyvIK9Lr7",
	"modalContent": "qANzegoqf8j4k10l4eXmN",
	"buttonGroup": "_2RWwdlxp8JmL0XkMzdbsEZ",
	"bookAPIBtn": "_2f51w5nPumnrdNU8qZjO-y",
	"disabledOverlay": "_2R1FhkI_dWjH3p1uru5uYV"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/apply/views/successPage/BookingSuccess.css":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/apply/views/successPage/BookingSuccess.css ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "._1_K7KAH5RZ2It8utOsSS7t {\n    padding-top: 35px;\n    padding-bottom: 80px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._3L3COerkdXHLIMwJucEEEC {\n    margin: 40px 0;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t h1 {\n    padding-left: 50px;\n    margin-bottom: 0px;\n    font-size: 50px;\n    font-weight: 550;\n    color: #3fc692;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t h2 {\n    font-size: 20px;\n    font-weight: 700;\n    color: #000000;\n    margin-bottom: 30px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh {\n    padding: 15px 5px 30px 5px;\n    margin-bottom: 60px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._157a7fECA0SIPH7AH-kcRx {\n    margin-bottom: 20px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._18RkqdDbf9L27xDVAzHvT6 {\n    font-size: 15px;\n    font-weight: 500;\n    color: #2a2b32;\n    border-bottom: 1px solid #e9ebf0;\n    padding-bottom: 15px;\n    margin-bottom: 15px;\n    margin-top: 10px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._18RkqdDbf9L27xDVAzHvT6 span {\n    font-size: 13px;\n    font-weight: 500;\n    color: #aeaeae;\n    display: block;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._2r9TVA3cKFZWVEhRVilHoj {\n    font-size: 18px;\n    font-weight: 700;\n    color: #3fc692;\n    text-align: right;\n    padding-right: 20px;\n    margin: 10px 0px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._2E7ZzNJwBUNRzvXRFvsjGv {\n    font-size: 14px;\n    font-weight: 500;\n    color: #3fc692;\n    text-align: right;\n    padding-right: 20px;\n    margin: 10px 0px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._2r9TVA3cKFZWVEhRVilHoj p {\n    font-size: 14px;\n    font-weight: 400;\n    color: #999999;\n    margin-top: 10px;\n    margin-bottom: 0;\n    text-align: right;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._2QO5jmi4mcaMi8TCYviC0g h2 {\n    font-size: 15px;\n    font-weight: 400;\n    color: #bcbcbc;\n    text-align: right;\n    margin-bottom: 10px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh h1 {\n    padding: 0px;\n    font-size: 17px;\n    font-weight: 700;\n    color: #000000;\n    text-align: left;\n    margin-bottom: 10px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh h1:hover {\n    color: #3fc692;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh h2 {\n    font-size: 15px;\n    font-weight: 400;\n    color: #bcbcbc;\n    text-align: left;\n    margin-bottom: 10px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh h3 {\n    font-size: 16px;\n    font-weight: 700;\n    color: #6d6d6d;\n    text-align: left;\n    margin-top: 30px;\n    margin-bottom: 5px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh .znfLZkhDpDbet8zKrSR7H:hover {\n    text-decoration: none;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh p {\n    font-size: 16px;\n    font-weight: 400;\n    color: #6d6d6d;\n    text-align: left;\n    margin-bottom: 10px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._1ypUlEMq6RZAMzPaniY0ZS ._1kpAKXPt89U-CAsB4GJf7c {\n    font-size: 16px;\n    font-weight: 700;\n    color: #2a2b32;\n    text-transform: uppercase;\n    padding: 10px 100px;\n    transition: all 0.25s ease-in-out;\n}\n\n.Pyhp1H3RHBbFRZYjoZOQ_ {\n    border: 2px solid #36ffb1;\n}\n\n.Y7cWvJrRI3tQgj7g5OVui {\n    border: 2px solid #ff4a4a;\n}\n\n._23fFC2v5yP4AjqOJUdmCVL {\n    border: 2px solid #ffc107;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._1ypUlEMq6RZAMzPaniY0ZS ._1kpAKXPt89U-CAsB4GJf7c:hover,\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._1ypUlEMq6RZAMzPaniY0ZS ._1kpAKXPt89U-CAsB4GJf7c:focus {\n    text-decoration: none;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._3wwS2nG6cliejGqWSEyfWb {\n    margin-bottom: 30px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._3wwS2nG6cliejGqWSEyfWb._2OUcGg84J138TwUu-gYcgc {\n    margin-top: 60px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._3wwS2nG6cliejGqWSEyfWb li a {\n    font-size: 13px;\n    font-weight: 500;\n    color: #2a2b32;\n    text-decoration: underline;\n    transition: all 0.25s ease-in-out;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._3wwS2nG6cliejGqWSEyfWb li a:hover {\n    text-decoration: none;\n    color: #36ffb1;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh ._3wwS2nG6cliejGqWSEyfWb li a:focus {\n    text-decoration: none;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh .Ef3lqSeQSVFbzSqPjxi3Z {\n    text-align: right;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh .Ef3lqSeQSVFbzSqPjxi3Z ._1kpAKXPt89U-CAsB4GJf7c {\n    font-size: 16px;\n    font-weight: 400;\n    color: #2a2b32;\n    border: 1px solid #2a2b32;\n    padding: 10px 50px;\n    transition: all 0.25s ease-in-out;\n    border-radius: 99px;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh .Ef3lqSeQSVFbzSqPjxi3Z ._1kpAKXPt89U-CAsB4GJf7c:hover {\n    background-color: #2a2b32;\n    color: #ffffff;\n}\n\n._1_K7KAH5RZ2It8utOsSS7t ._1gsJv3YYVM6FX8gvs88tAh .Ef3lqSeQSVFbzSqPjxi3Z ._1kpAKXPt89U-CAsB4GJf7c:hover,\n._33tdPo990xnx54ty0KpIpt ._1gsJv3YYVM6FX8gvs88tAh .Ef3lqSeQSVFbzSqPjxi3Z ._1kpAKXPt89U-CAsB4GJf7c:focus {\n    text-decoration: none;\n}\n\n._2lgYZ4Tn7njkLysoVQLmn0 {\n    background-image: url(/static/image/page-detail/right-date/arrow.svg);\n    background-repeat: no-repeat;\n    background-position: center center;\n}\n\n._2vnB0qftgzJioXAk6sMGD7 {\n    font-size: 10px;\n    font-weight: 500;\n    color: #a2a2a2;\n}\n\n._16jvDkJEGhdx8kAqDyX69B {\n    border: none;\n    padding: 0;\n    background-color: transparent;\n    font-size: 15px;\n    font-weight: 500;\n    color: #2a2b32;\n}\n", ""]);

// Exports
exports.locals = {
	"bookingDashboard": "_1_K7KAH5RZ2It8utOsSS7t",
	"mtb40": "_3L3COerkdXHLIMwJucEEEC",
	"board": "_1gsJv3YYVM6FX8gvs88tAh",
	"info": "_157a7fECA0SIPH7AH-kcRx",
	"date": "_18RkqdDbf9L27xDVAzHvT6",
	"amount": "_2r9TVA3cKFZWVEhRVilHoj",
	"bookingAmount": "_2E7ZzNJwBUNRzvXRFvsjGv",
	"tenantInfo": "_2QO5jmi4mcaMi8TCYviC0g",
	"title": "znfLZkhDpDbet8zKrSR7H",
	"confirm": "_1ypUlEMq6RZAMzPaniY0ZS",
	"btn": "_1kpAKXPt89U-CAsB4GJf7c",
	"successBorder": "Pyhp1H3RHBbFRZYjoZOQ_",
	"pendingBorder": "Y7cWvJrRI3tQgj7g5OVui",
	"incompleteBorder": "_23fFC2v5yP4AjqOJUdmCVL",
	"listUnstyled": "_3wwS2nG6cliejGqWSEyfWb",
	"top-margin": "_2OUcGg84J138TwUu-gYcgc",
	"detail": "Ef3lqSeQSVFbzSqPjxi3Z",
	"pageDashboard": "_33tdPo990xnx54ty0KpIpt",
	"centerArrow": "_2lgYZ4Tn7njkLysoVQLmn0",
	"dateSubtitle": "_2vnB0qftgzJioXAk6sMGD7",
	"dateDisplay": "_16jvDkJEGhdx8kAqDyX69B"
};

/***/ }),

/***/ "./src/apply/Router.js":
/*!*****************************!*\
  !*** ./src/apply/Router.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Router; });
/* harmony import */ var routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! routes */ "./src/routes.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var core_errorHelpers_ComponentErrorBoundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core/errorHelpers/ComponentErrorBoundary */ "./src/core/errorHelpers/ComponentErrorBoundary.js");
/* harmony import */ var core_errorHelpers_Error404__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core/errorHelpers/Error404 */ "./src/core/errorHelpers/Error404.js");
/* harmony import */ var _views_houseDetail_HouseDetailPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/houseDetail/HouseDetailPage */ "./src/apply/views/houseDetail/HouseDetailPage.js");
/* harmony import */ var _views_successPage_BookingSuccessPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/successPage/BookingSuccessPage */ "./src/apply/views/successPage/BookingSuccessPage.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var Router =
/*#__PURE__*/
function (_Component) {
  _inherits(Router, _Component);

  function Router() {
    _classCallCheck(this, Router);

    return _possibleConstructorReturn(this, _getPrototypeOf(Router).apply(this, arguments));
  }

  _createClass(Router, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(core_errorHelpers_ComponentErrorBoundary__WEBPACK_IMPORTED_MODULE_3__["default"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        exact: true,
        path: routes__WEBPACK_IMPORTED_MODULE_0__["default"].react.apply.houseInfo,
        render: function render(props) {
          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_views_houseDetail_HouseDetailPage__WEBPACK_IMPORTED_MODULE_5__["default"], {
            routerProps: props
          });
        }
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        exact: true,
        path: routes__WEBPACK_IMPORTED_MODULE_0__["default"].react.apply.success,
        render: function render(props) {
          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_views_successPage_BookingSuccessPage__WEBPACK_IMPORTED_MODULE_6__["default"], {
            routerProps: props
          });
        }
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        render: function render(props) {
          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(core_errorHelpers_Error404__WEBPACK_IMPORTED_MODULE_4__["default"], null);
        }
      })))));
    }
  }]);

  return Router;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);



/***/ }),

/***/ "./src/apply/models.js":
/*!*****************************!*\
  !*** ./src/apply/models.js ***!
  \*****************************/
/*! exports provided: House, Image, CancellationPolicy, HomeOwnerInfo, Application, Booking, BookedHouse, Applicant, BookingInfo, FinancialInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "House", function() { return House; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return Image; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CancellationPolicy", function() { return CancellationPolicy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeOwnerInfo", function() { return HomeOwnerInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Booking", function() { return Booking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookedHouse", function() { return BookedHouse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Applicant", function() { return Applicant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingInfo", function() { return BookingInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FinancialInfo", function() { return FinancialInfo; });
/* harmony import */ var core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/utils/ModelHelper */ "./src/core/utils/ModelHelper.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var House =
/*#__PURE__*/
function (_APIModelAdapter) {
  _inherits(House, _APIModelAdapter);

  function House() {
    _classCallCheck(this, House);

    return _possibleConstructorReturn(this, _getPrototypeOf(House).apply(this, arguments));
  }

  _createClass(House, [{
    key: "fieldMap",
    // Declare all Defaults here
    value: function fieldMap() {
      return {
        homeType: {
          key: "home_type"
        },
        facilities: {
          key: "facilities",
          "default": []
        },
        rules: {
          key: "rules",
          "default": []
        },
        neighbourhoodFacilities: {
          key: "neighbourhood_facilities",
          "default": []
        },
        welcomeTags: {
          key: "welcome_tags",
          "default": []
        },
        homeOwner: {
          key: "home_owner"
        },
        UUID: {
          key: "uuid"
        },
        title: {
          key: "title"
        },
        furnished: {
          key: "furnished"
        },
        numBedrooms: {
          key: "bedrooms"
        },
        numBathrooms: {
          key: "bathrooms"
        },
        numParkSpaces: {
          key: "parking"
        },
        rent: {
          key: "rent"
        },
        minStay: {
          key: "min_stay"
        },
        maxStay: {
          key: "max_stay"
        },
        maxPeopleAllowed: {
          key: "max_people_allowed"
        },
        otherRules: {
          key: "other_rules"
        },
        description: {
          key: "description"
        },
        accessRestrictions: {
          key: "access_restrictions"
        },
        otherPeopleDescription: {
          key: "other_people_description"
        },
        neighbourhoodDescription: {
          key: "neighbourhood_description"
        }
      };
    }
  }]);

  return House;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);
var Image =
/*#__PURE__*/
function (_APIModelAdapter2) {
  _inherits(Image, _APIModelAdapter2);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, _getPrototypeOf(Image).apply(this, arguments));
  }

  _createClass(Image, [{
    key: "fieldMap",
    value: function fieldMap() {
      return {
        image: {
          key: "image"
        },
        isThumbnail: {
          key: "is_thumbnail"
        },
        UUID: {
          key: "uuid"
        }
      };
    }
  }]);

  return Image;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);
var CancellationPolicy =
/*#__PURE__*/
function (_APIModelAdapter3) {
  _inherits(CancellationPolicy, _APIModelAdapter3);

  function CancellationPolicy() {
    _classCallCheck(this, CancellationPolicy);

    return _possibleConstructorReturn(this, _getPrototypeOf(CancellationPolicy).apply(this, arguments));
  }

  _createClass(CancellationPolicy, [{
    key: "fieldMap",
    value: function fieldMap() {
      return {
        verbose: {
          key: "verbose"
        },
        description: {
          key: "description"
        },
        official_policy: {
          key: "official_policy",
          "default": null
        }
      };
    }
  }]);

  return CancellationPolicy;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);
var HomeOwnerInfo =
/*#__PURE__*/
function (_APIModelAdapter4) {
  _inherits(HomeOwnerInfo, _APIModelAdapter4);

  function HomeOwnerInfo() {
    _classCallCheck(this, HomeOwnerInfo);

    return _possibleConstructorReturn(this, _getPrototypeOf(HomeOwnerInfo).apply(this, arguments));
  }

  _createClass(HomeOwnerInfo, [{
    key: "fieldMap",
    value: function fieldMap() {
      return {
        profilePicture: {
          key: "profile_pic"
        },
        businessName: {
          key: "business_name"
        },
        personalityTags: {
          key: "personality_tags",
          "default": []
        },
        firstName: {
          key: "user.first_name"
        },
        lastName: {
          key: "user.last_name"
        }
      };
    }
  }]);

  return HomeOwnerInfo;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);
var Application =
/*#__PURE__*/
function (_APIModelAdapter5) {
  _inherits(Application, _APIModelAdapter5);

  function Application() {
    _classCallCheck(this, Application);

    return _possibleConstructorReturn(this, _getPrototypeOf(Application).apply(this, arguments));
  }

  _createClass(Application, [{
    key: "fieldMap",
    value: function fieldMap() {
      return {
        applicant: {
          key: "tenant_details",
          adapter: Applicant
        },
        bookingInfo: {
          key: "booking_info",
          adapter: BookingInfo
        },
        message: {
          key: "tenant_message"
        },
        houseRulesAgreement: {
          key: "agree_to_house_rules",
          "default": false
        },
        houseAmountAgreement: {
          key: "agree_to_pay",
          "default": false
        },
        rentalityRulesAgreement: {
          key: "agree_to_tnc",
          "default": false
        }
      };
    }
  }]);

  return Application;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);
var Booking =
/*#__PURE__*/
function (_APIModelAdapter6) {
  _inherits(Booking, _APIModelAdapter6);

  function Booking() {
    _classCallCheck(this, Booking);

    return _possibleConstructorReturn(this, _getPrototypeOf(Booking).apply(this, arguments));
  }

  _createClass(Booking, [{
    key: "fieldMap",
    value: function fieldMap() {
      return {
        applicant: {
          key: "tenant",
          adapter: Applicant
        },
        bookingDateRange: {
          key: "booking_dates",
          adapter: core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["DateRangeModel"]
        },
        // numGuests: { key: "guests", default: 1 },
        status: {
          key: "status"
        },
        bookingAmount: {
          key: "booking_amount"
        },
        rent: {
          key: "rent"
        },
        bookedHouse: {
          key: "house_meta",
          adapter: BookedHouse
        }
      };
    }
  }, {
    key: "dateSerializer",
    value: function dateSerializer(date) {
      return Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["format"])(date, "YYYY-MM-DD");
    }
  }]);

  return Booking;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);
var BookedHouse =
/*#__PURE__*/
function (_APIModelAdapter7) {
  _inherits(BookedHouse, _APIModelAdapter7);

  function BookedHouse() {
    _classCallCheck(this, BookedHouse);

    return _possibleConstructorReturn(this, _getPrototypeOf(BookedHouse).apply(this, arguments));
  }

  _createClass(BookedHouse, [{
    key: "fieldMap",
    value: function fieldMap() {
      return {
        houseUUID: {
          key: "uuid"
        },
        title: {
          key: "title"
        },
        houseNum: {
          key: "address_hidden"
        },
        streetName: {
          key: "address"
        },
        homeType: {
          key: "home_type.name"
        },
        location: {
          key: "location.name"
        }
      };
    }
  }]);

  return BookedHouse;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);
var Applicant =
/*#__PURE__*/
function (_APIModelAdapter8) {
  _inherits(Applicant, _APIModelAdapter8);

  function Applicant() {
    _classCallCheck(this, Applicant);

    return _possibleConstructorReturn(this, _getPrototypeOf(Applicant).apply(this, arguments));
  }

  _createClass(Applicant, [{
    key: "fieldMap",
    value: function fieldMap() {
      return {
        firstName: {
          key: "first_name"
        },
        lastName: {
          key: "last_name"
        },
        email: {
          key: "email"
        },
        contactNum: {
          key: "contact_num"
        },
        sex: {
          key: "sex"
        }
      };
    }
  }]);

  return Applicant;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);
var BookingInfo =
/*#__PURE__*/
function (_APIModelAdapter9) {
  _inherits(BookingInfo, _APIModelAdapter9);

  function BookingInfo() {
    _classCallCheck(this, BookingInfo);

    return _possibleConstructorReturn(this, _getPrototypeOf(BookingInfo).apply(this, arguments));
  }

  _createClass(BookingInfo, [{
    key: "fieldMap",
    value: function fieldMap() {
      return {
        bookingStartDate: {
          key: "start_date",
          "default": null,
          serializer: this.dateSerializer
        },
        bookingEndDate: {
          key: "end_date",
          "default": null,
          serializer: this.dateSerializer
        },
        numGuests: {
          key: "guests",
          "default": 1
        },
        promoCodes: {
          key: "promo_codes",
          "default": []
        }
      };
    }
  }, {
    key: "dateSerializer",
    value: function dateSerializer(date) {
      return Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["format"])(date, "YYYY-MM-DD");
    }
  }]);

  return BookingInfo;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);
var FinancialInfo =
/*#__PURE__*/
function (_APIModelAdapter10) {
  _inherits(FinancialInfo, _APIModelAdapter10);

  function FinancialInfo() {
    _classCallCheck(this, FinancialInfo);

    return _possibleConstructorReturn(this, _getPrototypeOf(FinancialInfo).apply(this, arguments));
  }

  _createClass(FinancialInfo, [{
    key: "fieldMap",
    value: function fieldMap() {
      return {
        weeklyRent: {
          key: "weekly_rent"
        },
        payableRent: {
          key: "payable_rent",
          parser: parseFloat
        },
        payableAmount: {
          key: "payable_amount",
          parser: parseFloat
        },
        serviceFee: {
          key: "service_fee.value",
          parser: parseFloat
        },
        stayDuration: {
          key: "stay_duration",
          parser: parseFloat
        }
      };
    }
  }]);

  return FinancialInfo;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/apply/services.js":
/*!*******************************!*\
  !*** ./src/apply/services.js ***!
  \*******************************/
/*! exports provided: getHouseData, getHomeOwnerDetails, getAvailableDates, getUnavailableDates, applyBooking, confirmBooking, getApplicantData, getBookingData, getFinancialData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHouseData", function() { return getHouseData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHomeOwnerDetails", function() { return getHomeOwnerDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAvailableDates", function() { return getAvailableDates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnavailableDates", function() { return getUnavailableDates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyBooking", function() { return applyBooking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "confirmBooking", function() { return confirmBooking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getApplicantData", function() { return getApplicantData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBookingData", function() { return getBookingData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFinancialData", function() { return getFinancialData; });
/* harmony import */ var core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/utils/serviceHelper */ "./src/core/utils/serviceHelper.js");
/* harmony import */ var named_urls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! named-urls */ "./node_modules/named-urls/dist/index.js");
/* harmony import */ var named_urls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(named_urls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! routes */ "./src/routes.js");
/* harmony import */ var _userAccount_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../userAccount/models */ "./src/userAccount/models.js");




function getHouseData(houseUUID) {
  return new Promise(function (resolve, reject) {
    core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__["default"].get(Object(named_urls__WEBPACK_IMPORTED_MODULE_1__["reverse"])(routes__WEBPACK_IMPORTED_MODULE_2__["default"].apply.houseDetails, {
      houseUUID: houseUUID
    })).then(function (response) {
      resolve(response.data);
    })["catch"](function (error) {
      reject(error);
    });
  });
}
function getHomeOwnerDetails(houseUUID) {
  return new Promise(function (resolve, reject) {
    core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__["default"].get(Object(named_urls__WEBPACK_IMPORTED_MODULE_1__["reverse"])(routes__WEBPACK_IMPORTED_MODULE_2__["default"].apply.homeOwnerDetails, {
      houseUUID: houseUUID
    })).then(function (response) {
      resolve(response.data);
    })["catch"](function (error) {
      reject(error);
    });
  });
}
function getAvailableDates(houseUUID) {
  return new Promise(function (resolve, reject) {
    core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__["default"].get(Object(named_urls__WEBPACK_IMPORTED_MODULE_1__["reverse"])(routes__WEBPACK_IMPORTED_MODULE_2__["default"].apply.availableDates, {
      houseUUID: houseUUID
    })).then(function (response) {
      resolve(response.data);
    })["catch"](function (error) {
      reject(error);
    });
  });
}
function getUnavailableDates(houseUUID) {
  return new Promise(function (resolve, reject) {
    core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__["default"].get(Object(named_urls__WEBPACK_IMPORTED_MODULE_1__["reverse"])(routes__WEBPACK_IMPORTED_MODULE_2__["default"].apply.unavailableDates, {
      houseUUID: houseUUID
    })).then(function (response) {
      resolve(response.data);
    })["catch"](function (error) {
      reject(error);
    });
  });
}
function applyBooking(houseUUID, data) {
  return new Promise(function (resolve, reject) {
    core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__["default"].post(Object(named_urls__WEBPACK_IMPORTED_MODULE_1__["reverse"])(routes__WEBPACK_IMPORTED_MODULE_2__["default"].apply.applyBooking, {
      houseUUID: houseUUID
    }), data.serialize()).then(function (result) {
      resolve(result);
    })["catch"](function (error) {
      reject(Object(core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__["handleError"])(error));
    });
  });
}
function confirmBooking(houseUUID, applicationUUID) {
  return new Promise(function (resolve, reject) {
    core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__["default"].post(Object(named_urls__WEBPACK_IMPORTED_MODULE_1__["reverse"])(routes__WEBPACK_IMPORTED_MODULE_2__["default"].apply.confirmBooking, {
      houseUUID: houseUUID,
      applicationUUID: applicationUUID
    })).then(function (result) {
      resolve(result);
    })["catch"](function (error) {
      reject(Object(core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__["handleError"])(error));
    });
  });
}
function getApplicantData() {
  return new Promise(function (resolve, reject) {
    core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__["default"].get(Object(named_urls__WEBPACK_IMPORTED_MODULE_1__["reverse"])(routes__WEBPACK_IMPORTED_MODULE_2__["default"].user.profile)).then(function (response) {
      resolve(response.data);
    })["catch"](function (error) {
      reject(error);
    });
  });
}
function getBookingData(applicationUUID) {
  return new Promise(function (resolve, reject) {
    core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__["default"].get(Object(named_urls__WEBPACK_IMPORTED_MODULE_1__["reverse"])(routes__WEBPACK_IMPORTED_MODULE_2__["default"].apply.bookingDetails, {
      applicationUUID: applicationUUID
    })).then(function (response) {
      resolve(response.data);
    })["catch"](function (error) {
      reject(error);
    });
  });
}
function getFinancialData(houseUUID, bookingInfo) {
  return new Promise(function (resolve, reject) {
    core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__["default"].get(Object(named_urls__WEBPACK_IMPORTED_MODULE_1__["reverse"])(routes__WEBPACK_IMPORTED_MODULE_2__["default"].apply.amountDetails, {
      houseUUID: houseUUID
    }), {
      params: bookingInfo.serialize()
    }).then(function (result) {
      console.log(result);
      resolve(result.data);
    })["catch"](function (error) {
      reject(Object(core_utils_serviceHelper__WEBPACK_IMPORTED_MODULE_0__["handleError"])(error));
    });
  });
}

/***/ }),

/***/ "./src/apply/views/houseDetail/ApplyPanel.js":
/*!***************************************************!*\
  !*** ./src/apply/views/houseDetail/ApplyPanel.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ApplyPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");
/* harmony import */ var _PaymentPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PaymentPanel */ "./src/apply/views/houseDetail/PaymentPanel.js");
/* harmony import */ var _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HouseDetailPage.css */ "./src/apply/views/houseDetail/HouseDetailPage.css");
/* harmony import */ var _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/UIComponents/helpers */ "./src/core/UIComponents/helpers.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var genderSelectStyles = {
  option: function option(provided, state) {
    return _objectSpread({}, provided);
  },
  singleValue: function singleValue(provided, state) {
    var opacity = state.isDisabled ? 0.5 : 1;
    var transition = "opacity 300ms";
    return _objectSpread({}, provided, {
      opacity: opacity,
      transition: transition
    });
  },
  control: function control(provided, state) {
    return {
      border: "none",
      cursor: "text",
      display: "flex",
      flexWrap: "wrap",
      paddingTop: "6px",
      paddingBbottom: "6px",
      height: "calc(2.25rem + 15px)"
    };
  },
  container: function container(provided, state) {
    return {
      position: "relative",
      fontSize: "15px",
      color: "#495057",
      fontWeight: "400",
      borderBottom: state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
      paddingLeft: "0",
      WebkitTransition: "all 0.30s ease-in-out",
      Moztransition: "all 0.30s ease-in-out",
      msTransition: "all 0.30s ease-in-out",
      OTransition: "all 0.30s ease-in-out",
      boxShadow: state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial"
    };
  }
};
var genders = {
  M: "Male",
  F: "Female",
  O: "Other"
};

var ApplyPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(ApplyPanel, _Component);

  function ApplyPanel(props) {
    var _this;

    _classCallCheck(this, ApplyPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ApplyPanel).call(this, props));
    _this.genderList = [];
    Object.entries(genders).map(function (item) {
      _this.genderList.push({
        value: item[0],
        label: item[1]
      });
    });
    return _this;
  }

  _createClass(ApplyPanel, [{
    key: "render",
    value: function render() {
      var application = this.props.application;
      var onFieldChange = this.props.onFieldChange;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_3___default.a.hl3,
        style: {
          marginTop: "30px"
        }
      }, "About Yourself"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "input no-background top-margin"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "First name",
        value: application.getData("applicant.firstName"),
        onChange: function onChange(e) {
          return onFieldChange("applicant.firstName", e.target.value);
        }
      }), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__["displayErrors"])(application.getErrorsForField("applicant.firstName")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "input no-background"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Last name",
        value: application.getData("applicant.lastName"),
        onChange: function onChange(e) {
          return onFieldChange("applicant.lastName", e.target.value);
        }
      }), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__["displayErrors"])(application.getErrorsForField("applicant.lastName")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-1"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "input no-background"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Email Address",
        value: application.getData("applicant.email"),
        onChange: function onChange(e) {
          return onFieldChange("applicant.email", e.target.value);
        }
      }), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__["displayErrors"])(application.getErrorsForField("applicant.email")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "input no-background"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Phone number",
        value: application.getData("applicant.contactNum"),
        onChange: function onChange(e) {
          return onFieldChange("applicant.contactNum", e.target.value);
        }
      }), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__["displayErrors"])(application.getErrorsForField("applicant.contactNum")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-1"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-5 col-lg-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_1__["default"], {
        styles: genderSelectStyles,
        options: this.genderList,
        placeholder: "Select Gender",
        onChange: function onChange(e) {
          return onFieldChange("applicant.sex", e.value);
        },
        value: application.getData("applicant.sex") !== "" ? {
          value: application.getData("applicant.sex"),
          label: genders[application.getData("applicant.sex")]
        } : null
      }), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__["displayErrors"])(application.getErrorsForField("applicant.sex")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_3___default.a.hl4
      }, "Message for ", this.props.homeOwnerName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        className: "form-control",
        rows: "4",
        placeholder: "Who are you? Are you a Student? What do you do?\nWhat're you like as a tenant? Are you quiet? Extrovert?\nWhat brings you here?",
        value: application.getData("message"),
        onChange: function onChange(e) {
          return onFieldChange("message", e.target.value);
        }
      }), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__["displayErrors"])(application.getErrorsForField("message")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_3___default.a.hl3,
        style: {
          marginTop: "40px"
        }
      }, "Payment"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PaymentPanel__WEBPACK_IMPORTED_MODULE_2__["default"], {
        updatePaymentID: function updatePaymentID(value) {
          return onFieldChange("paymentID", value);
        },
        name: "".concat(application.getData("applicant.firstName"), " ").concat(application.getData("applicant.lastName")),
        requestForToken: "gg",
        checkoutFormRef: this.props.checkoutFormRef
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "checkbox auto-width",
        style: {
          marginTop: "60px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "list-inline-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        id: "checkbox-1",
        className: "custom-control-input",
        onChange: function onChange() {
          return onFieldChange("houseRulesAgreement", !application.getData("houseRulesAgreement"));
        },
        checked: application.getData("houseRulesAgreement")
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "checkbox-1"
      }, "I agree to abide by the owner's house rules")), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__["displayErrors"])(application.getErrorsForField("houseRulesAgreement"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "list-inline-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        id: "checkbox-2",
        className: "custom-control-input",
        onChange: function onChange() {
          return onFieldChange("houseAmountAgreement", !application.getData("houseAmountAgreement"));
        },
        checked: application.getData("houseAmountAgreement")
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "checkbox-2"
      }, "I agree to pay the total amount shown if the host accepts my application")), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__["displayErrors"])(application.getErrorsForField("houseAmountAgreement"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "list-inline-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        id: "checkbox-3",
        className: "custom-control-input",
        onChange: function onChange() {
          return onFieldChange("rentalityRulesAgreement", !application.getData("rentalityRulesAgreement"));
        },
        checked: application.getData("rentalityRulesAgreement")
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "checkbox-3"
      }, "I accept Rentality's Terms and Conditions")), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__["displayErrors"])(application.getErrorsForField("rentalityRulesAgreement"))))));
    }
  }]);

  return ApplyPanel;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/apply/views/houseDetail/BookingInfoPanel.css":
/*!**********************************************************!*\
  !*** ./src/apply/views/houseDetail/BookingInfoPanel.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./BookingInfoPanel.css */ "./node_modules/css-loader/dist/cjs.js?!./src/apply/views/houseDetail/BookingInfoPanel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/apply/views/houseDetail/BookingInfoPanel.js":
/*!*********************************************************!*\
  !*** ./src/apply/views/houseDetail/BookingInfoPanel.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BookingInfoPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookingInfoPanel.css */ "./src/apply/views/houseDetail/BookingInfoPanel.css");
/* harmony import */ var _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/es/index.js");
/* harmony import */ var react_date_range__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-date-range */ "./node_modules/react-date-range/dist/index.js");
/* harmony import */ var react_date_range__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_date_range__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/index.js");
/* harmony import */ var react_date_range_dist_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-date-range/dist/styles.css */ "./node_modules/react-date-range/dist/styles.css");
/* harmony import */ var react_date_range_dist_styles_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_date_range_dist_styles_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_date_range_dist_theme_default_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-date-range/dist/theme/default.css */ "./node_modules/react-date-range/dist/theme/default.css");
/* harmony import */ var react_date_range_dist_theme_default_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_date_range_dist_theme_default_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _DateRangeCalendar_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DateRangeCalendar.css */ "./src/apply/views/houseDetail/DateRangeCalendar.css");
/* harmony import */ var _DateRangeCalendar_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_DateRangeCalendar_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var apply_services__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! apply/services */ "./src/apply/services.js");
/* harmony import */ var core_loadingSpinners_LoadingSpinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core/loadingSpinners/LoadingSpinner */ "./src/core/loadingSpinners/LoadingSpinner.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







 // main style file

 // theme css file




var guestNumSelectStyles = {
  option: function option(provided, state) {
    return _objectSpread({}, provided);
  },
  singleValue: function singleValue(provided, state) {
    var opacity = state.isDisabled ? 0.5 : 1;
    var transition = "opacity 300ms";
    return _objectSpread({}, provided, {
      opacity: opacity,
      transition: transition
    });
  },
  control: function control(provided, state) {
    return {
      border: "none",
      cursor: "text",
      display: "flex",
      flexWrap: "wrap" // "padding-top": "6px",
      // "padding-bottom": "6px",
      // 'height': 'calc(2.25rem + 15px)',

    };
  },
  container: function container(provided, state) {
    return {
      position: "relative",
      fontSize: "15px",
      color: "#2a2b32",
      fontWeight: "400",
      paddingLeft: "0",
      WebkitTransition: "all 0.30s ease-in-out",
      Moztransition: "all 0.30s ease-in-out",
      msTransition: "all 0.30s ease-in-out",
      OTransition: "all 0.30s ease-in-out" // "box-shadow": state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial",

    };
  }
};

var BookingInfoPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(BookingInfoPanel, _Component);

  function BookingInfoPanel(props) {
    var _this;

    _classCallCheck(this, BookingInfoPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BookingInfoPanel).call(this, props));

    _this.closeDateSelectionAccordion = function () {
      _this.dateSelectionAccordionRef.click();
    };

    _this.handleDateSelect = function (ranges) {
      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          bookingDates: {
            startDate: ranges.selection.startDate,
            endDate: ranges.selection.endDate
          }
        });
      });

      if (ranges.selection.startDate.getTime() !== ranges.selection.endDate.getTime()) {
        _this.props.handleDateChange(ranges.selection.startDate, ranges.selection.endDate);

        _this.closeDateSelectionAccordion();
      }
    };

    _this.state = {
      bookingDates: {
        startDate: _this.props.bookingDateRange.startDate ? _this.props.bookingDateRange.startDate : new Date(),
        endDate: _this.props.bookingDateRange.endDate ? _this.props.bookingDateRange.endDate : new Date()
      },
      unavailableDates: [],
      maxDate: Object(date_fns__WEBPACK_IMPORTED_MODULE_5__["addDays"])(new Date(), 1),
      minDate: new Date()
    };
    _this.dateSelectionAccordionRef = null;
    return _this;
  }

  _createClass(BookingInfoPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      Object(apply_services__WEBPACK_IMPORTED_MODULE_9__["getUnavailableDates"])(this.props.house.getData("UUID")).then(function (result) {
        var maxDate, minDate;
        var midUnavailableDates = [];

        if (result.length !== 1) {
          result.forEach(function (range) {
            if (range.start_date == null) {
              minDate = new Date(range.end_date);
              minDate.setDate(minDate.getDate() + 1);
            } else if (range.end_date == null) {
              maxDate = new Date(range.start_date);
              maxDate.setDate(maxDate.getDate() - 1);
            } else {
              midUnavailableDates.push({
                startDate: new Date(range.start_date),
                endDate: new Date(range.end_date)
              });
            }
          });
        } else {
          var today = new Date();
          maxDate = today;
          minDate = today;
          midUnavailableDates = [today];
        }

        _this2.setState(function (prevState) {
          return _objectSpread({}, prevState, {
            unavailableDates: midUnavailableDates,
            maxDate: maxDate,
            minDate: minDate
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var inputRefs = {};
      var guestsNumOptions = [];

      for (var i = 1; i <= this.props.house.getData("maxPeopleAllowed"); i++) {
        guestsNumOptions.push({
          value: i,
          label: i
        });
      }

      var furnished = this.props.house.getData("furnished") === "Y" ? "Furnished" : "Unfurnished";
      var selectionRange = {
        startDate: this.state.bookingDates.startDate,
        endDate: this.state.bookingDates.endDate,
        key: "selection",
        color: "#3fc692"
      };
      console.log(this.props.finInfo);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "padding"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.title + " " + _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.infoSection
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, this.props.house.getData("title")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, this.props.address)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.infoSection,
        id: "bookingInfoPanelID"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Accordion"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Card"], {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.dateDisplayCard
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Card"].Header, {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.dateDisplayCardHeader
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Accordion"].Toggle, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"],
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.dateDisplayChangeButton,
        ref: function ref(el) {
          return _this3.dateSelectionAccordionRef = el;
        },
        variant: "link",
        eventKey: "dateRangeSel"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row",
        style: {
          cursor: "pointer"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.dateSubtitle + " text-left"
      }, "Move in"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.dateDisplay + " text-left"
      }, this.props.bookingDateRange.startDate ? Object(date_fns__WEBPACK_IMPORTED_MODULE_5__["format"])(this.props.bookingDateRange.startDate, "MMM DD YYYY") : "Select Date")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-2 " + _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.centerArrow
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.dateSubtitle + " text-right"
      }, "Move out"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.dateDisplay + " text-right"
      }, this.props.bookingDateRange.endDate ? Object(date_fns__WEBPACK_IMPORTED_MODULE_5__["format"])(this.props.bookingDateRange.endDate, "MMM DD YYYY") : "Select Date"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Accordion"].Collapse, {
        eventKey: "dateRangeSel"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Card"].Body, {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.dateDisplayCardBody
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_date_range__WEBPACK_IMPORTED_MODULE_4__["DateRange"], {
        ranges: [selectionRange],
        showSelectionPreview: true,
        onChange: this.handleDateSelect,
        maxDate: this.state.maxDate,
        minDate: this.state.minDate,
        disabledDates: this.state.unavailableDates,
        months: 1,
        minRangeLength: 27,
        showDateDisplay: false,
        minRange: 1
      }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row",
        style: {
          marginTop: "20px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-8 d-flex align-items-end",
        onClick: function onClick() {
          inputRefs.guestNumSelect.focus();
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.subTitle
      }, "Number of Guests")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-4 d-flex justify-content-end"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_2__["default"], {
        styles: guestNumSelectStyles,
        options: guestsNumOptions,
        placeholder: "0",
        onChange: function onChange(e) {
          return _this3.props.onNumGuestsChange(e.value);
        },
        value: {
          value: this.props.numGuests,
          label: this.props.numGuests
        },
        ref: function ref(el) {
          return inputRefs.guestNumSelect = el;
        }
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.subTitle
      }, "Room Type"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.pr
      }, furnished, " ", this.props.house.getData("homeType")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.subTitle
      }, "Cancellation Policy"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.moreInfo
      }, "More Info"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.pr
      }, this.props.cancellationPolicy.getData("verbose"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.infoSection
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "left-padding"
      }, !this.props.inSyncFinInfo ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-8 " + _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.leftInfo
      }, "Weekly Rent"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-4 text-right " + _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.rightInfo
      }, "$", this.props.house.getData("rent"), " AUD")), this.props.finInfo.getData("stayDuration") ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row",
        style: {
          marginBottom: "10px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-8 " + _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.leftInfo
      }, "Length of Stay"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-4 text-right " + _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.rightInfo
      }, this.props.finInfo.getData("stayDuration"), " Weeks")) : null, this.props.finInfo.getData("serviceFee") ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row",
        style: {
          marginBottom: "10px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-8 " + _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.leftInfo
      }, "Service Fee"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-4 text-right " + _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.rightInfo
      }, "$", this.props.finInfo.getData("serviceFee"), " AUD")) : null, this.props.finInfo.getData("payableAmount") ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-8 " + _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.totalLeftInfo
      }, "Booking Deposit"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-4 text-right " + _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.totalRightInfo
      }, "$", this.props.finInfo.getData("payableAmount"), " AUD"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 " + _BookingInfoPanel_css__WEBPACK_IMPORTED_MODULE_1___default.a.grayInfo
      }, "Rent for 4 weeks "))) : null) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(core_loadingSpinners_LoadingSpinner__WEBPACK_IMPORTED_MODULE_10__["ResponseLoadingSpinner"], {
        height: "175px"
      })))));
    }
  }]);

  return BookingInfoPanel;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/apply/views/houseDetail/CheckoutForm.css":
/*!******************************************************!*\
  !*** ./src/apply/views/houseDetail/CheckoutForm.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./CheckoutForm.css */ "./node_modules/css-loader/dist/cjs.js?!./src/apply/views/houseDetail/CheckoutForm.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/apply/views/houseDetail/CheckoutForm.js":
/*!*****************************************************!*\
  !*** ./src/apply/views/houseDetail/CheckoutForm.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CheckoutForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stripe/react-stripe-js */ "./node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js");
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CheckoutForm_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckoutForm.css */ "./src/apply/views/houseDetail/CheckoutForm.css");
/* harmony import */ var _CheckoutForm_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_CheckoutForm_css__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // import {CardElement, injectStripe} from 'react-stripe-elements';




var CheckoutForm =
/*#__PURE__*/
function (_Component) {
  _inherits(CheckoutForm, _Component);

  function CheckoutForm(props) {
    var _this;

    _classCallCheck(this, CheckoutForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CheckoutForm).call(this, props));

    _this.submit = function () {
      var data = {
        payment_method: {
          card: _this.props.elements.getElement(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_1__["CardElement"]),
          billing_details: {
            name: _this.props.name
          }
        }
      };
      return _this.props.stripe.confirmCardPayment(_this.props.clientSecret, data); // this.props.stripe
      //     .confirmCardPayment(this.props.clientSecret, data)
      //     .then(result => {
      //         console.log(result);
      //         if (result.error) {
      //             // Show error to your customer (e.g., insufficient funds)
      //             // close modal
      //             // use alert
      //             console.log(result.error.message);
      //         } else {
      //             if (result.paymentIntent.status === "succeeded") {
      //                 //Redirect to success page
      //                 console.log("Hurray");
      //             }
      //         }
      //         return result;
      //     })
      //     .catch(error => {
      //         console.log(error);
      //     });
    };

    return _this;
  }

  _createClass(CheckoutForm, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {// if (this.props.requestForToken && this.props.requestForToken !== prevProps.requestForToken) {
      //     this.submit(this.props.name);
      // }
    }
  }, {
    key: "render",
    value: function render() {
      var CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
          }
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _CheckoutForm_css__WEBPACK_IMPORTED_MODULE_2___default.a.wrapper
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_1__["CardElement"], {
        options: CARD_ELEMENT_OPTIONS
      }));
    }
  }]);

  return CheckoutForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]); // export default function() {
//     return (
//         <ElementsConsumer>
//             {({ stripe, elements }) => {
//                 return (
//                     <RequestErrorBoundary
//                         status={getLoadStatus(stripe, elements)}
//                     >
//                         <CheckoutForm stripe={stripe} elements={elements} />
//                     </RequestErrorBoundary>
//                 );
//             }}
//         </ElementsConsumer>
//     );
// }




/***/ }),

/***/ "./src/apply/views/houseDetail/ConfirmBookingModal.css":
/*!*************************************************************!*\
  !*** ./src/apply/views/houseDetail/ConfirmBookingModal.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./ConfirmBookingModal.css */ "./node_modules/css-loader/dist/cjs.js?!./src/apply/views/houseDetail/ConfirmBookingModal.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/apply/views/houseDetail/ConfirmBookingModal.js":
/*!************************************************************!*\
  !*** ./src/apply/views/houseDetail/ConfirmBookingModal.js ***!
  \************************************************************/
/*! exports provided: ConfirmBookingModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmBookingModal", function() { return ConfirmBookingModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap/Button */ "./node_modules/react-bootstrap/Button.js");
/* harmony import */ var react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap/Modal */ "./node_modules/react-bootstrap/Modal.js");
/* harmony import */ var react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_UIComponents_APIRequestButton_APIRequestButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core/UIComponents/APIRequestButton/APIRequestButton */ "./src/core/UIComponents/APIRequestButton/APIRequestButton.js");
/* harmony import */ var _ConfirmBookingModal_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConfirmBookingModal.css */ "./src/apply/views/houseDetail/ConfirmBookingModal.css");
/* harmony import */ var _ConfirmBookingModal_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ConfirmBookingModal_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! routes */ "./src/routes.js");
/* harmony import */ var named_urls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! named-urls */ "./node_modules/named-urls/dist/index.js");
/* harmony import */ var named_urls__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(named_urls__WEBPACK_IMPORTED_MODULE_6__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var ConfirmBookingModal = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function (props, ref) {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      show = _React$useState2[0],
      setShow = _React$useState2[1];

  var handleClose = function handleClose() {
    return setShow(false);
  };

  var handleShow = function handleShow() {
    return setShow(true);
  };

  var successRoute = Object(named_urls__WEBPACK_IMPORTED_MODULE_6__["reverse"])(routes__WEBPACK_IMPORTED_MODULE_5__["default"].react.apply.success, {
    applicationUUID: props.applicationUUID
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useImperativeHandle"])(ref, function () {
    return {
      closeModal: function closeModal() {
        handleClose();
      }
    };
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(core_UIComponents_APIRequestButton_APIRequestButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
    layoutClasses: "btn imp-button-style",
    cTextOptions: {
      "default": "Book Now",
      loading: " ",
      done: "Processing",
      error: "Error!"
    },
    callback: props.onApply,
    onSuccess: function onSuccess() {
      handleShow();
    },
    containerID: ["applyPanelID", "bookingInfoPanelID"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default.a, {
    show: show,
    onHide: handleClose,
    animation: true,
    size: "lg",
    dialogClassName: "modal-dialog-centered",
    "aria-labelledby": "contained-modal-title-vcenter",
    centered: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-center " + _ConfirmBookingModal_css__WEBPACK_IMPORTED_MODULE_4___default.a.modalContent
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Are you sure you want to book the house?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-left"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Please ensure that all the provided details are correct before booking.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _ConfirmBookingModal_css__WEBPACK_IMPORTED_MODULE_4___default.a.buttonGroup
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(core_UIComponents_APIRequestButton_APIRequestButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
    layoutClasses: "btn float-left imp-button-style",
    cTextOptions: {
      "default": "Confirm Booking",
      loading: " ",
      done: "Booked",
      error: "Error!"
    },
    callback: props.onConfirmBooking,
    onSuccess: function onSuccess() {
      window.location.href = successRoute;
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Button__WEBPACK_IMPORTED_MODULE_1___default.a, {
    className: "btn default-button-style float-right",
    onClick: handleClose
  }, "Cancel")))));
});

/***/ }),

/***/ "./src/apply/views/houseDetail/DateRangeCalendar.css":
/*!***********************************************************!*\
  !*** ./src/apply/views/houseDetail/DateRangeCalendar.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!./DateRangeCalendar.css */ "./node_modules/css-loader/dist/cjs.js!./src/apply/views/houseDetail/DateRangeCalendar.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/apply/views/houseDetail/HouseDetailPage.css":
/*!*********************************************************!*\
  !*** ./src/apply/views/houseDetail/HouseDetailPage.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./HouseDetailPage.css */ "./node_modules/css-loader/dist/cjs.js?!./src/apply/views/houseDetail/HouseDetailPage.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/apply/views/houseDetail/HouseDetailPage.js":
/*!********************************************************!*\
  !*** ./src/apply/views/houseDetail/HouseDetailPage.js ***!
  \********************************************************/
/*! exports provided: SecretContext, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecretContext", function() { return SecretContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HouseDetailPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apply_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apply/services */ "./src/apply/services.js");
/* harmony import */ var apply_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apply/models */ "./src/apply/models.js");
/* harmony import */ var _HouseDetailPageComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HouseDetailPageComponent */ "./src/apply/views/houseDetail/HouseDetailPageComponent.js");
/* harmony import */ var core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core/utils/ModelHelper */ "./src/core/utils/ModelHelper.js");
/* harmony import */ var core_errorHelpers_RequestErrorBoundary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core/errorHelpers/RequestErrorBoundary */ "./src/core/errorHelpers/RequestErrorBoundary.js");
/* harmony import */ var core_alert_Alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core/alert/Alert */ "./src/core/alert/Alert.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var SecretContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(undefined);

var HouseDetailPage =
/*#__PURE__*/
function (_Component) {
  _inherits(HouseDetailPage, _Component);

  /**
   * Loading is tracked only for house information.
   * @param props - contains routerProps
   */
  function HouseDetailPage(props) {
    var _this;

    _classCallCheck(this, HouseDetailPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HouseDetailPage).call(this, props));

    _this.updateFinInfo = function () {
      if (_this.state.application.getData("bookingInfo.bookingStartDate") && _this.state.application.getData("bookingInfo.bookingEndDate") && _this.state.application.getData("bookingInfo.numGuests")) {
        _this.setState({
          inSyncFinInfo: true
        });

        Object(apply_services__WEBPACK_IMPORTED_MODULE_1__["getFinancialData"])(_this.houseUUID, _this.state.application.getData("bookingInfo")).then(function (result) {
          _this.setState(function (prevState) {
            return _objectSpread({}, prevState, {
              inSyncFinInfo: false,
              finInfo: new apply_models__WEBPACK_IMPORTED_MODULE_2__["FinancialInfo"](result, "saved")
            });
          });
        })["catch"](function (error) {
          if (error.badRequest) {
            var errorData = error.error.response.data;
            errorData.errors.forEach(function (error) {
              core_alert_Alert__WEBPACK_IMPORTED_MODULE_6__["alertUser"].init({
                message: error,
                alertType: "danger",
                autoHide: false
              });
            });
          }
        });
      }
    };

    _this.handleDateChange = function (startDate, endDate) {
      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          application: prevState.application.bulkUpdate({
            bookingStartDate: startDate,
            bookingEndDate: endDate
          }, "int", "bookingInfo")
        });
      }, _this.updateFinInfo);
    };

    _this.handleGuestsNumChange = function (value) {
      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          application: prevState.application.setData("bookingInfo.numGuests", value)
        });
      }, _this.updateFinInfo);
    };

    _this.handleApplicationChange = function (field, value) {
      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          application: prevState.application.setData(field, value)
        });
      });
    };

    _this.setApplicationUUID = function (value) {
      _this.setState({
        applicationUUID: value
      });
    };

    _this.setClientSecret = function (value) {
      _this.setState({
        clientSecret: value
      });
    };

    _this.submitApplication = function () {
      var that = _assertThisInitialized(_this);

      return new Promise(function (resolve, reject) {
        Object(apply_services__WEBPACK_IMPORTED_MODULE_1__["applyBooking"])(that.houseUUID, that.state.application).then(function (result) {
          that.setApplicationUUID(result.data["uuid"]);
          resolve(result);
        })["catch"](function (error) {
          if (error.badRequest) {
            var errorData = error.error.response.data;

            if (errorData.code === "AA") {
              core_alert_Alert__WEBPACK_IMPORTED_MODULE_6__["alertUser"].init({
                message: "Please fill in all the details to make a booking.",
                alertType: "warning",
                autoHide: true
              });
              that.setState(function (prevState) {
                return _objectSpread({}, prevState, {
                  application: prevState.application.parseError(errorData.errors)
                });
              });
            } else if (errorData.code === "AB") {
              errorData.errors.forEach(function (error) {
                core_alert_Alert__WEBPACK_IMPORTED_MODULE_6__["alertUser"].init({
                  message: error,
                  alertType: "danger",
                  autoHide: false
                });
              });
            }
          }

          reject(error);
        });
      });
    };

    _this.onConfirmBooking = function () {
      var that = _assertThisInitialized(_this);

      _this.disableDisplay();

      return new Promise(function (resolve, reject) {
        Object(apply_services__WEBPACK_IMPORTED_MODULE_1__["confirmBooking"])(that.houseUUID, that.state.applicationUUID).then(function (result) {
          that.setClientSecret(result.data.PG.client_secret);
          console.log(that.state.clientSecret, result, that.checkoutFormChild);
          return that.checkoutFormChild.current.submit();
        }).then(function (result) {
          if (result.error) {
            that.enableDisplay();
            that.confirmModalChild.current.closeModal();
            core_alert_Alert__WEBPACK_IMPORTED_MODULE_6__["alertUser"].init({
              message: result.error.message,
              alertType: "danger",
              autoHide: false
            });
            reject(result.error);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              //Redirect to success page
              console.log("Hurray");
              resolve();
            }
          }
        })["catch"](function (error) {
          that.enableDisplay();
          console.log(error);
          reject(error);
        });
      });
    };

    _this.disableDisplay = function () {
      _this.setState({
        disableDisplay: true
      });
    };

    _this.enableDisplay = function () {
      _this.setState({
        disableDisplay: false
      });
    };

    _this.houseUUID = props.routerProps.match.params.houseUUID;
    _this.state = {
      status: "loading",
      house: new apply_models__WEBPACK_IMPORTED_MODULE_2__["House"]({}, "empty"),
      images: new core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_4__["APIModelListAdapter"]([], apply_models__WEBPACK_IMPORTED_MODULE_2__["Image"], "uuid", "empty"),
      cancellationPolicy: new apply_models__WEBPACK_IMPORTED_MODULE_2__["CancellationPolicy"]({}, "empty"),
      location: new core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_4__["PostalLocation"]({}, "empty"),
      homeOwnerInfo: new apply_models__WEBPACK_IMPORTED_MODULE_2__["HomeOwnerInfo"]({}, "empty"),
      application: new apply_models__WEBPACK_IMPORTED_MODULE_2__["Application"]({}, "empty"),
      finInfo: new apply_models__WEBPACK_IMPORTED_MODULE_2__["FinancialInfo"]({}, "empty"),
      clientSecret: undefined,
      applicationUUID: undefined,
      disableDisplay: false,
      inSyncFinInfo: false
    };
    _this.checkoutFormChild = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    _this.confirmModalChild = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    return _this;
  }

  _createClass(HouseDetailPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setState(function (prevState) {
        return {
          status: "loading"
        };
      });
      Object(apply_services__WEBPACK_IMPORTED_MODULE_1__["getHouseData"])(this.houseUUID).then(function (result) {
        _this2.setState(function (prevState) {
          return _objectSpread({}, prevState, {
            status: "done",
            house: new apply_models__WEBPACK_IMPORTED_MODULE_2__["House"](result),
            images: new core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_4__["APIModelListAdapter"](result["images"], apply_models__WEBPACK_IMPORTED_MODULE_2__["Image"], "uuid", "saved"),
            cancellationPolicy: new apply_models__WEBPACK_IMPORTED_MODULE_2__["CancellationPolicy"](result["cancellation_policy"], "saved"),
            location: new core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_4__["PostalLocation"](result["location"], "saved")
          });
        });
      })["catch"](function (error) {
        _this2.setState(function (prevState) {
          return _objectSpread({}, prevState, {
            status: "error"
          });
        });
      });
      Object(apply_services__WEBPACK_IMPORTED_MODULE_1__["getHomeOwnerDetails"])(this.houseUUID).then(function (result) {
        _this2.setState(function (prevState) {
          return _objectSpread({}, prevState, {
            homeOwnerInfo: new apply_models__WEBPACK_IMPORTED_MODULE_2__["HomeOwnerInfo"](result, "saved")
          });
        });
      })["catch"](function (error) {
        _this2.setState(function (prevState) {
          return _objectSpread({}, prevState, {
            status: "error"
          });
        });
      });
      Object(apply_services__WEBPACK_IMPORTED_MODULE_1__["getApplicantData"])().then(function (result) {
        _this2.setState(function (prevState) {
          return _objectSpread({}, prevState, {
            application: prevState.application.bulkUpdate(result, "DB", "applicant")
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(core_errorHelpers_RequestErrorBoundary__WEBPACK_IMPORTED_MODULE_5__["default"], {
        status: this.state.status
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SecretContext.Provider, {
        value: this.state.clientSecret
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HouseDetailPageComponent__WEBPACK_IMPORTED_MODULE_3__["default"], {
        handleDateChange: this.handleDateChange,
        application: this.state.application,
        handleApplicationChange: this.handleApplicationChange,
        handleGuestsNumChange: this.handleGuestsNumChange,
        house: this.state.house,
        images: this.state.images,
        cancellationPolicy: this.state.cancellationPolicy,
        location: this.state.location,
        homeOwnerInfo: this.state.homeOwnerInfo,
        onApply: this.submitApplication,
        onConfirmBooking: this.onConfirmBooking,
        checkoutFormRef: this.checkoutFormChild,
        confirmModalRef: this.confirmModalChild,
        applicationUUID: this.state.applicationUUID,
        disableDisplay: this.state.disableDisplay,
        finInfo: this.state.finInfo,
        inSyncFinInfo: this.state.inSyncFinInfo
      })));
    }
  }]);

  return HouseDetailPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/apply/views/houseDetail/HouseDetailPageComponent.js":
/*!*****************************************************************!*\
  !*** ./src/apply/views/houseDetail/HouseDetailPageComponent.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HouseDetailPageComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_UIComponents_APIRequestButton_APIRequestButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/UIComponents/APIRequestButton/APIRequestButton */ "./src/core/UIComponents/APIRequestButton/APIRequestButton.js");
/* harmony import */ var _BookingInfoPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BookingInfoPanel */ "./src/apply/views/houseDetail/BookingInfoPanel.js");
/* harmony import */ var _ApplyPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ApplyPanel */ "./src/apply/views/houseDetail/ApplyPanel.js");
/* harmony import */ var _ImageCarousel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ImageCarousel */ "./src/apply/views/houseDetail/ImageCarousel.js");
/* harmony import */ var _ConfirmBookingModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ConfirmBookingModal */ "./src/apply/views/houseDetail/ConfirmBookingModal.js");
/* harmony import */ var _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HouseDetailPage.css */ "./src/apply/views/houseDetail/HouseDetailPage.css");
/* harmony import */ var _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var HouseDetailPageComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(HouseDetailPageComponent, _Component);

  function HouseDetailPageComponent(props) {
    var _this;

    _classCallCheck(this, HouseDetailPageComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HouseDetailPageComponent).call(this, props));

    _this.scrollToRef = function (ref) {
      window.scrollTo(0, ref.offsetTop + ref.offsetParent.offsetTop - 30);
    };

    _this.scrollToTop = function (ref) {
      window.scrollTo(0, ref.offsetTop);
    };

    _this.handleScroll = function () {
      var threshold = _this.elementRefs.bookingSection.offsetTop + _this.elementRefs.bookingSection.offsetParent.offsetTop - 0.3 * window.innerHeight;

      if ((window.pageYOffset || document.documentElement.scrollTop) > threshold) {
        // Reached apt scroll point to activate button
        if (!_this.state.bookButtonActive) {
          _this.setState(function (prevState) {
            return _objectSpread({}, prevState, {
              bookButtonActive: true
            });
          });
        }
      } else {
        if (_this.state.bookButtonActive) {
          _this.setState(function (prevState) {
            return _objectSpread({}, prevState, {
              bookButtonActive: false
            });
          });
        }
      }
    };

    _this.state = {
      bookButtonActive: false
    };
    _this.elementRefs = {};
    return _this;
  }

  _createClass(HouseDetailPageComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("scroll", this.handleScroll, {
        passive: true
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }, {
    key: "render",
    value: function render() {
      var furnished = this.props.house.getData("furnished") === "Y" ? "Furnished" : "Unfurnished";
      var locationVerbose = this.props.location.getData("properties");
      var address = "".concat(locationVerbose.name, ", ").concat(locationVerbose.region, ", ").concat(locationVerbose.country, " - ").concat(locationVerbose.code);
      var homeOwnerName = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["startCase"])(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["lowerCase"])(this.props.homeOwnerInfo.getData("firstName"))) + " " + Object(lodash__WEBPACK_IMPORTED_MODULE_1__["startCase"])(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["lowerCase"])(this.props.homeOwnerInfo.getData("lastName")));
      var elementRefs = this.elementRefs;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.props.disableDisplay ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.disabledOverlay
      }) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ImageCarousel__WEBPACK_IMPORTED_MODULE_5__["default"], {
        images: this.props.images
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.pageDetail
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row",
        style: {
          paddingBottom: "120px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-lg-7 col-xl-8"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "left"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.title
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, this.props.house.getData("title")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.address
      }, address)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.box
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-9"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.boxTitle
      }, furnished, " ", this.props.house.getData("homeType"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-3"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.icon
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.iconImage
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "/static/image/page-detail/left-box/1.svg",
        alt: "",
        title: ""
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.boxText
      }, this.props.house.getData("numBedrooms"), " bedrooms"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.icon
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.iconImage
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "/static/image/page-detail/left-box/2.svg",
        alt: "",
        title: ""
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.boxText
      }, this.props.house.getData("numBathrooms"), " bathroom"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.icon
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.iconImage
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "/static/image/page-detail/left-box/3.svg",
        alt: "",
        title: ""
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.boxText
      }, this.props.house.getData("numParkSpaces"), " Garage"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.about
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl2
      }, "About The Property"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.pg
      }, this.props.house.getData("description"), " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl3
      }, "Tenant Access"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.pg
      }, this.props.house.getData("accessRestrictions")), this.props.house.getData("otherPeopleDescription") ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl3
      }, "About other People in the house"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.pg
      }, this.props.house.getData("otherPeopleDescription"))) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl3
      }, "Welcome to"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-inline " + _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.checkList
      }, this.props.house.getData("welcomeTags").map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: index,
          className: "list-inline-item"
        }, item);
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.infoSection
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl2
      }, "Housing Facilities"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-inline " + _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.checkList
      }, this.props.house.getData("facilities").map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: index,
          className: "list-inline-item"
        }, item);
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.rule
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl2
      }, "House Rules"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-group list-group-flush"
      }, this.props.house.getData("rules").map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: index,
          className: "list-group-item"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "d-flex justify-content-between align-items-center"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, item.rule), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, item.value)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, item.comment));
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        style: {
          marginTop: "20px",
          marginBottom: "30px"
        }
      }, this.props.house.getData("otherRules")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.pg
      }, "Minimum Length of Stay - ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, this.props.house.getData("minStay"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.pg
      }, "Maximum Length of Stay -", " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, this.props.house.getData("maxStay") !== 0 ? this.props.house.getData("maxStay") : "No Limit")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.pg
      }, "Maximum Number of People Allowed -", " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, this.props.house.getData("maxPeopleAllowed")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.infoSection
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl2
      }, "Cancellation Policy"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl3
      }, this.props.cancellationPolicy.getData("verbose")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, this.props.cancellationPolicy.getData("description"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.infoSection
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl2
      }, "About area"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.map
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", {
        width: "100%",
        height: "100%",
        style: {
          border: "0",
          borderRadius: "5px"
        },
        src: "https://www.google.com/maps/embed/v1/place?key=AIzaSyClsJFzjgJBxhY3D4HDn4V_EG9Y5FYqdqQ&q=".concat(address),
        allowFullScreen: true
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl3
      }, "Local Area Facilities"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-inline " + _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.checkList
      }, this.props.house.getData("neighbourhoodFacilities").map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: index,
          className: "list-inline-item"
        }, item);
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.pg
      }, this.props.house.getData("neighbourhoodDescription"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.infoSection
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl2
      }, "About Home Owner"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row",
        style: {
          marginBottom: "30px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          textAlign: "center"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: this.props.homeOwnerInfo.getData("profilePicture"),
        className: "rounded-circle " + _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.userImage,
        alt: "",
        title: ""
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-9"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl3
      }, homeOwnerName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "list " + _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.tagList
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-inline " + _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.listInline
      }, this.props.homeOwnerInfo.getData("personalityTags").map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: index,
          className: "list-inline-item"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, item));
      })))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "applyPanelID"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.hl2,
        ref: function ref(el) {
          elementRefs.bookingSection = el;
        }
      }, "Booking Information"), getInfoMobilePanel(this, address), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ApplyPanel__WEBPACK_IMPORTED_MODULE_4__["default"], {
        homeOwnerName: homeOwnerName,
        application: this.props.application,
        onFieldChange: this.props.handleApplicationChange,
        checkoutFormRef: this.props.checkoutFormRef
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-lg-none col-12",
        style: {
          marginTop: "70px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConfirmBookingModal__WEBPACK_IMPORTED_MODULE_6__["ConfirmBookingModal"], {
        onApply: this.props.onApply,
        onConfirmBooking: this.props.onConfirmBooking,
        ref: this.props.confirmModalRef,
        applicationUUID: this.props.applicationUUID
      })), getInfoSidePanel(this, address)))));
    }
  }]);

  return HouseDetailPageComponent;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



function getInfoSidePanel(that, address) {
  if (window.innerWidth >= 992) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-none d-lg-block col-lg-5 col-xl-4"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_7___default.a.right
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_BookingInfoPanel__WEBPACK_IMPORTED_MODULE_3__["default"], {
      house: that.props.house,
      bookingDateRange: {
        startDate: that.props.application.getData("bookingInfo.bookingStartDate"),
        endDate: that.props.application.getData("bookingInfo.bookingEndDate")
      },
      numGuests: that.props.application.getData("bookingInfo.numGuests"),
      onNumGuestsChange: that.props.handleGuestsNumChange,
      address: address,
      cancellationPolicy: that.props.cancellationPolicy,
      handleDateChange: that.props.handleDateChange,
      finInfo: that.props.finInfo,
      inSyncFinInfo: that.props.inSyncFinInfo
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row",
      style: {
        margin: "20px 0"
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 d-flex justify-content-center"
    }, that.state.bookButtonActive ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConfirmBookingModal__WEBPACK_IMPORTED_MODULE_6__["ConfirmBookingModal"], {
      onApply: that.props.onApply,
      onConfirmBooking: that.props.onConfirmBooking,
      ref: that.props.confirmModalRef,
      applicationUUID: that.props.applicationUUID
    }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "imp-button-style",
      onClick: function onClick() {
        that.scrollToRef(that.elementRefs.bookingSection);
      }
    }, "Book Now")))));
  } else {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-none d-lg-block col-lg-5 col-xl-4"
    });
  }
}

function getInfoMobilePanel(that, address) {
  if (window.innerWidth < 992) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-lg-none"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_BookingInfoPanel__WEBPACK_IMPORTED_MODULE_3__["default"], {
      house: that.props.house,
      bookingDateRange: {
        startDate: that.props.application.getData("bookingInfo.bookingStartDate"),
        endDate: that.props.application.getData("bookingInfo.bookingEndDate")
      },
      numGuests: that.props.application.getData("bookingInfo.numGuests"),
      onNumGuestsChange: that.props.handleGuestsNumChange,
      address: address,
      cancellationPolicy: that.props.cancellationPolicy,
      handleDateChange: that.props.handleDateChange,
      finInfo: that.props.finInfo,
      inSyncFinInfo: that.props.inSyncFinInfo
    }));
  } else {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-lg-none"
    });
  }
}

/***/ }),

/***/ "./src/apply/views/houseDetail/ImageCarousel.css":
/*!*******************************************************!*\
  !*** ./src/apply/views/houseDetail/ImageCarousel.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!./ImageCarousel.css */ "./node_modules/css-loader/dist/cjs.js!./src/apply/views/houseDetail/ImageCarousel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/apply/views/houseDetail/ImageCarousel.js":
/*!******************************************************!*\
  !*** ./src/apply/views/houseDetail/ImageCarousel.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImageCarousel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HouseDetailPage.css */ "./src/apply/views/houseDetail/HouseDetailPage.css");
/* harmony import */ var _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap/Modal */ "./node_modules/react-bootstrap/Modal.js");
/* harmony import */ var react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-slick */ "./node_modules/react-slick/lib/index.js");
/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_slick__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ImageCarousel_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ImageCarousel.css */ "./src/apply/views/houseDetail/ImageCarousel.css");
/* harmony import */ var _ImageCarousel_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ImageCarousel_css__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var ImageCarousel =
/*#__PURE__*/
function (_Component) {
  _inherits(ImageCarousel, _Component);

  function ImageCarousel(props) {
    var _this;

    _classCallCheck(this, ImageCarousel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageCarousel).call(this, props));

    _this.handleImageModalClose = function () {
      _this.setState({
        showImageModal: false
      });
    };

    _this.state = {
      showImageModal: false,
      clickedImage: 1 // random Default

    };
    return _this;
  }

  _createClass(ImageCarousel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var settingsSlider = {
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
      var settingsModalSlider = {
        accessibility: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true,
        className: "modalSlider"
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Modal__WEBPACK_IMPORTED_MODULE_2___default.a, {
        show: this.state.showImageModal,
        onHide: this.handleImageModalClose,
        dialogClassName: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_1___default.a.imageDisplayModal,
        backdropClassName: _HouseDetailPage_css__WEBPACK_IMPORTED_MODULE_1___default.a.imageDisplayBackdrop,
        centered: true
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_slick__WEBPACK_IMPORTED_MODULE_3___default.a, _extends({}, settingsModalSlider, {
        initialSlide: this.state.clickedImage
      }), this.props.images.getObjectList().map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          src: item[1].getData("image"),
          alt: item[0],
          key: item[0]
        });
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_slick__WEBPACK_IMPORTED_MODULE_3___default.a, settingsSlider, this.props.images.getObjectList().map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          src: item[1].getData("image"),
          alt: item[0],
          key: item[0],
          onClick: function onClick() {
            return _this2.setState({
              showImageModal: true,
              clickedImage: index
            });
          }
        });
      })));
    }
  }]);

  return ImageCarousel;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/apply/views/houseDetail/PaymentPanel.js":
/*!*****************************************************!*\
  !*** ./src/apply/views/houseDetail/PaymentPanel.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PaymentPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CheckoutForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckoutForm */ "./src/apply/views/houseDetail/CheckoutForm.js");
/* harmony import */ var _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @stripe/stripe-js */ "./node_modules/@stripe/stripe-js/dist/stripe.esm.js");
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @stripe/react-stripe-js */ "./node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js");
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_errorHelpers_RequestErrorBoundary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core/errorHelpers/RequestErrorBoundary */ "./src/core/errorHelpers/RequestErrorBoundary.js");
/* harmony import */ var _HouseDetailPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HouseDetailPage */ "./src/apply/views/houseDetail/HouseDetailPage.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var stripePromise = Object(_stripe_stripe_js__WEBPACK_IMPORTED_MODULE_2__["loadStripe"])("pk_test_E6FOPoFqc8KdUgFgiYzwzQRy");

function getLoadStatus(stripe, elements) {
  if (!stripe || !elements) {
    return "loading";
  } else {
    return "done";
  }
}

var PaymentPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(PaymentPanel, _Component);

  function PaymentPanel(props) {
    var _this;

    _classCallCheck(this, PaymentPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PaymentPanel).call(this, props));
    _this.stripePromise = null;
    return _this;
  } // componentDidMount() {
  //     const stripePromise = loadStripe("pk_test_E6FOPoFqc8KdUgFgiYzwzQRy");
  // }


  _createClass(PaymentPanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_3__["Elements"], {
        stripe: stripePromise
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_3__["ElementsConsumer"], null, function (_ref) {
        var stripe = _ref.stripe,
            elements = _ref.elements;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(core_errorHelpers_RequestErrorBoundary__WEBPACK_IMPORTED_MODULE_4__["default"], {
          status: getLoadStatus(stripe, elements)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HouseDetailPage__WEBPACK_IMPORTED_MODULE_5__["SecretContext"].Consumer, null, function (clientSecret) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CheckoutForm__WEBPACK_IMPORTED_MODULE_1__["default"], {
            stripe: stripe,
            elements: elements,
            name: _this2.props.name,
            ref: _this2.props.checkoutFormRef,
            clientSecret: clientSecret
          });
        }));
      }));
    }
  }]);

  return PaymentPanel;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/apply/views/successPage/BookingSuccess.css":
/*!********************************************************!*\
  !*** ./src/apply/views/successPage/BookingSuccess.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./BookingSuccess.css */ "./node_modules/css-loader/dist/cjs.js?!./src/apply/views/successPage/BookingSuccess.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/apply/views/successPage/BookingSuccessPage.js":
/*!***********************************************************!*\
  !*** ./src/apply/views/successPage/BookingSuccessPage.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BookingSuccessPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var named_urls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! named-urls */ "./node_modules/named-urls/dist/index.js");
/* harmony import */ var named_urls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(named_urls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! routes */ "./src/routes.js");
/* harmony import */ var core_errorHelpers_RequestErrorBoundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core/errorHelpers/RequestErrorBoundary */ "./src/core/errorHelpers/RequestErrorBoundary.js");
/* harmony import */ var apply_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apply/models */ "./src/apply/models.js");
/* harmony import */ var apply_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apply/services */ "./src/apply/services.js");
/* harmony import */ var _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BookingSuccess.css */ "./src/apply/views/successPage/BookingSuccess.css");
/* harmony import */ var _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "./node_modules/@fortawesome/free-regular-svg-icons/index.es.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var BookingSuccessPage =
/*#__PURE__*/
function (_Component) {
  _inherits(BookingSuccessPage, _Component);

  function BookingSuccessPage(props) {
    var _this;

    _classCallCheck(this, BookingSuccessPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BookingSuccessPage).call(this, props));
    _this.applicationUUID = _this.props.routerProps.match.params.applicationUUID;
    _this.state = {
      status: "loading",
      booking: new apply_models__WEBPACK_IMPORTED_MODULE_4__["Booking"]({}, "empty") // booking:

    };
    return _this;
  }

  _createClass(BookingSuccessPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setState(function (prevState) {
        return {
          status: "loading"
        };
      });
      Object(apply_services__WEBPACK_IMPORTED_MODULE_5__["getBookingData"])(this.applicationUUID).then(function (result) {
        _this2.setState(function (prevState) {
          return _objectSpread({}, prevState, {
            status: "done",
            booking: new apply_models__WEBPACK_IMPORTED_MODULE_4__["Booking"](result, "saved")
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var booking = this.state.booking;
      var displayStatusClassName = _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.btn + " btn-link";
      var bookingStatus = booking.getData("status");

      if (bookingStatus === "Pending" || bookingStatus === "Pending-Locked") {
        displayStatusClassName += " " + _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.pendingBorder;
      } else if (bookingStatus === "Incomplete") {
        displayStatusClassName += " " + _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.incompleteBorder;
      } else if (bookingStatus === "Booked") {
        displayStatusClassName += " " + _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.successBorder;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(core_errorHelpers_RequestErrorBoundary__WEBPACK_IMPORTED_MODULE_3__["default"], {
        status: this.state.status
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.bookingDashboard
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12 d-flex align-items-center justify-content-center " + _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.mtb40
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeIcon"], {
        icon: _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_8__["faCheckCircle"],
        size: "9x",
        color: "#3fc692"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Success")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-12 col-lg-12 col-xl-12"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.board
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row align-items-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "image"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "/static/image/page-dashboard/1.png",
        className: "w-100",
        alt: "",
        title: ""
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-9"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-7"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.date
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.dateSubtitle + " text-left"
      }, "Move in"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.dateDisplay + " text-left"
      }, booking.getData("bookingDateRange.startDate"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-2 " + _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.centerArrow
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.dateSubtitle + " text-right"
      }, "Move out"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.dateDisplay + " text-right"
      }, booking.getData("bookingDateRange.endDate")))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.amount
      }, booking.getData("rent") + " AUD/week"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.bookingAmount
      }, "Amount Paid: " + booking.getData("bookingAmount") + " AUD"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-8"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.title + " btn-link",
        href: Object(named_urls__WEBPACK_IMPORTED_MODULE_1__["reverse"])(routes__WEBPACK_IMPORTED_MODULE_2__["default"].react.apply.houseInfo, {
          houseUUID: booking.getData("bookedHouse.houseUUID")
        })
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, booking.getData("bookedHouse.title"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, booking.getData("bookedHouse.houseNum"), ",", " ", booking.getData("bookedHouse.streetName")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, booking.getData("bookedHouse.location")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, booking.getData("bookedHouse.homeType")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _BookingSuccess_css__WEBPACK_IMPORTED_MODULE_6___default.a.confirm
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: displayStatusClassName
      }, bookingStatus)))))))))))));
    }
  }]);

  return BookingSuccessPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/core/UIComponents/helpers.js":
/*!******************************************!*\
  !*** ./src/core/UIComponents/helpers.js ***!
  \******************************************/
/*! exports provided: displayErrors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displayErrors", function() { return displayErrors; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function displayErrors(errorList) {
  var styleClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "invalid-feedback";

  if (errorList !== undefined && errorList !== null) {
    if (!Array.isArray(errorList)) {
      errorList = [errorList];
    }

    var disp = [];

    for (var i = 0; i < errorList.length; i++) {
      disp.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: i,
        className: styleClass
      }, errorList[i]));
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, disp);
  } else {
    return null;
  }
}

/***/ }),

/***/ "./src/core/errorHelpers/RequestErrorBoundary.js":
/*!*******************************************************!*\
  !*** ./src/core/errorHelpers/RequestErrorBoundary.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RequestErrorBoundary; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/core/errorHelpers/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_loadingSpinners_LoadingSpinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core/loadingSpinners/LoadingSpinner */ "./src/core/loadingSpinners/LoadingSpinner.js");
/* harmony import */ var _Error404__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Error404 */ "./src/core/errorHelpers/Error404.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var RequestErrorBoundary =
/*#__PURE__*/
function (_Component) {
  _inherits(RequestErrorBoundary, _Component);

  function RequestErrorBoundary() {
    _classCallCheck(this, RequestErrorBoundary);

    return _possibleConstructorReturn(this, _getPrototypeOf(RequestErrorBoundary).apply(this, arguments));
  }

  _createClass(RequestErrorBoundary, [{
    key: "render",

    /**
     Accepts status prop with options - ['done', 'error', 'loading']
     */
    value: function render() {
      if (this.props.status === "loading") {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(core_loadingSpinners_LoadingSpinner__WEBPACK_IMPORTED_MODULE_2__["ComponentLoadingSpinner"], null);
      } else if (this.props.status === "error") {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Error404__WEBPACK_IMPORTED_MODULE_3__["default"], null);
      } else if (this.props.status === "done") {
        // Normally, just render children
        return this.props.children;
      }
    }
  }]);

  return RequestErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/userAccount/models.js":
/*!***********************************!*\
  !*** ./src/userAccount/models.js ***!
  \***********************************/
/*! exports provided: UserPII, PersonalityTag, BillingCountry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPII", function() { return UserPII; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonalityTag", function() { return PersonalityTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BillingCountry", function() { return BillingCountry; });
/* harmony import */ var core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core/utils/ModelHelper */ "./src/core/utils/ModelHelper.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var UserPII =
/*#__PURE__*/
function (_APIModelAdapter) {
  _inherits(UserPII, _APIModelAdapter);

  function UserPII() {
    _classCallCheck(this, UserPII);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserPII).apply(this, arguments));
  }

  _createClass(UserPII, [{
    key: "fieldMap",
    value: function fieldMap() {
      return {
        email: {
          key: "email",
          readOnly: true
        },
        sex: {
          key: "sex"
        },
        billingCountryID: {
          key: "billing_country"
        },
        firstName: {
          key: "first_name"
        },
        lastName: {
          key: "last_name"
        },
        DOB: {
          key: "dob",
          parser: this.parseDate,
          serializer: this.serializeDate
        },
        billingPostcodeID: {
          key: "billing_postcode"
        },
        accountType: {
          key: "account_type",
          readOnly: true
        },
        contactNum: {
          key: "contact_num"
        },
        billingStreetAddress: {
          key: "billing_street_address"
        },
        businessName: {
          key: "business_name"
        }
      };
    }
  }, {
    key: "parseDate",
    value: function parseDate(dateStr) {
      return new Date(dateStr);
    }
  }, {
    key: "serializeDate",
    value: function serializeDate(dateObj) {
      var yyyy = dateObj.getFullYear().toString();
      var mm = (dateObj.getMonth() + 1).toString(); // getMonth() is zero-based

      var dd = dateObj.getDate().toString();
      return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
    }
  }]);

  return UserPII;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);
var PersonalityTag =
/*#__PURE__*/
function (_APIModelAdapter2) {
  _inherits(PersonalityTag, _APIModelAdapter2);

  function PersonalityTag() {
    _classCallCheck(this, PersonalityTag);

    return _possibleConstructorReturn(this, _getPrototypeOf(PersonalityTag).apply(this, arguments));
  }

  _createClass(PersonalityTag, [{
    key: "fieldMap",
    value: function fieldMap() {
      return {
        objID: {
          key: "id",
          "default": null
        },
        verbose: {
          key: "verbose"
        },
        checked: {
          key: "checked"
        }
      };
    }
  }]);

  return PersonalityTag;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);
var BillingCountry =
/*#__PURE__*/
function (_APIModelAdapter3) {
  _inherits(BillingCountry, _APIModelAdapter3);

  function BillingCountry() {
    _classCallCheck(this, BillingCountry);

    return _possibleConstructorReturn(this, _getPrototypeOf(BillingCountry).apply(this, arguments));
  }

  _createClass(BillingCountry, [{
    key: "fieldMap",
    value: function fieldMap() {
      return {
        billingCountry: {
          key: "billing_country"
        },
        readOnly: {
          key: "read_only",
          readOnly: true
        }
      };
    }
  }]);

  return BillingCountry;
}(core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ })

}]);
//# sourceMappingURL=29.chunk.js.map