(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/core/UIComponents/APIRequestButton/APIRequestButton.css":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/core/UIComponents/APIRequestButton/APIRequestButton.css ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "a._1L7BRuzayqfmQXchLIveSh {\n    font-size: 16px;\n    border-radius: 99px;\n    font-weight: 700;\n    color: #36ffb1 !important;\n    background-color: #2a2b32 !important;\n    padding: 11px 59px;\n    text-transform: uppercase;\n    transition: all 0.25s ease-in-out;\n    -webkit-appearance: none;\n}\n\na._1L7BRuzayqfmQXchLIveSh:hover,\na._1L7BRuzayqfmQXchLIveSh:focus {\n    text-decoration: none;\n    color: #2a2b32 !important;\n    background-color: #36ffb1 !important;\n}\n\na._1Uaa2AhF9DqpTM0LMEjw3T {\n    color: red !important;\n    background-color: #e6e6e6 !important;\n    pointer-events: none !important;\n}\n\na.m4SISgA4FBk-rDlC30BiV {\n    pointer-events: none !important;\n}\n\n._2Pidoe8Ox0fqCaSrxFPlJS {\n    text-align: center;\n    float: right;\n    position: relative;\n    width: auto;\n}\n\n._2g2M5_tw-JhS-7wuQgQf07 {\n    text-align: center;\n    float: left;\n    position: relative;\n    width: 40%;\n    padding-right: 10px;\n}\n", ""]);

// Exports
exports.locals = {
	"btn": "_1L7BRuzayqfmQXchLIveSh",
	"errorBtn": "_1Uaa2AhF9DqpTM0LMEjw3T",
	"loadingBtn": "m4SISgA4FBk-rDlC30BiV",
	"text": "_2Pidoe8Ox0fqCaSrxFPlJS",
	"loadingContainer": "_2g2M5_tw-JhS-7wuQgQf07"
};

/***/ }),

/***/ "./src/core/UIComponents/APIRequestButton/APIRequestButton.css":
/*!*********************************************************************!*\
  !*** ./src/core/UIComponents/APIRequestButton/APIRequestButton.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./APIRequestButton.css */ "./node_modules/css-loader/dist/cjs.js?!./src/core/UIComponents/APIRequestButton/APIRequestButton.css");

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

/***/ "./src/core/UIComponents/APIRequestButton/APIRequestButton.js":
/*!********************************************************************!*\
  !*** ./src/core/UIComponents/APIRequestButton/APIRequestButton.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return APIRequestButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-spinners */ "./node_modules/react-spinners/index.js");
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./APIRequestButton.css */ "./src/core/UIComponents/APIRequestButton/APIRequestButton.css");
/* harmony import */ var _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




/**
 * APIRequestButton
 *
 * props -
 *      textOption - key available in `textOptions`
 *      cTextOptions - Object like in 'textOptions' with text for 4 states [default, loading, done, error]
 *      loaderSize - in pixels, Size for the loading animation SVG
 *      loaderColor - Colour for the loading animation SVG
 *
 *      Following are the accepted prop keys for CSS classes [string]
 *          layoutClasses -
 *          loadingContainerClasses -
 *          textDoneClasses -
 *          textDefaultClasses -
 *          textErrorClasses -
 *          textLoadingClasses -
 *
 *      isDisabled - [optional] boolean
 *      doneDisabled - [optional] boolean
 *
 *      initialState - initial State of button
 *
 *      containerID - [optional] ID of Form container to track all child inputs to reset state on change to default
 *                    Works only with input based forms
 *
 *      callback - Promise function
 *      onSuccess - ran when callback is a success
 *      onFailure - ran when callback is failed (IMP! - If something fails in OnSuccess function, onFailure function
 *                  will be called.)
 *
 *      formState - [optional] Current State of the form. Recognises following states -
 *                      - 'saved' [as done]
 *                      - 'initial' [as default]
 *                      - 'hasChanged' [as default]
 *                      - 'error' [as error]
 *                  This disables internal state management except for loading state while in API request.
 *
 * Possible States of Button => {default, loading, done, error}
 */

var textOptions = {
  save: {
    "default": "Save",
    loading: "Saving",
    done: "Saved",
    error: "Error!"
  },
  saveNext: {
    "default": "Save & Next",
    loading: "Saving",
    done: "Next",
    error: "Error!"
  },
  saveExit: {
    "default": "Save & Exit",
    loading: "Saving",
    done: "Saved",
    error: "Error!"
  },
  cDelete: {
    "default": "Delete",
    loading: "Deleting",
    done: "Deleted",
    error: "Error!"
  }
};
var _formStateMap = {
  saved: "done",
  initial: "default",
  hasChanged: "default",
  error: "error"
};

