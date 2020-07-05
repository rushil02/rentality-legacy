(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/react-date-range/dist/styles.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/react-date-range/dist/styles.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".rdrCalendarWrapper {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background: #ffffff;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.rdrDateDisplay{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.rdrDateDisplayItem{\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1;\n          flex: 1 1;\n  width: 0;\n  text-align: center;\n  color: inherit;\n}\n\n.rdrDateDisplayItem + .rdrDateDisplayItem{\n    margin-left: 0.833em;\n  }\n\n.rdrDateDisplayItem input{\n    text-align: inherit\n  }\n\n.rdrDateDisplayItem input:disabled {\n  cursor: default;\n}\n\n.rdrDateDisplayItemActive{}\n\n.rdrMonthAndYearWrapper {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n.rdrMonthAndYearPickers{\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.rdrMonthPicker{}\n\n.rdrYearPicker{}\n\n.rdrNextPrevButton {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n  cursor: pointer;\n  outline: none;\n}\n\n.rdrPprevButton {}\n\n.rdrNextButton {}\n\n.rdrMonths{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.rdrMonthsVertical{\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.rdrMonthsHorizontal > div > div > div{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n\n.rdrMonth{\n  width: 27.667em;\n}\n\n.rdrWeekDays{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.rdrWeekDay {\n  -ms-flex-preferred-size: calc(100% / 7);\n      flex-basis: calc(100% / 7);\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n  text-align: center;\n}\n\n.rdrDays{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n\n.rdrDateDisplayWrapper{}\n\n.rdrMonthName{}\n\n.rdrInfiniteMonths{\n  overflow: auto;\n}\n\n.rdrDateRangeWrapper{\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.rdrDay {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n  width: calc(100% / 7);\n  position: relative;\n  font: inherit;\n  cursor: pointer;\n}\n\n.rdrDayNumber {\n  display: block;\n  position: relative;\n}\n\n.rdrDayNumber span{\n    color: #1d2429;\n  }\n\n.rdrDayDisabled {\n  cursor: not-allowed;\n}\n\n.rdrSelected, .rdrInRange, .rdrStartEdge, .rdrEndEdge{\n  pointer-events: none;\n}\n\n.rdrInRange{}\n\n.rdrDayStartPreview, .rdrDayInPreview, .rdrDayEndPreview{\n  pointer-events: none;\n}\n\n.rdrDayHovered{}\n\n.rdrDayActive{}\n\n.rdrDateRangePickerWrapper{\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.rdrDefinedRangesWrapper{}\n\n.rdrStaticRanges{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.rdrStaticRange{\n  font-size: inherit;\n}\n\n.rdrStaticRangeLabel{}\n\n.rdrInputRanges{}\n\n.rdrInputRange{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.rdrInputRangeInput{}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/react-date-range/dist/theme/default.css":
/*!****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/react-date-range/dist/theme/default.css ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".rdrCalendarWrapper{\n  color: #000000;\n  font-size: 12px;\n}\n\n.rdrDateDisplay{\n  background-color: rgb(239, 242, 247);\n  padding: 0.833em;\n}\n\n.rdrDateDisplayItem{\n  border-radius: 4px;\n  background-color: rgb(255, 255, 255);\n  -webkit-box-shadow: 0 1px 2px 0 rgba(35, 57, 66, 0.21);\n          box-shadow: 0 1px 2px 0 rgba(35, 57, 66, 0.21);\n  border: 1px solid transparent;\n}\n\n.rdrDateDisplayItem input{\n    cursor: pointer;\n    height: 2.5em;\n    line-height: 2.5em;\n    border: 0px;\n    background: transparent;\n    width: 100%;\n    color: #849095;\n  }\n\n.rdrDateDisplayItemActive{\n  border-color: currentColor;\n}\n\n.rdrDateDisplayItemActive input{\n    color: #7d888d\n  }\n\n.rdrMonthAndYearWrapper {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 60px;\n  padding-top: 10px;\n}\n\n.rdrMonthAndYearPickers{\n  font-weight: 600;\n}\n\n.rdrMonthAndYearPickers select{\n    -moz-appearance: none;\n         appearance: none;\n    -webkit-appearance: none;\n    border: 0;\n    background: transparent;\n    padding: 10px 30px 10px 10px;\n    border-radius: 4px;\n    outline: 0;\n    color: #3e484f;\n    background: url(\"data:image/svg+xml;utf8,<svg width='9px' height='6px' viewBox='0 0 9 6' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g id='Artboard' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(-636.000000, -171.000000)' fill-opacity='0.368716033'><g id='input' transform='translate(172.000000, 37.000000)' fill='%230E242F' fill-rule='nonzero'><g id='Group-9' transform='translate(323.000000, 127.000000)'><path d='M142.280245,7.23952813 C141.987305,6.92353472 141.512432,6.92361662 141.219585,7.23971106 C140.926739,7.5558055 140.926815,8.06821394 141.219755,8.38420735 L145.498801,13 L149.780245,8.38162071 C150.073185,8.0656273 150.073261,7.55321886 149.780415,7.23712442 C149.487568,6.92102998 149.012695,6.92094808 148.719755,7.23694149 L145.498801,10.7113732 L142.280245,7.23952813 Z' id='arrow'></path></g></g></g></svg>\") no-repeat;\n    background-position: right 8px center;\n    cursor: pointer;\n    text-align: center\n  }\n\n.rdrMonthAndYearPickers select:hover{\n  background-color: rgba(0,0,0,0.07);\n}\n\n.rdrMonthPicker, .rdrYearPicker{\n  margin: 0 5px\n}\n\n.rdrNextPrevButton {\n  display: block;\n  width: 24px;\n  height: 24px;\n  margin: 0 0.833em;\n  padding: 0;\n  border: 0;\n  border-radius: 5px;\n  background: #EFF2F7\n}\n\n.rdrNextPrevButton:hover{\n  background: #E1E7F0;\n}\n\n.rdrNextPrevButton i {\n    display: block;\n    width: 0;\n    height: 0;\n    padding: 0;\n    text-align: center;\n    border-style: solid;\n    margin: auto;\n    -webkit-transform: translate(-3px, 0px);\n            transform: translate(-3px, 0px);\n}\n\n.rdrPprevButton i {\n    border-width: 4px 6px 4px 4px;\n    border-color: transparent rgb(52, 73, 94) transparent transparent;\n    -webkit-transform: translate(-3px, 0px);\n            transform: translate(-3px, 0px);\n  }\n\n.rdrNextButton i {\n    margin: 0 0 0 7px;\n    border-width: 4px 4px 4px 6px;\n    border-color: transparent transparent transparent rgb(52, 73, 94);\n    -webkit-transform: translate(3px, 0px);\n            transform: translate(3px, 0px);\n  }\n\n.rdrWeekDays {\n  padding: 0 0.833em;\n}\n\n.rdrMonth{\n  padding: 0 0.833em 1.666em 0.833em;\n}\n\n.rdrMonth .rdrWeekDays {\n    padding: 0;\n  }\n\n.rdrMonths.rdrMonthsVertical .rdrMonth:first-child .rdrMonthName{\n  display: none;\n}\n\n.rdrWeekDay {\n  font-weight: 400;\n  line-height: 2.667em;\n  color: rgb(132, 144, 149);\n}\n\n.rdrDay {\n  background: transparent;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  border: 0;\n  padding: 0;\n  line-height: 3.000em;\n  height: 3.000em;\n  text-align: center;\n  color: #1d2429\n}\n\n.rdrDay:focus {\n  outline: 0;\n}\n\n.rdrDayNumber {\n  outline: 0;\n  font-weight: 300;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  top: 5px;\n  bottom: 5px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.rdrDayToday .rdrDayNumber span{\n  font-weight: 500\n}\n\n.rdrDayToday .rdrDayNumber span:after{\n  content: '';\n  position: absolute;\n  bottom: 4px;\n  left: 50%;\n  -webkit-transform: translate(-50%, 0);\n          transform: translate(-50%, 0);\n  width: 18px;\n  height: 2px;\n  border-radius: 2px;\n  background: #3d91ff;\n}\n\n.rdrDayToday:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span:after, .rdrDayToday:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span:after, .rdrDayToday:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span:after, .rdrDayToday:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span:after{\n  background: #fff;\n}\n\n.rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span, .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span, .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span, .rdrDay:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span{\n          color: rgba(255, 255, 255, 0.85);\n}\n\n.rdrSelected, .rdrInRange, .rdrStartEdge, .rdrEndEdge{\n  background: currentColor;\n  position: absolute;\n  top: 5px;\n  left: 0;\n  right: 0;\n  bottom: 5px;\n}\n\n.rdrSelected{\n  left: 2px;\n  right: 2px;\n}\n\n.rdrInRange{}\n\n.rdrStartEdge{\n  border-top-left-radius: 1.042em;\n  border-bottom-left-radius: 1.042em;\n  left: 2px;\n}\n\n.rdrEndEdge{\n  border-top-right-radius: 1.042em;\n  border-bottom-right-radius: 1.042em;\n  right: 2px;\n}\n\n.rdrSelected{\n  border-radius: 1.042em;\n}\n\n.rdrDayStartOfMonth .rdrInRange, .rdrDayStartOfMonth .rdrEndEdge, .rdrDayStartOfWeek .rdrInRange, .rdrDayStartOfWeek .rdrEndEdge{\n    border-top-left-radius: 1.042em;\n    border-bottom-left-radius: 1.042em;\n    left: 2px;\n  }\n\n.rdrDayEndOfMonth .rdrInRange, .rdrDayEndOfMonth .rdrStartEdge, .rdrDayEndOfWeek .rdrInRange, .rdrDayEndOfWeek .rdrStartEdge{\n    border-top-right-radius: 1.042em;\n    border-bottom-right-radius: 1.042em;\n    right: 2px;\n  }\n\n.rdrDayStartOfMonth .rdrDayInPreview, .rdrDayStartOfMonth .rdrDayEndPreview, .rdrDayStartOfWeek .rdrDayInPreview, .rdrDayStartOfWeek .rdrDayEndPreview{\n    border-top-left-radius: 1.333em;\n    border-bottom-left-radius: 1.333em;\n    border-left-width: 1px;\n    left: 0px;\n  }\n\n.rdrDayEndOfMonth .rdrDayInPreview, .rdrDayEndOfMonth .rdrDayStartPreview, .rdrDayEndOfWeek .rdrDayInPreview, .rdrDayEndOfWeek .rdrDayStartPreview{\n   border-top-right-radius: 1.333em;\n   border-bottom-right-radius: 1.333em;\n   border-right-width: 1px;\n   right: 0px;\n }\n\n.rdrDayStartPreview, .rdrDayInPreview, .rdrDayEndPreview{\n  background: rgba(255, 255, 255, 0.09);\n  position: absolute;\n  top: 3px;\n  left: 0px;\n  right: 0px;\n  bottom: 3px;\n  pointer-events: none;\n  border: 0px solid currentColor;\n  z-index: 1;\n}\n\n.rdrDayStartPreview{\n  border-top-width: 1px;\n  border-left-width: 1px;\n  border-bottom-width: 1px;\n  border-top-left-radius: 1.333em;\n  border-bottom-left-radius: 1.333em;\n  left: 0px;\n}\n\n.rdrDayInPreview{\n  border-top-width: 1px;\n  border-bottom-width: 1px;\n}\n\n.rdrDayEndPreview{\n  border-top-width: 1px;\n  border-right-width: 1px;\n  border-bottom-width: 1px;\n  border-top-right-radius: 1.333em;\n  border-bottom-right-radius: 1.333em;\n  right: 2px;\n  right: 0px;\n}\n\n.rdrDefinedRangesWrapper{\n  font-size: 12px;\n  width: 226px;\n  border-right: solid 1px #eff2f7;\n  background: #fff;\n}\n\n.rdrDefinedRangesWrapper .rdrStaticRangeSelected{\n    color: currentColor;\n    font-weight: 600;\n  }\n\n.rdrStaticRange{\n  border: 0;\n  cursor: pointer;\n  display: block;\n  outline: 0;\n  border-bottom: 1px solid #eff2f7;\n  padding: 0;\n  background: #fff\n}\n\n.rdrStaticRange:hover .rdrStaticRangeLabel, .rdrStaticRange:focus .rdrStaticRangeLabel{\n      background: #eff2f7;\n}\n\n.rdrStaticRangeLabel{\n  display: block;\n  outline: 0;\n  line-height: 18px;\n  padding: 10px 20px;\n  text-align: left;\n}\n\n.rdrInputRanges{\n  padding: 10px 0;\n}\n\n.rdrInputRange{\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 5px 20px;\n}\n\n.rdrInputRangeInput{\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  border-radius: 4px;\n  text-align: center;\n  border: solid 1px rgb(222, 231, 235);\n  margin-right: 10px;\n  color: rgb(108, 118, 122)\n}\n\n.rdrInputRangeInput:focus, .rdrInputRangeInput:hover{\n  border-color: rgb(180, 191, 196);\n  outline: 0;\n  color: #333;\n}\n\n.rdrCalendarWrapper:not(.rdrDateRangeWrapper) .rdrDayHovered .rdrDayNumber:after{\n  content: '';\n  border: 1px solid currentColor;\n  border-radius: 1.333em;\n  position: absolute;\n  top: -2px;\n  bottom: -2px;\n  left: 0px;\n  right: 0px;\n  background: transparent;\n}\n\n.rdrDayPassive{\n  pointer-events: none;\n}\n\n.rdrDayPassive .rdrDayNumber span{\n    color: #d5dce0;\n  }\n\n.rdrDayPassive .rdrInRange, .rdrDayPassive .rdrStartEdge, .rdrDayPassive .rdrEndEdge, .rdrDayPassive .rdrSelected, .rdrDayPassive .rdrDayStartPreview, .rdrDayPassive .rdrDayInPreview, .rdrDayPassive .rdrDayEndPreview{\n    display: none;\n  }\n\n.rdrDayDisabled {\n  background-color: rgb(248, 248, 248);\n}\n\n.rdrDayDisabled .rdrDayNumber span{\n    color: #aeb9bf;\n  }\n\n.rdrDayDisabled .rdrInRange, .rdrDayDisabled .rdrStartEdge, .rdrDayDisabled .rdrEndEdge, .rdrDayDisabled .rdrSelected, .rdrDayDisabled .rdrDayStartPreview, .rdrDayDisabled .rdrDayInPreview, .rdrDayDisabled .rdrDayEndPreview{\n    -webkit-filter: grayscale(100%) opacity(60%);\n            filter: grayscale(100%) opacity(60%);\n  }\n\n.rdrMonthName{\n  text-align: left;\n  font-weight: 600;\n  color: #849095;\n  padding: 0.833em;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/date-fns/_lib/addUTCMinutes/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/_lib/addUTCMinutes/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addUTCMinutes;

var _index = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function addUTCMinutes(dirtyDate, dirtyAmount, dirtyOptions) {
  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var amount = Number(dirtyAmount);
  date.setUTCMinutes(date.getUTCMinutes() + amount);
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/_lib/cloneObject/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/_lib/cloneObject/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cloneObject;
function cloneObject(dirtyObject) {
  dirtyObject = dirtyObject || {};
  var object = {};

  for (var property in dirtyObject) {
    if (dirtyObject.hasOwnProperty(property)) {
      object[property] = dirtyObject[property];
    }
  }

  return object;
}
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/date-fns/_lib/getUTCDayOfYear/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/_lib/getUTCDayOfYear/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCDayOfYear;

var _index = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_DAY = 86400000;

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCDayOfYear(dirtyDate, dirtyOptions) {
  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/_lib/getUTCISOWeek/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/_lib/getUTCISOWeek/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCISOWeek;

var _index = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/_lib/startOfUTCISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../startOfUTCISOWeekYear/index.js */ "./node_modules/date-fns/_lib/startOfUTCISOWeekYear/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_WEEK = 604800000;

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCISOWeek(dirtyDate, dirtyOptions) {
  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var diff = (0, _index4.default)(date, dirtyOptions).getTime() - (0, _index6.default)(date, dirtyOptions).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/_lib/getUTCISOWeekYear/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/_lib/getUTCISOWeekYear/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUTCISOWeekYear;

var _index = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/_lib/startOfUTCISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCISOWeekYear(dirtyDate, dirtyOptions) {
  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var year = date.getUTCFullYear();

  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = (0, _index4.default)(fourthOfJanuaryOfNextYear, dirtyOptions);

  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = (0, _index4.default)(fourthOfJanuaryOfThisYear, dirtyOptions);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/_lib/startOfUTCISOWeek/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/_lib/startOfUTCISOWeek/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfUTCISOWeek;

var _index = __webpack_require__(/*! ../../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCISOWeek(dirtyDate, dirtyOptions) {
  var weekStartsOn = 1;

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/_lib/startOfUTCISOWeekYear/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/_lib/startOfUTCISOWeekYear/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfUTCISOWeekYear;

var _index = __webpack_require__(/*! ../getUTCISOWeekYear/index.js */ "./node_modules/date-fns/_lib/getUTCISOWeekYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ "./node_modules/date-fns/_lib/startOfUTCISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCISOWeekYear(dirtyDate, dirtyOptions) {
  var year = (0, _index2.default)(dirtyDate, dirtyOptions);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = (0, _index4.default)(fourthOfJanuary, dirtyOptions);
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/addDays/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/addDays/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addDays;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the days added
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(dirtyDate, dirtyAmount, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var amount = Number(dirtyAmount);
  date.setDate(date.getDate() + amount);
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/addMonths/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/addMonths/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMonths;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../getDaysInMonth/index.js */ "./node_modules/date-fns/getDaysInMonth/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the months added
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * var result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */
function addMonths(dirtyDate, dirtyAmount, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var amount = Number(dirtyAmount);
  var desiredMonth = date.getMonth() + amount;
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = (0, _index4.default)(dateWithDesiredMonth, dirtyOptions);
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/addYears/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/addYears/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addYears;

var _index = __webpack_require__(/*! ../addMonths/index.js */ "./node_modules/date-fns/addMonths/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name addYears
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the years added
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * var result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears(dirtyDate, dirtyAmount, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var amount = Number(dirtyAmount);
  return (0, _index2.default)(dirtyDate, amount * 12, dirtyOptions);
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/areIntervalsOverlapping/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/areIntervalsOverlapping/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = areIntervalsOverlapping;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name areIntervalsOverlapping
 * @category Interval Helpers
 * @summary Is the given time interval overlapping with another time interval?
 *
 * @description
 * Is the given time interval overlapping with another time interval?
 *
 * @param {Interval} intervalLeft - the first interval to compare. See [Interval]{@link docs/types/Interval}
 * @param {Interval} intervalRight - the second interval to compare. See [Interval]{@link docs/types/Interval}
 * @param {Options} [options] - the object with options. See [Options]{@link docs/types/Options}
 * @returns {Boolean} whether the time intervals are overlapping
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For overlapping time intervals:
 * areIntervalsOverlapping(
 *   {start: new Date(2014, 0, 10), end: new Date(2014, 0, 20)},
 *   {start: new Date(2014, 0, 17), end: new Date(2014, 0, 21)}
 * )
 * //=> true
 *
 * @example
 * // For non-overlapping time intervals:
 * areIntervalsOverlapping(
 *   {start: new Date(2014, 0, 10), end: new Date(2014, 0, 20)},
 *   {start: new Date(2014, 0, 21), end: new Date(2014, 0, 22)}
 * )
 * //=> false
 */
function areIntervalsOverlapping(dirtyIntervalLeft, dirtyIntervalRight, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var intervalLeft = dirtyIntervalLeft || {};
  var intervalRight = dirtyIntervalRight || {};
  var leftStartTime = (0, _index2.default)(intervalLeft.start, dirtyOptions).getTime();
  var leftEndTime = (0, _index2.default)(intervalLeft.end, dirtyOptions).getTime();
  var rightStartTime = (0, _index2.default)(intervalRight.start, dirtyOptions).getTime();
  var rightEndTime = (0, _index2.default)(intervalRight.end, dirtyOptions).getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(leftStartTime <= leftEndTime && rightStartTime <= rightEndTime)) {
    throw new RangeError('Invalid interval');
  }

  return leftStartTime < rightEndTime && rightStartTime < leftEndTime;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/compareAsc/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/compareAsc/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compareAsc;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|String|Number} dateLeft - the first date to compare
 * @param {Date|String|Number} dateRight - the second date to compare
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * var result = compareAsc(
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * )
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * var result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var dateLeft = (0, _index2.default)(dirtyDateLeft, dirtyOptions);
  var dateRight = (0, _index2.default)(dirtyDateRight, dirtyOptions);

  var diff = dateLeft.getTime() - dateRight.getTime();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
    // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarDays/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarDays/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarDays;

var _index = __webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/startOfDay/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MILLISECONDS_IN_MINUTE = 60000;
var MILLISECONDS_IN_DAY = 86400000;

/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Number} the number of calendar days
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 */
function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var startOfDayLeft = (0, _index2.default)(dirtyDateLeft, dirtyOptions);
  var startOfDayRight = (0, _index2.default)(dirtyDateRight, dirtyOptions);

  var timestampLeft = startOfDayLeft.getTime() - startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  var timestampRight = startOfDayRight.getTime() - startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/differenceInCalendarMonths/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/differenceInCalendarMonths/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInCalendarMonths;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Number} the number of calendar months
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var dateLeft = (0, _index2.default)(dirtyDateLeft, dirtyOptions);
  var dateRight = (0, _index2.default)(dirtyDateRight, dirtyOptions);

  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();

  return yearDiff * 12 + monthDiff;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/differenceInDays/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/differenceInDays/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = differenceInDays;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../differenceInCalendarDays/index.js */ "./node_modules/date-fns/differenceInCalendarDays/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../compareAsc/index.js */ "./node_modules/date-fns/compareAsc/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full days between the given dates.
 *
 * @param {Date|String|Number} dateLeft - the later date
 * @param {Date|String|Number} dateRight - the earlier date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Number} the number of full days
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * var result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 */
function differenceInDays(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var dateLeft = (0, _index2.default)(dirtyDateLeft, dirtyOptions);
  var dateRight = (0, _index2.default)(dirtyDateRight, dirtyOptions);

  var sign = (0, _index6.default)(dateLeft, dateRight, dirtyOptions);
  var difference = Math.abs((0, _index4.default)(dateLeft, dateRight, dirtyOptions));
  dateLeft.setDate(dateLeft.getDate() - sign * difference);

  // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value
  var isLastDayNotFull = (0, _index6.default)(dateLeft, dateRight, dirtyOptions) === -sign;
  return sign * (difference - isLastDayNotFull);
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/eachDayOfInterval/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/eachDayOfInterval/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachDayOfInterval;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name eachDayOfInterval
 * @category Interval Helpers
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * @param {Interval} interval - the interval. See [Interval]{@link docs/types/Interval}
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date[]} the array with starts of days from the day of the interval start to the day of the interval end
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * var result = eachDayOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 9, 10)
 * })
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
function eachDayOfInterval(dirtyInterval, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var interval = dirtyInterval || {};
  var startDate = (0, _index2.default)(interval.start, dirtyOptions);
  var endDate = (0, _index2.default)(interval.end, dirtyOptions);

  var endTime = endDate.getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  var dates = [];

  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);

  while (currentDate.getTime() <= endTime) {
    dates.push((0, _index2.default)(currentDate, dirtyOptions));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/endOfDay/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/endOfDay/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfDay;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the end of a day
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * var result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  date.setHours(23, 59, 59, 999);
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/endOfMonth/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/endOfMonth/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfMonth;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the end of a month
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * var result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/endOfWeek/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/endOfWeek/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endOfWeek;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {Date} the end of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * var result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var options = dirtyOptions || {};

  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn === undefined ? 0 : Number(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn === undefined ? defaultWeekStartsOn : Number(options.weekStartsOn);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0, _index2.default)(dirtyDate, options);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/format/_lib/formatters/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/format/_lib/formatters/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../../../_lib/getUTCDayOfYear/index.js */ "./node_modules/date-fns/_lib/getUTCDayOfYear/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../../../_lib/getUTCISOWeek/index.js */ "./node_modules/date-fns/_lib/getUTCISOWeek/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../../../_lib/getUTCISOWeekYear/index.js */ "./node_modules/date-fns/_lib/getUTCISOWeekYear/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatters = {
  // Month: 1, 2, ..., 12
  'M': function M(date) {
    return date.getUTCMonth() + 1;
  },

  // Month: 1st, 2nd, ..., 12th
  'Mo': function Mo(date, options) {
    var month = date.getUTCMonth() + 1;
    return options.locale.localize.ordinalNumber(month, { unit: 'month' });
  },

  // Month: 01, 02, ..., 12
  'MM': function MM(date) {
    return addLeadingZeros(date.getUTCMonth() + 1, 2);
  },

  // Month: Jan, Feb, ..., Dec
  'MMM': function MMM(date, options) {
    return options.locale.localize.month(date.getUTCMonth(), { type: 'short' });
  },

  // Month: January, February, ..., December
  'MMMM': function MMMM(date, options) {
    return options.locale.localize.month(date.getUTCMonth(), { type: 'long' });
  },

  // Quarter: 1, 2, 3, 4
  'Q': function Q(date) {
    return Math.ceil((date.getUTCMonth() + 1) / 3);
  },

  // Quarter: 1st, 2nd, 3rd, 4th
  'Qo': function Qo(date, options) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    return options.locale.localize.ordinalNumber(quarter, { unit: 'quarter' });
  },

  // Day of month: 1, 2, ..., 31
  'D': function D(date) {
    return date.getUTCDate();
  },

  // Day of month: 1st, 2nd, ..., 31st
  'Do': function Do(date, options) {
    return options.locale.localize.ordinalNumber(date.getUTCDate(), { unit: 'dayOfMonth' });
  },

  // Day of month: 01, 02, ..., 31
  'DD': function DD(date) {
    return addLeadingZeros(date.getUTCDate(), 2);
  },

  // Day of year: 1, 2, ..., 366
  'DDD': function DDD(date) {
    return (0, _index2.default)(date);
  },

  // Day of year: 1st, 2nd, ..., 366th
  'DDDo': function DDDo(date, options) {
    return options.locale.localize.ordinalNumber((0, _index2.default)(date), { unit: 'dayOfYear' });
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': function DDDD(date) {
    return addLeadingZeros((0, _index2.default)(date), 3);
  },

  // Day of week: Su, Mo, ..., Sa
  'dd': function dd(date, options) {
    return options.locale.localize.weekday(date.getUTCDay(), { type: 'narrow' });
  },

  // Day of week: Sun, Mon, ..., Sat
  'ddd': function ddd(date, options) {
    return options.locale.localize.weekday(date.getUTCDay(), { type: 'short' });
  },

  // Day of week: Sunday, Monday, ..., Saturday
  'dddd': function dddd(date, options) {
    return options.locale.localize.weekday(date.getUTCDay(), { type: 'long' });
  },

  // Day of week: 0, 1, ..., 6
  'd': function d(date) {
    return date.getUTCDay();
  },

  // Day of week: 0th, 1st, 2nd, ..., 6th
  'do': function _do(date, options) {
    return options.locale.localize.ordinalNumber(date.getUTCDay(), { unit: 'dayOfWeek' });
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': function E(date) {
    return date.getUTCDay() || 7;
  },

  // ISO week: 1, 2, ..., 53
  'W': function W(date) {
    return (0, _index4.default)(date);
  },

  // ISO week: 1st, 2nd, ..., 53th
  'Wo': function Wo(date, options) {
    return options.locale.localize.ordinalNumber((0, _index4.default)(date), { unit: 'isoWeek' });
  },

  // ISO week: 01, 02, ..., 53
  'WW': function WW(date) {
    return addLeadingZeros((0, _index4.default)(date), 2);
  },

  // Year: 00, 01, ..., 99
  'YY': function YY(date) {
    return addLeadingZeros(date.getUTCFullYear(), 4).substr(2);
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': function YYYY(date) {
    return addLeadingZeros(date.getUTCFullYear(), 4);
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': function GG(date) {
    return String((0, _index6.default)(date)).substr(2);
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': function GGGG(date) {
    return (0, _index6.default)(date);
  },

  // Hour: 0, 1, ... 23
  'H': function H(date) {
    return date.getUTCHours();
  },

  // Hour: 00, 01, ..., 23
  'HH': function HH(date) {
    return addLeadingZeros(date.getUTCHours(), 2);
  },

  // Hour: 1, 2, ..., 12
  'h': function h(date) {
    var hours = date.getUTCHours();
    if (hours === 0) {
      return 12;
    } else if (hours > 12) {
      return hours % 12;
    } else {
      return hours;
    }
  },

  // Hour: 01, 02, ..., 12
  'hh': function hh(date) {
    return addLeadingZeros(formatters['h'](date), 2);
  },

  // Minute: 0, 1, ..., 59
  'm': function m(date) {
    return date.getUTCMinutes();
  },

  // Minute: 00, 01, ..., 59
  'mm': function mm(date) {
    return addLeadingZeros(date.getUTCMinutes(), 2);
  },

  // Second: 0, 1, ..., 59
  's': function s(date) {
    return date.getUTCSeconds();
  },

  // Second: 00, 01, ..., 59
  'ss': function ss(date) {
    return addLeadingZeros(date.getUTCSeconds(), 2);
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': function S(date) {
    return Math.floor(date.getUTCMilliseconds() / 100);
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': function SS(date) {
    return addLeadingZeros(Math.floor(date.getUTCMilliseconds() / 10), 2);
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': function SSS(date) {
    return addLeadingZeros(date.getUTCMilliseconds(), 3);
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': function Z(date, options) {
    var originalDate = options._originalDate || date;
    return formatTimezone(originalDate.getTimezoneOffset(), ':');
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': function ZZ(date, options) {
    var originalDate = options._originalDate || date;
    return formatTimezone(originalDate.getTimezoneOffset());
  },

  // Seconds timestamp: 512969520
  'X': function X(date, options) {
    var originalDate = options._originalDate || date;
    return Math.floor(originalDate.getTime() / 1000);
  },

  // Milliseconds timestamp: 512969520900
  'x': function x(date, options) {
    var originalDate = options._originalDate || date;
    return originalDate.getTime();
  },

  // AM, PM
  'A': function A(date, options) {
    return options.locale.localize.timeOfDay(date.getUTCHours(), { type: 'uppercase' });
  },

  // am, pm
  'a': function a(date, options) {
    return options.locale.localize.timeOfDay(date.getUTCHours(), { type: 'lowercase' });
  },

  // a.m., p.m.
  'aa': function aa(date, options) {
    return options.locale.localize.timeOfDay(date.getUTCHours(), { type: 'long' });
  }
};

function formatTimezone(offset, delimeter) {
  delimeter = delimeter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2);
}

