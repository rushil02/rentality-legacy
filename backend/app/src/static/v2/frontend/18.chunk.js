(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/houseListing/views/forms/FormCommon.css":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/houseListing/views/forms/FormCommon.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "._27ruxPq0KQM3SyR5f456h1 {\n    font-size: 20px;\n    font-weight: 700;\n    color: #000000;\n    margin-top: 50px;\n    margin-bottom: 50px;\n}\n\n._27ruxPq0KQM3SyR5f456h1 i {\n    background-image: url('/static/image/popover.svg');\n    background-repeat: no-repeat;\n    background-position: center right;\n    margin-left: 30px;\n    width: 16px;\n    height: 16px;\n    cursor: alias;\n    font-style: unset;\n    margin-bottom: -4px;\n    font-size: 13px;\n    font-weight: 400;\n    color: #8f8f8f;\n    padding-right: 26px;\n}\n", ""]);

// Exports
exports.locals = {
	"pageTitle": "_27ruxPq0KQM3SyR5f456h1"
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/houseListing/views/forms/primary/FormPrimary.css":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/houseListing/views/forms/primary/FormPrimary.css ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "._14B4Z6Wl-4UULAj8-k9AO8 {\n    background-image: url('/static/image/form-1/address.svg');\n}\n\n._1R0jWQ6JdKvH-gjJ23SPb- {\n    background-image: url('/static/image/form-1/title.svg');\n}\n\n._2vbpi9TfekTjKzZSZ83y1Q {\n    background-image: url('/static/image/form-1/key.svg');\n}\n\n.vHY1npyHY2NhvtDk5u6LV {\n    background-image: url('/static/image/form-1/bathroom.svg');\n}\n\n._1m6_VSd9Y56WoRXSWAOkPN {\n    background-image: url('/static/image/form-1/bedroom.svg');\n}\n\n._3tiYpyBTmS-S__Yc5iq69Q {\n    background-image: url('/static/image/form-1/parking.svg');\n}", ""]);

// Exports
exports.locals = {
	"address": "_14B4Z6Wl-4UULAj8-k9AO8",
	"title": "_1R0jWQ6JdKvH-gjJ23SPb-",
	"addressHidden": "_2vbpi9TfekTjKzZSZ83y1Q",
	"bathroom": "vHY1npyHY2NhvtDk5u6LV",
	"bedroom": "_1m6_VSd9Y56WoRXSWAOkPN",
	"parking": "_3tiYpyBTmS-S__Yc5iq69Q"
};

/***/ }),

/***/ "./src/houseListing/views/forms/FormCommon.css":
/*!*****************************************************!*\
  !*** ./src/houseListing/views/forms/FormCommon.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./FormCommon.css */ "./node_modules/css-loader/dist/cjs.js?!./src/houseListing/views/forms/FormCommon.css");

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

/***/ "./src/houseListing/views/forms/primary/FormPrimary.css":
/*!**************************************************************!*\
  !*** ./src/houseListing/views/forms/primary/FormPrimary.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./FormPrimary.css */ "./node_modules/css-loader/dist/cjs.js?!./src/houseListing/views/forms/primary/FormPrimary.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/houseListing/views/forms/primary/FormPrimaryComponent.js":
/*!**********************************************************************!*\
  !*** ./src/houseListing/views/forms/primary/FormPrimaryComponent.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormPrimaryComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_UIComponents_PostalCodeAutoSuggest_PostalCodeAutoSuggestContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/UIComponents/PostalCodeAutoSuggest/PostalCodeAutoSuggestContainer */ "./src/core/UIComponents/PostalCodeAutoSuggest/PostalCodeAutoSuggestContainer.js");
/* harmony import */ var _HomeTypeSelector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HomeTypeSelector */ "./src/houseListing/views/forms/primary/HomeTypeSelector.js");
/* harmony import */ var _FurnishedSelector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FurnishedSelector */ "./src/houseListing/views/forms/primary/FurnishedSelector.js");
/* harmony import */ var houseListing_dataContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! houseListing/dataContext */ "./src/houseListing/dataContext.js");
/* harmony import */ var _FormPrimary_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormPrimary.css */ "./src/houseListing/views/forms/primary/FormPrimary.css");
/* harmony import */ var _FormPrimary_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_FormPrimary_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _FormCommon_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../FormCommon.css */ "./src/houseListing/views/forms/FormCommon.css");
/* harmony import */ var _FormCommon_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_FormCommon_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../core/UIComponents/helpers */ "./src/core/UIComponents/helpers.js");








