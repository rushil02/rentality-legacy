(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[27],{

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

/***/ "./src/houseListing/views/forms/infoForTenants/InfoForTenantsContainer.js":
/*!********************************************************************************!*\
  !*** ./src/houseListing/views/forms/infoForTenants/InfoForTenantsContainer.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InfoForTenantsContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models */ "./src/houseListing/models.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services */ "./src/houseListing/services.js");
/* harmony import */ var _FormCommon_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FormCommon.css */ "./src/houseListing/views/forms/FormCommon.css");
/* harmony import */ var _FormCommon_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_FormCommon_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core/UIComponents/helpers */ "./src/core/UIComponents/helpers.js");
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







var InfoForTenantsContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(InfoForTenantsContainer, _Component);

  function InfoForTenantsContainer(props) {
    var _this;

    _classCallCheck(this, InfoForTenantsContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InfoForTenantsContainer).call(this, props));
    _this.formID = 7;

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

      return new Promise(function (resolve, reject) {
        Object(_services__WEBPACK_IMPORTED_MODULE_2__["patchHouseData"])(that.props.houseUUID, that.state.data).then(function (house) {
          that.setState(function (prevState) {
            return _objectSpread({}, prevState, {
              data: house
            });
          });
          that.props.navContext.data.updateFormState(that.formID, 'saved');
          that.props.navContext.sync();
          resolve(house);
        })["catch"](function (house) {
          that.props.navContext.data.updateFormState(that.formID, 'error');
          that.props.navContext.sync();
          reject();
        });
      });
    };

    if (props.cache.data === undefined) {
      _this.state = {
        data: new _models__WEBPACK_IMPORTED_MODULE_1__["House"]({}, 'empty')
      };
    } else {
      _this.state = {
        data: props.cache.data
      };
    }

    return _this;
  }

  _createClass(InfoForTenantsContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.props.navContext.data.loadForm(this.formID, this.onSave, 'initial', "Information for Guests");

      if (this.state.data.status === 'empty') {
        // Fetch house details
        Object(_services__WEBPACK_IMPORTED_MODULE_2__["getHouseData"])(this.props.houseUUID).then(function (result) {
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

      this.props.cache.updateStoreObject('mainData', function () {
        return _this3.state.data;
      });
      this.props.navContext.data.unloadForm();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "form-7",
        className: "form-series"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-1"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-10"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        className: _FormCommon_css__WEBPACK_IMPORTED_MODULE_3___default.a.pageTitle,
        style: {
          marginBottom: '20px'
        }
      }, "What is your home like?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "black-textarea"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-9 col-lg-9 col-xl-6"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "textarea"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        name: "main-form-description",
        rows: "10",
        cols: "40",
        className: "form-control",
        id: "id_main-form-description",
        placeholder: "Describe your house for guests.",
        value: this.state.data.getData('description'),
        onChange: function onChange(e) {
          return _this4.onFieldChange('description', e.target.value);
        }
      }), Object(core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__["displayErrors"])(this.state.data.getErrorsForField('description')))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        className: _FormCommon_css__WEBPACK_IMPORTED_MODULE_3___default.a.pageTitle,
        style: {
          marginBottom: '20px'
        }
      }, "Are there other people living in the house ?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "black-textarea"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "If Yes, What are they like ?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-9 col-lg-9 col-xl-6"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "textarea"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        name: "main-form-other_people_description",
        rows: "6",
        cols: "40",
        className: "form-control",
        id: "id_main-form-other_people_description",
        placeholder: "Examples -\nWho are they?\nWhat are they like?\nHow old are they?\nWhat do they do?",
        value: this.state.data.getData('otherPeopleDescription'),
        onChange: function onChange(e) {
          return _this4.onFieldChange('otherPeopleDescription', e.target.value);
        }
      }), Object(core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__["displayErrors"])(this.state.data.getErrorsForField('otherPeopleDescription')))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        className: _FormCommon_css__WEBPACK_IMPORTED_MODULE_3___default.a.pageTitle,
        style: {
          marginBottom: '20px'
        }
      }, "Are there any area restrictions for the tenant?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "black-textarea"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-9 col-lg-9 col-xl-6"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "textarea"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        name: "main-form-access_restrictions",
        rows: "9",
        cols: "40",
        className: "form-control",
        id: "id_main-form-access_restrictions",
        placeholder: "Examples -\nNo acgetErrorcess upstairs.\nNo access to the garden outside.\nNo access to the granny flat.\nOnly assigned bathroom will be accessible.\nNo access to farm animal without permission.",
        value: this.state.data.getData('accessRestrictions'),
        onChange: function onChange(e) {
          return _this4.onFieldChange('accessRestrictions', e.target.value);
        }
      }), Object(core_UIComponents_helpers__WEBPACK_IMPORTED_MODULE_4__["displayErrors"])(this.state.data.getErrorsForField('accessRestrictions'))))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-1"
      }))));
    }
  }]);

  return InfoForTenantsContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ })

}]);
//# sourceMappingURL=27.chunk.js.map