function addLeadingZeros(number, targetLength) {
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return output;
}

exports.default = formatters;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/format/index.js":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/format/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = format;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../isValid/index.js */ "./node_modules/date-fns/isValid/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../locale/en-US/index.js */ "./node_modules/date-fns/locale/en-US/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(/*! ./_lib/formatters/index.js */ "./node_modules/date-fns/format/_lib/formatters/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = __webpack_require__(/*! ../_lib/cloneObject/index.js */ "./node_modules/date-fns/_lib/cloneObject/index.js");

var _index10 = _interopRequireDefault(_index9);

var _index11 = __webpack_require__(/*! ../_lib/addUTCMinutes/index.js */ "./node_modules/date-fns/_lib/addUTCMinutes/index.js");

var _index12 = _interopRequireDefault(_index11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var longFormattingTokensRegExp = /(\[[^[]*])|(\\)?(LTS|LT|LLLL|LLL|LL|L|llll|lll|ll|l)/g;
var defaultFormattingTokensRegExp = /(\[[^[]*])|(\\)?(x|ss|s|mm|m|hh|h|do|dddd|ddd|dd|d|aa|a|ZZ|Z|YYYY|YY|X|Wo|WW|W|SSS|SS|S|Qo|Q|Mo|MMMM|MMM|MM|M|HH|H|GGGG|GG|E|Do|DDDo|DDDD|DDD|DD|D|A|.)/g;

/**
 * @name format
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * Accepted tokens:
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 * | Long format             | LT    | 05:30 a.m.                       |
 * |                         | LTS   | 05:30:15 a.m.                    |
 * |                         | L     | 07/02/1995                       |
 * |                         | l     | 7/2/1995                         |
 * |                         | LL    | July 2 1995                      |
 * |                         | ll    | Jul 2 1995                       |
 * |                         | LLL   | July 2 1995 05:30 a.m.           |
 * |                         | lll   | Jul 2 1995 05:30 a.m.            |
 * |                         | LLLL  | Sunday, July 2 1995 05:30 a.m.   |
 * |                         | llll  | Sun, Jul 2 1995 05:30 a.m.       |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} date - the original date
 * @param {String} format - the string of tokens
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(
 *   new Date(2014, 1, 11),
 *   'MM/DD/YYYY'
 * )
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * var result = format(
 *   new Date(2014, 6, 2),
 *   'Do [de] MMMM YYYY',
 *   {locale: eoLocale}
 * )
 * //=> '2-a de julio 2014'
 */
function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var formatStr = String(dirtyFormatStr);
  var options = dirtyOptions || {};

  var locale = options.locale || _index6.default;

  if (!locale.localize) {
    throw new RangeError('locale must contain localize property');
  }

  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }

  var localeFormatters = locale.formatters || {};
  var formattingTokensRegExp = locale.formattingTokensRegExp || defaultFormattingTokensRegExp;
  var formatLong = locale.formatLong;

  var originalDate = (0, _index2.default)(dirtyDate, options);

  if (!(0, _index4.default)(originalDate, options)) {
    return 'Invalid Date';
  }

  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
  var timezoneOffset = originalDate.getTimezoneOffset();
  var utcDate = (0, _index12.default)(originalDate, -timezoneOffset, options);

  var formatterOptions = (0, _index10.default)(options);
  formatterOptions.locale = locale;
  formatterOptions.formatters = _index8.default;

  // When UTC functions will be implemented, options._originalDate will likely be a part of public API.
  // Right now, please don't use it in locales. If you have to use an original date,
  // please restore it from `date`, adding a timezone offset to it.
  formatterOptions._originalDate = originalDate;

  var result = formatStr.replace(longFormattingTokensRegExp, function (substring) {
    if (substring[0] === '[') {
      return substring;
    }

    if (substring[0] === '\\') {
      return cleanEscapedString(substring);
    }

    return formatLong(substring);
  }).replace(formattingTokensRegExp, function (substring) {
    var formatter = localeFormatters[substring] || _index8.default[substring];

    if (formatter) {
      return formatter(utcDate, formatterOptions);
    } else {
      return cleanEscapedString(substring);
    }
  });

  return result;
}

function cleanEscapedString(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '');
  }
  return input.replace(/\\/g, '');
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/getDaysInMonth/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/getDaysInMonth/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDaysInMonth;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name getDaysInMonth
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param {Date|String|Number} date - the given date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Number} the number of days in a month
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // How many days are in February 2000?
 * var result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/isAfter/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/isAfter/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAfter;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param {Date|String|Number} date - the date that should be after the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Boolean} the first date is after the second date
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter(dirtyDate, dirtyDateToCompare, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var dateToCompare = (0, _index2.default)(dirtyDateToCompare, dirtyOptions);
  return date.getTime() > dateToCompare.getTime();
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/isBefore/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/isBefore/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBefore;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param {Date|String|Number} date - the date that should be before the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Boolean} the first date is before the second date
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore(dirtyDate, dirtyDateToCompare, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var dateToCompare = (0, _index2.default)(dirtyDateToCompare, dirtyOptions);
  return date.getTime() < dateToCompare.getTime();
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/isSameDay/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/isSameDay/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameDay;

var _index = __webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/startOfDay/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day?
 *
 * @description
 * Are the given dates in the same day?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Boolean} the dates are in the same day
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * var result = isSameDay(
 *   new Date(2014, 8, 4, 6, 0),
 *   new Date(2014, 8, 4, 18, 0)
 * )
 * //=> true
 */
function isSameDay(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var dateLeftStartOfDay = (0, _index2.default)(dirtyDateLeft, dirtyOptions);
  var dateRightStartOfDay = (0, _index2.default)(dirtyDateRight, dirtyOptions);

  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/isSameMonth/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/isSameMonth/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSameMonth;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isSameMonth
 * @category Month Helpers
 * @summary Are the given dates in the same month?
 *
 * @description
 * Are the given dates in the same month?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Boolean} the dates are in the same month
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * var result = isSameMonth(
 *   new Date(2014, 8, 2),
 *   new Date(2014, 8, 25)
 * )
 * //=> true
 */
function isSameMonth(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var dateLeft = (0, _index2.default)(dirtyDateLeft, dirtyOptions);
  var dateRight = (0, _index2.default)(dirtyDateRight, dirtyOptions);
  return dateLeft.getFullYear() === dateRight.getFullYear() && dateLeft.getMonth() === dateRight.getMonth();
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/isValid/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/isValid/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValid;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {*} date - the date to check
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * var result = isValid('2014-02-31')
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  return !isNaN(date);
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/isWeekend/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/isWeekend/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWeekend;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isWeekend
 * @category Weekday Helpers
 * @summary Does the given date fall on a weekend?
 *
 * @description
 * Does the given date fall on a weekend?
 *
 * @param {Date|String|Number} date - the date to check
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Boolean} the date falls on a weekend
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Does 5 October 2014 fall on a weekend?
 * var result = isWeekend(new Date(2014, 9, 5))
 * //=> true
 */
function isWeekend(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var day = date.getDay();
  return day === 0 || day === 6;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/isWithinInterval/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/isWithinInterval/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWithinInterval;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval?
 *
 * @param {Date|String|Number} date - the date to check
 * @param {Interval} interval - the interval to check
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Boolean} the date is within the interval
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(
 *   new Date(2014, 0, 3),
 *   {start: new Date(2014, 0, 1), end: new Date(2014, 0, 7)}
 * )
 * //=> true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(
 *   new Date(2014, 0, 10),
 *   {start: new Date(2014, 0, 1), end: new Date(2014, 0, 7)}
 * )
 * //=> false
 */