function FormPrimaryComponent(props) {
  var inputRefs = {};
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "form-1",
    className: "form-series"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-1"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-10"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: _FormCommon_css__WEBPACK_IMPORTED_MODULE_6___default.a.pageTitle
  }, "About the Property"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "input title"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "main-form-title",
    required: true,
    id: "id_main-form-title",
    className: "form-control " + _FormPrimary_css__WEBPACK_IMPORTED_MODULE_5___default.a.title,
    maxLength: "250",
    placeholder: "Property Name",
    value: props.title,
    onChange: function onChange(e) {
      return props.onFieldChange("title", e.target.value);
    },
    autoComplete: "off"
  }), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_7__["displayErrors"])(props.errors.title)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "form-text text-muted"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "input address"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "main-form-address_hidden",
    id: "id_main-form-address_hidden",
    className: "form-control " + _FormPrimary_css__WEBPACK_IMPORTED_MODULE_5___default.a.addressHidden,
    placeholder: "Unit Number or House Number",
    value: props.houseNum,
    autoComplete: "off",
    onChange: function onChange(e) {
      return props.onFieldChange("houseNum", e.target.value);
    }
  }), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_7__["displayErrors"])(props.errors.houseNum)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "form-text text-muted"
  }, "This number is not visible to others until they make a booking.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "input"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "main-form-address",
    id: "id_main-form-address",
    className: "form-control no-background",
    placeholder: "Street Name",
    style: {
      "paddingLeft": "10px"
    },
    value: props.streetName,
    autoComplete: "off",
    onChange: function onChange(e) {
      return props.onFieldChange("streetName", e.target.value);
    }
  }), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_7__["displayErrors"])(props.errors.streetName)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "form-text text-muted"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(core_UIComponents_PostalCodeAutoSuggest_PostalCodeAutoSuggestContainer__WEBPACK_IMPORTED_MODULE_1__["default"], {
    errors: props.errors.postalCodeID || [],
    objID: props.postalCodeID,
    onFieldChange: props.onFieldChange
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 col-lg-6"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(houseListing_dataContext__WEBPACK_IMPORTED_MODULE_4__["FormOptionsCache"].Consumer, null, function (cache) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HomeTypeSelector__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onFieldChange: props.onFieldChange,
      value: props.homeType,
      formOptions: cache.data.homeTypeOptions
    });
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "form-text text-muted"
  }), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_7__["displayErrors"])(props.errors.homeType)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 col-lg-6"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(houseListing_dataContext__WEBPACK_IMPORTED_MODULE_4__["FormOptionsCache"].Consumer, null, function (cache) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FurnishedSelector__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onFieldChange: props.onFieldChange,
      value: props.furnished,
      formOptions: cache.data.furnishedOptions
    });
  }), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_7__["displayErrors"])(props.errors.furnished), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "form-text text-muted"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 col-lg-6"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "input number-disp " + _FormPrimary_css__WEBPACK_IMPORTED_MODULE_5___default.a.bedroom,
    onClick: function onClick() {
      inputRefs.bedroomInput.focus();
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Number of Bedrooms"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "number",
    name: "main-form-bedrooms",
    id: "id_main-form-bedrooms",
    ref: function ref(input) {
      inputRefs.bedroomInput = input;
    },
    min: "0",
    value: props.numBedrooms,
    onChange: function onChange(e) {
      return props.onFieldChange("numBedrooms", e.target.value);
    }
  })), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_7__["displayErrors"])(props.errors.numBedrooms), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "form-text text-muted"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 col-lg-6"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "input number-disp " + _FormPrimary_css__WEBPACK_IMPORTED_MODULE_5___default.a.bathroom,
    onClick: function onClick() {
      inputRefs.bathroomsInput.focus();
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Number of Bathrooms"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "number",
    name: "main-form-bathrooms",
    id: "id_main-form-bathrooms",
    ref: function ref(input) {
      inputRefs.bathroomsInput = input;
    },
    min: "0",
    value: props.numBathrooms,
    onChange: function onChange(e) {
      return props.onFieldChange("numBathrooms", e.target.value);
    }
  })), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_7__["displayErrors"])(props.errors.numBathrooms), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "form-text text-muted"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12 col-lg-6"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "input number-disp " + _FormPrimary_css__WEBPACK_IMPORTED_MODULE_5___default.a.parking,
    onClick: function onClick() {
      inputRefs.parkSpaceInput.focus();
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Number of parking spaces"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "number",
    name: "main-form-parking",
    id: "id_main-form-parking",
    min: "0",
    ref: function ref(input) {
      inputRefs.parkSpaceInput = input;
    },
    value: props.numParkSpaces,
    onChange: function onChange(e) {
      return props.onFieldChange("numParkSpaces", e.target.value);
    }
  })), Object(_core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_7__["displayErrors"])(props.errors.numParkSpaces), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", {
    className: "form-text text-muted"
  })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-1"
  }))));
}

