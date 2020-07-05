(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

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

/***/ "./src/houseListing/views/forms/funTags/FunTagsContainer.js":
/*!******************************************************************!*\
  !*** ./src/houseListing/views/forms/funTags/FunTagsContainer.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FunTagsContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_alert_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core/alert/Alert */ "./src/core/alert/Alert.js");
/* harmony import */ var userAccount_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! userAccount/services */ "./src/userAccount/services.js");
/* harmony import */ var userAccount_models__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! userAccount/models */ "./src/userAccount/models.js");
/* harmony import */ var core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core/utils/ModelHelper */ "./src/core/utils/ModelHelper.js");
/* harmony import */ var _FormCommon_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../FormCommon.css */ "./src/houseListing/views/forms/FormCommon.css");
/* harmony import */ var _FormCommon_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_FormCommon_css__WEBPACK_IMPORTED_MODULE_5__);
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








var FunTagsContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(FunTagsContainer, _Component);

  function FunTagsContainer(props) {
    var _this;

    _classCallCheck(this, FunTagsContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FunTagsContainer).call(this, props));
    _this.formID = 10;

    _this.onTagUpdate = function (objID, value) {
      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          data: prevState.data.updateObject(objID, 'checked', value)
        });
      });

      _this.props.navContext.data.updateFormState(_this.formID, 'hasChanged');

      _this.props.navContext.sync();
    };

    _this.onTagAdd = function (input) {
      var text = input.value.replace('#', '');

      if (text !== "") {
        _this.setState(function (prevState) {
          return {
            data: prevState.data.update(new userAccount_models__WEBPACK_IMPORTED_MODULE_3__["PersonalityTag"]({
              id: null,
              verbose: text,
              checked: true
            }, 'hasChanged'), text)
          };
        });

        input.value = "#";

        _this.props.navContext.data.updateFormState(_this.formID, 'hasChanged');

        _this.props.navContext.sync();
      }

      input.focus();
    };

    _this.onSave = function (e) {
      var that = _assertThisInitialized(_this);

      e.stopPropagation();
      return new Promise(function (resolve, reject) {
        Object(userAccount_services__WEBPACK_IMPORTED_MODULE_2__["postPersonalityTags"])(that.props.houseUUID, that.state.data).then(function (tagList) {
          that.setState({
            data: tagList
          });
          that.props.navContext.data.updateFormState(that.formID, 'saved');
          that.props.navContext.sync();
          resolve(tagList);
        })["catch"](function (error) {
          core_alert_Alert__WEBPACK_IMPORTED_MODULE_1__["alertUser"].init({
            stockAlertType: 'unknownError'
          });
          that.props.navContext.data.updateFormState(that.formID, 'error');
          that.props.navContext.sync();
          reject(error);
        });
      });
    };

    if (props.cache.data === undefined) {
      _this.state = {
        data: new core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_4__["APIModelListAdapter"]([], userAccount_models__WEBPACK_IMPORTED_MODULE_3__["PersonalityTag"], 'id', 'empty')
      };
    } else {
      _this.state = {
        data: props.cache.data
      };
    }

    return _this;
  }

  _createClass(FunTagsContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.props.navContext.data.loadForm(this.formID, this.onSave, 'initial', "Fun Tags");

      if (this.state.data.status === 'empty') {
        Object(userAccount_services__WEBPACK_IMPORTED_MODULE_2__["getPersonalityTags"])(this.props.houseUUID).then(function (result) {
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

      this.props.navContext.sync();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      this.props.cache.updateStoreObject('personalityTagsData', function () {
        return _this3.state.data;
      });
      this.props.navContext.data.unloadForm();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var addField;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "form-10"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-1"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-10"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        className: _FormCommon_css__WEBPACK_IMPORTED_MODULE_5___default.a.pageTitle
      }, "Select the hashtag that best describes you or your hobbies"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-12"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "selection"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "btn-group btn-group-toggle"
      }, this.state.data.getObjectList().map(function (data) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PersonalityTagCheckbox, {
          data: data[1],
          key: data[0].toString(),
          onChange: _this4.onTagUpdate,
          objReference: data[0]
        });
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row",
        style: {
          marginTop: "50px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-6 col-sm-12"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "input big no-background"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control anything-else",
        ref: function ref(input) {
          addField = input;
        },
        onKeyPress: function onKeyPress(e) {
          if (e.key === 'Enter') {
            _this4.onTagAdd(addField);
          }
        },
        defaultValue: "#",
        placeholder: "Add other Tags"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "submit",
        className: "default-button-style",
        onClick: function onClick() {
          return _this4.onTagAdd(addField);
        }
      }, " Add"))))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-1"
      }))));
    }
  }]);

  return FunTagsContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



function PersonalityTagCheckbox(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "btn btn-link" + (props.data.getData('checked') ? " active" : "")
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    onChange: function onChange(e) {
      props.onChange(props.objReference, e.target.checked);
    },
    checked: props.data.getData('checked')
  }), "#".concat(props.data.getData('verbose')));
}

/***/ })

}]);
//# sourceMappingURL=26.chunk.js.map