function isWithinInterval(dirtyDate, dirtyInterval, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var interval = dirtyInterval || {};
  var time = (0, _index2.default)(dirtyDate, dirtyOptions).getTime();
  var startTime = (0, _index2.default)(interval.start, dirtyOptions).getTime();
  var endTime = (0, _index2.default)(interval.end, dirtyOptions).getTime();

  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (!(startTime <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  return time >= startTime && time <= endTime;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildFormatLongFn/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildFormatLongFn/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFormatLongFn;
var tokensToBeShortedPattern = /MMMM|MM|DD|dddd/g;

function buildShortLongFormat(format) {
  return format.replace(tokensToBeShortedPattern, function (token) {
    return token.slice(1);
  });
}

/**
 * @name buildFormatLongFn
 * @category Locale Helpers
 * @summary Build `formatLong` property for locale used by `format`, `formatRelative` and `parse` functions.
 *
 * @description
 * Build `formatLong` property for locale used by `format`, `formatRelative` and `parse` functions.
 * Returns a function which takes one of the following tokens as the argument:
 * `'LTS'`, `'LT'`, `'L'`, `'LL'`, `'LLL'`, `'l'`, `'ll'`, `'lll'`, `'llll'`
 * and returns a long format string written as `format` token strings.
 * See [format]{@link https://date-fns.org/docs/format}
 *
 * `'l'`, `'ll'`, `'lll'` and `'llll'` formats are built automatically
 * by shortening some of the tokens from corresponding unshortened formats
 * (e.g., if `LL` is `'MMMM DD YYYY'` then `ll` will be `MMM D YYYY`)
 *
 * @param {Object} obj - the object with long formats written as `format` token strings
 * @param {String} obj.LT - time format: hours and minutes
 * @param {String} obj.LTS - time format: hours, minutes and seconds
 * @param {String} obj.L - short date format: numeric day, month and year
 * @param {String} [obj.l] - short date format: numeric day, month and year (shortened)
 * @param {String} obj.LL - long date format: day, month in words, and year
 * @param {String} [obj.ll] - long date format: day, month in words, and year (shortened)
 * @param {String} obj.LLL - long date and time format
 * @param {String} [obj.lll] - long date and time format (shortened)
 * @param {String} obj.LLLL - long date, time and weekday format
 * @param {String} [obj.llll] - long date, time and weekday format (shortened)
 * @returns {Function} `formatLong` property of the locale
 *
 * @example
 * // For `en-US` locale:
 * locale.formatLong = buildFormatLongFn({
 *   LT: 'h:mm aa',
 *   LTS: 'h:mm:ss aa',
 *   L: 'MM/DD/YYYY',
 *   LL: 'MMMM D YYYY',
 *   LLL: 'MMMM D YYYY h:mm aa',
 *   LLLL: 'dddd, MMMM D YYYY h:mm aa'
 * })
 */
function buildFormatLongFn(obj) {
  var formatLongLocale = {
    LTS: obj.LTS,
    LT: obj.LT,
    L: obj.L,
    LL: obj.LL,
    LLL: obj.LLL,
    LLLL: obj.LLLL,
    l: obj.l || buildShortLongFormat(obj.L),
    ll: obj.ll || buildShortLongFormat(obj.LL),
    lll: obj.lll || buildShortLongFormat(obj.LLL),
    llll: obj.llll || buildShortLongFormat(obj.LLLL)
  };

  return function (token) {
    return formatLongLocale[token];
  };
}
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildLocalizeArrayFn/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildLocalizeArrayFn/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildLocalizeArrayFn;
/**
 * @name buildLocalizeArrayFn
 * @category Locale Helpers
 * @summary Build `localize.weekdays`, `localize.months` and `localize.timesOfDay` properties for the locale.
 *
 * @description
 * Build `localize.weekdays`, `localize.months` and `localize.timesOfDay` properties for the locale.
 * If no `type` is supplied to the options of the resulting function, `defaultType` will be used (see example).
 *
 * @param {Object} values - the object with arrays of values
 * @param {String} defaultType - the default type for the localize function
 * @returns {Function} the resulting function
 *
 * @example
 * var weekdayValues = {
 *   narrow: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
 *   short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
 *   long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
 * }
 * locale.localize.weekdays = buildLocalizeArrayFn(weekdayValues, 'long')
 * locale.localize.weekdays({type: 'narrow'}) //=> ['Su', 'Mo', ...]
 * locale.localize.weekdays() //=> ['Sunday', 'Monday', ...]
 */
function buildLocalizeArrayFn(values, defaultType) {
  return function (dirtyOptions) {
    var options = dirtyOptions || {};
    var type = options.type ? String(options.type) : defaultType;
    return values[type] || values[defaultType];
  };
}
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildLocalizeFn/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildLocalizeFn/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildLocalizeFn;
/**
 * @name buildLocalizeFn
 * @category Locale Helpers
 * @summary Build `localize.weekday`, `localize.month` and `localize.timeOfDay` properties for the locale.
 *
 * @description
 * Build `localize.weekday`, `localize.month` and `localize.timeOfDay` properties for the locale
 * used by `format` function.
 * If no `type` is supplied to the options of the resulting function, `defaultType` will be used (see example).
 *
 * `localize.weekday` function takes the weekday index as argument (0 - Sunday).
 * `localize.month` takes the month index (0 - January).
 * `localize.timeOfDay` takes the hours. Use `indexCallback` to convert them to an array index (see example).
 *
 * @param {Object} values - the object with arrays of values
 * @param {String} defaultType - the default type for the localize function
 * @param {Function} [indexCallback] - the callback which takes the resulting function argument
 *   and converts it into value array index
 * @returns {Function} the resulting function
 *
 * @example
 * var timeOfDayValues = {
 *   uppercase: ['AM', 'PM'],
 *   lowercase: ['am', 'pm'],
 *   long: ['a.m.', 'p.m.']
 * }
 * locale.localize.timeOfDay = buildLocalizeFn(timeOfDayValues, 'long', function (hours) {
 *   // 0 is a.m. array index, 1 is p.m. array index
 *   return (hours / 12) >= 1 ? 1 : 0
 * })
 * locale.localize.timeOfDay(16, {type: 'uppercase'}) //=> 'PM'
 * locale.localize.timeOfDay(5) //=> 'a.m.'
 */
function buildLocalizeFn(values, defaultType, indexCallback) {
  return function (dirtyIndex, dirtyOptions) {
    var options = dirtyOptions || {};
    var type = options.type ? String(options.type) : defaultType;
    var valuesArray = values[type] || values[defaultType];
    var index = indexCallback ? indexCallback(Number(dirtyIndex)) : Number(dirtyIndex);
    return valuesArray[index];
  };
}
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildMatchFn/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildMatchFn/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMatchFn;
/**
 * @name buildMatchFn
 * @category Locale Helpers
 * @summary Build `match.weekdays`, `match.months` and `match.timesOfDay` properties for the locale.
 *
 * @description
 * Build `match.weekdays`, `match.months` and `match.timesOfDay` properties for the locale used by `parse` function.
 * If no `type` is supplied to the options of the resulting function, `defaultType` will be used (see example).
 * The result of the match function will be passed into corresponding parser function
 * (`match.weekday`, `match.month` or `match.timeOfDay` respectively. See `buildParseFn`).
 *
 * @param {Object} values - the object with RegExps
 * @param {String} defaultType - the default type for the match function
 * @returns {Function} the resulting function
 *
 * @example
 * var matchWeekdaysPatterns = {
 *   narrow: /^(su|mo|tu|we|th|fr|sa)/i,
 *   short: /^(sun|mon|tue|wed|thu|fri|sat)/i,
 *   long: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
 * }
 * locale.match.weekdays = buildMatchFn(matchWeekdaysPatterns, 'long')
 * locale.match.weekdays('Sunday', {type: 'narrow'}) //=> ['Su', 'Su', ...]
 * locale.match.weekdays('Sunday') //=> ['Sunday', 'Sunday', ...]
 */
function buildMatchFn(patterns, defaultType) {
  return function (dirtyString, dirtyOptions) {
    var options = dirtyOptions || {};
    var type = options.type ? String(options.type) : defaultType;
    var pattern = patterns[type] || patterns[defaultType];
    var string = String(dirtyString);
    return string.match(pattern);
  };
}
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildMatchPatternFn/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildMatchPatternFn/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMatchPatternFn;
/**
 * @name buildMatchPatternFn
 * @category Locale Helpers
 * @summary Build match function from a single RegExp.
 *
 * @description
 * Build match function from a single RegExp.
 * Usually used for building `match.ordinalNumbers` property of the locale.
 *
 * @param {Object} pattern - the RegExp
 * @returns {Function} the resulting function
 *
 * @example
 * locale.match.ordinalNumbers = buildMatchPatternFn(/^(\d+)(th|st|nd|rd)?/i)
 * locale.match.ordinalNumbers('3rd') //=> ['3rd', '3', 'rd', ...]
 */
function buildMatchPatternFn(pattern) {
  return function (dirtyString) {
    var string = String(dirtyString);
    return string.match(pattern);
  };
}
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/buildParseFn/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/buildParseFn/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildParseFn;
/**
 * @name buildParseFn
 * @category Locale Helpers
 * @summary Build `match.weekday`, `match.month` and `match.timeOfDay` properties for the locale.
 *
 * @description
 * Build `match.weekday`, `match.month` and `match.timeOfDay` properties for the locale used by `parse` function.
 * The argument of the resulting function is the result of the corresponding match function
 * (`match.weekdays`, `match.months` or `match.timesOfDay` respectively. See `buildMatchFn`).
 *
 * @param {Object} values - the object with arrays of RegExps
 * @param {String} defaultType - the default type for the parser function
 * @returns {Function} the resulting function
 *
 * @example
 * var parseWeekdayPatterns = {
 *   any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
 * }
 * locale.match.weekday = buildParseFn(matchWeekdaysPatterns, 'long')
 * var matchResult = locale.match.weekdays('Friday')
 * locale.match.weekday(matchResult) //=> 5
 */
function buildParseFn(patterns, defaultType) {
  return function (matchResult, dirtyOptions) {
    var options = dirtyOptions || {};
    var type = options.type ? String(options.type) : defaultType;
    var patternsArray = patterns[type] || patterns[defaultType];
    var string = matchResult[1];

    return patternsArray.findIndex(function (pattern) {
      return pattern.test(string);
    });
  };
}
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/date-fns/locale/_lib/parseDecimal/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/locale/_lib/parseDecimal/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseDecimal;
/**
 * @name parseDecimal
 * @category Locale Helpers
 * @summary Parses the match result into decimal number.
 *
 * @description
 * Parses the match result into decimal number.
 * Uses the string matched with the first set of parentheses of match RegExp.
 *
 * @param {Array} matchResult - the object returned by matching function
 * @returns {Number} the parsed value
 *
 * @example
 * locale.match = {
 *   ordinalNumbers: (dirtyString) {
 *     return String(dirtyString).match(/^(\d+)(th|st|nd|rd)?/i)
 *   },
 *   ordinalNumber: parseDecimal
 * }
 */
function parseDecimal(matchResult) {
  return parseInt(matchResult[1], 10);
}
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatDistance/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatDistance/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDistance;
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },

  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },

  halfAMinute: 'half a minute',

  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },

  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },

  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },

  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },

  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },

  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },

  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },

  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },

  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },

  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },

  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};

function formatDistance(token, count, options) {
  options = options || {};

  var result;
  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (count === 1) {
    result = formatDistanceLocale[token].one;
  } else {
    result = formatDistanceLocale[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }

  return result;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatLong/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatLong/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../../../_lib/buildFormatLongFn/index.js */ "./node_modules/date-fns/locale/_lib/buildFormatLongFn/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatLong = (0, _index2.default)({
  LT: 'h:mm aa',
  LTS: 'h:mm:ss aa',
  L: 'MM/DD/YYYY',
  LL: 'MMMM D YYYY',
  LLL: 'MMMM D YYYY h:mm aa',
  LLLL: 'dddd, MMMM D YYYY h:mm aa'
});

exports.default = formatLong;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/formatRelative/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/formatRelative/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatRelative;
var formatRelativeLocale = {
  lastWeek: '[last] dddd [at] LT',
  yesterday: '[yesterday at] LT',
  today: '[today at] LT',
  tomorrow: '[tomorrow at] LT',
  nextWeek: 'dddd [at] LT',
  other: 'L'
};

function formatRelative(token, date, baseDate, options) {
  return formatRelativeLocale[token];
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/localize/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/localize/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../../../_lib/buildLocalizeFn/index.js */ "./node_modules/date-fns/locale/_lib/buildLocalizeFn/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../../../_lib/buildLocalizeArrayFn/index.js */ "./node_modules/date-fns/locale/_lib/buildLocalizeArrayFn/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
var weekdayValues = {
  narrow: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

var monthValues = {
  short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

// `timeOfDay` is used to designate which part of the day it is, when used with 12-hour clock.
// Use the system which is used the most commonly in the locale.
// For example, if the country doesn't use a.m./p.m., you can use `night`/`morning`/`afternoon`/`evening`:
//
//   var timeOfDayValues = {
//     any: ['in the night', 'in the morning', 'in the afternoon', 'in the evening']
//   }
//
// And later:
//
//   var localize = {
//     // The callback takes the hours as the argument and returns the array index
//     timeOfDay: buildLocalizeFn(timeOfDayValues, 'any', function (hours) {
//       if (hours >= 17) {
//         return 3
//       } else if (hours >= 12) {
//         return 2
//       } else if (hours >= 4) {
//         return 1
//       } else {
//         return 0
//       }
//     }),
//     timesOfDay: buildLocalizeArrayFn(timeOfDayValues, 'any')
//   }
var timeOfDayValues = {
  uppercase: ['AM', 'PM'],
  lowercase: ['am', 'pm'],
  long: ['a.m.', 'p.m.']
};

function ordinalNumber(dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'month', 'quarter', 'week', 'isoWeek', 'dayOfYear',
  // 'dayOfMonth' or 'dayOfWeek'

  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';
      case 2:
        return number + 'nd';
      case 3:
        return number + 'rd';
    }
  }
  return number + 'th';
}

var localize = {
  ordinalNumber: ordinalNumber,
  weekday: (0, _index2.default)(weekdayValues, 'long'),
  weekdays: (0, _index4.default)(weekdayValues, 'long'),
  month: (0, _index2.default)(monthValues, 'long'),
  months: (0, _index4.default)(monthValues, 'long'),
  timeOfDay: (0, _index2.default)(timeOfDayValues, 'long', function (hours) {
    return hours / 12 >= 1 ? 1 : 0;
  }),
  timesOfDay: (0, _index4.default)(timeOfDayValues, 'long')
};

exports.default = localize;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/_lib/match/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/_lib/match/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../../../_lib/buildMatchFn/index.js */ "./node_modules/date-fns/locale/_lib/buildMatchFn/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../../../_lib/buildParseFn/index.js */ "./node_modules/date-fns/locale/_lib/buildParseFn/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../../../_lib/buildMatchPatternFn/index.js */ "./node_modules/date-fns/locale/_lib/buildMatchPatternFn/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(/*! ../../../_lib/parseDecimal/index.js */ "./node_modules/date-fns/locale/_lib/parseDecimal/index.js");

var _index8 = _interopRequireDefault(_index7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matchOrdinalNumbersPattern = /^(\d+)(th|st|nd|rd)?/i;

var matchWeekdaysPatterns = {
  narrow: /^(su|mo|tu|we|th|fr|sa)/i,
  short: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  long: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};

var parseWeekdayPatterns = {
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};

var matchMonthsPatterns = {
  short: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  long: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};

var parseMonthPatterns = {
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};

// `timeOfDay` is used to designate which part of the day it is, when used with 12-hour clock.
// Use the system which is used the most commonly in the locale.
// For example, if the country doesn't use a.m./p.m., you can use `night`/`morning`/`afternoon`/`evening`:
//
//   var matchTimesOfDayPatterns = {
//     long: /^((in the)? (night|morning|afternoon|evening?))/i
//   }
//
//   var parseTimeOfDayPatterns = {
//     any: [/(night|morning)/i, /(afternoon|evening)/i]
//   }
var matchTimesOfDayPatterns = {
  short: /^(am|pm)/i,
  long: /^([ap]\.?\s?m\.?)/i
};

var parseTimeOfDayPatterns = {
  any: [/^a/i, /^p/i]
};

var match = {
  ordinalNumbers: (0, _index6.default)(matchOrdinalNumbersPattern),
  ordinalNumber: _index8.default,
  weekdays: (0, _index2.default)(matchWeekdaysPatterns, 'long'),
  weekday: (0, _index4.default)(parseWeekdayPatterns, 'any'),
  months: (0, _index2.default)(matchMonthsPatterns, 'long'),
  month: (0, _index4.default)(parseMonthPatterns, 'any'),
  timesOfDay: (0, _index2.default)(matchTimesOfDayPatterns, 'long'),
  timeOfDay: (0, _index4.default)(parseTimeOfDayPatterns, 'any')
};

exports.default = match;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/locale/en-US/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/locale/en-US/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ./_lib/formatDistance/index.js */ "./node_modules/date-fns/locale/en-US/_lib/formatDistance/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ./_lib/formatLong/index.js */ "./node_modules/date-fns/locale/en-US/_lib/formatLong/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ./_lib/formatRelative/index.js */ "./node_modules/date-fns/locale/en-US/_lib/formatRelative/index.js");

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(/*! ./_lib/localize/index.js */ "./node_modules/date-fns/locale/en-US/_lib/localize/index.js");

var _index8 = _interopRequireDefault(_index7);

var _index9 = __webpack_require__(/*! ./_lib/match/index.js */ "./node_modules/date-fns/locale/en-US/_lib/match/index.js");

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 */
var locale = {
  formatDistance: _index2.default,
  formatLong: _index4.default,
  formatRelative: _index6.default,
  localize: _index8.default,
  match: _index10.default,
  options: {
    weekStartsOn: 0 /* Sunday */
    , firstWeekContainsDate: 1
  }
};

exports.default = locale;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/max/index.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/max/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = max;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name max
 * @category Common Helpers
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * @param {Date[]|String[]|Number[]} datesArray - the dates to compare
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the latest of the dates
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Which of these dates is the latest?
 * var result = max(
 *  [
 *    new Date(1989, 6, 10),
 *    new Date(1987, 1, 11),
 *    new Date(1995, 6, 2),
 *    new Date(1990, 0, 1)
 *  ]
 * )
 * //=> Sun Jul 02 1995 00:00:00
 */
function max(dirtyDatesArray, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var datesArray;
  // `dirtyDatesArray` is undefined or null
  if (dirtyDatesArray == null) {
    datesArray = [];

    // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method
  } else if (typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray;

    // If `dirtyDatesArray` is Array-like Object, convert to Array. Otherwise, make it empty Array
  } else {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  }

  var result;
  datesArray.forEach(function (dirtyDate) {
    var currentDate = (0, _index2.default)(dirtyDate, dirtyOptions);

    if (result === undefined || result < currentDate || isNaN(currentDate)) {
      result = currentDate;
    }
  });

  return result;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/min/index.js":
/*!********************************************!*\
  !*** ./node_modules/date-fns/min/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = min;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name min
 * @category Common Helpers
 * @summary Return the earliest of the given dates.
 *
 * @description
 * Return the earliest of the given dates.
 *
 * @param {Date[]|String[]|Number[]} datesArray - the dates to compare
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the earliest of the dates
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Which of these dates is the earliest?
 * var result = min(
 *  [
 *    new Date(1989, 6, 10),
 *    new Date(1987, 1, 11),
 *    new Date(1995, 6, 2),
 *    new Date(1990, 0, 1)
 *  ]
 * )
 * //=> Wed Feb 11 1987 00:00:00
 */
function min(dirtyDatesArray, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var datesArray;
  // `dirtyDatesArray` is undefined or null
  if (dirtyDatesArray == null) {
    datesArray = [];

    // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method
  } else if (typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray;

    // If `dirtyDatesArray` is Array-like Object, convert to Array. Otherwise, make it empty Array
  } else {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  }

  var result;
  datesArray.forEach(function (dirtyDate) {
    var currentDate = (0, _index2.default)(dirtyDate, dirtyOptions);

    if (result === undefined || result > currentDate || isNaN(currentDate)) {
      result = currentDate;
    }
  });

  return result;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/setMonth/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/setMonth/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setMonth;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../getDaysInMonth/index.js */ "./node_modules/date-fns/getDaysInMonth/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setMonth
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} month - the month of the new date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the month setted
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Set February to 1 September 2014:
 * var result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
function setMonth(dirtyDate, dirtyMonth, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var month = Number(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();

  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = (0, _index4.default)(dateWithDesiredMonth, dirtyOptions);
  // Set the last day of the new month
  // if the original date was the last day of the longer month
  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/setYear/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/setYear/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setYear;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name setYear
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} year - the year of the new date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the year setted
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * var result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
function setYear(dirtyDate, dirtyYear, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  var year = Number(dirtyYear);

  // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
  if (isNaN(date)) {
    return new Date(NaN);
  }

  date.setFullYear(year);
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/startOfDay/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/startOfDay/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfDay;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * var result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/startOfMonth/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/startOfMonth/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfMonth;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the start of a month
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * var result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var date = (0, _index2.default)(dirtyDate, dirtyOptions);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/startOfWeek/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/startOfWeek/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startOfWeek;

var _index = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/toDate/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|String|Number} date - the original date
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * var result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), {weekStartsOn: 1})
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn === undefined ? 0 : Number(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn === undefined ? defaultWeekStartsOn : Number(options.weekStartsOn);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0, _index2.default)(dirtyDate, options);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/date-fns/toDate/index.js":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/toDate/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDate;
var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;

var patterns = {
  dateTimeDelimeter: /[T ]/,
  plainTime: /:/,

  // year tokens
  YY: /^(\d{2})$/,
  YYY: [/^([+-]\d{2})$/, // 0 additional digits
  /^([+-]\d{3})$/, // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [/^([+-]\d{4})/, // 0 additional digits
  /^([+-]\d{5})/, // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
  ],

  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,

  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,

  // timezone tokens
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-])(\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument is null, it is treated as an invalid date.
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 * All *date-fns* functions will throw `RangeError` if `options.additionalDigits` is not 0, 1, 2 or undefined.
 *
 * @param {*} argument - the value to convert
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = toDate('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * var result = toDate('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function toDate(argument, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }

  if (argument === null) {
    return new Date(NaN);
  }

  var options = dirtyOptions || {};

  var additionalDigits = options.additionalDigits === undefined ? DEFAULT_ADDITIONAL_DIGITS : Number(options.additionalDigits);
  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  }

  // Clone the date
  if (argument instanceof Date) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument !== 'string') {
    return new Date(argument);
  }

  var dateStrings = splitDateString(argument);

  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
  var year = parseYearResult.year;
  var restDateString = parseYearResult.restDateString;

  var date = parseDate(restDateString, year);

  if (date) {
    var timestamp = date.getTime();
    var time = 0;
    var offset;

    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone);
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = new Date(timestamp + time).getTimezoneOffset();
      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset();
    }

    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE);
  } else {
    return new Date(argument);
  }
}

