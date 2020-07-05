(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

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

/***/ "./src/houseListing/views/forms/neighbourhoodDescriptors/NeighbourhoodDescriptorsComponent.js":
/*!****************************************************************************************************!*\
  !*** ./src/houseListing/views/forms/neighbourhoodDescriptors/NeighbourhoodDescriptorsComponent.js ***!
  \****************************************************************************************************/
/*! exports provided: NeighborhoodDescriptorsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NeighborhoodDescriptorsComponent", function() { return NeighborhoodDescriptorsComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FormCommon_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FormCommon.css */ "./src/houseListing/views/forms/FormCommon.css");
/* harmony import */ var _FormCommon_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_FormCommon_css__WEBPACK_IMPORTED_MODULE_1__);


function NeighborhoodDescriptorsComponent(props) {
  var addField;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "form-8",
    className: "form-series"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-1"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-10"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: _FormCommon_css__WEBPACK_IMPORTED_MODULE_1___default.a.pageTitle
  }, "What is the neighbourhood like?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "black-textarea"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-9 col-lg-9 col-xl-6"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "textarea"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
    name: "main-form-neighbourhood_description",
    rows: "8",
    cols: "40",
    className: "form-control",
    id: "id_main-form-neighbourhood_description",
    placeholder: "Examples -\n10 min walk to university\n5 min walk to bus stop or train station\n15 min walk to shipping centre",
    value: props.otherDescription,
    onChange: function onChange(e) {
      return props.onOtherDescriptionChange(e.target.value);
    }
  }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: _FormCommon_css__WEBPACK_IMPORTED_MODULE_1___default.a.pageTitle
  }, "What facilities are there around the area?"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "selection"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "btn-group btn-group-toggle"
  }, Object.entries(props.data).map(function (data) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NeighbourhoodDescriptor, {
      data: data[1],
      key: data[0].toString(),
      onChange: props.onNBDescriptorChange,
      objReference: data[0]
    });
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row",
    style: {
      marginTop: '50px'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-6"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "input big no-background"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    className: "form-control anything-else",
    placeholder: "Add other facilities",
    ref: function ref(input) {
      addField = input;
    },
    onKeyPress: function onKeyPress(e) {
      if (e.key === 'Enter') {
        props.onNBDescriptorAdd(addField);
      }
    }
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-2"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "default-button-style",
    onClick: function onClick() {
      return props.onNBDescriptorAdd(addField);
    }
  }, "Add"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-1"
  }))));
}

function NeighbourhoodDescriptor(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "nearby-facility btn btn-link" + (props.data.getData('checked') ? " active" : "")
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "nearby-facility",
    onChange: function onChange(e) {
      props.onChange(props.objReference, e.target.checked);
    },
    checked: props.data.getData('checked')
  }), props.data.getData('verbose'));
}

/***/ }),

/***/ "./src/houseListing/views/forms/neighbourhoodDescriptors/NeighbourhoodDescriptorsContainer.js":
/*!****************************************************************************************************!*\
  !*** ./src/houseListing/views/forms/neighbourhoodDescriptors/NeighbourhoodDescriptorsContainer.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NeighbourhoodDescriptorsContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/utils/ModelHelper */ "./src/core/utils/ModelHelper.js");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models */ "./src/houseListing/models.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services */ "./src/houseListing/services.js");
/* harmony import */ var _NeighbourhoodDescriptorsComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NeighbourhoodDescriptorsComponent */ "./src/houseListing/views/forms/neighbourhoodDescriptors/NeighbourhoodDescriptorsComponent.js");
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







var NeighbourhoodDescriptorsContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(NeighbourhoodDescriptorsContainer, _Component);

  function NeighbourhoodDescriptorsContainer(props) {
    var _this;

    _classCallCheck(this, NeighbourhoodDescriptorsContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NeighbourhoodDescriptorsContainer).call(this, props));
    _this.formID = 8;

    _this.onOtherDescriptionChange = function (value) {
      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          house: prevState.house.setData('neighbourhoodDescription', value)
        });
      });

      _this.props.navContext.data.updateFormState(_this.formID, 'hasChanged', 1);

      _this.props.navContext.sync();
    };

    _this.onNBDescriptorAdd = function (input) {
      var text = input.value;

      if (text !== "") {
        _this.setState(function (prevState) {
          return {
            descriptors: prevState.descriptors.update(new _models__WEBPACK_IMPORTED_MODULE_2__["NeighbourhoodDescriptor"]({
              id: null,
              verbose: text,
              checked: true
            }, 'hasChanged'), text)
          };
        });

        input.value = "";

        _this.props.navContext.data.updateFormState(_this.formID, 'hasChanged', 0);

        _this.props.navContext.sync();
      }

      input.focus();
    };

    _this.onNBDescriptorUpdate = function (objID, value) {
      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          data: prevState.descriptors.updateObject(objID, 'checked', value)
        });
      });

      _this.props.navContext.data.updateFormState(_this.formID, 'hasChanged', 0);

      _this.props.navContext.sync();
    };

    _this.onSave = function (e) {
      e.stopPropagation();

      var that = _assertThisInitialized(_this);

      return new Promise(function (resolve, reject) {
        var req1Done = false;
        var req2Done = false;
        Object(_services__WEBPACK_IMPORTED_MODULE_3__["postNeighbourhoodDescriptors"])(that.props.houseUUID, that.state.descriptors).then(function (result) {
          that.setState(function (prevState) {
            return _objectSpread({}, prevState, {
              rules: prevState.descriptors.updateStatus('saved')
            });
          });
          req1Done = true;
          that.props.navContext.data.updateFormState(that.formID, 'saved', 0);
          that.props.navContext.sync();

          if (req1Done && req2Done) {
            if (that.props.navContext.data.getCurrentFormState() === 'error') {
              reject();
            } else {
              resolve();
            }
          }
        })["catch"](function (errorData) {
          req1Done = true;
          that.props.navContext.data.updateFormState(that.formID, 'error', 0);
          that.props.navContext.sync();

          if (req1Done && req2Done) {
            reject();
          }
        });
        Object(_services__WEBPACK_IMPORTED_MODULE_3__["patchHouseData"])(that.props.houseUUID, that.state.house).then(function (house) {
          that.setState(function (prevState) {
            return _objectSpread({}, prevState, {
              house: house
            });
          });
          req2Done = true;
          that.props.navContext.data.updateFormState(that.formID, 'saved', 1);
          that.props.navContext.sync();

          if (req1Done && req2Done) {
            if (that.props.navContext.data.getCurrentFormState() === 'error') {
              reject();
            } else {
              resolve();
            }
          }
        })["catch"](function (error) {
          req2Done = true;
          that.props.navContext.data.updateFormState(that.formID, 'error', 1);
          that.props.navContext.sync();

          if (req1Done && req2Done) {
            reject();
          }
        });
      });
    };

    _this.state = {
      descriptors: new _core_utils_ModelHelper__WEBPACK_IMPORTED_MODULE_1__["APIModelListAdapter"]([], _models__WEBPACK_IMPORTED_MODULE_2__["NeighbourhoodDescriptor"], 'id', 'empty'),
      house: new _models__WEBPACK_IMPORTED_MODULE_2__["House"]({}, 'empty')
    };

    if (props.cache.data !== undefined) {
      _this.state.descriptors = props.cache.data;
    }

    if (props.mainDataCache.data !== undefined) {
      _this.state.house = props.mainDataCache.data;
    }

    return _this;
  }

  _createClass(NeighbourhoodDescriptorsContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.props.navContext.data.loadForm(this.formID, this.onSave, ['initial', 'initial'], "Neighbourhood");

      if (this.state.descriptors.status === 'empty') {
        Object(_services__WEBPACK_IMPORTED_MODULE_3__["getNeighbourhoodDescriptors"])(this.props.houseUUID).then(function (result) {
          _this2.setState(function (prevState) {
            return _objectSpread({}, prevState, {
              descriptors: result
            });
          });

          _this2.props.navContext.data.updateFormState(_this2.formID, _this2.state.descriptors.status, 0);

          _this2.props.navContext.sync();
        });
      } else {
        this.props.navContext.data.updateFormState(this.formID, this.state.descriptors.status, 0);
      }

      if (this.state.house.status === 'empty') {
        // Fetch house details
        Object(_services__WEBPACK_IMPORTED_MODULE_3__["getHouseData"])(this.props.houseUUID).then(function (result) {
          _this2.setState(function (prevState) {
            return _objectSpread({}, prevState, {
              house: result
            });
          });

          _this2.props.navContext.data.updateFormState(_this2.formID, _this2.state.house.status, 1);

          _this2.props.navContext.sync();
        });
      } else {
        this.props.navContext.data.updateFormState(this.formID, this.state.house.status, 1);
      }

      this.props.navContext.sync();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      this.props.cache.updateStoreObject('neighborhoodDescriptorsData', function () {
        return _this3.state.descriptors;
      });
      this.props.cache.updateStoreObject('mainData', function () {
        return _this3.state.house;
      });
      this.props.navContext.data.unloadForm();
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NeighbourhoodDescriptorsComponent__WEBPACK_IMPORTED_MODULE_4__["NeighborhoodDescriptorsComponent"], {
        data: this.state.descriptors.getObjects(),
        otherDescription: this.state.house.getData('neighbourhoodDescription'),
        onOtherDescriptionChange: this.onOtherDescriptionChange,
        onNBDescriptorChange: this.onNBDescriptorUpdate,
        onNBDescriptorAdd: this.onNBDescriptorAdd
      });
    }
  }]);

  return NeighbourhoodDescriptorsContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ })

}]);
//# sourceMappingURL=24.chunk.js.map