/***/ }),

/***/ "./src/houseListing/views/forms/primary/FormPrimaryContainer.js":
/*!**********************************************************************!*\
  !*** ./src/houseListing/views/forms/primary/FormPrimaryContainer.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormPrimaryContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FormPrimaryComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormPrimaryComponent */ "./src/houseListing/views/forms/primary/FormPrimaryComponent.js");
/* harmony import */ var houseListing_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! houseListing/services */ "./src/houseListing/services.js");
/* harmony import */ var houseListing_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! houseListing/models */ "./src/houseListing/models.js");
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






var FormPrimaryContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(FormPrimaryContainer, _Component);

  function FormPrimaryContainer(props) {
    var _this;

    _classCallCheck(this, FormPrimaryContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FormPrimaryContainer).call(this, props));
    _this.formID = 1;

    _this.onFieldChange = function (field, value) {
      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          data: prevState.data.setData(field, value)
        });
      });

      _this.props.navContext.data.updateCurrentFormState('hasChanged');

      _this.props.navContext.sync();
    };

    _this.onSave = function (e) {
      e.stopPropagation();

      var that = _assertThisInitialized(_this);

      if (_this.props.mode === 'edit') {
        return new Promise(function (resolve, reject) {
          Object(houseListing_services__WEBPACK_IMPORTED_MODULE_2__["patchHouseData"])(that.props.houseUUID, that.state.data).then(function (house) {
            that.setState({
              data: house
            });
            that.props.navContext.data.updateFormState(that.formID, 'saved');
            that.props.navContext.sync();
            resolve(house);
          })["catch"](function (error) {
            that.forceUpdate();
            that.props.navContext.data.updateFormState(that.formID, 'error');
            that.props.navContext.sync();
            reject(error);
          });
        });
      } else {
        return new Promise(function (resolve, reject) {
          Object(houseListing_services__WEBPACK_IMPORTED_MODULE_2__["postHouseData"])(that.state.data).then(function (house) {
            that.setState({
              data: house
            });
            that.props.navContext.data.updateFormState(that.formID, 'saved');
            that.props.navContext.sync();
            resolve(house);
          })["catch"](function (error) {
            that.forceUpdate();
            that.props.navContext.data.updateFormState(that.formID, 'error');
            that.props.navContext.sync();
            reject(error);
          });
        });
      }
    };

    if (props.cache.data === undefined) {
      _this.state = {
        data: new houseListing_models__WEBPACK_IMPORTED_MODULE_3__["House"]({}, 'empty')
      };
    } else {
      _this.state = {
        data: props.cache.data
      };
    }

    return _this;
  }

  _createClass(FormPrimaryContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.props.navContext.data.loadForm(this.formID, this.onSave, 'initial', "About the Property");

      if (this.props.mode === 'edit') {
        if (this.state.data.status === 'empty') {
          // Fetch house details
          Object(houseListing_services__WEBPACK_IMPORTED_MODULE_2__["getHouseData"])(this.props.houseUUID).then(function (result) {
            _this2.setState(function (prevState) {
              return _objectSpread({}, prevState, {
                data: result
              });
            });

            _this2.props.navContext.data.updateFormState(_this2.formID, 'saved');

            _this2.props.navContext.sync();
          });
        } else {
          this.props.navContext.data.updateFormState(this.formID, this.state.data.status);
        }
      } // else mode === create


      this.props.navContext.sync();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      this.props.cache.updateStoreObject('mainData', function () {
        return _this3.state.data;
      });
      this.props.navContext.data.unloadForm();
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FormPrimaryComponent__WEBPACK_IMPORTED_MODULE_1__["default"], {
        onFieldChange: this.onFieldChange,
        errors: this.state.data.errors,
        title: this.state.data.getData('title'),
        houseNum: this.state.data.getData('houseNum'),
        streetName: this.state.data.getData('streetName'),
        postalCodeID: this.state.data.getData('postalCodeID'),
        homeType: this.state.data.getData('homeType'),
        furnished: this.state.data.getData('furnished'),
        numBedrooms: this.state.data.getData('numBedrooms'),
        numBathrooms: this.state.data.getData('numBathrooms'),
        numParkSpaces: this.state.data.getData('numParkSpaces')
      });
    }
  }]);

  return FormPrimaryContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/houseListing/views/forms/primary/FurnishedSelector.js":