function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimeter);
  var timeString;

  if (patterns.plainTime.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
  }

  if (timeString) {
    var token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var patternYYY = patterns.YYY[additionalDigits];
  var patternYYYYY = patterns.YYYYY[additionalDigits];

  var token;

  // YYYY or ±YYYYY
  token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);
  if (token) {
    var yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    };
  }

  // YY or ±YYY
  token = patterns.YY.exec(dateString) || patternYYY.exec(dateString);
  if (token) {
    var centuryString = token[1];
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    };
  }

  // Invalid ISO-formatted year
  return {
    year: null
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null;
  }

  var token;
  var date;
  var month;
  var week;

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date;
  }

  // YYYY-MM
  token = patterns.MM.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    date.setUTCFullYear(year, month);
    return date;
  }

  // YYYY-DDD or YYYYDDD
  token = patterns.DDD.exec(dateString);
  if (token) {
    date = new Date(0);
    var dayOfYear = parseInt(token[1], 10);
    date.setUTCFullYear(year, 0, dayOfYear);
    return date;
  }

  // YYYY-MM-DD or YYYYMMDD
  token = patterns.MMDD.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    var day = parseInt(token[2], 10);
    date.setUTCFullYear(year, month, day);
    return date;
  }

  // YYYY-Www or YYYYWww
  token = patterns.Www.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    return dayOfISOYear(year, week);
  }

  // YYYY-Www-D or YYYYWwwD
  token = patterns.WwwD.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    var dayOfWeek = parseInt(token[2], 10) - 1;
    return dayOfISOYear(year, week, dayOfWeek);
  }

  // Invalid ISO-formatted date
  return null;
}

function parseTime(timeString) {
  var token;
  var hours;
  var minutes;

  // hh
  token = patterns.HH.exec(timeString);
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'));
    return hours % 24 * MILLISECONDS_IN_HOUR;
  }

  // hh:mm or hhmm
  token = patterns.HHMM.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(',', '.'));
    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
  }

  // hh:mm:ss or hhmmss
  token = patterns.HHMMSS.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    var seconds = parseFloat(token[3].replace(',', '.'));
    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1000;
  }

  // Invalid ISO-formatted time
  return null;
}

function parseTimezone(timezoneString) {
  var token;
  var absoluteOffset;

  // Z
  token = patterns.timezoneZ.exec(timezoneString);
  if (token) {
    return 0;
  }

  // ±hh
  token = patterns.timezoneHH.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60;
    return token[1] === '+' ? -absoluteOffset : absoluteOffset;
  }

  // ±hh:mm or ±hhmm
  token = patterns.timezoneHHMM.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
    return token[1] === '+' ? -absoluteOffset : absoluteOffset;
  }

  return 0;
}

function dayOfISOYear(isoYear, week, day) {
  week = week || 0;
  day = day || 0;
  var date = new Date(0);
  date.setUTCFullYear(isoYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-date-range/dist/components/Calendar.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-date-range/dist/components/Calendar.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DayCell = __webpack_require__(/*! ./DayCell.js */ "./node_modules/react-date-range/dist/components/DayCell.js");

var _Month = __webpack_require__(/*! ./Month.js */ "./node_modules/react-date-range/dist/components/Month.js");

var _Month2 = _interopRequireDefault(_Month);

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/react-date-range/dist/utils.js");

var _classnames3 = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames4 = _interopRequireDefault(_classnames3);

var _reactList = __webpack_require__(/*! react-list */ "./node_modules/react-list/react-list.js");

var _reactList2 = _interopRequireDefault(_reactList);

var _max = __webpack_require__(/*! date-fns/max */ "./node_modules/date-fns/max/index.js");

var _max2 = _interopRequireDefault(_max);

var _min = __webpack_require__(/*! date-fns/min */ "./node_modules/date-fns/min/index.js");

var _min2 = _interopRequireDefault(_min);

var _differenceInDays = __webpack_require__(/*! date-fns/differenceInDays */ "./node_modules/date-fns/differenceInDays/index.js");

var _differenceInDays2 = _interopRequireDefault(_differenceInDays);

var _isSameMonth = __webpack_require__(/*! date-fns/isSameMonth */ "./node_modules/date-fns/isSameMonth/index.js");

var _isSameMonth2 = _interopRequireDefault(_isSameMonth);

var _addDays = __webpack_require__(/*! date-fns/addDays */ "./node_modules/date-fns/addDays/index.js");

var _addDays2 = _interopRequireDefault(_addDays);

var _endOfMonth = __webpack_require__(/*! date-fns/endOfMonth */ "./node_modules/date-fns/endOfMonth/index.js");

var _endOfMonth2 = _interopRequireDefault(_endOfMonth);

var _startOfMonth = __webpack_require__(/*! date-fns/startOfMonth */ "./node_modules/date-fns/startOfMonth/index.js");

var _startOfMonth2 = _interopRequireDefault(_startOfMonth);

var _differenceInCalendarMonths = __webpack_require__(/*! date-fns/differenceInCalendarMonths */ "./node_modules/date-fns/differenceInCalendarMonths/index.js");

var _differenceInCalendarMonths2 = _interopRequireDefault(_differenceInCalendarMonths);

var _setMonth2 = __webpack_require__(/*! date-fns/setMonth */ "./node_modules/date-fns/setMonth/index.js");

var _setMonth3 = _interopRequireDefault(_setMonth2);

var _setYear2 = __webpack_require__(/*! date-fns/setYear */ "./node_modules/date-fns/setYear/index.js");

var _setYear3 = _interopRequireDefault(_setYear2);

var _addYears = __webpack_require__(/*! date-fns/addYears */ "./node_modules/date-fns/addYears/index.js");

var _addYears2 = _interopRequireDefault(_addYears);

var _isSameDay = __webpack_require__(/*! date-fns/isSameDay */ "./node_modules/date-fns/isSameDay/index.js");

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _endOfWeek = __webpack_require__(/*! date-fns/endOfWeek */ "./node_modules/date-fns/endOfWeek/index.js");

var _endOfWeek2 = _interopRequireDefault(_endOfWeek);

var _startOfWeek = __webpack_require__(/*! date-fns/startOfWeek */ "./node_modules/date-fns/startOfWeek/index.js");

var _startOfWeek2 = _interopRequireDefault(_startOfWeek);

var _eachDayOfInterval = __webpack_require__(/*! date-fns/eachDayOfInterval */ "./node_modules/date-fns/eachDayOfInterval/index.js");

var _eachDayOfInterval2 = _interopRequireDefault(_eachDayOfInterval);

var _format = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/format/index.js");

var _format2 = _interopRequireDefault(_format);

var _addMonths = __webpack_require__(/*! date-fns/addMonths */ "./node_modules/date-fns/addMonths/index.js");

var _addMonths2 = _interopRequireDefault(_addMonths);

var _enUS = __webpack_require__(/*! date-fns/locale/en-US */ "./node_modules/date-fns/locale/en-US/index.js");

var _enUS2 = _interopRequireDefault(_enUS);

var _styles = __webpack_require__(/*! ../styles */ "./node_modules/react-date-range/dist/styles.js");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_PureComponent) {
  _inherits(Calendar, _PureComponent);

  function Calendar(props, context) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props, context));

    _this.changeShownDate = _this.changeShownDate.bind(_this);
    _this.focusToDate = _this.focusToDate.bind(_this);
    _this.updateShownDate = _this.updateShownDate.bind(_this);
    _this.handleRangeFocusChange = _this.handleRangeFocusChange.bind(_this);
    _this.renderDateDisplay = _this.renderDateDisplay.bind(_this);
    _this.onDragSelectionStart = _this.onDragSelectionStart.bind(_this);
    _this.onDragSelectionEnd = _this.onDragSelectionEnd.bind(_this);
    _this.onDragSelectionMove = _this.onDragSelectionMove.bind(_this);
    _this.renderMonthAndYear = _this.renderMonthAndYear.bind(_this);
    _this.updatePreview = _this.updatePreview.bind(_this);
    _this.estimateMonthSize = _this.estimateMonthSize.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.dateOptions = { locale: props.locale };
    _this.styles = (0, _utils.generateStyles)([_styles2.default, props.classNames]);
    _this.listSizeCache = {};
    _this.state = {
      focusedDate: (0, _utils.calcFocusDate)(null, props),
      drag: {
        status: false,
        range: { startDate: null, endDate: null },
        disablePreview: false
      },
      scrollArea: _this.calcScrollArea(props)
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'calcScrollArea',
    value: function calcScrollArea(props) {
      var direction = props.direction,
          months = props.months,
          scroll = props.scroll;

      if (!scroll.enabled) return { enabled: false };

      var longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;
      if (direction === 'vertical') {
        return {
          enabled: true,
          monthHeight: scroll.monthHeight || 220,
          longMonthHeight: longMonthHeight || 260,
          calendarWidth: 'auto',
          calendarHeight: (scroll.calendarHeight || longMonthHeight || 240) * months
        };
      }
      return {
        enabled: true,
        monthWidth: scroll.monthWidth || 332,
        calendarWidth: (scroll.calendarWidth || scroll.monthWidth || 332) * months,
        monthHeight: longMonthHeight || 300,
        calendarHeight: longMonthHeight || 300
      };
    }
  }, {
    key: 'focusToDate',
    value: function focusToDate(date) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
      var preventUnnecessary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!props.scroll.enabled) {
        this.setState({ focusedDate: date });
        return;
      }
      var targetMonthIndex = (0, _differenceInCalendarMonths2.default)(date, props.minDate, this.dateOptions);
      var visibleMonths = this.list.getVisibleRange();
      if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;
      this.list.scrollTo(targetMonthIndex);
      this.setState({ focusedDate: date });
    }
  }, {
    key: 'updateShownDate',
    value: function updateShownDate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var newProps = props.scroll.enabled ? _extends({}, props, {
        months: this.list.getVisibleRange().length
      }) : props;
      var newFocus = (0, _utils.calcFocusDate)(this.state.focusedDate, newProps);
      this.focusToDate(newFocus, newProps);
    }
  }, {
    key: 'updatePreview',
    value: function updatePreview(val) {
      if (!val) {
        this.setState({ preview: null });
        return;
      }
      var preview = {
        startDate: val,
        endDate: val,
        color: this.props.color
      };
      this.setState({ preview: preview });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.scroll.enabled) {
        // prevent react-list's initial render focus problem
        setTimeout(function () {
          return _this2.focusToDate(_this2.state.focusedDate);
        }, 1);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var propMapper = {
        dateRange: 'ranges',
        date: 'date'
      };
      var targetProp = propMapper[nextProps.displayMode];
      if (this.props.locale !== nextProps.locale) {
        this.dateOptions = { locale: nextProps.locale };
      }
      if (JSON.stringify(this.props.scroll) !== JSON.stringify(nextProps.scroll)) {
        this.setState({ scrollArea: this.calcScrollArea(nextProps) });
      }
      if (nextProps[targetProp] !== this.props[targetProp]) {
        this.updateShownDate(nextProps);
      }
    }
  }, {
    key: 'changeShownDate',
    value: function changeShownDate(value) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set';
      var focusedDate = this.state.focusedDate;
      var _props = this.props,
          onShownDateChange = _props.onShownDateChange,
          minDate = _props.minDate,
          maxDate = _props.maxDate;

      var modeMapper = {
        monthOffset: function monthOffset() {
          return (0, _addMonths2.default)(focusedDate, value);
        },
        setMonth: function setMonth() {
          return (0, _setMonth3.default)(focusedDate, value);
        },
        setYear: function setYear() {
          return (0, _setYear3.default)(focusedDate, value);
        },
        set: function set() {
          return value;
        }
      };
      var newDate = (0, _min2.default)([(0, _max2.default)([modeMapper[mode](), minDate]), maxDate]);
      this.focusToDate(newDate, this.props, false);
      onShownDateChange && onShownDateChange(newDate);
    }
  }, {
    key: 'handleRangeFocusChange',
    value: function handleRangeFocusChange(rangesIndex, rangeItemIndex) {
      this.props.onRangeFocusChange && this.props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var _props2 = this.props,
          onShownDateChange = _props2.onShownDateChange,
          minDate = _props2.minDate;

      var visibleMonths = this.list.getVisibleRange();
      // prevent scroll jump with wrong visible value
      if (visibleMonths[0] === undefined) return;
      var visibleMonth = (0, _addMonths2.default)(minDate, visibleMonths[0] || 0);
      var isFocusedToDifferent = !(0, _isSameMonth2.default)(visibleMonth, this.state.focusedDate);
      if (isFocusedToDifferent) {
        this.setState({ focusedDate: visibleMonth });
        onShownDateChange && onShownDateChange(visibleMonth);
      }
    }
  }, {
    key: 'renderMonthAndYear',
    value: function renderMonthAndYear(focusedDate, changeShownDate, props) {
      var showMonthArrow = props.showMonthArrow,
          locale = props.locale,
          minDate = props.minDate,
          maxDate = props.maxDate,
          showMonthAndYearPickers = props.showMonthAndYearPickers;

      var upperYearLimit = (maxDate || Calendar.defaultProps.maxDate).getFullYear();
      var lowerYearLimit = (minDate || Calendar.defaultProps.minDate).getFullYear();
      var styles = this.styles;
      return _react2.default.createElement(
        'div',
        { onMouseUp: function onMouseUp(e) {
            return e.stopPropagation();
          }, className: styles.monthAndYearWrapper },
        showMonthArrow ? _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: (0, _classnames4.default)(styles.nextPrevButton, styles.prevButton),
            onClick: function onClick() {
              return changeShownDate(-1, 'monthOffset');
            } },
          _react2.default.createElement('i', null)
        ) : null,
        showMonthAndYearPickers ? _react2.default.createElement(
          'span',
          { className: styles.monthAndYearPickers },
          _react2.default.createElement(
            'span',
            { className: styles.monthPicker },
            _react2.default.createElement(
              'select',
              {
                value: focusedDate.getMonth(),
                onChange: function onChange(e) {
                  return changeShownDate(e.target.value, 'setMonth');
                } },
              locale.localize.months().map(function (month, i) {
                return _react2.default.createElement(
                  'option',
                  { key: i, value: i },
                  month
                );
              })
            )
          ),
          _react2.default.createElement('span', { className: styles.monthAndYearDivider }),
          _react2.default.createElement(
            'span',
            { className: styles.yearPicker },
            _react2.default.createElement(
              'select',
              {
                value: focusedDate.getFullYear(),
                onChange: function onChange(e) {
                  return changeShownDate(e.target.value, 'setYear');
                } },
              new Array(upperYearLimit - lowerYearLimit + 1).fill(upperYearLimit).map(function (val, i) {
                var year = val - i;
                return _react2.default.createElement(
                  'option',
                  { key: year, value: year },
                  year
                );
              })
            )
          )
        ) : _react2.default.createElement(
          'span',
          { className: styles.monthAndYearPickers },
          locale.localize.months()[focusedDate.getMonth()],
          ' ',
          focusedDate.getFullYear()
        ),
        showMonthArrow ? _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: (0, _classnames4.default)(styles.nextPrevButton, styles.nextButton),
            onClick: function onClick() {
              return changeShownDate(+1, 'monthOffset');
            } },
          _react2.default.createElement('i', null)
        ) : null
      );
    }
  }, {
    key: 'renderWeekdays',
    value: function renderWeekdays() {
      var _this3 = this;

      var now = new Date();
      return _react2.default.createElement(
        'div',
        { className: this.styles.weekDays },
        (0, _eachDayOfInterval2.default)({
          start: (0, _startOfWeek2.default)(now, this.dateOptions),
          end: (0, _endOfWeek2.default)(now, this.dateOptions)
        }).map(function (day, i) {
          return _react2.default.createElement(
            'span',
            { className: _this3.styles.weekDay, key: i },
            (0, _format2.default)(day, 'ddd', _this3.dateOptions)
          );
        })
      );
    }
  }, {
    key: 'renderDateDisplay',
    value: function renderDateDisplay() {
      var _this4 = this;

      var _props3 = this.props,
          focusedRange = _props3.focusedRange,
          color = _props3.color,
          ranges = _props3.ranges,
          rangeColors = _props3.rangeColors;

      var defaultColor = rangeColors[focusedRange[0]] || color;
      var styles = this.styles;
      return _react2.default.createElement(
        'div',
        { className: styles.dateDisplayWrapper },
        ranges.map(function (range, i) {
          if (range.showDateDisplay === false || range.disabled && !range.showDateDisplay) return null;
          return _react2.default.createElement(
            'div',
            {
              className: styles.dateDisplay,
              key: i,
              style: { color: range.color || defaultColor } },
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames4.default)(styles.dateDisplayItem, _defineProperty({}, styles.dateDisplayItemActive, focusedRange[0] === i && focusedRange[1] === 0)),
                onFocus: function onFocus() {
                  return _this4.handleRangeFocusChange(i, 0);
                } },
              _react2.default.createElement('input', {
                disabled: range.disabled,
                readOnly: true,
                value: _this4.formatDateDisplay(range.startDate, 'Early')
              })
            ),
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames4.default)(styles.dateDisplayItem, _defineProperty({}, styles.dateDisplayItemActive, focusedRange[0] === i && focusedRange[1] === 1)),
                onFocus: function onFocus() {
                  return _this4.handleRangeFocusChange(i, 1);
                } },
              _react2.default.createElement('input', {
                disabled: range.disabled,
                readOnly: true,
                value: _this4.formatDateDisplay(range.endDate, 'Continuous')
              })
            )
          );
        })
      );
    }
  }, {
    key: 'onDragSelectionStart',
    value: function onDragSelectionStart(date) {
      var _props4 = this.props,
          onChange = _props4.onChange,
          dragSelectionEnabled = _props4.dragSelectionEnabled;


      if (dragSelectionEnabled) {
        this.setState({
          drag: {
            status: true,
            range: { startDate: date, endDate: date },
            disablePreview: true
          }
        });
      } else {
        onChange && onChange(date);
      }
    }
  }, {
    key: 'onDragSelectionEnd',
    value: function onDragSelectionEnd(date) {
      var _props5 = this.props,
          updateRange = _props5.updateRange,
          displayMode = _props5.displayMode,
          onChange = _props5.onChange,
          dragSelectionEnabled = _props5.dragSelectionEnabled;


      if (!dragSelectionEnabled) return;

      if (displayMode === 'date' || !this.state.drag.status) {
        onChange && onChange(date);
        return;
      }
      var newRange = {
        startDate: this.state.drag.range.startDate,
        endDate: date
      };
      if (displayMode !== 'dateRange' || (0, _isSameDay2.default)(newRange.startDate, date)) {
        this.setState({ drag: { status: false, range: {} } }, function () {
          return onChange && onChange(date);
        });
      } else {
        this.setState({ drag: { status: false, range: {} } }, function () {
          updateRange && updateRange(newRange);
        });
      }
    }
  }, {
    key: 'onDragSelectionMove',
    value: function onDragSelectionMove(date) {
      var drag = this.state.drag;

      if (!drag.status || !this.props.dragSelectionEnabled) return;
      this.setState({
        drag: {
          status: drag.status,
          range: { startDate: drag.range.startDate, endDate: date },
          disablePreview: true
        }
      });
    }
  }, {
    key: 'estimateMonthSize',
    value: function estimateMonthSize(index, cache) {
      var _props6 = this.props,
          direction = _props6.direction,
          minDate = _props6.minDate;
      var scrollArea = this.state.scrollArea;

      if (cache) {
        this.listSizeCache = cache;
        if (cache[index]) return cache[index];
      }
      if (direction === 'horizontal') return scrollArea.monthWidth;
      var monthStep = (0, _addMonths2.default)(minDate, index);

      var _getMonthDisplayRange = (0, _utils.getMonthDisplayRange)(monthStep, this.dateOptions),
          start = _getMonthDisplayRange.start,
          end = _getMonthDisplayRange.end;

      var isLongMonth = (0, _differenceInDays2.default)(end, start, this.dateOptions) + 1 > 7 * 5;
      return isLongMonth ? scrollArea.longMonthHeight : scrollArea.monthHeight;
    }
  }, {
    key: 'formatDateDisplay',
    value: function formatDateDisplay(date, defaultText) {
      if (!date) return defaultText;
      return (0, _format2.default)(date, this.props.dateDisplayFormat, this.dateOptions);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props7 = this.props,
          showDateDisplay = _props7.showDateDisplay,
          onPreviewChange = _props7.onPreviewChange,
          scroll = _props7.scroll,
          direction = _props7.direction,
          disabledDates = _props7.disabledDates,
          maxDate = _props7.maxDate,
          minDate = _props7.minDate,
          rangeColors = _props7.rangeColors,
          color = _props7.color;
      var _state = this.state,
          scrollArea = _state.scrollArea,
          focusedDate = _state.focusedDate;

      var isVertical = direction === 'vertical';
      var navigatorRenderer = this.props.navigatorRenderer || this.renderMonthAndYear;

      var ranges = this.props.ranges.map(function (range, i) {
        return _extends({}, range, {
          color: range.color || rangeColors[i] || color
        });
      });
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames4.default)(this.styles.calendarWrapper, this.props.className),
          onMouseUp: function onMouseUp() {
            return _this5.setState({ drag: { status: false, range: {} } });
          },
          onMouseLeave: function onMouseLeave() {
            _this5.setState({ drag: { status: false, range: {} } });
          } },
        showDateDisplay && this.renderDateDisplay(),
        navigatorRenderer(focusedDate, this.changeShownDate, this.props),
        scroll.enabled ? _react2.default.createElement(
          'div',
          null,
          isVertical && this.renderWeekdays(this.dateOptions),
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames4.default)(this.styles.infiniteMonths, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal),
              onMouseLeave: function onMouseLeave() {
                return onPreviewChange && onPreviewChange();
              },
              style: {
                width: scrollArea.calendarWidth + 11,
                height: scrollArea.calendarHeight + 11
              },
              onScroll: this.handleScroll },
            _react2.default.createElement(_reactList2.default, {
              length: (0, _differenceInCalendarMonths2.default)((0, _endOfMonth2.default)(maxDate), (0, _addDays2.default)((0, _startOfMonth2.default)(minDate), -1), this.dateOptions),
              treshold: 500,
              type: 'variable',
              ref: function ref(target) {
                return _this5.list = target;
              },
              itemSizeEstimator: this.estimateMonthSize,
              axis: isVertical ? 'y' : 'x',
              itemRenderer: function itemRenderer(index, key) {
                var monthStep = (0, _addMonths2.default)(minDate, index);
                return _react2.default.createElement(_Month2.default, _extends({}, _this5.props, {
                  onPreviewChange: _this5.props.onPreviewChange || _this5.updatePreview,
                  preview: _this5.props.preview || _this5.state.preview,
                  ranges: ranges,
                  key: key,
                  drag: _this5.state.drag,
                  dateOptions: _this5.dateOptions,
                  disabledDates: disabledDates,
                  month: monthStep,
                  onDragSelectionStart: _this5.onDragSelectionStart,
                  onDragSelectionEnd: _this5.onDragSelectionEnd,
                  onDragSelectionMove: _this5.onDragSelectionMove,
                  onMouseLeave: function onMouseLeave() {
                    return onPreviewChange && onPreviewChange();
                  },
                  styles: _this5.styles,
                  style: isVertical ? { height: _this5.estimateMonthSize(index) } : { height: scrollArea.monthHeight, width: _this5.estimateMonthSize(index) },
                  showMonthName: true,
                  showWeekDays: !isVertical
                }));
              }
            })
          )
        ) : _react2.default.createElement(
          'div',
          {
            className: (0, _classnames4.default)(this.styles.months, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal) },
          new Array(this.props.months).fill(null).map(function (_, i) {
            var monthStep = (0, _addMonths2.default)(_this5.state.focusedDate, i);
            return _react2.default.createElement(_Month2.default, _extends({}, _this5.props, {
              onPreviewChange: _this5.props.onPreviewChange || _this5.updatePreview,
              preview: _this5.props.preview || _this5.state.preview,
              ranges: ranges,
              key: i,
              drag: _this5.state.drag,
              dateOptions: _this5.dateOptions,
              disabledDates: disabledDates,
              month: monthStep,
              onDragSelectionStart: _this5.onDragSelectionStart,
              onDragSelectionEnd: _this5.onDragSelectionEnd,
              onDragSelectionMove: _this5.onDragSelectionMove,
              onMouseLeave: function onMouseLeave() {
                return onPreviewChange && onPreviewChange();
              },
              styles: _this5.styles,
              showWeekDays: !isVertical || i === 0,
              showMonthName: !isVertical || i > 0
            }));
          })
        )
      );
    }
  }]);

  return Calendar;
}(_react.PureComponent);

