(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

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

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/houseListing/views/forms/cancellationPolicy/CancellationPolicy.css":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/houseListing/views/forms/cancellationPolicy/CancellationPolicy.css ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "div._2kiY0_x87YdGxg5bhP3khk {\n    position: relative;\n    margin-bottom: 60px;\n}\n\na._1fnZAPgTsubZ2-4XKaoNY_ {\n    position: relative;\n    color: #676767;\n    float: right;\n}\n\np._200aW14cw_6dBniPaQSGVv {\n    font-size: 15px;\n    font-weight: 400;\n    color: #676767;\n}\n", ""]);

// Exports
exports.locals = {
	"moreInfo": "_2kiY0_x87YdGxg5bhP3khk",
	"moreInfoLink": "_1fnZAPgTsubZ2-4XKaoNY_",
	"description": "_200aW14cw_6dBniPaQSGVv"
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

/***/ "./src/houseListing/views/forms/cancellationPolicy/CancellationPolicy.css":
/*!********************************************************************************!*\
  !*** ./src/houseListing/views/forms/cancellationPolicy/CancellationPolicy.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--5-1!./CancellationPolicy.css */ "./node_modules/css-loader/dist/cjs.js?!./src/houseListing/views/forms/cancellationPolicy/CancellationPolicy.css");

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

/***/ "./src/houseListing/views/forms/cancellationPolicy/CancellationPolicyContainer.js":
/*!****************************************************************************************!*\
  !*** ./src/houseListing/views/forms/cancellationPolicy/CancellationPolicyContainer.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CancellationPolicyContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var named_urls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! named-urls */ "./node_modules/named-urls/dist/index.js");
/* harmony import */ var named_urls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(named_urls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! routes */ "./src/routes.js");
/* harmony import */ var core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core/utils/ModelHelper */ "./src/core/utils/ModelHelper.js");
/* harmony import */ var houseListing_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! houseListing/models */ "./src/houseListing/models.js");
/* harmony import */ var houseListing_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! houseListing/services */ "./src/houseListing/services.js");
/* harmony import */ var _CancellationPolicy_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CancellationPolicy.css */ "./src/houseListing/views/forms/cancellationPolicy/CancellationPolicy.css");
/* harmony import */ var _CancellationPolicy_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_CancellationPolicy_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _FormCommon_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../FormCommon.css */ "./src/houseListing/views/forms/FormCommon.css");
/* harmony import */ var _FormCommon_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_FormCommon_css__WEBPACK_IMPORTED_MODULE_7__);
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










var CancellationPolicyContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(CancellationPolicyContainer, _Component);

  function CancellationPolicyContainer(props) {
    var _this;

    _classCallCheck(this, CancellationPolicyContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CancellationPolicyContainer).call(this, props));
    _this.formID = 6;

    _this.sync = function () {
      Object(houseListing_services__WEBPACK_IMPORTED_MODULE_5__["getCancellationPolicies"])(_this.props.houseUUID).then(function (result) {
        _this.setState(function (prevState) {
          return _objectSpread({}, prevState, {
            data: result
          });
        });
      });
    };

    _this.onPolicyUpdate = function (obj) {
      var that = _assertThisInitialized(_this);

      Object(houseListing_services__WEBPACK_IMPORTED_MODULE_5__["postCancellationPolicy"])(that.props.houseUUID, obj).then(function () {
        that.setState(function (prevState) {
          return _objectSpread({}, prevState, {
            house: prevState.house._silentUpdate('cancellationPolicyID', obj.getData('objID'))
          });
        });
        that.props.navContext.data.updateFormState(that.formID, 'saved');
        that.props.navContext.sync();
      })["catch"](function (error) {
        that.props.navContext.data.updateFormState(that.formID, 'error');
        that.props.navContext.sync();
      });
    };

    _this.onSave = function (e) {
      e.stopPropagation();
      return new Promise(function (resolve, reject) {
        resolve();
      });
    };

    _this.state = {
      data: new core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_3__["APIModelListAdapter"]([], houseListing_models__WEBPACK_IMPORTED_MODULE_4__["CancellationPolicy"], 'uuid', 'empty'),
      house: new houseListing_models__WEBPACK_IMPORTED_MODULE_4__["House"]({}, 'empty')
    };

    if (props.cache.data !== undefined) {
      _this.state.data = props.cache.data;
    }

    if (props.mainDataCache.data !== undefined) {
      _this.state.house = props.mainDataCache.data;
    }

    return _this;
  }

  _createClass(CancellationPolicyContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.props.navContext.data.loadForm(this.formID, this.onSave, 'saved', "Cancellation Policy");
      this.props.navContext.sync();

      if (this.state.data.status === 'empty') {
        this.sync();
      }

      if (this.state.house.status === 'empty') {
        // Fetch house details
        Object(houseListing_services__WEBPACK_IMPORTED_MODULE_5__["getHouseData"])(this.props.houseUUID).then(function (result) {
          _this2.setState(function (prevState) {
            return _objectSpread({}, prevState, {
              house: result
            });
          });
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      this.props.cache.updateStoreObject('mainData', function () {
        return _this3.state.house;
      });
      this.props.cache.updateStoreObject('canPolicyData', function () {
        return _this3.state.data;
      });
      this.props.navContext.data.unloadForm();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "form-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-1"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-10"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        className: _FormCommon_css__WEBPACK_IMPORTED_MODULE_7___default.a.pageTitle
      }, "Which Cancellation Policy would you like to opt for?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "paragraph"
      }, this.state.data.getObjectList().map(function (item) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CancellationPolicyComponent, {
          data: item[1],
          key: item[0].toString(),
          onChange: _this4.onPolicyUpdate,
          objRef: item[0],
          isSelected: _this4.state.house.getData('cancellationPolicyID') === item[1].getData('objID')
        });
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-1"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-12",
        style: {
          marginTop: "50px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, "Please note: The tenant is allowed to cancel the booking without penalty within 24 hours of the booking being approved by the homeowner. (As required by legislation)")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-1"
      }))));
    }
  }]);

  return CancellationPolicyContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



function CancellationPolicyComponent(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "checkbox auto-width"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "list-inline"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "list-inline-item",
    style: {
      marginBottom: "0"
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "custom-control custom-checkbox"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    id: "checkbox-".concat(props.objRef),
    className: "custom-control-input",
    onChange: function onChange(e) {
      return props.isSelected ? e.preventDefault() : props.onChange(props.data);
    },
    checked: props.isSelected
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "custom-control-label",
    style: {
      fontWeight: '700',
      color: '#000000'
    },
    htmlFor: "checkbox-".concat(props.objRef)
  }, props.data.getData('verbose')))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: _CancellationPolicy_css__WEBPACK_IMPORTED_MODULE_6___default.a.description
  }, props.data.getData('description')), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: _CancellationPolicy_css__WEBPACK_IMPORTED_MODULE_6___default.a.moreInfo
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: _CancellationPolicy_css__WEBPACK_IMPORTED_MODULE_6___default.a.moreInfoLink,
    target: "_blank",
    href: props.data.getData('officialPolicy') ? props.data.getData('officialPolicy') : Object(named_urls__WEBPACK_IMPORTED_MODULE_1__["reverse"])(routes__WEBPACK_IMPORTED_MODULE_2__["default"].howItWorks)
  }, "More Information")));
}

/***/ })

}]);
//# sourceMappingURL=21.chunk.js.map