/*!*******************************************************************!*\
  !*** ./src/houseListing/views/forms/primary/FurnishedSelector.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FurnishedSelectorComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");
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




function substituteVerbose(key, verbose) {
  var subs = {
    'Y': 'Furnished',
    'N': 'Unfurnished'
  };

  if (subs.hasOwnProperty(key)) {
    return subs[key];
  } else {
    return verbose;
  }
}

var FurnishedSelectorComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(FurnishedSelectorComponent, _Component);

  function FurnishedSelectorComponent() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, FurnishedSelectorComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FurnishedSelectorComponent)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.getValue = function (key) {
      var value = '';

      if (Object.keys(_this.props.formOptions).length > 0) {
        value = {
          value: key,
          label: substituteVerbose(key, _this.props.formOptions[key])
        };
      }

      return value;
    }, _this.getList = function () {
      var furnishedOptions = [];

      if (Object.keys(_this.props.formOptions).length > 0) {
        furnishedOptions = Object.entries(_this.props.formOptions).map(function (item) {
          return {
            value: item[0],
            label: substituteVerbose(item[0], item[1])
          };
        });
      }

      return furnishedOptions;
    }, _temp));
  }

  _createClass(FurnishedSelectorComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var customStyles = {
        option: function option(provided, state) {
          return _objectSpread({}, provided);
        },
        singleValue: function singleValue(provided, state) {
          var opacity = state.isDisabled ? 0.5 : 1;
          var transition = 'opacity 300ms';
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
            "flex-wrap": "wrap",
            "padding-top": "6px",
            "padding-bottom": "6px"
          };
        },
        container: function container(provided, state) {
          return {
            "background-image": "url(/static/image/form-1/kitchen.svg)",
            "position": "relative",
            "font-size": "15px",
            "color": "#676767",
            "font-weight": "400",
            "border-bottom": state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
            "background-repeat": "no-repeat",
            "background-position": "left center",
            "padding-left": "40px",
            "margin-top": "5px",
            "box-shadow": state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial"
          };
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_1__["default"], {
        styles: customStyles,
        options: this.getList(),
        placeholder: "Select Furnished Option",
        onChange: function onChange(e) {
          return _this2.props.onFieldChange("furnished", e.value);
        },
        value: this.getValue(this.props.value)
      }));
    }
  }]);

  return FurnishedSelectorComponent;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./src/houseListing/views/forms/primary/HomeTypeSelector.js":
/*!******************************************************************!*\
  !*** ./src/houseListing/views/forms/primary/HomeTypeSelector.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HomeTypeSelectorComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");
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




var HomeTypeSelectorComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(HomeTypeSelectorComponent, _Component);

  function HomeTypeSelectorComponent() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, HomeTypeSelectorComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HomeTypeSelectorComponent)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.getValue = function (key) {
      var value = '';

      if (Object.keys(_this.props.formOptions).length > 0 && key > 0) {
        value = {
          value: key,
          label: _this.props.formOptions[key]
        };
      }

      return value;
    }, _this.getList = function () {
      var homeTypeOptions = [];

      if (Object.keys(_this.props.formOptions).length > 0) {
        homeTypeOptions = Object.entries(_this.props.formOptions).map(function (item) {
          return {
            value: Number(item[0]),
            label: item[1]
          };
        });
      }

      return homeTypeOptions;
    }, _temp));
  }

  _createClass(HomeTypeSelectorComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var customStyles = {
        option: function option(provided, state) {
          return _objectSpread({}, provided);
        },
        singleValue: function singleValue(provided, state) {
          var opacity = state.isDisabled ? 0.5 : 1;
          var transition = 'opacity 300ms';
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
            "flex-wrap": "wrap",
            "padding-top": "6px",
            "padding-bottom": "6px"
          };
        },
        container: function container(provided, state) {
          return {
            "background-image": "url(/static/image/form-1/type.svg)",
            "position": "relative",
            "font-size": "15px",
            "color": "#676767",
            "font-weight": "400",
            "border-bottom": state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
            "background-repeat": "no-repeat",
            "background-position": "left center",
            "padding-left": "40px",
            "margin-top": "5px",
            "-webkit-transition": "all 0.30s ease-in-out",
            "-moz-transition": "all 0.30s ease-in-out",
            "-ms-transition": "all 0.30s ease-in-out",
            "-o-transition": "all 0.30s ease-in-out",
            "box-shadow": state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial"
          };
        }
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_1__["default"], {
        styles: customStyles,
        options: this.getList(),
        placeholder: "Select Home Type",
        onChange: function onChange(e) {
          return _this2.props.onFieldChange("homeType", e.value);
        },
        value: this.getValue(this.props.value)
      }));
    }
  }]);

  return HomeTypeSelectorComponent;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ })

}]);
//# sourceMappingURL=18.chunk.js.map