Calendar.defaultProps = {
  showMonthArrow: true,
  showMonthAndYearPickers: true,
  disabledDates: [],
  classNames: {},
  locale: _enUS2.default,
  ranges: [],
  focusedRange: [0, 0],
  dateDisplayFormat: 'MMM D, YYYY',
  monthDisplayFormat: 'MMM YYYY',
  showDateDisplay: true,
  showPreview: true,
  displayMode: 'date',
  months: 1,
  color: '#3d91ff',
  scroll: {
    enabled: false
  },
  direction: 'vertical',
  maxDate: (0, _addYears2.default)(new Date(), 20),
  minDate: (0, _addYears2.default)(new Date(), -100),
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  dragSelectionEnabled: true
};

Calendar.propTypes = {
  showMonthArrow: _propTypes2.default.bool,
  showMonthAndYearPickers: _propTypes2.default.bool,
  disabledDates: _propTypes2.default.array,
  minDate: _propTypes2.default.object,
  maxDate: _propTypes2.default.object,
  date: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  onPreviewChange: _propTypes2.default.func,
  onRangeFocusChange: _propTypes2.default.func,
  classNames: _propTypes2.default.object,
  locale: _propTypes2.default.object,
  shownDate: _propTypes2.default.object,
  onShownDateChange: _propTypes2.default.func,
  ranges: _propTypes2.default.arrayOf(_DayCell.rangeShape),
  preview: _propTypes2.default.shape({
    startDate: _propTypes2.default.object,
    endDate: _propTypes2.default.object,
    color: _propTypes2.default.string
  }),
  dateDisplayFormat: _propTypes2.default.string,
  monthDisplayFormat: _propTypes2.default.string,
  focusedRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  initialFocusedRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  months: _propTypes2.default.number,
  className: _propTypes2.default.string,
  showDateDisplay: _propTypes2.default.bool,
  showPreview: _propTypes2.default.bool,
  displayMode: _propTypes2.default.oneOf(['dateRange', 'date']),
  color: _propTypes2.default.string,
  updateRange: _propTypes2.default.func,
  scroll: _propTypes2.default.shape({
    enabled: _propTypes2.default.bool,
    monthHeight: _propTypes2.default.number,
    longMonthHeight: _propTypes2.default.number,
    monthWidth: _propTypes2.default.number,
    calendarWidth: _propTypes2.default.number,
    calendarHeight: _propTypes2.default.number
  }),
  direction: _propTypes2.default.oneOf(['vertical', 'horizontal']),
  navigatorRenderer: _propTypes2.default.func,
  rangeColors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  dragSelectionEnabled: _propTypes2.default.bool
};

exports.default = Calendar;

/***/ }),

/***/ "./node_modules/react-date-range/dist/components/DateRange.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-date-range/dist/components/DateRange.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Calendar = __webpack_require__(/*! ./Calendar.js */ "./node_modules/react-date-range/dist/components/Calendar.js");

var _Calendar2 = _interopRequireDefault(_Calendar);

var _DayCell = __webpack_require__(/*! ./DayCell */ "./node_modules/react-date-range/dist/components/DayCell.js");

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/react-date-range/dist/utils.js");

var _max = __webpack_require__(/*! date-fns/max */ "./node_modules/date-fns/max/index.js");

var _max2 = _interopRequireDefault(_max);

var _isWithinInterval = __webpack_require__(/*! date-fns/isWithinInterval */ "./node_modules/date-fns/isWithinInterval/index.js");

var _isWithinInterval2 = _interopRequireDefault(_isWithinInterval);

var _min = __webpack_require__(/*! date-fns/min */ "./node_modules/date-fns/min/index.js");

var _min2 = _interopRequireDefault(_min);

var _addDays = __webpack_require__(/*! date-fns/addDays */ "./node_modules/date-fns/addDays/index.js");

var _addDays2 = _interopRequireDefault(_addDays);

var _differenceInCalendarDays = __webpack_require__(/*! date-fns/differenceInCalendarDays */ "./node_modules/date-fns/differenceInCalendarDays/index.js");

var _differenceInCalendarDays2 = _interopRequireDefault(_differenceInCalendarDays);

var _isBefore = __webpack_require__(/*! date-fns/isBefore */ "./node_modules/date-fns/isBefore/index.js");

var _isBefore2 = _interopRequireDefault(_isBefore);

var _classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = __webpack_require__(/*! ../styles */ "./node_modules/react-date-range/dist/styles.js");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRange = function (_Component) {
  _inherits(DateRange, _Component);

  function DateRange(props, context) {
    _classCallCheck(this, DateRange);

    var _this = _possibleConstructorReturn(this, (DateRange.__proto__ || Object.getPrototypeOf(DateRange)).call(this, props, context));

    _this.setSelection = _this.setSelection.bind(_this);
    _this.handleRangeFocusChange = _this.handleRangeFocusChange.bind(_this);
    _this.updatePreview = _this.updatePreview.bind(_this);
    _this.calcNewSelection = _this.calcNewSelection.bind(_this);
    _this.state = {
      focusedRange: props.initialFocusedRange || [(0, _utils.findNextRangeIndex)(props.ranges), 0],
      preview: null
    };
    _this.styles = (0, _utils.generateStyles)([_styles2.default, props.classNames]);
    return _this;
  }

  _createClass(DateRange, [{
    key: 'calcNewSelection',
    value: function calcNewSelection(value) {
      var isSingleValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var focusedRange = this.props.focusedRange || this.state.focusedRange;
      var _props = this.props,
          ranges = _props.ranges,
          onChange = _props.onChange,
          maxDate = _props.maxDate,
          moveRangeOnFirstSelection = _props.moveRangeOnFirstSelection,
          disabledDates = _props.disabledDates;

      var focusedRangeIndex = focusedRange[0];
      var selectedRange = ranges[focusedRangeIndex];
      if (!selectedRange || !onChange) return {};

      var startDate = selectedRange.startDate,
          endDate = selectedRange.endDate;

      if (!endDate) endDate = new Date(startDate);
      var nextFocusRange = void 0;
      if (!isSingleValue) {
        startDate = value.startDate;
        endDate = value.endDate;
      } else if (focusedRange[1] === 0) {
        // startDate selection
        var dayOffset = (0, _differenceInCalendarDays2.default)(endDate, startDate);
        startDate = value;
        endDate = moveRangeOnFirstSelection ? (0, _addDays2.default)(value, dayOffset) : value;
        if (maxDate) endDate = (0, _min2.default)([endDate, maxDate]);
        nextFocusRange = [focusedRange[0], 1];
      } else {
        endDate = value;
      }

      // reverse dates if startDate before endDate
      var isStartDateSelected = focusedRange[1] === 0;
      if ((0, _isBefore2.default)(endDate, startDate)) {
        isStartDateSelected = !isStartDateSelected;
        var _ref = [endDate, startDate];
        startDate = _ref[0];
        endDate = _ref[1];
      }

      var inValidDatesWithinRange = disabledDates.filter(function (disabledDate) {
        if (disabledDate instanceof Date) {
          return (0, _isWithinInterval2.default)(disabledDate, {
            start: startDate,
            end: endDate
          });
        } else {
          return (0, _isWithinInterval2.default)(disabledDate.startDate, {
            start: startDate,
            end: endDate
          }) || (0, _isWithinInterval2.default)(disabledDate.endDate, {
            start: startDate,
            end: endDate
          });
        }
      });

      if (inValidDatesWithinRange.length > 0) {
        if (isStartDateSelected) {
          startDate = (0, _addDays2.default)((0, _max2.default)(inValidDatesWithinRange.map(function (value) {
            return value instanceof Date ? value : value.endDate;
          })), 1);
        } else {
          endDate = (0, _addDays2.default)((0, _min2.default)(inValidDatesWithinRange.map(function (value) {
            return value instanceof Date ? value : value.startDate;
          })), -1);
        }
      }

      if (!nextFocusRange) {
        var nextFocusRangeIndex = (0, _utils.findNextRangeIndex)(this.props.ranges, focusedRange[0]);
        nextFocusRange = [nextFocusRangeIndex, 0];
      }
      return {
        wasValid: !(inValidDatesWithinRange.length > 0),
        range: { startDate: startDate, endDate: endDate },
        nextFocusRange: nextFocusRange
      };
    }
  }, {
    key: 'setSelection',
    value: function setSelection(value, isSingleValue) {
      var _props2 = this.props,
          onChange = _props2.onChange,
          ranges = _props2.ranges,
          onRangeFocusChange = _props2.onRangeFocusChange;

      var focusedRange = this.props.focusedRange || this.state.focusedRange;
      var focusedRangeIndex = focusedRange[0];
      var selectedRange = ranges[focusedRangeIndex];
      if (!selectedRange) return;
      var newSelection = this.calcNewSelection(value, isSingleValue);
      onChange(_defineProperty({}, selectedRange.key || 'range' + (focusedRangeIndex + 1), _extends({}, selectedRange, newSelection.range)));
      this.setState({
        focusedRange: newSelection.nextFocusRange,
        preview: null
      });

      onRangeFocusChange && onRangeFocusChange(newSelection.nextFocusRange);
    }
  }, {
    key: 'handleRangeFocusChange',
    value: function handleRangeFocusChange(focusedRange) {
      this.setState({ focusedRange: focusedRange });
      this.props.onRangeFocusChange && this.props.onRangeFocusChange(focusedRange);
    }
  }, {
    key: 'updatePreview',
    value: function updatePreview(val) {
      if (!val) {
        this.setState({ preview: null });
        return;
      }
      var _props3 = this.props,
          rangeColors = _props3.rangeColors,
          ranges = _props3.ranges;

      var focusedRange = this.props.focusedRange || this.state.focusedRange;
      var color = ranges[focusedRange[0]].color || rangeColors[focusedRange[0]] || color;
      this.setState({ preview: _extends({}, val.range, { color: color }) });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var rangeBuffer = void 0;
      var focusedRange = this.state.focusedRange;
      if (focusedRange[1] === 1 && this.props.minRangeLength) {
        rangeBuffer = {
          startDate: (0, _addDays2.default)(this.props.ranges[focusedRange[0]].startDate, 1),
          endDate: (0, _addDays2.default)(this.props.ranges[focusedRange[0]].startDate, this.props.minRangeLength)
        };
      }
      return _react2.default.createElement(_Calendar2.default, _extends({
        focusedRange: this.state.focusedRange,
        onRangeFocusChange: this.handleRangeFocusChange,
        preview: this.state.preview,
        onPreviewChange: function onPreviewChange(value) {
          _this2.updatePreview(value ? _this2.calcNewSelection(value) : null);
        },
        rangeBuffer: rangeBuffer
      }, this.props, {
        displayMode: 'dateRange',
        className: (0, _classnames2.default)(this.styles.dateRangeWrapper, this.props.className),
        onChange: this.setSelection,
        updateRange: function updateRange(val) {
          return _this2.setSelection(val, false);
        },
        ref: function ref(target) {
          _this2.calendar = target;
        }
      }));
    }
  }]);

  return DateRange;
}(_react.Component);

DateRange.defaultProps = {
  classNames: {},
  ranges: [],
  moveRangeOnFirstSelection: false,
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  disabledDates: []
};

DateRange.propTypes = _extends({}, _Calendar2.default.propTypes, {
  onChange: _propTypes2.default.func,
  onRangeFocusChange: _propTypes2.default.func,
  className: _propTypes2.default.string,
  ranges: _propTypes2.default.arrayOf(_DayCell.rangeShape),
  moveRangeOnFirstSelection: _propTypes2.default.bool
});

exports.default = DateRange;

/***/ }),

/***/ "./node_modules/react-date-range/dist/components/DateRangePicker.js":
/*!**************************************************************************!*\
  !*** ./node_modules/react-date-range/dist/components/DateRangePicker.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DateRange = __webpack_require__(/*! ./DateRange */ "./node_modules/react-date-range/dist/components/DateRange.js");

var _DateRange2 = _interopRequireDefault(_DateRange);

var _DefinedRange = __webpack_require__(/*! ./DefinedRange */ "./node_modules/react-date-range/dist/components/DefinedRange.js");

var _DefinedRange2 = _interopRequireDefault(_DefinedRange);

var _utils = __webpack_require__(/*! ../utils.js */ "./node_modules/react-date-range/dist/utils.js");

var _classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = __webpack_require__(/*! ../styles */ "./node_modules/react-date-range/dist/styles.js");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRangePicker = function (_Component) {
  _inherits(DateRangePicker, _Component);

  function DateRangePicker(props) {
    _classCallCheck(this, DateRangePicker);

    var _this = _possibleConstructorReturn(this, (DateRangePicker.__proto__ || Object.getPrototypeOf(DateRangePicker)).call(this, props));

    _this.state = {
      focusedRange: [(0, _utils.findNextRangeIndex)(props.ranges), 0]
    };
    _this.styles = (0, _utils.generateStyles)([_styles2.default, props.classNames]);
    return _this;
  }

  _createClass(DateRangePicker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var focusedRange = this.state.focusedRange;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(this.styles.dateRangePickerWrapper, this.props.className) },
        _react2.default.createElement(_DefinedRange2.default, _extends({
          focusedRange: focusedRange,
          onPreviewChange: function onPreviewChange(value) {
            return _this2.dateRange.updatePreview(value);
          }
        }, this.props, {
          range: this.props.ranges[focusedRange[0]],
          className: undefined
        })),
        _react2.default.createElement(_DateRange2.default, _extends({
          onRangeFocusChange: function onRangeFocusChange(focusedRange) {
            return _this2.setState({ focusedRange: focusedRange });
          },
          focusedRange: focusedRange
        }, this.props, {
          ref: function ref(t) {
            return _this2.dateRange = t;
          },
          className: undefined
        }))
      );
    }
  }]);

  return DateRangePicker;
}(_react.Component);

DateRangePicker.defaultProps = {};

DateRangePicker.propTypes = _extends({}, _DateRange2.default.propTypes, _DefinedRange2.default.propTypes, {
  className: _propTypes2.default.string
});

exports.default = DateRangePicker;