var APIRequestButton =
/*#__PURE__*/
function (_Component) {
  _inherits(APIRequestButton, _Component);

  function APIRequestButton(props) {
    var _this;

    _classCallCheck(this, APIRequestButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(APIRequestButton).call(this, props));

    _this.attachListener = function () {
      if (_this.containerList.length !== 0) {
        _this.containerList.forEach(function (container) {
          container.addEventListener("input", _this.resetButtonOnInput);
        });
      }
    };

    _this.removeListener = function () {
      if (_this.containerList.length !== 0) {
        _this.containerList.forEach(function (container) {
          container.removeEventListener("input", _this.resetButtonOnInput);
        });
      }
    };

    _this.resetButtonOnInput = function (event) {
      if (_this.containerList.length !== 0) {
        _this.containerList.forEach(function (container) {
          container.removeEventListener("input", _this.resetButtonOnInput);
        });

        _this.setState({
          status: "default"
        });
      }
    };

    _this.onActionClick = function (e) {
      _this.setState({
        status: "loading"
      });

      _this.props.callback(e).then(function (result) {
        _this.setState({
          status: "done"
        });

        if (_this.props.onSuccess !== undefined) {
          _this.props.onSuccess(result);
        }
      })["catch"](function (error) {
        _this.setState({
          status: "error"
        });

        if (_this.props.onFailure !== undefined) {
          _this.props.onFailure(error);
        }
      });
    };

    _this.state = {
      status: props.initialState || "default"
    };
    _this.containerList = [];
    return _this;
  }

  _createClass(APIRequestButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.containerID) {
        if (Array.isArray(this.props.containerID)) {
          this.props.containerID.forEach(function (containerID) {
            _this2.containerList.push(document.getElementById(containerID));
          });
        } else {
          this.containerList.push(document.getElementById(this.props.containerID));
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeListener();
    }
  }, {
    key: "render",
    value: function render() {
      var _textOptions = this.props.textOption ? textOptions[this.props.textOption] : this.props.cTextOptions;

      var layoutClasses = this.props.layoutClasses || "btn float-right " + _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default.a.btn;

      if (this.props.isDisabled) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          type: "button",
          className: layoutClasses + " disabled",
          "aria-disabled": "true",
          tabIndex: "-1"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: this.props.textDefaultClasses || _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default.a.text
        }, _textOptions["default"]));
      }

      if (this.state.status === "default") {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          type: "button",
          className: layoutClasses,
          onClick: this.onActionClick,
          tabIndex: "0"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: this.props.textDefaultClasses || _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default.a.text
        }, _textOptions["default"]));
      } else if (this.state.status === "error") {
        this.attachListener();
        layoutClasses += this.props.errorClass ? " " + this.props.errorClass : " disabled " + _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default.a.errorBtn;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          type: "button",
          className: layoutClasses,
          onClick: this.onActionClick,
          "aria-disabled": "true",
          tabIndex: "-1"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: this.props.textErrorClasses || _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default.a.text
        }, _textOptions.error));
      } else if (this.state.status === "loading") {
        layoutClasses += this.props.loadingClass ? " " + this.props.loadingClass : " " + _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default.a.loadingBtn;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          type: "button",
          className: layoutClasses,
          onClick: this.onActionClick
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: this.props.loadingContainerClasses || _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default.a.loadingContainer
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_1__["PulseLoader"] // css={override}
        , {
          sizeUnit: "px",
          size: this.props.loaderSize || 8,
          color: this.props.loaderColor || "#36ffb1",
          loading: true
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: this.props.textLoadingClasses || _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default.a.text
        }, _textOptions.loading));
      } else if (this.state.status === "done") {
        this.attachListener();

        if (this.props.doneDisabled) {
          layoutClasses += this.props.doneClass ? " " + this.props.doneClass : " disabled " + _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default.a.doneBtn;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            type: "button",
            className: layoutClasses,
            onClick: this.onActionClick,
            "aria-disabled": "true",
            tabIndex: "-1"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: this.props.textDoneClasses || _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default.a.text
          }, _textOptions.done));
        } else {
          layoutClasses += this.props.doneClass ? " " + this.props.doneClass : " " + _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default.a.doneBtn;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
            type: "button",
            className: layoutClasses,
            onClick: this.onActionClick,
            tabIndex: "0"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: this.props.textDoneClasses || _APIRequestButton_css__WEBPACK_IMPORTED_MODULE_2___default.a.text
          }, _textOptions.done));
        }
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      // Overrides state with formState, except for when loading
      if (props.formState && state.status !== "loading") {
        return {
          status: _formStateMap[props.formState]
        };
      } else {
        return null;
      }
    }
  }]);

  return APIRequestButton;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ })

}]);
//# sourceMappingURL=1.chunk.js.map