/***/ }),

/***/ "./node_modules/react-date-range/dist/components/DayCell.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-date-range/dist/components/DayCell.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rangeShape = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames4 = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames5 = _interopRequireDefault(_classnames4);

var _endOfDay = __webpack_require__(/*! date-fns/endOfDay */ "./node_modules/date-fns/endOfDay/index.js");

var _endOfDay2 = _interopRequireDefault(_endOfDay);

var _isBefore = __webpack_require__(/*! date-fns/isBefore */ "./node_modules/date-fns/isBefore/index.js");

var _isBefore2 = _interopRequireDefault(_isBefore);

var _isAfter = __webpack_require__(/*! date-fns/isAfter */ "./node_modules/date-fns/isAfter/index.js");

var _isAfter2 = _interopRequireDefault(_isAfter);

var _isSameDay = __webpack_require__(/*! date-fns/isSameDay */ "./node_modules/date-fns/isSameDay/index.js");

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _format = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/format/index.js");

var _format2 = _interopRequireDefault(_format);

var _startOfDay = __webpack_require__(/*! date-fns/startOfDay */ "./node_modules/date-fns/startOfDay/index.js");

var _startOfDay2 = _interopRequireDefault(_startOfDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-fallthrough */


var DayCell = function (_Component) {
  _inherits(DayCell, _Component);

  function DayCell(props, context) {
    _classCallCheck(this, DayCell);

    var _this = _possibleConstructorReturn(this, (DayCell.__proto__ || Object.getPrototypeOf(DayCell)).call(this, props, context));

    _this.state = {
      hover: false,
      active: false
    };
    _this.getClassNames = _this.getClassNames.bind(_this);
    _this.handleMouseEvent = _this.handleMouseEvent.bind(_this);
    _this.handleKeyEvent = _this.handleKeyEvent.bind(_this);
    _this.renderSelectionPlaceholders = _this.renderSelectionPlaceholders.bind(_this);
    _this.renderPreviewPlaceholder = _this.renderPreviewPlaceholder.bind(_this);
    return _this;
  }

  _createClass(DayCell, [{
    key: 'handleKeyEvent',
    value: function handleKeyEvent(event) {
      var day = this.props.day;

      switch (event.keyCode) {
        case 13: //space
        case 32:
          //enter
          if (event.type === 'keydown') {
            this.props.onMouseDown(day);
          } else {
            this.props.onMouseUp(day);
          }
          break;
      }
    }
  }, {
    key: 'handleMouseEvent',
    value: function handleMouseEvent(event) {
      var _props = this.props,
          day = _props.day,
          disabled = _props.disabled,
          onPreviewChange = _props.onPreviewChange;

      var stateChanges = {};
      if (disabled) {
        onPreviewChange(day);
        return;
      }

      switch (event.type) {
        case 'mouseenter':
          this.props.onMouseEnter(day);
          onPreviewChange(day);
          stateChanges.hover = true;
          break;
        case 'blur':
        case 'mouseleave':
          stateChanges.hover = false;
          break;
        case 'mousedown':
          stateChanges.active = true;
          this.props.onMouseDown(day);
          break;
        case 'mouseup':
          event.stopPropagation();
          stateChanges.active = false;
          this.props.onMouseUp(day);
          break;
        case 'focus':
          onPreviewChange(day);
          break;
      }
      if (Object.keys(stateChanges).length) {
        this.setState(stateChanges);
      }
    }
  }, {
    key: 'getClassNames',
    value: function getClassNames() {
      var _classnames;

      var _props2 = this.props,
          isPassive = _props2.isPassive,
          isToday = _props2.isToday,
          isWeekend = _props2.isWeekend,
          isStartOfWeek = _props2.isStartOfWeek,
          isEndOfWeek = _props2.isEndOfWeek,
          isStartOfMonth = _props2.isStartOfMonth,
          isEndOfMonth = _props2.isEndOfMonth,
          disabled = _props2.disabled,
          styles = _props2.styles;


      return (0, _classnames5.default)(styles.day, (_classnames = {}, _defineProperty(_classnames, styles.dayPassive, isPassive), _defineProperty(_classnames, styles.dayDisabled, disabled), _defineProperty(_classnames, styles.dayToday, isToday), _defineProperty(_classnames, styles.dayWeekend, isWeekend), _defineProperty(_classnames, styles.dayStartOfWeek, isStartOfWeek), _defineProperty(_classnames, styles.dayEndOfWeek, isEndOfWeek), _defineProperty(_classnames, styles.dayStartOfMonth, isStartOfMonth), _defineProperty(_classnames, styles.dayEndOfMonth, isEndOfMonth), _defineProperty(_classnames, styles.dayHovered, this.state.hover), _defineProperty(_classnames, styles.dayActive, this.state.active), _classnames));
    }
  }, {
    key: 'renderPreviewPlaceholder',
    value: function renderPreviewPlaceholder() {
      var _classnames2;

      var _props3 = this.props,
          preview = _props3.preview,
          day = _props3.day,
          styles = _props3.styles;

      if (!preview) return null;
      var startDate = preview.startDate ? (0, _endOfDay2.default)(preview.startDate) : null;
      var endDate = preview.endDate ? (0, _startOfDay2.default)(preview.endDate) : null;
      var isInRange = (!startDate || (0, _isAfter2.default)(day, startDate)) && (!endDate || (0, _isBefore2.default)(day, endDate));
      var isStartEdge = !isInRange && (0, _isSameDay2.default)(day, startDate);
      var isEndEdge = !isInRange && (0, _isSameDay2.default)(day, endDate);
      return _react2.default.createElement('span', {
        className: (0, _classnames5.default)((_classnames2 = {}, _defineProperty(_classnames2, styles.dayStartPreview, isStartEdge), _defineProperty(_classnames2, styles.dayInPreview, isInRange), _defineProperty(_classnames2, styles.dayEndPreview, isEndEdge), _classnames2)),
        style: { color: preview.color }
      });
    }
  }, {
    key: 'renderSelectionPlaceholders',
    value: function renderSelectionPlaceholders() {
      var _this2 = this;

      var _props4 = this.props,
          styles = _props4.styles,
          ranges = _props4.ranges,
          day = _props4.day;

      if (this.props.displayMode === 'date') {
        var isSelected = (0, _isSameDay2.default)(this.props.day, this.props.date);
        return isSelected ? _react2.default.createElement('span', { className: styles.selected, style: { color: this.props.color } }) : null;
      }

      var inRanges = ranges.reduce(function (result, range) {
        var startDate = range.startDate;
        var endDate = range.endDate;
        if (startDate && endDate && (0, _isBefore2.default)(endDate, startDate)) {
          var _ref = [endDate, startDate];
          startDate = _ref[0];
          endDate = _ref[1];
        }
        startDate = startDate ? (0, _endOfDay2.default)(startDate) : null;
        endDate = endDate ? (0, _startOfDay2.default)(endDate) : null;
        var isInRange = (!startDate || (0, _isAfter2.default)(day, startDate)) && (!endDate || (0, _isBefore2.default)(day, endDate));
        var isStartEdge = !isInRange && (0, _isSameDay2.default)(day, startDate);
        var isEndEdge = !isInRange && (0, _isSameDay2.default)(day, endDate);
        if (isInRange || isStartEdge || isEndEdge) {
          return [].concat(_toConsumableArray(result), [_extends({
            isStartEdge: isStartEdge,
            isEndEdge: isEndEdge,
            isInRange: isInRange
          }, range)]);
        }
        return result;
      }, []);

      return inRanges.map(function (range, i) {
        var _classnames3;

        return _react2.default.createElement('span', {
          key: i,
          className: (0, _classnames5.default)((_classnames3 = {}, _defineProperty(_classnames3, styles.startEdge, range.isStartEdge), _defineProperty(_classnames3, styles.endEdge, range.isEndEdge), _defineProperty(_classnames3, styles.inRange, range.isInRange), _classnames3)),
          style: { color: range.color || _this2.props.color }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.props.styles;

      return _react2.default.createElement(
        'button',
        _extends({
          type: 'button',
          onMouseEnter: this.handleMouseEvent,
          onMouseLeave: this.handleMouseEvent,
          onFocus: this.handleMouseEvent,
          onMouseDown: this.handleMouseEvent,
          onMouseUp: this.handleMouseEvent,
          onBlur: this.handleMouseEvent,
          onPauseCapture: this.handleMouseEvent,
          onKeyDown: this.handleKeyEvent,
          onKeyUp: this.handleKeyEvent,
          className: this.getClassNames(styles)
        }, this.props.disabled || this.props.isPassive ? { tabIndex: -1 } : {}, {
          style: { color: this.props.color } }),
        this.renderSelectionPlaceholders(),
        this.renderPreviewPlaceholder(),
        _react2.default.createElement(
          'span',
          { className: styles.dayNumber },
          _react2.default.createElement(
            'span',
            null,
            (0, _format2.default)(this.props.day, 'D')
          )
        )
      );
    }
  }]);

  return DayCell;
}(_react.Component);

DayCell.defaultProps = {};

var rangeShape = exports.rangeShape = _propTypes2.default.shape({
  startDate: _propTypes2.default.object,
  endDate: _propTypes2.default.object,
  color: _propTypes2.default.string,
  key: _propTypes2.default.string,
  autoFocus: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  showDateDisplay: _propTypes2.default.bool
});

DayCell.propTypes = {
  day: _propTypes2.default.object.isRequired,
  date: _propTypes2.default.object,
  ranges: _propTypes2.default.arrayOf(rangeShape),
  preview: _propTypes2.default.shape({
    startDate: _propTypes2.default.object,
    endDate: _propTypes2.default.object
  }),
  onPreviewChange: _propTypes2.default.func,
  previewColor: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  isPassive: _propTypes2.default.bool,
  isToday: _propTypes2.default.bool,
  isWeekend: _propTypes2.default.bool,
  isStartOfWeek: _propTypes2.default.bool,
  isEndOfWeek: _propTypes2.default.bool,
  isStartOfMonth: _propTypes2.default.bool,
  isEndOfMonth: _propTypes2.default.bool,
  color: _propTypes2.default.string,
  displayMode: _propTypes2.default.oneOf(['dateRange', 'date']),
  styles: _propTypes2.default.object,
  onMouseDown: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  onMouseEnter: _propTypes2.default.func
};

exports.default = DayCell;

/***/ }),

/***/ "./node_modules/react-date-range/dist/components/DefinedRange.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-date-range/dist/components/DefinedRange.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = __webpack_require__(/*! ../styles */ "./node_modules/react-date-range/dist/styles.js");

var _styles2 = _interopRequireDefault(_styles);

var _defaultRanges = __webpack_require__(/*! ../defaultRanges */ "./node_modules/react-date-range/dist/defaultRanges.js");

var _DayCell = __webpack_require__(/*! ./DayCell */ "./node_modules/react-date-range/dist/components/DayCell.js");

var _classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefinedRanges = function (_Component) {
  _inherits(DefinedRanges, _Component);

  function DefinedRanges(props) {
    _classCallCheck(this, DefinedRanges);

    var _this = _possibleConstructorReturn(this, (DefinedRanges.__proto__ || Object.getPrototypeOf(DefinedRanges)).call(this, props));

    _this.state = {
      rangeOffset: 0,
      focusedInput: -1
    };
    _this.handleRangeChange = _this.handleRangeChange.bind(_this);
    return _this;
  }

  _createClass(DefinedRanges, [{
    key: 'handleRangeChange',
    value: function handleRangeChange(range) {
      var _props = this.props,
          onChange = _props.onChange,
          ranges = _props.ranges,
          focusedRange = _props.focusedRange;

      var selectedRange = ranges[focusedRange[0]];
      if (!onChange || !selectedRange) return;
      onChange(_defineProperty({}, selectedRange.key || 'range' + (focusedRange[0] + 1), _extends({}, selectedRange, range)));
    }
  }, {
    key: 'getSelectedRange',
    value: function getSelectedRange(ranges, staticRange) {
      var focusedRangeIndex = ranges.findIndex(function (range) {
        if (!range.startDate || !range.endDate || range.disabled) return false;
        return staticRange.isSelected(range);
      });
      var selectedRange = ranges[focusedRangeIndex];
      return { selectedRange: selectedRange, focusedRangeIndex: focusedRangeIndex };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          onPreviewChange = _props2.onPreviewChange,
          ranges = _props2.ranges,
          renderStaticRangeLabel = _props2.renderStaticRangeLabel,
          rangeColors = _props2.rangeColors,
          className = _props2.className;


      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.definedRangesWrapper, className) },
        this.props.headerContent,
        _react2.default.createElement(
          'div',
          { className: _styles2.default.staticRanges },
          this.props.staticRanges.map(function (staticRange, i) {
            var _getSelectedRange = _this2.getSelectedRange(ranges, staticRange),
                selectedRange = _getSelectedRange.selectedRange,
                focusedRangeIndex = _getSelectedRange.focusedRangeIndex;

            var labelContent = void 0;

            if (staticRange.hasCustomRendering) {
              labelContent = renderStaticRangeLabel(staticRange);
            } else {
              labelContent = staticRange.label;
            }

            return _react2.default.createElement(
              'button',
              {
                type: 'button',
                className: (0, _classnames2.default)(_styles2.default.staticRange, _defineProperty({}, _styles2.default.staticRangeSelected, Boolean(selectedRange))),
                style: {
                  color: selectedRange ? selectedRange.color || rangeColors[focusedRangeIndex] : null
                },
                key: i,
                onClick: function onClick() {
                  return _this2.handleRangeChange(staticRange.range(_this2.props));
                },
                onFocus: function onFocus() {
                  return onPreviewChange && onPreviewChange(staticRange.range(_this2.props));
                },
                onMouseOver: function onMouseOver() {
                  return onPreviewChange && onPreviewChange(staticRange.range(_this2.props));
                },
                onMouseLeave: function onMouseLeave() {
                  _this2.props.onPreviewChange && _this2.props.onPreviewChange();
                } },
              _react2.default.createElement(
                'span',
                { tabIndex: -1, className: _styles2.default.staticRangeLabel },
                labelContent
              )
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.inputRanges },
          this.props.inputRanges.map(function (rangeOption, i) {
            return _react2.default.createElement(
              'div',
              { className: _styles2.default.inputRange, key: i },
              _react2.default.createElement('input', {
                className: _styles2.default.inputRangeInput,
                onFocus: function onFocus() {
                  return _this2.setState({ focusedInput: i, rangeOffset: 0 });
                },
                onBlur: function onBlur() {
                  return _this2.setState({ rangeOffset: 0 });
                },
                onChange: function onChange(e) {
                  var value = parseInt(e.target.value, 10);
                  value = isNaN(value) ? 0 : Math.max(Math.min(99999, value), 0);
                  _this2.handleRangeChange(rangeOption.range(value, _this2.props));
                },
                min: 0,
                max: 99999,
                value: rangeOption.getCurrentValue ? rangeOption.getCurrentValue(ranges[_this2.props.focusedRange[0]] || {}) : '-'
              }),
              _react2.default.createElement(
                'span',
                { className: _styles2.default.inputRangeLabel },
                rangeOption.label
              )
            );
          })
        ),
        this.props.footerContent
      );
    }
  }]);

  return DefinedRanges;
}(_react.Component);

DefinedRanges.propTypes = {
  inputRanges: _propTypes2.default.array,
  staticRanges: _propTypes2.default.array,
  ranges: _propTypes2.default.arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  onPreviewChange: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  footerContent: _propTypes2.default.any,
  headerContent: _propTypes2.default.any,
  rangeColors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  className: _propTypes2.default.string,
  renderStaticRangeLabel: _propTypes2.default.func
};

DefinedRanges.defaultProps = {
  inputRanges: _defaultRanges.defaultInputRanges,
  staticRanges: _defaultRanges.defaultStaticRanges,
  ranges: [],
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  focusedRange: [0, 0]
};

exports.default = DefinedRanges;

/***/ }),

/***/ "./node_modules/react-date-range/dist/components/Month.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-date-range/dist/components/Month.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DayCell = __webpack_require__(/*! ./DayCell.js */ "./node_modules/react-date-range/dist/components/DayCell.js");

var _DayCell2 = _interopRequireDefault(_DayCell);

var _eachDayOfInterval = __webpack_require__(/*! date-fns/eachDayOfInterval */ "./node_modules/date-fns/eachDayOfInterval/index.js");

var _eachDayOfInterval2 = _interopRequireDefault(_eachDayOfInterval);

var _isWithinInterval = __webpack_require__(/*! date-fns/isWithinInterval */ "./node_modules/date-fns/isWithinInterval/index.js");

var _isWithinInterval2 = _interopRequireDefault(_isWithinInterval);

var _isWeekend = __webpack_require__(/*! date-fns/isWeekend */ "./node_modules/date-fns/isWeekend/index.js");

var _isWeekend2 = _interopRequireDefault(_isWeekend);

var _isAfter = __webpack_require__(/*! date-fns/isAfter */ "./node_modules/date-fns/isAfter/index.js");

var _isAfter2 = _interopRequireDefault(_isAfter);

var _isSameDay = __webpack_require__(/*! date-fns/isSameDay */ "./node_modules/date-fns/isSameDay/index.js");

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _isBefore = __webpack_require__(/*! date-fns/isBefore */ "./node_modules/date-fns/isBefore/index.js");

var _isBefore2 = _interopRequireDefault(_isBefore);

var _endOfWeek = __webpack_require__(/*! date-fns/endOfWeek */ "./node_modules/date-fns/endOfWeek/index.js");

var _endOfWeek2 = _interopRequireDefault(_endOfWeek);

var _startOfWeek = __webpack_require__(/*! date-fns/startOfWeek */ "./node_modules/date-fns/startOfWeek/index.js");

var _startOfWeek2 = _interopRequireDefault(_startOfWeek);

var _endOfDay = __webpack_require__(/*! date-fns/endOfDay */ "./node_modules/date-fns/endOfDay/index.js");

var _endOfDay2 = _interopRequireDefault(_endOfDay);

var _startOfDay = __webpack_require__(/*! date-fns/startOfDay */ "./node_modules/date-fns/startOfDay/index.js");

var _startOfDay2 = _interopRequireDefault(_startOfDay);

var _format = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/format/index.js");

var _format2 = _interopRequireDefault(_format);

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/react-date-range/dist/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-fallthrough */


function renderWeekdays(styles, dateOptions) {
  var now = new Date();
  return _react2.default.createElement(
    'div',
    { className: styles.weekDays },
    (0, _eachDayOfInterval2.default)({
      start: (0, _startOfWeek2.default)(now, dateOptions),
      end: (0, _endOfWeek2.default)(now, dateOptions)
    }).map(function (day, i) {
      return _react2.default.createElement(
        'span',
        { className: styles.weekDay, key: i },
        (0, _format2.default)(day, 'ddd', dateOptions)
      );
    })
  );
}

var Month = function (_PureComponent) {
  _inherits(Month, _PureComponent);

  function Month() {
    _classCallCheck(this, Month);

    return _possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).apply(this, arguments));
  }

  _createClass(Month, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var now = new Date();
      var _props = this.props,
          displayMode = _props.displayMode,
          focusedRange = _props.focusedRange,
          drag = _props.drag,
          styles = _props.styles,
          disabledDates = _props.disabledDates,
          rangeBuffer = _props.rangeBuffer;

      var minDate = this.props.minDate && (0, _startOfDay2.default)(this.props.minDate);
      var maxDate = this.props.maxDate && (0, _endOfDay2.default)(this.props.maxDate);
      var monthDisplay = (0, _utils.getMonthDisplayRange)(this.props.month, this.props.dateOptions);
      var ranges = this.props.ranges;
      if (displayMode === 'dateRange' && drag.status) {
        var _drag$range = drag.range,
            startDate = _drag$range.startDate,
            endDate = _drag$range.endDate;

        ranges = ranges.map(function (range, i) {
          if (i !== focusedRange[0]) return range;
          return _extends({}, range, {
            startDate: startDate,
            endDate: endDate
          });
        });
      }
      var showPreview = this.props.showPreview && !drag.disablePreview;
      return _react2.default.createElement(
        'div',
        { className: styles.month, style: this.props.style },
        this.props.showMonthName ? _react2.default.createElement(
          'div',
          { className: styles.monthName },
          (0, _format2.default)(this.props.month, this.props.monthDisplayFormat, this.props.dateOptions)
        ) : null,
        this.props.showWeekDays && renderWeekdays(styles, this.props.dateOptions),
        _react2.default.createElement(
          'div',
          { className: styles.days, onMouseLeave: this.props.onMouseLeave },
          (0, _eachDayOfInterval2.default)({ start: monthDisplay.start, end: monthDisplay.end }).map(function (day, index) {
            var isStartOfMonth = (0, _isSameDay2.default)(day, monthDisplay.startDateOfMonth);
            var isEndOfMonth = (0, _isSameDay2.default)(day, monthDisplay.endDateOfMonth);
            var isOutsideMinMax = minDate && (0, _isBefore2.default)(day, minDate) || maxDate && (0, _isAfter2.default)(day, maxDate);
            var isDisabledSpecifically = disabledDates.some(function (disabledDate) {
              //DisabledDate can be either an object like `{startDate: new Date(), endDate: new Date()}`
              //or just `new Date()`
              if (disabledDate instanceof Date) {
                return (0, _isSameDay2.default)(disabledDate, day);
              } else {
                return (0, _isWithinInterval2.default)(day, {
                  start: disabledDate.startDate,
                  end: disabledDate.endDate
                }) || (0, _isSameDay2.default)(disabledDate.startDate, day) || (0, _isSameDay2.default)(disabledDate.endDate, day);
              }
            });
            var isBelowRangeLength = rangeBuffer && ((0, _isWithinInterval2.default)(day, {
              start: rangeBuffer.startDate,
              end: rangeBuffer.endDate
            }) || (0, _isSameDay2.default)(rangeBuffer.startDate, day) || (0, _isSameDay2.default)(rangeBuffer.endDate, day));
            return _react2.default.createElement(_DayCell2.default, _extends({}, _this2.props, {
              ranges: ranges,
              day: day,
              preview: showPreview ? _this2.props.preview : null,
              isWeekend: (0, _isWeekend2.default)(day, _this2.props.dateOptions),
              isToday: (0, _isSameDay2.default)(day, now),
              isStartOfWeek: (0, _isSameDay2.default)(day, (0, _startOfWeek2.default)(day, _this2.props.dateOptions)),
              isEndOfWeek: (0, _isSameDay2.default)(day, (0, _endOfWeek2.default)(day, _this2.props.dateOptions)),
              isStartOfMonth: isStartOfMonth,
              isEndOfMonth: isEndOfMonth,
              key: index,
              disabled: isOutsideMinMax || isDisabledSpecifically || isBelowRangeLength,
              isPassive: !(0, _isWithinInterval2.default)(day, {
                start: monthDisplay.startDateOfMonth,
                end: monthDisplay.endDateOfMonth
              }),
              styles: styles,
              onMouseDown: _this2.props.onDragSelectionStart,
              onMouseUp: _this2.props.onDragSelectionEnd,
              onMouseEnter: _this2.props.onDragSelectionMove,
              dragRange: drag.range,
              drag: drag.status
            }));
          })
        )
      );
    }
  }]);

  return Month;
}(_react.PureComponent);

Month.defaultProps = {};

Month.propTypes = {
  style: _propTypes2.default.object,
  styles: _propTypes2.default.object,
  month: _propTypes2.default.object,
  drag: _propTypes2.default.object,
  dateOptions: _propTypes2.default.object,
  disabledDates: _propTypes2.default.array,
  preview: _propTypes2.default.shape({
    startDate: _propTypes2.default.object,
    endDate: _propTypes2.default.object
  }),
  rangeBuffer: _propTypes2.default.object,
  showPreview: _propTypes2.default.bool,
  displayMode: _propTypes2.default.oneOf(['dateRange', 'date']),
  minDate: _propTypes2.default.object,
  maxDate: _propTypes2.default.object,
  ranges: _propTypes2.default.arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  onDragSelectionStart: _propTypes2.default.func,
  onDragSelectionEnd: _propTypes2.default.func,
  onDragSelectionMove: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  monthDisplayFormat: _propTypes2.default.string,
  showWeekDays: _propTypes2.default.bool,
  showMonthName: _propTypes2.default.bool
};

exports.default = Month;

/***/ }),

/***/ "./node_modules/react-date-range/dist/defaultRanges.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-date-range/dist/defaultRanges.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultInputRanges = exports.defaultStaticRanges = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createStaticRanges = createStaticRanges;

var _differenceInCalendarDays = __webpack_require__(/*! date-fns/differenceInCalendarDays */ "./node_modules/date-fns/differenceInCalendarDays/index.js");

var _differenceInCalendarDays2 = _interopRequireDefault(_differenceInCalendarDays);

var _isSameDay = __webpack_require__(/*! date-fns/isSameDay */ "./node_modules/date-fns/isSameDay/index.js");

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _endOfWeek = __webpack_require__(/*! date-fns/endOfWeek */ "./node_modules/date-fns/endOfWeek/index.js");

var _endOfWeek2 = _interopRequireDefault(_endOfWeek);

var _startOfWeek = __webpack_require__(/*! date-fns/startOfWeek */ "./node_modules/date-fns/startOfWeek/index.js");

var _startOfWeek2 = _interopRequireDefault(_startOfWeek);

var _addMonths = __webpack_require__(/*! date-fns/addMonths */ "./node_modules/date-fns/addMonths/index.js");

var _addMonths2 = _interopRequireDefault(_addMonths);

var _endOfMonth = __webpack_require__(/*! date-fns/endOfMonth */ "./node_modules/date-fns/endOfMonth/index.js");

var _endOfMonth2 = _interopRequireDefault(_endOfMonth);

var _startOfMonth = __webpack_require__(/*! date-fns/startOfMonth */ "./node_modules/date-fns/startOfMonth/index.js");

var _startOfMonth2 = _interopRequireDefault(_startOfMonth);

var _startOfDay = __webpack_require__(/*! date-fns/startOfDay */ "./node_modules/date-fns/startOfDay/index.js");

var _startOfDay2 = _interopRequireDefault(_startOfDay);

var _endOfDay = __webpack_require__(/*! date-fns/endOfDay */ "./node_modules/date-fns/endOfDay/index.js");

var _endOfDay2 = _interopRequireDefault(_endOfDay);

var _addDays = __webpack_require__(/*! date-fns/addDays */ "./node_modules/date-fns/addDays/index.js");

var _addDays2 = _interopRequireDefault(_addDays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defineds = {
  startOfWeek: (0, _startOfWeek2.default)(new Date()),
  endOfWeek: (0, _endOfWeek2.default)(new Date()),
  startOfLastWeek: (0, _startOfWeek2.default)((0, _addDays2.default)(new Date(), -7)),
  endOfLastWeek: (0, _endOfWeek2.default)((0, _addDays2.default)(new Date(), -7)),
  startOfToday: (0, _startOfDay2.default)(new Date()),
  endOfToday: (0, _endOfDay2.default)(new Date()),
  startOfYesterday: (0, _startOfDay2.default)((0, _addDays2.default)(new Date(), -1)),
  endOfYesterday: (0, _endOfDay2.default)((0, _addDays2.default)(new Date(), -1)),
  startOfMonth: (0, _startOfMonth2.default)(new Date()),
  endOfMonth: (0, _endOfMonth2.default)(new Date()),
  startOfLastMonth: (0, _startOfMonth2.default)((0, _addMonths2.default)(new Date(), -1)),
  endOfLastMonth: (0, _endOfMonth2.default)((0, _addMonths2.default)(new Date(), -1))
};

var staticRangeHandler = {
  range: {},
  isSelected: function isSelected(range) {
    var definedRange = this.range();
    return (0, _isSameDay2.default)(range.startDate, definedRange.startDate) && (0, _isSameDay2.default)(range.endDate, definedRange.endDate);
  }
};

function createStaticRanges(ranges) {
  return ranges.map(function (range) {
    return _extends({}, staticRangeHandler, range);
  });
}

var defaultStaticRanges = exports.defaultStaticRanges = createStaticRanges([{
  label: 'Today',
  range: function range() {
    return {
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday
    };
  }
}, {
  label: 'Yesterday',
  range: function range() {
    return {
      startDate: defineds.startOfYesterday,
      endDate: defineds.endOfYesterday
    };
  }
}, {
  label: 'This Week',
  range: function range() {
    return {
      startDate: defineds.startOfWeek,
      endDate: defineds.endOfWeek
    };
  }
}, {
  label: 'Last Week',
  range: function range() {
    return {
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek
    };
  }
}, {
  label: 'This Month',
  range: function range() {
    return {
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth
    };
  }
}, {
  label: 'Last Month',
  range: function range() {
    return {
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth
    };
  }
}]);

var defaultInputRanges = exports.defaultInputRanges = [{
  label: 'days up to today',
  range: function range(value) {
    return {
      startDate: (0, _addDays2.default)(defineds.startOfToday, (Math.max(Number(value), 1) - 1) * -1),
      endDate: defineds.endOfToday
    };
  },
  getCurrentValue: function getCurrentValue(range) {
    if (!(0, _isSameDay2.default)(range.endDate, defineds.endOfToday)) return '-';
    if (!range.startDate) return '∞';
    return (0, _differenceInCalendarDays2.default)(defineds.endOfToday, range.startDate) + 1;
  }
}, {
  label: 'days starting today',
  range: function range(value) {
    var today = new Date();
    return {
      startDate: today,
      endDate: (0, _addDays2.default)(today, Math.max(Number(value), 1) - 1)
    };
  },
  getCurrentValue: function getCurrentValue(range) {
    if (!(0, _isSameDay2.default)(range.startDate, defineds.startOfToday)) return '-';
    if (!range.endDate) return '∞';
    return (0, _differenceInCalendarDays2.default)(range.endDate, defineds.startOfToday) + 1;
  }
}];

/***/ }),

/***/ "./node_modules/react-date-range/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-date-range/dist/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DateRange = __webpack_require__(/*! ./components/DateRange */ "./node_modules/react-date-range/dist/components/DateRange.js");

Object.defineProperty(exports, 'DateRange', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DateRange).default;
  }
});

var _Calendar = __webpack_require__(/*! ./components/Calendar */ "./node_modules/react-date-range/dist/components/Calendar.js");

Object.defineProperty(exports, 'Calendar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Calendar).default;
  }
});

var _DateRangePicker = __webpack_require__(/*! ./components/DateRangePicker */ "./node_modules/react-date-range/dist/components/DateRangePicker.js");

Object.defineProperty(exports, 'DateRangePicker', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DateRangePicker).default;
  }
});

var _DefinedRange = __webpack_require__(/*! ./components/DefinedRange */ "./node_modules/react-date-range/dist/components/DefinedRange.js");

Object.defineProperty(exports, 'DefinedRange', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DefinedRange).default;
  }
});

var _defaultRanges = __webpack_require__(/*! ./defaultRanges */ "./node_modules/react-date-range/dist/defaultRanges.js");

Object.defineProperty(exports, 'defaultInputRanges', {
  enumerable: true,
  get: function get() {
    return _defaultRanges.defaultInputRanges;
  }
});
Object.defineProperty(exports, 'defaultStaticRanges', {
  enumerable: true,
  get: function get() {
    return _defaultRanges.defaultStaticRanges;
  }
});
Object.defineProperty(exports, 'createStaticRanges', {
  enumerable: true,
  get: function get() {
    return _defaultRanges.createStaticRanges;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/react-date-range/dist/styles.css":
/*!*******************************************************!*\
  !*** ./node_modules/react-date-range/dist/styles.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/react-date-range/dist/styles.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/react-date-range/dist/styles.js":
/*!******************************************************!*\
  !*** ./node_modules/react-date-range/dist/styles.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  dateRangeWrapper: 'rdrDateRangeWrapper',
  calendarWrapper: 'rdrCalendarWrapper',
  dateDisplay: 'rdrDateDisplay',
  dateDisplayItem: 'rdrDateDisplayItem',
  dateDisplayItemActive: 'rdrDateDisplayItemActive',
  monthAndYearWrapper: 'rdrMonthAndYearWrapper',
  monthAndYearPickers: 'rdrMonthAndYearPickers',
  nextPrevButton: 'rdrNextPrevButton',
  month: 'rdrMonth',
  weekDays: 'rdrWeekDays',
  weekDay: 'rdrWeekDay',
  days: 'rdrDays',
  day: 'rdrDay',
  dayNumber: 'rdrDayNumber',
  dayPassive: 'rdrDayPassive',
  dayToday: 'rdrDayToday',
  dayStartOfWeek: 'rdrDayStartOfWeek',
  dayEndOfWeek: 'rdrDayEndOfWeek',
  daySelected: 'rdrDaySelected',
  dayDisabled: 'rdrDayDisabled',
  dayStartOfMonth: 'rdrDayStartOfMonth',
  dayEndOfMonth: 'rdrDayEndOfMonth',
  dayWeekend: 'rdrDayWeekend',
  dayStartPreview: 'rdrDayStartPreview',
  dayInPreview: 'rdrDayInPreview',
  dayEndPreview: 'rdrDayEndPreview',
  dayHovered: 'rdrDayHovered',
  dayActive: 'rdrDayActive',
  inRange: 'rdrInRange',
  endEdge: 'rdrEndEdge',
  startEdge: 'rdrStartEdge',
  prevButton: 'rdrPprevButton',
  nextButton: 'rdrNextButton',
  selected: 'rdrSelected',
  months: 'rdrMonths',
  monthPicker: 'rdrMonthPicker',
  yearPicker: 'rdrYearPicker',
  dateDisplayWrapper: 'rdrDateDisplayWrapper',
  definedRangesWrapper: 'rdrDefinedRangesWrapper',
  staticRanges: 'rdrStaticRanges',
  staticRange: 'rdrStaticRange',
  inputRanges: 'rdrInputRanges',
  inputRange: 'rdrInputRange',
  inputRangeInput: 'rdrInputRangeInput',
  dateRangePickerWrapper: 'rdrDateRangePickerWrapper',
  staticRangeLabel: 'rdrStaticRangeLabel',
  staticRangeSelected: 'rdrStaticRangeSelected',
  monthName: 'rdrMonthName',
  infiniteMonths: 'rdrInfiniteMonths',
  monthsVertical: 'rdrMonthsVertical',
  monthsHorizontal: 'rdrMonthsHorizontal'
};

/***/ }),

/***/ "./node_modules/react-date-range/dist/theme/default.css":
/*!**************************************************************!*\
  !*** ./node_modules/react-date-range/dist/theme/default.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../css-loader/dist/cjs.js!./default.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/react-date-range/dist/theme/default.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/react-date-range/dist/utils.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-date-range/dist/utils.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcFocusDate = calcFocusDate;
exports.findNextRangeIndex = findNextRangeIndex;
exports.getMonthDisplayRange = getMonthDisplayRange;
exports.generateStyles = generateStyles;

var _classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _endOfWeek = __webpack_require__(/*! date-fns/endOfWeek */ "./node_modules/date-fns/endOfWeek/index.js");

var _endOfWeek2 = _interopRequireDefault(_endOfWeek);

var _startOfWeek = __webpack_require__(/*! date-fns/startOfWeek */ "./node_modules/date-fns/startOfWeek/index.js");

var _startOfWeek2 = _interopRequireDefault(_startOfWeek);

var _endOfMonth = __webpack_require__(/*! date-fns/endOfMonth */ "./node_modules/date-fns/endOfMonth/index.js");

var _endOfMonth2 = _interopRequireDefault(_endOfMonth);

var _startOfMonth = __webpack_require__(/*! date-fns/startOfMonth */ "./node_modules/date-fns/startOfMonth/index.js");

var _startOfMonth2 = _interopRequireDefault(_startOfMonth);

var _areIntervalsOverlapping = __webpack_require__(/*! date-fns/areIntervalsOverlapping */ "./node_modules/date-fns/areIntervalsOverlapping/index.js");

var _areIntervalsOverlapping2 = _interopRequireDefault(_areIntervalsOverlapping);

var _addMonths = __webpack_require__(/*! date-fns/addMonths */ "./node_modules/date-fns/addMonths/index.js");

var _addMonths2 = _interopRequireDefault(_addMonths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calcFocusDate(currentFocusedDate, props) {
  var shownDate = props.shownDate,
      date = props.date,
      months = props.months,
      ranges = props.ranges,
      focusedRange = props.focusedRange,
      displayMode = props.displayMode;
  // find primary date according the props

  var targetInterval = void 0;
  if (displayMode === 'dateRange') {
    var range = ranges[focusedRange[0]] || {};
    targetInterval = {
      start: range.startDate,
      end: range.endDate
    };
  } else {
    targetInterval = {
      start: date,
      end: date
    };
  }
  targetInterval.start = (0, _startOfMonth2.default)(targetInterval.start || new Date());
  targetInterval.end = (0, _endOfMonth2.default)(targetInterval.end || targetInterval.start);
  var targetDate = targetInterval.start || targetInterval.end || shownDate || new Date();

  // initial focus
  if (!currentFocusedDate) return shownDate || targetDate;

  // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;
  var currentFocusInterval = {
    start: (0, _startOfMonth2.default)(currentFocusedDate),
    end: (0, _endOfMonth2.default)((0, _addMonths2.default)(currentFocusedDate, months - 1))
  };
  if ((0, _areIntervalsOverlapping2.default)(targetInterval, currentFocusInterval)) {
    // don't change focused if new selection in view area
    return currentFocusedDate;
  }
  return targetDate;
}

function findNextRangeIndex(ranges) {
  var currentRangeIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

  var nextIndex = ranges.findIndex(function (range, i) {
    return i > currentRangeIndex && range.autoFocus !== false && !range.disabled;
  });
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(function (range) {
    return range.autoFocus !== false && !range.disabled;
  });
}

function getMonthDisplayRange(date, dateOptions) {
  var startDateOfMonth = (0, _startOfMonth2.default)(date, dateOptions);
  var endDateOfMonth = (0, _endOfMonth2.default)(date, dateOptions);
  var startDateOfCalendar = (0, _startOfWeek2.default)(startDateOfMonth, dateOptions);
  var endDateOfCalendar = (0, _endOfWeek2.default)(endDateOfMonth, dateOptions);
  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth: startDateOfMonth,
    endDateOfMonth: endDateOfMonth
  };
}

function generateStyles(sources) {
  if (!sources.length) return {};
  var generatedStyles = sources.filter(function (source) {
    return Boolean(source);
  }).reduce(function (styles, styleSource) {
    Object.keys(styleSource).forEach(function (key) {
      styles[key] = (0, _classnames2.default)(styles[key], styleSource[key]);
    });
    return styles;
  }, {});
  return generatedStyles;
}

/***/ }),

/***/ "./node_modules/react-list/react-list.js":
/*!***********************************************!*\
  !*** ./node_modules/react-list/react-list.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! react */ "./node_modules/react/index.js"), __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (_react, _propTypes) {
  "use strict";

  _react = _interopRequireWildcard(_react);
  _propTypes = _interopRequireDefault(_propTypes);

  var _class, _temp;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var CLIENT_SIZE_KEYS = {
    x: 'clientWidth',
    y: 'clientHeight'
  };
  var CLIENT_START_KEYS = {
    x: 'clientTop',
    y: 'clientLeft'
  };
  var INNER_SIZE_KEYS = {
    x: 'innerWidth',
    y: 'innerHeight'
  };
  var OFFSET_SIZE_KEYS = {
    x: 'offsetWidth',
    y: 'offsetHeight'
  };
  var OFFSET_START_KEYS = {
    x: 'offsetLeft',
    y: 'offsetTop'
  };
  var OVERFLOW_KEYS = {
    x: 'overflowX',
    y: 'overflowY'
  };
  var SCROLL_SIZE_KEYS = {
    x: 'scrollWidth',
    y: 'scrollHeight'
  };
  var SCROLL_START_KEYS = {
    x: 'scrollLeft',
    y: 'scrollTop'
  };
  var SIZE_KEYS = {
    x: 'width',
    y: 'height'
  };

  var NOOP = function NOOP() {}; // If a browser doesn't support the `options` argument to
  // add/removeEventListener, we need to check, otherwise we will
  // accidentally set `capture` with a truthy value.


  var PASSIVE = function () {
    if (typeof window === 'undefined') return false;
    var hasSupport = false;

    try {
      document.createElement('div').addEventListener('test', NOOP, {
        get passive() {
          hasSupport = true;
          return false;
        }

      });
    } catch (e) {// noop
    }

    return hasSupport;
  }() ? {
    passive: true
  } : false;
  var UNSTABLE_MESSAGE = 'ReactList failed to reach a stable state.';
  var MAX_SYNC_UPDATES = 50;

  var isEqualSubset = function isEqualSubset(a, b) {
    for (var key in b) {
      if (a[key] !== b[key]) return false;
    }

    return true;
  };

  var defaultScrollParentGetter = function defaultScrollParentGetter(component) {
    var axis = component.props.axis;
    var el = component.getEl();
    var overflowKey = OVERFLOW_KEYS[axis];

    while (el = el.parentElement) {
      switch (window.getComputedStyle(el)[overflowKey]) {
        case 'auto':
        case 'scroll':
        case 'overlay':
          return el;
      }
    }

    return window;
  };

  var defaultScrollParentViewportSizeGetter = function defaultScrollParentViewportSizeGetter(component) {
    var axis = component.props.axis;
    var scrollParent = component.scrollParent;
    return scrollParent === window ? window[INNER_SIZE_KEYS[axis]] : scrollParent[CLIENT_SIZE_KEYS[axis]];
  };

  var constrain = function constrain(props, state) {
    var length = props.length,
        minSize = props.minSize,
        type = props.type;
    var from = state.from,
        size = state.size,
        itemsPerRow = state.itemsPerRow;
    size = Math.max(size, minSize);
    var mod = size % itemsPerRow;
    if (mod) size += itemsPerRow - mod;
    if (size > length) size = length;
    from = type === 'simple' || !from ? 0 : Math.max(Math.min(from, length - size), 0);

    if (mod = from % itemsPerRow) {
      from -= mod;
      size += mod;
    }

    if (from === state.from && size == state.size) return state;
    return _objectSpread({}, state, {
      from: from,
      size: size
    });
  };

  module.exports = (_temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ReactList, _Component);

    _createClass(ReactList, null, [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        var newState = constrain(props, state);
        return newState === state ? null : newState;
      }
    }]);

    function ReactList(props) {
      var _this;

      _classCallCheck(this, ReactList);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactList).call(this, props));
      _this.state = constrain(props, {
        itemsPerRow: 1,
        from: props.initialIndex,
        size: 0
      });
      _this.cache = {};
      _this.cachedScrollPosition = null;
      _this.prevPrevState = {};
      _this.unstable = false;
      _this.updateCounter = 0;
      return _this;
    }

    _createClass(ReactList, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateFrameAndClearCache = this.updateFrameAndClearCache.bind(this);
        window.addEventListener('resize', this.updateFrameAndClearCache);
        this.updateFrame(this.scrollTo.bind(this, this.props.initialIndex));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this2 = this;

        // Viewport scroll is no longer useful if axis changes
        if (this.props.axis !== prevProps.axis) this.clearSizeCache(); // If the list has reached an unstable state, prevent an infinite loop.

        if (this.unstable) return;

        if (++this.updateCounter > MAX_SYNC_UPDATES) {
          this.unstable = true;
          return console.error(UNSTABLE_MESSAGE);
        }

        if (!this.updateCounterTimeoutId) {
          this.updateCounterTimeoutId = setTimeout(function () {
            _this2.updateCounter = 0;
            delete _this2.updateCounterTimeoutId;
          }, 0);
        }

        this.updateFrame();
      }
    }, {
      key: "maybeSetState",
      value: function maybeSetState(b, cb) {
        if (isEqualSubset(this.state, b)) return cb();
        this.setState(b, cb);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.updateFrameAndClearCache);
        this.scrollParent.removeEventListener('scroll', this.updateFrameAndClearCache, PASSIVE);
        this.scrollParent.removeEventListener('mousewheel', NOOP, PASSIVE);
      }
    }, {
      key: "getOffset",
      value: function getOffset(el) {
        var axis = this.props.axis;
        var offset = el[CLIENT_START_KEYS[axis]] || 0;
        var offsetKey = OFFSET_START_KEYS[axis];

        do {
          offset += el[offsetKey] || 0;
        } while (el = el.offsetParent);

        return offset;
      }
    }, {
      key: "getEl",
      value: function getEl() {
        return this.el || this.items;
      }
    }, {
      key: "getScrollPosition",
      value: function getScrollPosition() {
        // Cache scroll position as this causes a forced synchronous layout.
        if (typeof this.cachedScrollPosition === 'number') {
          return this.cachedScrollPosition;
        }

        var scrollParent = this.scrollParent;
        var axis = this.props.axis;
        var scrollKey = SCROLL_START_KEYS[axis];
        var actual = scrollParent === window ? // Firefox always returns document.body[scrollKey] as 0 and Chrome/Safari
        // always return document.documentElement[scrollKey] as 0, so take
        // whichever has a value.
        document.body[scrollKey] || document.documentElement[scrollKey] : scrollParent[scrollKey];
        var max = this.getScrollSize() - this.props.scrollParentViewportSizeGetter(this);
        var scroll = Math.max(0, Math.min(actual, max));
        var el = this.getEl();
        this.cachedScrollPosition = this.getOffset(scrollParent) + scroll - this.getOffset(el);
        return this.cachedScrollPosition;
      }
    }, {
      key: "setScroll",
      value: function setScroll(offset) {
        var scrollParent = this.scrollParent;
        var axis = this.props.axis;
        offset += this.getOffset(this.getEl());
        if (scrollParent === window) return window.scrollTo(0, offset);
        offset -= this.getOffset(this.scrollParent);
        scrollParent[SCROLL_START_KEYS[axis]] = offset;
      }
    }, {
      key: "getScrollSize",
      value: function getScrollSize() {
        var scrollParent = this.scrollParent;
        var _document = document,
            body = _document.body,
            documentElement = _document.documentElement;
        var key = SCROLL_SIZE_KEYS[this.props.axis];
        return scrollParent === window ? Math.max(body[key], documentElement[key]) : scrollParent[key];
      }
    }, {
      key: "hasDeterminateSize",
      value: function hasDeterminateSize() {
        var _this$props = this.props,
            itemSizeGetter = _this$props.itemSizeGetter,
            type = _this$props.type;
        return type === 'uniform' || itemSizeGetter;
      }
    }, {
      key: "getStartAndEnd",
      value: function getStartAndEnd() {
        var threshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.threshold;
        var scroll = this.getScrollPosition();
        var start = Math.max(0, scroll - threshold);
        var end = scroll + this.props.scrollParentViewportSizeGetter(this) + threshold;

        if (this.hasDeterminateSize()) {
          end = Math.min(end, this.getSpaceBefore(this.props.length));
        }

        return {
          start: start,
          end: end
        };
      }
    }, {
      key: "getItemSizeAndItemsPerRow",
      value: function getItemSizeAndItemsPerRow() {
        var _this$props2 = this.props,
            axis = _this$props2.axis,
            useStaticSize = _this$props2.useStaticSize;
        var _this$state = this.state,
            itemSize = _this$state.itemSize,
            itemsPerRow = _this$state.itemsPerRow;

        if (useStaticSize && itemSize && itemsPerRow) {
          return {
            itemSize: itemSize,
            itemsPerRow: itemsPerRow
          };
        }

        var itemEls = this.items.children;
        if (!itemEls.length) return {};
        var firstEl = itemEls[0]; // Firefox has a problem where it will return a *slightly* (less than
        // thousandths of a pixel) different size for the same element between
        // renders. This can cause an infinite render loop, so only change the
        // itemSize when it is significantly different.

        var firstElSize = firstEl[OFFSET_SIZE_KEYS[axis]];
        var delta = Math.abs(firstElSize - itemSize);
        if (isNaN(delta) || delta >= 1) itemSize = firstElSize;
        if (!itemSize) return {};
        var startKey = OFFSET_START_KEYS[axis];
        var firstStart = firstEl[startKey];
        itemsPerRow = 1;

        for (var item = itemEls[itemsPerRow]; item && item[startKey] === firstStart; item = itemEls[itemsPerRow]) {
          ++itemsPerRow;
        }

        return {
          itemSize: itemSize,
          itemsPerRow: itemsPerRow
        };
      }
    }, {
      key: "clearSizeCache",
      value: function clearSizeCache() {
        this.cachedScrollPosition = null;
      } // Called by 'scroll' and 'resize' events, clears scroll position cache.

    }, {
      key: "updateFrameAndClearCache",
      value: function updateFrameAndClearCache(cb) {
        this.clearSizeCache();
        return this.updateFrame(cb);
      }
    }, {
      key: "updateFrame",
      value: function updateFrame(cb) {
        this.updateScrollParent();
        if (typeof cb != 'function') cb = NOOP;

        switch (this.props.type) {
          case 'simple':
            return this.updateSimpleFrame(cb);

          case 'variable':
            return this.updateVariableFrame(cb);

          case 'uniform':
            return this.updateUniformFrame(cb);
        }
      }
    }, {
      key: "updateScrollParent",
      value: function updateScrollParent() {
        var prev = this.scrollParent;
        this.scrollParent = this.props.scrollParentGetter(this);
        if (prev === this.scrollParent) return;

        if (prev) {
          prev.removeEventListener('scroll', this.updateFrameAndClearCache);
          prev.removeEventListener('mousewheel', NOOP);
        } // If we have a new parent, cached parent dimensions are no longer useful.


        this.clearSizeCache();
        this.scrollParent.addEventListener('scroll', this.updateFrameAndClearCache, PASSIVE); // You have to attach mousewheel listener to the scrollable element.
        // Just an empty listener. After that onscroll events will be fired synchronously.

        this.scrollParent.addEventListener('mousewheel', NOOP, PASSIVE);
      }
    }, {
      key: "updateSimpleFrame",
      value: function updateSimpleFrame(cb) {
        var _this$getStartAndEnd = this.getStartAndEnd(),
            end = _this$getStartAndEnd.end;

        var itemEls = this.items.children;
        var elEnd = 0;

        if (itemEls.length) {
          var axis = this.props.axis;
          var firstItemEl = itemEls[0];
          var lastItemEl = itemEls[itemEls.length - 1];
          elEnd = this.getOffset(lastItemEl) + lastItemEl[OFFSET_SIZE_KEYS[axis]] - this.getOffset(firstItemEl);
        }

        if (elEnd > end) return cb();
        var _this$props3 = this.props,
            pageSize = _this$props3.pageSize,
            length = _this$props3.length;
        var size = Math.min(this.state.size + pageSize, length);
        this.maybeSetState({
          size: size
        }, cb);
      }
    }, {
      key: "updateVariableFrame",
      value: function updateVariableFrame(cb) {
        if (!this.props.itemSizeGetter) this.cacheSizes();

        var _this$getStartAndEnd2 = this.getStartAndEnd(),
            start = _this$getStartAndEnd2.start,
            end = _this$getStartAndEnd2.end;

        var _this$props4 = this.props,
            length = _this$props4.length,
            pageSize = _this$props4.pageSize;
        var space = 0;
        var from = 0;
        var size = 0;
        var maxFrom = length - 1;

        while (from < maxFrom) {
          var itemSize = this.getSizeOfItem(from);
          if (itemSize == null || space + itemSize > start) break;
          space += itemSize;
          ++from;
        }

        var maxSize = length - from;

        while (size < maxSize && space < end) {
          var _itemSize = this.getSizeOfItem(from + size);

          if (_itemSize == null) {
            size = Math.min(size + pageSize, maxSize);
            break;
          }

          space += _itemSize;
          ++size;
        }

        this.maybeSetState({
          from: from,
          size: size
        }, cb);
      }
    }, {
      key: "updateUniformFrame",
      value: function updateUniformFrame(cb) {
        var _this$getItemSizeAndI = this.getItemSizeAndItemsPerRow(),
            itemSize = _this$getItemSizeAndI.itemSize,
            itemsPerRow = _this$getItemSizeAndI.itemsPerRow;

        if (!itemSize || !itemsPerRow) return cb();

        var _this$getStartAndEnd3 = this.getStartAndEnd(),
            start = _this$getStartAndEnd3.start,
            end = _this$getStartAndEnd3.end;

        var _constrain = constrain(this.props, {
          from: Math.floor(start / itemSize) * itemsPerRow,
          size: (Math.ceil((end - start) / itemSize) + 1) * itemsPerRow,
          itemsPerRow: itemsPerRow
        }),
            from = _constrain.from,
            size = _constrain.size;

        return this.maybeSetState({
          itemsPerRow: itemsPerRow,
          from: from,
          itemSize: itemSize,
          size: size
        }, cb);
      }
    }, {
      key: "getSpaceBefore",
      value: function getSpaceBefore(index) {
        var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (cache[index] != null) return cache[index]; // Try the static itemSize.

        var _this$state2 = this.state,
            itemSize = _this$state2.itemSize,
            itemsPerRow = _this$state2.itemsPerRow;

        if (itemSize) {
          return cache[index] = Math.floor(index / itemsPerRow) * itemSize;
        } // Find the closest space to index there is a cached value for.


        var from = index;

        while (from > 0 && cache[--from] == null) {
          ;
        } // Finally, accumulate sizes of items from - index.


        var space = cache[from] || 0;

        for (var i = from; i < index; ++i) {
          cache[i] = space;

          var _itemSize2 = this.getSizeOfItem(i);

          if (_itemSize2 == null) break;
          space += _itemSize2;
        }

        return cache[index] = space;
      }
    }, {
      key: "cacheSizes",
      value: function cacheSizes() {
        var cache = this.cache;
        var from = this.state.from;
        var itemEls = this.items.children;
        var sizeKey = OFFSET_SIZE_KEYS[this.props.axis];

        for (var i = 0, l = itemEls.length; i < l; ++i) {
          cache[from + i] = itemEls[i][sizeKey];
        }
      }
    }, {
      key: "getSizeOfItem",
      value: function getSizeOfItem(index) {
        var cache = this.cache,
            items = this.items;
        var _this$props5 = this.props,
            axis = _this$props5.axis,
            itemSizeGetter = _this$props5.itemSizeGetter,
            itemSizeEstimator = _this$props5.itemSizeEstimator,
            type = _this$props5.type;
        var _this$state3 = this.state,
            from = _this$state3.from,
            itemSize = _this$state3.itemSize,
            size = _this$state3.size; // Try the static itemSize.

        if (itemSize) return itemSize; // Try the itemSizeGetter.

        if (itemSizeGetter) return itemSizeGetter(index); // Try the cache.

        if (index in cache) return cache[index]; // Try the DOM.

        if (type === 'simple' && index >= from && index < from + size && items) {
          var itemEl = items.children[index - from];
          if (itemEl) return itemEl[OFFSET_SIZE_KEYS[axis]];
        } // Try the itemSizeEstimator.


        if (itemSizeEstimator) return itemSizeEstimator(index, cache);
      }
    }, {
      key: "scrollTo",
      value: function scrollTo(index) {
        if (index != null) this.setScroll(this.getSpaceBefore(index));
      }
    }, {
      key: "scrollAround",
      value: function scrollAround(index) {
        var current = this.getScrollPosition();
        var bottom = this.getSpaceBefore(index);
        var top = bottom - this.props.scrollParentViewportSizeGetter(this) + this.getSizeOfItem(index);
        var min = Math.min(top, bottom);
        var max = Math.max(top, bottom);
        if (current <= min) return this.setScroll(min);
        if (current > max) return this.setScroll(max);
      }
    }, {
      key: "getVisibleRange",
      value: function getVisibleRange() {
        var _this$state4 = this.state,
            from = _this$state4.from,
            size = _this$state4.size;

        var _this$getStartAndEnd4 = this.getStartAndEnd(0),
            start = _this$getStartAndEnd4.start,
            end = _this$getStartAndEnd4.end;

        var cache = {};
        var first, last;

        for (var i = from; i < from + size; ++i) {
          var itemStart = this.getSpaceBefore(i, cache);
          var itemEnd = itemStart + this.getSizeOfItem(i);
          if (first == null && itemEnd > start) first = i;
          if (first != null && itemStart < end) last = i;
        }

        return [first, last];
      }
    }, {
      key: "renderItems",
      value: function renderItems() {
        var _this3 = this;

        var _this$props6 = this.props,
            itemRenderer = _this$props6.itemRenderer,
            itemsRenderer = _this$props6.itemsRenderer;
        var _this$state5 = this.state,
            from = _this$state5.from,
            size = _this$state5.size;
        var items = [];

        for (var i = 0; i < size; ++i) {
          items.push(itemRenderer(from + i, i));
        }

        return itemsRenderer(items, function (c) {
          return _this3.items = c;
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var _this$props7 = this.props,
            axis = _this$props7.axis,
            length = _this$props7.length,
            type = _this$props7.type,
            useTranslate3d = _this$props7.useTranslate3d;
        var _this$state6 = this.state,
            from = _this$state6.from,
            itemsPerRow = _this$state6.itemsPerRow;
        var items = this.renderItems();
        if (type === 'simple') return items;
        var style = {
          position: 'relative'
        };
        var cache = {};
        var bottom = Math.ceil(length / itemsPerRow) * itemsPerRow;
        var size = this.getSpaceBefore(bottom, cache);

        if (size) {
          style[SIZE_KEYS[axis]] = size;
          if (axis === 'x') style.overflowX = 'hidden';
        }

        var offset = this.getSpaceBefore(from, cache);
        var x = axis === 'x' ? offset : 0;
        var y = axis === 'y' ? offset : 0;
        var transform = useTranslate3d ? "translate3d(".concat(x, "px, ").concat(y, "px, 0)") : "translate(".concat(x, "px, ").concat(y, "px)");
        var listStyle = {
          msTransform: transform,
          WebkitTransform: transform,
          transform: transform
        };
        return _react["default"].createElement("div", {
          style: style,
          ref: function ref(c) {
            return _this4.el = c;
          }
        }, _react["default"].createElement("div", {
          style: listStyle
        }, items));
      }
    }]);

    return ReactList;
  }(_react.Component), _defineProperty(_class, "displayName", 'ReactList'), _defineProperty(_class, "propTypes", {
    axis: _propTypes["default"].oneOf(['x', 'y']),
    initialIndex: _propTypes["default"].number,
    itemRenderer: _propTypes["default"].func,
    itemSizeEstimator: _propTypes["default"].func,
    itemSizeGetter: _propTypes["default"].func,
    itemsRenderer: _propTypes["default"].func,
    length: _propTypes["default"].number,
    minSize: _propTypes["default"].number,
    pageSize: _propTypes["default"].number,
    scrollParentGetter: _propTypes["default"].func,
    scrollParentViewportSizeGetter: _propTypes["default"].func,
    threshold: _propTypes["default"].number,
    type: _propTypes["default"].oneOf(['simple', 'variable', 'uniform']),
    useStaticSize: _propTypes["default"].bool,
    useTranslate3d: _propTypes["default"].bool
  }), _defineProperty(_class, "defaultProps", {
    axis: 'y',
    itemRenderer: function itemRenderer(index, key) {
      return _react["default"].createElement("div", {
        key: key
      }, index);
    },
    itemsRenderer: function itemsRenderer(items, ref) {
      return _react["default"].createElement("div", {
        ref: ref
      }, items);
    },
    length: 0,
    minSize: 1,
    pageSize: 10,
    scrollParentGetter: defaultScrollParentGetter,
    scrollParentViewportSizeGetter: defaultScrollParentViewportSizeGetter,
    threshold: 100,
    type: 'simple',
    useStaticSize: false,
    useTranslate3d: false
  }), _temp);
});


/***/ })

}]);
//# sourceMappingURL=0.chunk.js.map