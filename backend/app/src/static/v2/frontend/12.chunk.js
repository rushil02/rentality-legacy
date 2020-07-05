(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@restart/context/mapContextToProps.js":
/*!************************************************************!*\
  !*** ./node_modules/@restart/context/mapContextToProps.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = mapContextToProps;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _forwardRef = _interopRequireDefault(__webpack_require__(/*! ./forwardRef */ "./node_modules/@restart/context/forwardRef.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getDisplayName = function getDisplayName(Component) {
  var name = typeof Component === 'string' ? Component : Component.name || Component.displayName;
  return name ? "ContextTransform(" + name + ")" : 'ContextTransform';
};

var ensureConsumer = function ensureConsumer(c) {
  return c.Consumer || c;
};

function $mapContextToProps(_ref, Component) {
  var maybeArrayOfConsumers = _ref.consumers,
      mapToProps = _ref.mapToProps,
      displayName = _ref.displayName,
      _ref$forwardRefAs = _ref.forwardRefAs,
      forwardRefAs = _ref$forwardRefAs === void 0 ? 'ref' : _ref$forwardRefAs;
  var consumers = maybeArrayOfConsumers;

  if (!Array.isArray(maybeArrayOfConsumers)) {
    consumers = [maybeArrayOfConsumers];
  }

  var SingleConsumer = ensureConsumer(consumers[0]);

  function singleRender(props, ref) {
    var _extends2;

    var propsWithRef = _extends((_extends2 = {}, _extends2[forwardRefAs] = ref, _extends2), props);

    return _react.default.createElement(SingleConsumer, null, function (value) {
      return _react.default.createElement(Component, _extends({}, propsWithRef, mapToProps(value, props)));
    });
  }

  function multiRender(props, ref) {
    var _extends3;

    var propsWithRef = _extends((_extends3 = {}, _extends3[forwardRefAs] = ref, _extends3), props);

    return consumers.reduceRight(function (inner, Context) {
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var Consumer = ensureConsumer(Context);
        return _react.default.createElement(Consumer, null, function (value) {
          return inner.apply(void 0, args.concat([value]));
        });
      };
    }, function () {
      for (var _len2 = arguments.length, contexts = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        contexts[_key2] = arguments[_key2];
      }

      return _react.default.createElement(Component, _extends({}, propsWithRef, mapToProps.apply(void 0, contexts.concat([props]))));
    })();
  }

  var contextTransform = consumers.length === 1 ? singleRender : multiRender;
  return (0, _forwardRef.default)(contextTransform, {
    displayName: displayName || getDisplayName(Component)
  });
}

function mapContextToProps(maybeOpts, mapToProps, Component) {
  if (arguments.length === 2) return $mapContextToProps(maybeOpts, mapToProps);
  return $mapContextToProps({
    consumers: maybeOpts,
    mapToProps: mapToProps
  }, Component);
}

/***/ }),

/***/ "./node_modules/create-react-context/lib/implementation.js":
/*!*****************************************************************!*\
  !*** ./node_modules/create-react-context/lib/implementation.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _gud = __webpack_require__(/*! gud */ "./node_modules/gud/index.js");

var _gud2 = _interopRequireDefault(_gud);

var _warning = __webpack_require__(/*! fbjs/lib/warning */ "./node_modules/fbjs/lib/warning.js");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_SIGNED_31_BIT_INT = 1073741823;

// Inlined Object.is polyfill.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function objectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function createEventEmitter(value) {
  var handlers = [];
  return {
    on: function on(handler) {
      handlers.push(handler);
    },
    off: function off(handler) {
      handlers = handlers.filter(function (h) {
        return h !== handler;
      });
    },
    get: function get() {
      return value;
    },
    set: function set(newValue, changedBits) {
      value = newValue;
      handlers.forEach(function (handler) {
        return handler(value, changedBits);
      });
    }
  };
}

function onlyChild(children) {
  return Array.isArray(children) ? children[0] : children;
}

function createReactContext(defaultValue, calculateChangedBits) {
  var _Provider$childContex, _Consumer$contextType;

  var contextProp = '__create-react-context-' + (0, _gud2.default)() + '__';

  var Provider = function (_Component) {
    _inherits(Provider, _Component);

    function Provider() {
      var _temp, _this, _ret;

      _classCallCheck(this, Provider);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.emitter = createEventEmitter(_this.props.value), _temp), _possibleConstructorReturn(_this, _ret);
    }

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[contextProp] = this.emitter, _ref;
    };

    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        var oldValue = this.props.value;
        var newValue = nextProps.value;
        var changedBits = void 0;

        if (objectIs(oldValue, newValue)) {
          changedBits = 0; // No change
        } else {
          changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;
          if (true) {
            (0, _warning2.default)((changedBits & MAX_SIGNED_31_BIT_INT) === changedBits, 'calculateChangedBits: Expected the return value to be a ' + '31-bit integer. Instead received: %s', changedBits);
          }

          changedBits |= 0;

          if (changedBits !== 0) {
            this.emitter.set(nextProps.value, changedBits);
          }
        }
      }
    };

    Provider.prototype.render = function render() {
      return this.props.children;
    };

    return Provider;
  }(_react.Component);

  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = _propTypes2.default.object.isRequired, _Provider$childContex);

  var Consumer = function (_Component2) {
    _inherits(Consumer, _Component2);

    function Consumer() {
      var _temp2, _this2, _ret2;

      _classCallCheck(this, Consumer);

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _Component2.call.apply(_Component2, [this].concat(args))), _this2), _this2.state = {
        value: _this2.getValue()
      }, _this2.onUpdate = function (newValue, changedBits) {
        var observedBits = _this2.observedBits | 0;
        if ((observedBits & changedBits) !== 0) {
          _this2.setState({ value: _this2.getValue() });
        }
      }, _temp2), _possibleConstructorReturn(_this2, _ret2);
    }

    Consumer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var observedBits = nextProps.observedBits;

      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
      : observedBits;
    };

    Consumer.prototype.componentDidMount = function componentDidMount() {
      if (this.context[contextProp]) {
        this.context[contextProp].on(this.onUpdate);
      }
      var observedBits = this.props.observedBits;

      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default
      : observedBits;
    };

    Consumer.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this.context[contextProp]) {
        this.context[contextProp].off(this.onUpdate);
      }
    };

    Consumer.prototype.getValue = function getValue() {
      if (this.context[contextProp]) {
        return this.context[contextProp].get();
      } else {
        return defaultValue;
      }
    };

    Consumer.prototype.render = function render() {
      return onlyChild(this.props.children)(this.state.value);
    };

    return Consumer;
  }(_react.Component);

  Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = _propTypes2.default.object, _Consumer$contextType);


  return {
    Provider: Provider,
    Consumer: Consumer
  };
}

exports.default = createReactContext;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/create-react-context/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/create-react-context/lib/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _implementation = __webpack_require__(/*! ./implementation */ "./node_modules/create-react-context/lib/implementation.js");

var _implementation2 = _interopRequireDefault(_implementation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createContext || _implementation2.default;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/dom-helpers/query/matches.js":
/*!***************************************************!*\
  !*** ./node_modules/dom-helpers/query/matches.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = matches;

var _inDOM = _interopRequireDefault(__webpack_require__(/*! ../util/inDOM */ "./node_modules/dom-helpers/util/inDOM.js"));

var _querySelectorAll = _interopRequireDefault(__webpack_require__(/*! ./querySelectorAll */ "./node_modules/dom-helpers/query/querySelectorAll.js"));

var matchesCache;

function matches(node, selector) {
  if (!matchesCache && _inDOM.default) {
    var body = document.body;
    var nativeMatch = body.matches || body.matchesSelector || body.webkitMatchesSelector || body.mozMatchesSelector || body.msMatchesSelector;
    matchesCache = nativeMatch ? function (node, selector) {
      return nativeMatch.call(node, selector);
    } : ie8MatchesSelector;
  }

  return matchesCache ? matchesCache(node, selector) : null;
}

function ie8MatchesSelector(node, selector) {
  var matches = (0, _querySelectorAll.default)(node.document || node.ownerDocument, selector),
      i = 0;

  while (matches[i] && matches[i] !== node) {
    i++;
  }

  return !!matches[i];
}

module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/dom-helpers/transition/index.js":
/*!******************************************************!*\
  !*** ./node_modules/dom-helpers/transition/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = void 0;

var _end = _interopRequireDefault(__webpack_require__(/*! ./end */ "./node_modules/dom-helpers/transition/end.js"));

exports.end = _end.default;

var _properties = _interopRequireDefault(__webpack_require__(/*! ./properties */ "./node_modules/dom-helpers/transition/properties.js"));

exports.properties = _properties.default;
var _default = {
  end: _end.default,
  properties: _properties.default
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/enquire.js/src/MediaQuery.js":
/*!***************************************************!*\
  !*** ./node_modules/enquire.js/src/MediaQuery.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var QueryHandler = __webpack_require__(/*! ./QueryHandler */ "./node_modules/enquire.js/src/QueryHandler.js");
var each = __webpack_require__(/*! ./Util */ "./node_modules/enquire.js/src/Util.js").each;

/**
 * Represents a single media query, manages it's state and registered handlers for this query
 *
 * @constructor
 * @param {string} query the media query string
 * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
 */
function MediaQuery(query, isUnconditional) {
    this.query = query;
    this.isUnconditional = isUnconditional;
    this.handlers = [];
    this.mql = window.matchMedia(query);

    var self = this;
    this.listener = function(mql) {
        // Chrome passes an MediaQueryListEvent object, while other browsers pass MediaQueryList directly
        self.mql = mql.currentTarget || mql;
        self.assess();
    };
    this.mql.addListener(this.listener);
}

MediaQuery.prototype = {

    constuctor : MediaQuery,

    /**
     * add a handler for this query, triggering if already active
     *
     * @param {object} handler
     * @param {function} handler.match callback for when query is activated
     * @param {function} [handler.unmatch] callback for when query is deactivated
     * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
     * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
     */
    addHandler : function(handler) {
        var qh = new QueryHandler(handler);
        this.handlers.push(qh);

        this.matches() && qh.on();
    },

    /**
     * removes the given handler from the collection, and calls it's destroy methods
     *
     * @param {object || function} handler the handler to remove
     */
    removeHandler : function(handler) {
        var handlers = this.handlers;
        each(handlers, function(h, i) {
            if(h.equals(handler)) {
                h.destroy();
                return !handlers.splice(i,1); //remove from array and exit each early
            }
        });
    },

    /**
     * Determine whether the media query should be considered a match
     *
     * @return {Boolean} true if media query can be considered a match, false otherwise
     */
    matches : function() {
        return this.mql.matches || this.isUnconditional;
    },

    /**
     * Clears all handlers and unbinds events
     */
    clear : function() {
        each(this.handlers, function(handler) {
            handler.destroy();
        });
        this.mql.removeListener(this.listener);
        this.handlers.length = 0; //clear array
    },

    /*
        * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
        */
    assess : function() {
        var action = this.matches() ? 'on' : 'off';

        each(this.handlers, function(handler) {
            handler[action]();
        });
    }
};

module.exports = MediaQuery;


/***/ }),

/***/ "./node_modules/enquire.js/src/MediaQueryDispatch.js":
/*!***********************************************************!*\
  !*** ./node_modules/enquire.js/src/MediaQueryDispatch.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MediaQuery = __webpack_require__(/*! ./MediaQuery */ "./node_modules/enquire.js/src/MediaQuery.js");
var Util = __webpack_require__(/*! ./Util */ "./node_modules/enquire.js/src/Util.js");
var each = Util.each;
var isFunction = Util.isFunction;
var isArray = Util.isArray;

/**
 * Allows for registration of query handlers.
 * Manages the query handler's state and is responsible for wiring up browser events
 *
 * @constructor
 */
function MediaQueryDispatch () {
    if(!window.matchMedia) {
        throw new Error('matchMedia not present, legacy browsers require a polyfill');
    }

    this.queries = {};
    this.browserIsIncapable = !window.matchMedia('only all').matches;
}

MediaQueryDispatch.prototype = {

    constructor : MediaQueryDispatch,

    /**
     * Registers a handler for the given media query
     *
     * @param {string} q the media query
     * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
     * @param {function} options.match fired when query matched
     * @param {function} [options.unmatch] fired when a query is no longer matched
     * @param {function} [options.setup] fired when handler first triggered
     * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
     * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
     */
    register : function(q, options, shouldDegrade) {
        var queries         = this.queries,
            isUnconditional = shouldDegrade && this.browserIsIncapable;

        if(!queries[q]) {
            queries[q] = new MediaQuery(q, isUnconditional);
        }

        //normalise to object in an array
        if(isFunction(options)) {
            options = { match : options };
        }
        if(!isArray(options)) {
            options = [options];
        }
        each(options, function(handler) {
            if (isFunction(handler)) {
                handler = { match : handler };
            }
            queries[q].addHandler(handler);
        });

        return this;
    },

    /**
     * unregisters a query and all it's handlers, or a specific handler for a query
     *
     * @param {string} q the media query to target
     * @param {object || function} [handler] specific handler to unregister
     */
    unregister : function(q, handler) {
        var query = this.queries[q];

        if(query) {
            if(handler) {
                query.removeHandler(handler);
            }
            else {
                query.clear();
                delete this.queries[q];
            }
        }

        return this;
    }
};

module.exports = MediaQueryDispatch;


/***/ }),

/***/ "./node_modules/enquire.js/src/QueryHandler.js":
/*!*****************************************************!*\
  !*** ./node_modules/enquire.js/src/QueryHandler.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Delegate to handle a media query being matched and unmatched.
 *
 * @param {object} options
 * @param {function} options.match callback for when the media query is matched
 * @param {function} [options.unmatch] callback for when the media query is unmatched
 * @param {function} [options.setup] one-time callback triggered the first time a query is matched
 * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
 * @constructor
 */
function QueryHandler(options) {
    this.options = options;
    !options.deferSetup && this.setup();
}

QueryHandler.prototype = {

    constructor : QueryHandler,

    /**
     * coordinates setup of the handler
     *
     * @function
     */
    setup : function() {
        if(this.options.setup) {
            this.options.setup();
        }
        this.initialised = true;
    },

    /**
     * coordinates setup and triggering of the handler
     *
     * @function
     */
    on : function() {
        !this.initialised && this.setup();
        this.options.match && this.options.match();
    },

    /**
     * coordinates the unmatch event for the handler
     *
     * @function
     */
    off : function() {
        this.options.unmatch && this.options.unmatch();
    },

    /**
     * called when a handler is to be destroyed.
     * delegates to the destroy or unmatch callbacks, depending on availability.
     *
     * @function
     */
    destroy : function() {
        this.options.destroy ? this.options.destroy() : this.off();
    },

    /**
     * determines equality by reference.
     * if object is supplied compare options, if function, compare match callback
     *
     * @function
     * @param {object || function} [target] the target for comparison
     */
    equals : function(target) {
        return this.options === target || this.options.match === target;
    }

};

module.exports = QueryHandler;


/***/ }),

/***/ "./node_modules/enquire.js/src/Util.js":
/*!*********************************************!*\
  !*** ./node_modules/enquire.js/src/Util.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helper function for iterating over a collection
 *
 * @param collection
 * @param fn
 */
function each(collection, fn) {
    var i      = 0,
        length = collection.length,
        cont;

    for(i; i < length; i++) {
        cont = fn(collection[i], i);
        if(cont === false) {
            break; //allow early exit
        }
    }
}

/**
 * Helper function for determining whether target object is an array
 *
 * @param target the object under test
 * @return {Boolean} true if array, false otherwise
 */
function isArray(target) {
    return Object.prototype.toString.apply(target) === '[object Array]';
}

/**
 * Helper function for determining whether target object is a function
 *
 * @param target the object under test
 * @return {Boolean} true if function, false otherwise
 */
function isFunction(target) {
    return typeof target === 'function';
}

module.exports = {
    isFunction : isFunction,
    isArray : isArray,
    each : each
};


/***/ }),

/***/ "./node_modules/enquire.js/src/index.js":
/*!**********************************************!*\
  !*** ./node_modules/enquire.js/src/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MediaQueryDispatch = __webpack_require__(/*! ./MediaQueryDispatch */ "./node_modules/enquire.js/src/MediaQueryDispatch.js");
module.exports = new MediaQueryDispatch();


/***/ }),

/***/ "./node_modules/fbjs/lib/emptyFunction.js":
/*!************************************************!*\
  !*** ./node_modules/fbjs/lib/emptyFunction.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ "./node_modules/fbjs/lib/warning.js":
/*!******************************************!*\
  !*** ./node_modules/fbjs/lib/warning.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(/*! ./emptyFunction */ "./node_modules/fbjs/lib/emptyFunction.js");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),

/***/ "./node_modules/gud/index.js":
/*!***********************************!*\
  !*** ./node_modules/gud/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {// @flow


var key = '__global_unique_id__';

module.exports = function() {
  return global[key] = (global[key] || 0) + 1;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/json2mq/index.js":
/*!***************************************!*\
  !*** ./node_modules/json2mq/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var camel2hyphen = __webpack_require__(/*! string-convert/camel2hyphen */ "./node_modules/string-convert/camel2hyphen.js");

var isDimension = function (feature) {
  var re = /[height|width]$/;
  return re.test(feature);
};

var obj2mq = function (obj) {
  var mq = '';
  var features = Object.keys(obj);
  features.forEach(function (feature, index) {
    var value = obj[feature];
    feature = camel2hyphen(feature);
    // Add px to dimension features
    if (isDimension(feature) && typeof value === 'number') {
      value = value + 'px';
    }
    if (value === true) {
      mq += feature;
    } else if (value === false) {
      mq += 'not ' + feature;
    } else {
      mq += '(' + feature + ': ' + value + ')';
    }
    if (index < features.length-1) {
      mq += ' and '
    }
  });
  return mq;
};

var json2mq = function (query) {
  var mq = '';
  if (typeof query === 'string') {
    return query;
  }
  // Handling array of media queries
  if (query instanceof Array) {
    query.forEach(function (q, index) {
      mq += obj2mq(q);
      if (index < query.length-1) {
        mq += ', '
      }
    });
    return mq;
  }
  // Handling single media query
  return obj2mq(query);
};

module.exports = json2mq;

/***/ }),

/***/ "./node_modules/lodash.debounce/index.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash.debounce/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/popper.js/dist/esm/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/popper.js/dist/esm/popper.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.15.0
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

/* harmony default export */ __webpack_exports__["default"] = (Popper);
//# sourceMappingURL=popper.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/prop-types-extra/lib/all.js":
/*!**************************************************!*\
  !*** ./node_modules/prop-types-extra/lib/all.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = all;

var _createChainableTypeChecker = __webpack_require__(/*! ./utils/createChainableTypeChecker */ "./node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js");

var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function all() {
  for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  function allPropTypes() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var error = null;

    validators.forEach(function (validator) {
      if (error != null) {
        return;
      }

      var result = validator.apply(undefined, args);
      if (result != null) {
        error = result;
      }
    });

    return error;
  }

  return (0, _createChainableTypeChecker2.default)(allPropTypes);
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/prop-types-extra/lib/isRequiredForA11y.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types-extra/lib/isRequiredForA11y.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRequiredForA11y;
function isRequiredForA11y(validator) {
  return function validate(props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      return new Error('The ' + location + ' `' + propFullNameSafe + '` is required to make ' + ('`' + componentNameSafe + '` accessible for users of assistive ') + 'technologies such as screen readers.');
    }

    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      args[_key - 5] = arguments[_key];
    }

    return validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
  };
}
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/react-bootstrap/es/AbstractNav.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/AbstractNav.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dom-helpers/query/querySelectorAll */ "./node_modules/dom-helpers/query/querySelectorAll.js");
/* harmony import */ var dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _restart_context_mapContextToProps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @restart/context/mapContextToProps */ "./node_modules/@restart/context/mapContextToProps.js");
/* harmony import */ var _restart_context_mapContextToProps__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_restart_context_mapContextToProps__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/es/SelectableContext.js");
/* harmony import */ var _NavContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NavContext */ "./node_modules/react-bootstrap/es/NavContext.js");
/* harmony import */ var _TabContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TabContext */ "./node_modules/react-bootstrap/es/TabContext.js");










var noop = function noop() {};

var AbstractNav =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(AbstractNav, _React$Component);

  function AbstractNav() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleSelect = function (key, event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          parentOnSelect = _this$props.parentOnSelect;
      if (key == null) return;
      if (onSelect) onSelect(key, event);
      if (parentOnSelect) parentOnSelect(key, event);
    };

    _this.handleKeyDown = function (event) {
      var onKeyDown = _this.props.onKeyDown;
      if (onKeyDown) onKeyDown(event);
      var nextActiveChild;

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          nextActiveChild = _this.getNextActiveChild(-1);
          break;

        case 'ArrowRight':
        case 'ArrowDown':
          nextActiveChild = _this.getNextActiveChild(1);
          break;

        default:
          return;
      }

      if (!nextActiveChild) return;
      event.preventDefault();

      _this.handleSelect(nextActiveChild.dataset.rbEventKey, event);

      _this._needsRefocus = true;
    };

    _this.attachRef = function (ref) {
      _this.listNode = ref;
    };

    _this.state = {
      navContext: null
    };
    return _this;
  }

  AbstractNav.getDerivedStateFromProps = function getDerivedStateFromProps(_ref) {
    var activeKey = _ref.activeKey,
        getControlledId = _ref.getControlledId,
        getControllerId = _ref.getControllerId,
        role = _ref.role;
    return {
      navContext: {
        role: role,
        // used by NavLink to determine it's role
        activeKey: Object(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["makeEventKey"])(activeKey),
        getControlledId: getControlledId || noop,
        getControllerId: getControllerId || noop
      }
    };
  };

  var _proto = AbstractNav.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (!this._needsRefocus || !this.listNode) return;
    var activeChild = this.listNode.querySelector('[data-rb-event-key].active');
    if (activeChild) activeChild.focus();
  };

  _proto.getNextActiveChild = function getNextActiveChild(offset) {
    if (!this.listNode) return null;
    var items = dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_4___default()(this.listNode, '[data-rb-event-key]:not(.disabled)');
    var activeChild = this.listNode.querySelector('.active');
    var index = items.indexOf(activeChild);
    if (index === -1) return null;
    var nextIndex = index + offset;
    if (nextIndex >= items.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = items.length - 1;
    return items[nextIndex];
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        _this$props2$as = _this$props2.as,
        Component = _this$props2$as === void 0 ? 'ul' : _this$props2$as,
        _ = _this$props2.onSelect,
        _0 = _this$props2.parentOnSelect,
        _1 = _this$props2.getControlledId,
        _2 = _this$props2.getControllerId,
        _3 = _this$props2.activeKey,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props2, ["as", "onSelect", "parentOnSelect", "getControlledId", "getControllerId", "activeKey"]);

    if (props.role === 'tablist') {
      props.onKeyDown = this.handleKeyDown;
    }

    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
      value: this.handleSelect
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_NavContext__WEBPACK_IMPORTED_MODULE_7__["default"].Provider, {
      value: this.state.navContext
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      onKeyDown: this.handleKeyDown,
      ref: this.attachRef
    }))));
  };

  return AbstractNav;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (_restart_context_mapContextToProps__WEBPACK_IMPORTED_MODULE_5___default()([_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["default"], _TabContext__WEBPACK_IMPORTED_MODULE_8__["default"]], function (parentOnSelect, tabContext, _ref2) {
  var role = _ref2.role;
  if (!tabContext) return {
    parentOnSelect: parentOnSelect
  };
  var activeKey = tabContext.activeKey,
      getControllerId = tabContext.getControllerId,
      getControlledId = tabContext.getControlledId;
  return {
    activeKey: activeKey,
    parentOnSelect: parentOnSelect,
    role: role || 'tablist',
    // pass these two through to avoid having to listen to
    // both Tab and Nav contexts in NavLink
    getControllerId: getControllerId,
    getControlledId: getControlledId
  };
}, AbstractNav));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/AbstractNavItem.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/AbstractNavItem.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _NavContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NavContext */ "./node_modules/react-bootstrap/es/NavContext.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/es/SelectableContext.js");







var defaultProps = {
  disabled: false
};
var AbstractNavItem = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var active = _ref.active,
      className = _ref.className,
      tabIndex = _ref.tabIndex,
      eventKey = _ref.eventKey,
      onSelect = _ref.onSelect,
      onClick = _ref.onClick,
      Component = _ref.as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["active", "className", "tabIndex", "eventKey", "onSelect", "onClick", "as"]);

  var navKey = Object(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["makeEventKey"])(eventKey, props.href);
  var parentOnSelect = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["default"]);
  var navContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_NavContext__WEBPACK_IMPORTED_MODULE_5__["default"]);
  var isActive = active;

  if (navContext) {
    if (!props.role && navContext.role === 'tablist') props.role = 'tab';
    props['data-rb-event-key'] = navKey;
    props.id = navContext.getControllerId(navKey);
    props['aria-controls'] = navContext.getControlledId(navKey);
    isActive = active == null && navKey != null ? navContext.activeKey === navKey : active;
  }

  if (props.role === 'tab') {
    props.tabIndex = isActive ? tabIndex : -1;
    props['aria-selected'] = isActive;
  }

  var handleOnclick = Object(_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__["default"])(function (e) {
    if (onClick) onClick(e);
    if (navKey == null) return;
    if (onSelect) onSelect(navKey, e);
    if (parentOnSelect) parentOnSelect(navKey, e);
  });
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    onClick: handleOnclick,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, isActive && 'active')
  }));
});
AbstractNavItem.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (AbstractNavItem);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Accordion.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Accordion.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uncontrollable_hook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uncontrollable/hook */ "./node_modules/uncontrollable/hook.js");
/* harmony import */ var uncontrollable_hook__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(uncontrollable_hook__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _AccordionToggle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AccordionToggle */ "./node_modules/react-bootstrap/es/AccordionToggle.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/es/SelectableContext.js");
/* harmony import */ var _AccordionCollapse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./AccordionCollapse */ "./node_modules/react-bootstrap/es/AccordionCollapse.js");
/* harmony import */ var _AccordionContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AccordionContext */ "./node_modules/react-bootstrap/es/AccordionContext.js");










var Accordion = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (props, ref) {
  var _useUncontrolled = uncontrollable_hook__WEBPACK_IMPORTED_MODULE_4___default()(props, {
    activeKey: 'onSelect'
  }),
      _useUncontrolled$as = _useUncontrolled.as,
      Component = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      activeKey = _useUncontrolled.activeKey,
      bsPrefix = _useUncontrolled.bsPrefix,
      children = _useUncontrolled.children,
      className = _useUncontrolled.className,
      onSelect = _useUncontrolled.onSelect,
      controlledProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUncontrolled, ["as", "activeKey", "bsPrefix", "children", "className", "onSelect"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'accordion');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_AccordionContext__WEBPACK_IMPORTED_MODULE_9__["default"].Provider, {
    value: activeKey
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_SelectableContext__WEBPACK_IMPORTED_MODULE_7__["default"].Provider, {
    value: onSelect
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, controlledProps, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix)
  }), children)));
});
Accordion.Toggle = _AccordionToggle__WEBPACK_IMPORTED_MODULE_6__["default"];
Accordion.Collapse = _AccordionCollapse__WEBPACK_IMPORTED_MODULE_8__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Accordion);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/AccordionCollapse.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/AccordionCollapse.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Collapse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Collapse */ "./node_modules/react-bootstrap/es/Collapse.js");
/* harmony import */ var _AccordionContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AccordionContext */ "./node_modules/react-bootstrap/es/AccordionContext.js");





var AccordionCollapse = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      eventKey = _ref.eventKey,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["children", "eventKey"]);

  var contextEventKey = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_AccordionContext__WEBPACK_IMPORTED_MODULE_4__["default"]);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Collapse__WEBPACK_IMPORTED_MODULE_3__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    in: contextEventKey === eventKey
  }, props), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.only(children)));
});
/* harmony default export */ __webpack_exports__["default"] = (AccordionCollapse);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/AccordionContext.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/AccordionContext.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(null));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/AccordionToggle.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/AccordionToggle.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/es/SelectableContext.js");
/* harmony import */ var _AccordionContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AccordionContext */ "./node_modules/react-bootstrap/es/AccordionContext.js");





var AccordionToggle = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'button' : _ref$as,
      children = _ref.children,
      eventKey = _ref.eventKey,
      _onClick = _ref.onClick,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["as", "children", "eventKey", "onClick"]);

  var contextEventKey = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_AccordionContext__WEBPACK_IMPORTED_MODULE_4__["default"]);
  var onSelect = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_SelectableContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    onClick: function onClick(e) {
      /* 
        Compare the event key in context with the given event key.
        If they are the same, then collapse the component.
      */
      var eventKeyPassed = eventKey === contextEventKey ? null : eventKey;
      onSelect(eventKeyPassed, e);
      if (_onClick) _onClick(e);
    }
  }, props), children);
});
/* harmony default export */ __webpack_exports__["default"] = (AccordionToggle);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Alert.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Alert.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var uncontrollable_hook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uncontrollable/hook */ "./node_modules/uncontrollable/hook.js");
/* harmony import */ var uncontrollable_hook__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(uncontrollable_hook__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");
/* harmony import */ var _utils_divWithClassName__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/divWithClassName */ "./node_modules/react-bootstrap/es/utils/divWithClassName.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/es/Fade.js");
/* harmony import */ var _CloseButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CloseButton */ "./node_modules/react-bootstrap/es/CloseButton.js");
/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/es/SafeAnchor.js");












var defaultProps = {
  show: true,
  transition: _Fade__WEBPACK_IMPORTED_MODULE_9__["default"],
  closeLabel: 'Close alert'
};
var controllables = {
  show: 'onClose'
};
var Alert = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (uncontrolledProps, ref) {
  var _useControllable = uncontrollable_hook__WEBPACK_IMPORTED_MODULE_4___default()(uncontrolledProps, controllables),
      bsPrefix = _useControllable.bsPrefix,
      show = _useControllable.show,
      closeLabel = _useControllable.closeLabel,
      className = _useControllable.className,
      children = _useControllable.children,
      variant = _useControllable.variant,
      onClose = _useControllable.onClose,
      dismissible = _useControllable.dismissible,
      Transition = _useControllable.transition,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_useControllable, ["bsPrefix", "show", "closeLabel", "className", "children", "variant", "onClose", "dismissible", "transition"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_8__["useBootstrapPrefix"])(bsPrefix, 'alert');
  var handleClose = Object(_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_5__["default"])(function (e) {
    onClose(false, e);
  });
  var alert = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    role: "alert"
  }, Transition ? props : undefined, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix, variant && prefix + "-" + variant, dismissible && prefix + "-dismissible")
  }), dismissible && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_CloseButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    onClick: handleClose,
    label: closeLabel
  }), children);
  if (!Transition) return show ? alert : null;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Transition, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    unmountOnExit: true,
    ref: ref
  }, props, {
    in: show
  }), alert);
});
var DivStyledAsH4 = Object(_utils_divWithClassName__WEBPACK_IMPORTED_MODULE_7__["default"])('h4');
DivStyledAsH4.displayName = 'DivStyledAsH4';
Alert.displayName = 'Alert';
Alert.defaultProps = defaultProps;
Alert.Link = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_6__["default"])('alert-link', {
  Component: _SafeAnchor__WEBPACK_IMPORTED_MODULE_11__["default"]
});
Alert.Heading = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_6__["default"])('alert-heading', {
  Component: DivStyledAsH4
});
/* harmony default export */ __webpack_exports__["default"] = (Alert);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Badge.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Badge.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");





var defaultProps = {
  pill: false
};
var Badge = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      variant = _ref.variant,
      pill = _ref.pill,
      className = _ref.className,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "variant", "pill", "className"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'badge');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix, pill && prefix + "-pill", variant && prefix + "-" + variant)
  }));
});
Badge.displayName = 'Badge';
Badge.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Badge);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Breadcrumb.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Breadcrumb.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BreadcrumbItem */ "./node_modules/react-bootstrap/es/BreadcrumbItem.js");






var defaultProps = {
  label: 'breadcrumb',
  listProps: {}
};
var Breadcrumb = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      listProps = _ref.listProps,
      children = _ref.children,
      label = _ref.label,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'nav' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "listProps", "children", "label", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'breadcrumb');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "aria-label": label,
    className: className,
    ref: ref
  }, props), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("ol", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, listProps, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(prefix, listProps.className)
  }), children));
});
Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.defaultProps = defaultProps;
Breadcrumb.Item = _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_5__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Breadcrumb);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/BreadcrumbItem.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/BreadcrumbItem.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/es/SafeAnchor.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");






var defaultProps = {
  active: false
};
var BreadcrumbItem = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      active = _ref.active,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'li' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "active", "className", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'breadcrumb-item');

  var href = props.href,
      title = props.title,
      target = props.target,
      elementProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["href", "title", "target"]);

  var linkProps = {
    href: href,
    title: title,
    target: target
  };
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(prefix, className, {
      active: active
    }),
    "aria-current": active ? 'page' : undefined
  }, active ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, elementProps, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
      active: active
    })
  })) : react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_SafeAnchor__WEBPACK_IMPORTED_MODULE_4__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, elementProps, linkProps)));
});
BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (BreadcrumbItem);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Button.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Button.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/es/SafeAnchor.js");






var defaultProps = {
  variant: 'primary',
  active: false,
  disabled: false,
  type: 'button'
};
var Button = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      variant = _ref.variant,
      size = _ref.size,
      active = _ref.active,
      className = _ref.className,
      block = _ref.block,
      type = _ref.type,
      as = _ref.as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "variant", "size", "active", "className", "block", "type", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'btn');
  var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix, active && 'active', prefix + "-" + variant, block && prefix + "-block", size && prefix + "-" + size);

  if (props.href) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_SafeAnchor__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      as: as,
      innerRef: ref,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(classes, props.disabled && 'disabled')
    }));
  }

  var Component = as || 'button';
  if (ref) props.ref = ref;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    type: type,
    className: classes
  }));
});
Button.displayName = 'Button';
Button.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ButtonGroup.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ButtonGroup.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");





var defaultProps = {
  vertical: false,
  toggle: false,
  role: 'group'
};
var ButtonGroup = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (props, ref) {
  var bsPrefix = props.bsPrefix,
      size = props.size,
      toggle = props.toggle,
      vertical = props.vertical,
      className = props.className,
      _props$as = props.as,
      Component = _props$as === void 0 ? 'div' : _props$as,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["bsPrefix", "size", "toggle", "vertical", "className", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'btn-group');
  var baseClass = prefix;
  if (vertical) baseClass = prefix + "-vertical";
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, baseClass, size && prefix + "-" + size, toggle && prefix + "-toggle")
  }));
});
ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (ButtonGroup);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ButtonToolbar.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ButtonToolbar.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");





var defaultProps = {
  role: 'toolbar'
};
var ButtonToolbar = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'btn-toolbar');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix)
  }));
});
ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (ButtonToolbar);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Card.js":
/*!*************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Card.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");
/* harmony import */ var _utils_divWithClassName__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/divWithClassName */ "./node_modules/react-bootstrap/es/utils/divWithClassName.js");
/* harmony import */ var _CardContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CardContext */ "./node_modules/react-bootstrap/es/CardContext.js");
/* harmony import */ var _CardImg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CardImg */ "./node_modules/react-bootstrap/es/CardImg.js");









var DivStyledAsH5 = Object(_utils_divWithClassName__WEBPACK_IMPORTED_MODULE_6__["default"])('h5');
var DivStyledAsH6 = Object(_utils_divWithClassName__WEBPACK_IMPORTED_MODULE_6__["default"])('h6');
var CardBody = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-body');
var defaultProps = {
  body: false
};
var Card = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      bg = _ref.bg,
      text = _ref.text,
      border = _ref.border,
      body = _ref.body,
      children = _ref.children,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "bg", "text", "border", "body", "children", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'card');
  var cardContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return {
      cardHeaderBsPrefix: prefix + "-header"
    };
  }, [prefix]);
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_CardContext__WEBPACK_IMPORTED_MODULE_7__["default"].Provider, {
    value: cardContext
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix, bg && "bg-" + bg, text && "text-" + text, border && "border-" + border)
  }), body ? react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(CardBody, null, children) : children));
});
Card.displayName = 'Card';
Card.defaultProps = defaultProps;
Card.Img = _CardImg__WEBPACK_IMPORTED_MODULE_8__["default"];
Card.Title = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-title', {
  Component: DivStyledAsH5
});
Card.Subtitle = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-subtitle', {
  Component: DivStyledAsH6
});
Card.Body = CardBody;
Card.Link = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-link', {
  Component: 'a'
});
Card.Text = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-text', {
  Component: 'p'
});
Card.Header = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-header');
Card.Footer = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-footer');
Card.ImgOverlay = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('card-img-overlay');
/* harmony default export */ __webpack_exports__["default"] = (Card);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/CardColumns.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/CardColumns.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('card-columns'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/CardContext.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/CardContext.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(null));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/CardDeck.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/CardDeck.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('card-deck'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/CardGroup.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/CardGroup.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('card-group'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/CardImg.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/CardImg.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");





var defaultProps = {
  variant: null
};
var CardImg = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      variant = _ref.variant,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'img' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "variant", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'card-img');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(variant ? prefix + "-" + variant : prefix, className)
  }, props));
});
CardImg.displayName = 'CardImg';
CardImg.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (CardImg);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Carousel.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Carousel.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dom_helpers_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dom-helpers/style */ "./node_modules/dom-helpers/style/index.js");
/* harmony import */ var dom_helpers_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_style__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var dom_helpers_transition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dom-helpers/transition */ "./node_modules/dom-helpers/transition/index.js");
/* harmony import */ var dom_helpers_transition__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_transition__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _CarouselCaption__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CarouselCaption */ "./node_modules/react-bootstrap/es/CarouselCaption.js");
/* harmony import */ var _CarouselItem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CarouselItem */ "./node_modules/react-bootstrap/es/CarouselItem.js");
/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/es/SafeAnchor.js");
/* harmony import */ var _utils_ElementChildren__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/ElementChildren */ "./node_modules/react-bootstrap/es/utils/ElementChildren.js");
/* harmony import */ var _utils_triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/triggerBrowserReflow */ "./node_modules/react-bootstrap/es/utils/triggerBrowserReflow.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");















var countChildren = function countChildren(c) {
  return react__WEBPACK_IMPORTED_MODULE_6___default.a.Children.toArray(c).filter(react__WEBPACK_IMPORTED_MODULE_6___default.a.isValidElement).length;
}; // TODO: `slide` should be `animate`.


var defaultProps = {
  slide: true,
  fade: false,
  interval: 5000,
  keyboard: true,
  pauseOnHover: true,
  wrap: true,
  indicators: true,
  controls: true,
  activeIndex: 0,
  prevIcon: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("span", {
    "aria-hidden": "true",
    className: "carousel-control-prev-icon"
  }),
  prevLabel: 'Previous',
  nextIcon: react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("span", {
    "aria-hidden": "true",
    className: "carousel-control-next-icon"
  }),
  nextLabel: 'Next'
};

var Carousel =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Carousel, _React$Component);

  function Carousel(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    _this.handleSlideEnd = function () {
      var pendingIndex = _this._pendingIndex;
      _this._isSliding = false;
      _this._pendingIndex = null;
      if (pendingIndex != null) _this.to(pendingIndex);else _this.cycle();
    };

    _this.handleMouseOut = function () {
      _this.cycle();
    };

    _this.handleMouseOver = function () {
      if (_this.props.pauseOnHover) _this.pause();
    };

    _this.handleKeyDown = function (event) {
      if (/input|textarea/i.test(event.target.tagName)) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();

          _this.handlePrev(event);

          break;

        case 'ArrowRight':
          event.preventDefault();

          _this.handleNext(event);

          break;

        default:
          break;
      }
    };

    _this.handleNextWhenVisible = function () {
      if (!_this.isUnmounted && !document.hidden && dom_helpers_style__WEBPACK_IMPORTED_MODULE_4___default()(_this.carousel.current, 'visibility') !== 'hidden') {
        _this.handleNext();
      }
    };

    _this.handleNext = function (e) {
      if (_this._isSliding) return;
      var _this$props = _this.props,
          wrap = _this$props.wrap,
          activeIndex = _this$props.activeIndex;
      var index = activeIndex + 1;
      var count = countChildren(_this.props.children);

      if (index > count - 1) {
        if (!wrap) return;
        index = 0;
      }

      _this.select(index, e, 'next');
    };

    _this.handlePrev = function (e) {
      if (_this._isSliding) return;
      var _this$props2 = _this.props,
          wrap = _this$props2.wrap,
          activeIndex = _this$props2.activeIndex;
      var index = activeIndex - 1;

      if (index < 0) {
        if (!wrap) return;
        index = countChildren(_this.props.children) - 1;
      }

      _this.select(index, e, 'prev');
    };

    _this.state = {
      prevClasses: '',
      currentClasses: 'active'
    };
    _this.isUnmounted = false;
    _this.carousel = react__WEBPACK_IMPORTED_MODULE_6___default.a.createRef();
    return _this;
  }

  var _proto = Carousel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.cycle();
  };

  Carousel.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var previousActiveIndex = _ref.activeIndex;

    if (nextProps.activeIndex !== previousActiveIndex) {
      var lastPossibleIndex = countChildren(nextProps.children) - 1;
      var nextIndex = Math.max(0, Math.min(nextProps.activeIndex, lastPossibleIndex));
      var direction;

      if (nextIndex === 0 && previousActiveIndex >= lastPossibleIndex || previousActiveIndex <= nextIndex) {
        direction = 'next';
      } else {
        direction = 'prev';
      }

      return {
        direction: direction,
        previousActiveIndex: previousActiveIndex,
        activeIndex: nextIndex
      };
    }

    return null;
  };

  _proto.componentDidUpdate = function componentDidUpdate(_, prevState) {
    var _this2 = this;

    var _this$props3 = this.props,
        bsPrefix = _this$props3.bsPrefix,
        slide = _this$props3.slide,
        onSlideEnd = _this$props3.onSlideEnd;
    if (!slide || this.state.activeIndex === prevState.activeIndex || this._isSliding) return;
    var _this$state = this.state,
        activeIndex = _this$state.activeIndex,
        direction = _this$state.direction;
    var orderClassName, directionalClassName;

    if (direction === 'next') {
      orderClassName = bsPrefix + "-item-next";
      directionalClassName = bsPrefix + "-item-left";
    } else if (direction === 'prev') {
      orderClassName = bsPrefix + "-item-prev";
      directionalClassName = bsPrefix + "-item-right";
    }

    this._isSliding = true;
    this.pause(); // eslint-disable-next-line react/no-did-update-set-state

    this.safeSetState({
      prevClasses: 'active',
      currentClasses: orderClassName
    }, function () {
      var items = _this2.carousel.current.children;
      var nextElement = items[activeIndex];
      Object(_utils_triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_12__["default"])(nextElement);

      _this2.safeSetState({
        prevClasses: classnames__WEBPACK_IMPORTED_MODULE_3___default()('active', directionalClassName),
        currentClasses: classnames__WEBPACK_IMPORTED_MODULE_3___default()(orderClassName, directionalClassName)
      }, function () {
        return dom_helpers_transition__WEBPACK_IMPORTED_MODULE_5___default.a.end(nextElement, function () {
          _this2.safeSetState({
            prevClasses: '',
            currentClasses: 'active'
          }, _this2.handleSlideEnd);

          if (onSlideEnd) {
            onSlideEnd();
          }
        });
      });
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timeout);
    this.isUnmounted = true;
  };

  _proto.safeSetState = function safeSetState(state, cb) {
    var _this3 = this;

    if (this.isUnmounted) return;
    this.setState(state, function () {
      return !_this3.isUnmounted && cb();
    });
  } // This might be a public API.
  ;

  _proto.pause = function pause() {
    this._isPaused = true;
    clearInterval(this._interval);
    this._interval = null;
  };

  _proto.cycle = function cycle() {
    this._isPaused = false;
    clearInterval(this._interval);
    this._interval = null;

    if (this.props.interval && !this._isPaused) {
      this._interval = setInterval(document.visibilityState ? this.handleNextWhenVisible : this.handleNext, this.props.interval);
    }
  };

  _proto.to = function to(index, event) {
    var children = this.props.children;

    if (index < 0 || index > countChildren(children) - 1) {
      return;
    }

    if (this._isSliding) {
      this._pendingIndex = index;
      return;
    }

    this.select(index, event);
  };

  _proto.select = function select(index, event, direction) {
    var _this4 = this;

    clearTimeout(this.selectThrottle);
    if (event && event.persist) event.persist(); // The timeout throttles fast clicks, in order to give any pending state
    // a chance to update and propagate back through props

    this.selectThrottle = setTimeout(function () {
      clearTimeout(_this4.timeout);
      var _this4$props = _this4.props,
          activeIndex = _this4$props.activeIndex,
          onSelect = _this4$props.onSelect;
      if (index === activeIndex || _this4._isSliding || _this4.isUnmounted) return;
      onSelect(index, direction || (index < activeIndex ? 'prev' : 'next'), event);
    }, 50);
  };

  _proto.renderControls = function renderControls(properties) {
    var bsPrefix = this.props.bsPrefix;
    var wrap = properties.wrap,
        children = properties.children,
        activeIndex = properties.activeIndex,
        prevIcon = properties.prevIcon,
        nextIcon = properties.nextIcon,
        prevLabel = properties.prevLabel,
        nextLabel = properties.nextLabel;
    var count = countChildren(children);
    return [(wrap || activeIndex !== 0) && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_SafeAnchor__WEBPACK_IMPORTED_MODULE_10__["default"], {
      key: "prev",
      className: bsPrefix + "-control-prev",
      onClick: this.handlePrev
    }, prevIcon, prevLabel && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("span", {
      className: "sr-only"
    }, prevLabel)), (wrap || activeIndex !== count - 1) && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_SafeAnchor__WEBPACK_IMPORTED_MODULE_10__["default"], {
      key: "next",
      className: bsPrefix + "-control-next",
      onClick: this.handleNext
    }, nextIcon, nextLabel && react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("span", {
      className: "sr-only"
    }, nextLabel))];
  };

  _proto.renderIndicators = function renderIndicators(children, activeIndex) {
    var _this5 = this;

    var bsPrefix = this.props.bsPrefix;
    var indicators = [];
    Object(_utils_ElementChildren__WEBPACK_IMPORTED_MODULE_11__["forEach"])(children, function (child, index) {
      indicators.push(react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("li", {
        key: index,
        className: index === activeIndex ? 'active' : null,
        onClick: function onClick(e) {
          return _this5.to(index, e);
        }
      }), // Force whitespace between indicator elements. Bootstrap requires
      // this for correct spacing of elements.
      ' ');
    });
    return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("ol", {
      className: bsPrefix + "-indicators"
    }, indicators);
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        _this$props4$as = _this$props4.as,
        Component = _this$props4$as === void 0 ? 'div' : _this$props4$as,
        bsPrefix = _this$props4.bsPrefix,
        slide = _this$props4.slide,
        fade = _this$props4.fade,
        indicators = _this$props4.indicators,
        controls = _this$props4.controls,
        wrap = _this$props4.wrap,
        prevIcon = _this$props4.prevIcon,
        prevLabel = _this$props4.prevLabel,
        nextIcon = _this$props4.nextIcon,
        nextLabel = _this$props4.nextLabel,
        className = _this$props4.className,
        children = _this$props4.children,
        keyboard = _this$props4.keyboard,
        _5 = _this$props4.activeIndex,
        _4 = _this$props4.pauseOnHover,
        _3 = _this$props4.interval,
        _2 = _this$props4.onSelect,
        _1 = _this$props4.onSlideEnd,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props4, ["as", "bsPrefix", "slide", "fade", "indicators", "controls", "wrap", "prevIcon", "prevLabel", "nextIcon", "nextLabel", "className", "children", "keyboard", "activeIndex", "pauseOnHover", "interval", "onSelect", "onSlideEnd"]);

    var _this$state2 = this.state,
        activeIndex = _this$state2.activeIndex,
        previousActiveIndex = _this$state2.previousActiveIndex,
        prevClasses = _this$state2.prevClasses,
        currentClasses = _this$state2.currentClasses;
    return (// eslint-disable-next-line jsx-a11y/no-static-element-interactions
      react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix, slide && 'slide', fade && bsPrefix + "-fade"),
        onKeyDown: keyboard ? this.handleKeyDown : undefined,
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut
      }), indicators && this.renderIndicators(children, activeIndex), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: bsPrefix + "-inner",
        ref: this.carousel
      }, Object(_utils_ElementChildren__WEBPACK_IMPORTED_MODULE_11__["map"])(children, function (child, index) {
        var current = index === activeIndex;
        var previous = index === previousActiveIndex;
        return Object(react__WEBPACK_IMPORTED_MODULE_6__["cloneElement"])(child, {
          className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(child.props.className, bsPrefix + "-item", current && currentClasses, previous && prevClasses)
        });
      })), controls && this.renderControls({
        wrap: wrap,
        children: children,
        activeIndex: activeIndex,
        prevIcon: prevIcon,
        prevLabel: prevLabel,
        nextIcon: nextIcon,
        nextLabel: nextLabel
      }))
    );
  };

  return Carousel;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

Carousel.defaultProps = defaultProps;
var DecoratedCarousel = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_13__["createBootstrapComponent"])(Object(uncontrollable__WEBPACK_IMPORTED_MODULE_7__["default"])(Carousel, {
  activeIndex: 'onSelect'
}), 'carousel');
DecoratedCarousel.Caption = _CarouselCaption__WEBPACK_IMPORTED_MODULE_8__["default"];
DecoratedCarousel.Item = _CarouselItem__WEBPACK_IMPORTED_MODULE_9__["default"];
/* harmony default export */ __webpack_exports__["default"] = (DecoratedCarousel);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/CarouselCaption.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/CarouselCaption.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('carousel-caption', {
  Component: 'div'
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/CarouselItem.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/CarouselItem.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('carousel-item'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/CloseButton.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/CloseButton.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);





var propTypes = {
  label: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
};
var defaultProps = {
  label: 'Close'
};
var CloseButton = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var label = _ref.label,
      onClick = _ref.onClick,
      className = _ref.className,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["label", "onClick", "className"]);

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("button", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    type: "button",
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('close', className),
    onClick: onClick
  }, props), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: "sr-only"
  }, label));
});
CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (CloseButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Col.js":
/*!************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Col.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");





var DEVICE_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'];
var Col = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'col');
  var spans = [];
  var classes = [];
  DEVICE_SIZES.forEach(function (brkPoint) {
    var propValue = props[brkPoint];
    delete props[brkPoint];
    var span, offset, order;

    if (propValue != null && typeof propValue === 'object') {
      var _propValue$span = propValue.span;
      span = _propValue$span === void 0 ? true : _propValue$span;
      offset = propValue.offset;
      order = propValue.order;
    } else {
      span = propValue;
    }

    var infix = brkPoint !== 'xs' ? "-" + brkPoint : '';
    if (span != null) spans.push(span === true ? "" + prefix + infix : "" + prefix + infix + "-" + span);
    if (order != null) classes.push("order" + infix + "-" + order);
    if (offset != null) classes.push("offset" + infix + "-" + offset);
  });

  if (!spans.length) {
    spans.push(prefix); // plain 'col'
  }

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default.a.apply(void 0, [className].concat(spans, classes))
  }));
});
Col.displayName = 'Col';
/* harmony default export */ __webpack_exports__["default"] = (Col);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Collapse.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Collapse.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dom_helpers_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dom-helpers/style */ "./node_modules/dom-helpers/style/index.js");
/* harmony import */ var dom_helpers_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_style__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var dom_helpers_transition_end__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dom-helpers/transition/end */ "./node_modules/dom-helpers/transition/end.js");
/* harmony import */ var dom_helpers_transition_end__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_transition_end__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-transition-group/Transition */ "./node_modules/react-transition-group/esm/Transition.js");
/* harmony import */ var _utils_triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/triggerBrowserReflow */ "./node_modules/react-bootstrap/es/utils/triggerBrowserReflow.js");
/* harmony import */ var _utils_createChainedFunction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/createChainedFunction */ "./node_modules/react-bootstrap/es/utils/createChainedFunction.js");




var _collapseStyles;








var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function getDimensionValue(dimension, elem) {
  var offset = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
  var value = elem[offset];
  var margins = MARGINS[dimension];
  return value + parseInt(dom_helpers_style__WEBPACK_IMPORTED_MODULE_4___default()(elem, margins[0]), 10) + parseInt(dom_helpers_style__WEBPACK_IMPORTED_MODULE_4___default()(elem, margins[1]), 10);
}

var collapseStyles = (_collapseStyles = {}, _collapseStyles[react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_7__["EXITED"]] = 'collapse', _collapseStyles[react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_7__["EXITING"]] = 'collapsing', _collapseStyles[react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_7__["ENTERING"]] = 'collapsing', _collapseStyles[react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_7__["ENTERED"]] = 'collapse show', _collapseStyles);
var defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  dimension: 'height',
  getDimensionValue: getDimensionValue
};

var Collapse =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Collapse, _React$Component);

  function Collapse() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleEnter = function (elem) {
      elem.style[_this.getDimension()] = '0';
    };

    _this.handleEntering = function (elem) {
      var dimension = _this.getDimension();

      elem.style[dimension] = _this._getScrollDimensionValue(elem, dimension);
    };

    _this.handleEntered = function (elem) {
      elem.style[_this.getDimension()] = null;
    };

    _this.handleExit = function (elem) {
      var dimension = _this.getDimension();

      elem.style[dimension] = _this.props.getDimensionValue(dimension, elem) + "px";
      Object(_utils_triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_8__["default"])(elem);
    };

    _this.handleExiting = function (elem) {
      elem.style[_this.getDimension()] = null;
    };

    return _this;
  }

  var _proto = Collapse.prototype;

  _proto.getDimension = function getDimension() {
    return typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension;
  }
  /* -- Expanding -- */
  ;

  // for testing
  _proto._getScrollDimensionValue = function _getScrollDimensionValue(elem, dimension) {
    var scroll = "scroll" + dimension[0].toUpperCase() + dimension.slice(1);
    return elem[scroll] + "px";
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        onEnter = _this$props.onEnter,
        onEntering = _this$props.onEntering,
        onEntered = _this$props.onEntered,
        onExit = _this$props.onExit,
        onExiting = _this$props.onExiting,
        className = _this$props.className,
        children = _this$props.children,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["onEnter", "onEntering", "onEntered", "onExit", "onExiting", "className", "children"]);

    delete props.dimension;
    delete props.getDimensionValue;
    var handleEnter = Object(_utils_createChainedFunction__WEBPACK_IMPORTED_MODULE_9__["default"])(this.handleEnter, onEnter);
    var handleEntering = Object(_utils_createChainedFunction__WEBPACK_IMPORTED_MODULE_9__["default"])(this.handleEntering, onEntering);
    var handleEntered = Object(_utils_createChainedFunction__WEBPACK_IMPORTED_MODULE_9__["default"])(this.handleEntered, onEntered);
    var handleExit = Object(_utils_createChainedFunction__WEBPACK_IMPORTED_MODULE_9__["default"])(this.handleExit, onExit);
    var handleExiting = Object(_utils_createChainedFunction__WEBPACK_IMPORTED_MODULE_9__["default"])(this.handleExiting, onExiting);
    return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_7__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      addEndListener: dom_helpers_transition_end__WEBPACK_IMPORTED_MODULE_6___default.a
    }, props, {
      "aria-expanded": props.role ? props.in : null,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered: handleEntered,
      onExit: handleExit,
      onExiting: handleExiting
    }), function (state, innerProps) {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.cloneElement(children, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, innerProps, {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, children.props.className, collapseStyles[state], _this2.getDimension() === 'width' && 'width')
      }));
    });
  };

  return Collapse;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

Collapse.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Collapse);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Container.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Container.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");





var defaultProps = {
  fluid: false
};
var Container = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      fluid = _ref.fluid,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "fluid", "as", "className"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'container');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, fluid ? prefix + "-fluid" : prefix)
  }));
});
Container.displayName = 'Container';
Container.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Container);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Dropdown.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Dropdown.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_overlays_Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-overlays/Dropdown */ "./node_modules/react-overlays/Dropdown.js");
/* harmony import */ var react_overlays_Dropdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_overlays_Dropdown__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var uncontrollable_hook__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uncontrollable/hook */ "./node_modules/uncontrollable/hook.js");
/* harmony import */ var uncontrollable_hook__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uncontrollable_hook__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _DropdownMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DropdownMenu */ "./node_modules/react-bootstrap/es/DropdownMenu.js");
/* harmony import */ var _DropdownToggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DropdownToggle */ "./node_modules/react-bootstrap/es/DropdownToggle.js");
/* harmony import */ var _DropdownItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DropdownItem */ "./node_modules/react-bootstrap/es/DropdownItem.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/es/SelectableContext.js");
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");













var defaultProps = {
  navbar: false
};
var Dropdown = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (uncontrolledProps, ref) {
  var _useUncontrolled = uncontrollable_hook__WEBPACK_IMPORTED_MODULE_5___default()(uncontrolledProps, {
    show: 'onToggle'
  }),
      bsPrefix = _useUncontrolled.bsPrefix,
      drop = _useUncontrolled.drop,
      show = _useUncontrolled.show,
      className = _useUncontrolled.className,
      alignRight = _useUncontrolled.alignRight,
      onSelect = _useUncontrolled.onSelect,
      onToggle = _useUncontrolled.onToggle,
      focusFirstItemOnShow = _useUncontrolled.focusFirstItemOnShow,
      _useUncontrolled$as = _useUncontrolled.as,
      Component = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      _4 = _useUncontrolled.navbar,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUncontrolled, ["bsPrefix", "drop", "show", "className", "alignRight", "onSelect", "onToggle", "focusFirstItemOnShow", "as", "navbar"]);

  var onSelectCtx = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_SelectableContext__WEBPACK_IMPORTED_MODULE_11__["default"]);
  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_7__["useBootstrapPrefix"])(bsPrefix, 'dropdown');
  var handleToggle = Object(_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_6__["default"])(function (nextShow, event, source) {
    if (source === void 0) {
      source = event.type;
    }

    if (event.currentTarget === document) source = 'rootClose';
    onToggle(nextShow, event, {
      source: source
    });
  });
  var handleSelect = Object(_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_6__["default"])(function (key, event) {
    if (onSelectCtx) onSelectCtx(key, event);
    if (onSelect) onSelect(key, event);
    handleToggle(false, event, 'select');
  });
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_SelectableContext__WEBPACK_IMPORTED_MODULE_11__["default"].Provider, {
    value: handleSelect
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_overlays_Dropdown__WEBPACK_IMPORTED_MODULE_4___default.a.ControlledComponent, {
    drop: drop,
    show: show,
    alignEnd: alignRight,
    onToggle: handleToggle,
    focusFirstItemOnShow: focusFirstItemOnShow,
    itemSelector: "." + prefix + "-item:not(.disabled):not(:disabled)"
  }, function (_ref) {
    var dropdownProps = _ref.props;
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, dropdownProps, {
      ref: ref,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, show && 'show', (!drop || drop === 'down') && prefix, drop === 'up' && 'dropup', drop === 'right' && 'dropright', drop === 'left' && 'dropleft')
    }));
  }));
});
Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = defaultProps;
Dropdown.Toggle = _DropdownToggle__WEBPACK_IMPORTED_MODULE_9__["default"];
Dropdown.Menu = _DropdownMenu__WEBPACK_IMPORTED_MODULE_8__["default"];
Dropdown.Item = _DropdownItem__WEBPACK_IMPORTED_MODULE_10__["default"];
Dropdown.Header = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_12__["default"])('dropdown-header', {
  defaultProps: {
    role: 'heading'
  }
});
Dropdown.Divider = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_12__["default"])('dropdown-divider', {
  defaultProps: {
    role: 'separator'
  }
});
/* harmony default export */ __webpack_exports__["default"] = (Dropdown);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/DropdownButton.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/DropdownButton.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/react-bootstrap/es/Dropdown.js");





var propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.any,

  /** An `href` passed to the Toggle component */
  href: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** An `onClick` handler passed to the Toggle component */
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /** The content of the non-toggle Button.  */
  title: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node.isRequired,

  /** Disables both Buttons  */
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#menu-props) for more details_
   */
  rootCloseEvent: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** @ignore */
  bsPrefix: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** @ignore */
  variant: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** @ignore */
  size: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string
};
/**
 * A convenience component for simple or general use dropdowns. Renders a `Button` toggle and all `children`
 * are passed directly to the default `Dropdown.Menu`.
 *
 * _All unknown props are passed through to the `Dropdown` component._ Only
 * the Button `variant`, `size` and `bsPrefix` props are passed to the toggle,
 * along with menu related props are passed to the `Dropdown.Menu`
 */

var DropdownButton = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (_ref, ref) {
  var title = _ref.title,
      children = _ref.children,
      bsPrefix = _ref.bsPrefix,
      rootCloseEvent = _ref.rootCloseEvent,
      variant = _ref.variant,
      size = _ref.size,
      menuRole = _ref.menuRole,
      disabled = _ref.disabled,
      href = _ref.href,
      id = _ref.id,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["title", "children", "bsPrefix", "rootCloseEvent", "variant", "size", "menuRole", "disabled", "href", "id"]);

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Toggle, {
    id: id,
    href: href,
    size: size,
    variant: variant,
    disabled: disabled,
    childBsPrefix: bsPrefix
  }, title), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Menu, {
    role: menuRole,
    rootCloseEvent: rootCloseEvent
  }, children));
});
DropdownButton.displayName = 'DropdownButton';
DropdownButton.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["default"] = (DropdownButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/DropdownItem.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/DropdownItem.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/es/SafeAnchor.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/es/SelectableContext.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _NavContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NavContext */ "./node_modules/react-bootstrap/es/NavContext.js");









var defaultProps = {
  as: _SafeAnchor__WEBPACK_IMPORTED_MODULE_5__["default"],
  disabled: false
};
var DropdownItem = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      eventKey = _ref.eventKey,
      disabled = _ref.disabled,
      href = _ref.href,
      onClick = _ref.onClick,
      onSelect = _ref.onSelect,
      propActive = _ref.active,
      Component = _ref.as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "children", "eventKey", "disabled", "href", "onClick", "onSelect", "active", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_7__["useBootstrapPrefix"])(bsPrefix, 'dropdown-item');
  var onSelectCtx = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["default"]);
  var navContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_NavContext__WEBPACK_IMPORTED_MODULE_8__["default"]);

  var _ref2 = navContext || {},
      activeKey = _ref2.activeKey;

  var key = Object(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["makeEventKey"])(eventKey, href);
  var active = propActive == null && key != null ? Object(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["makeEventKey"])(activeKey) === key : propActive;
  var handleClick = Object(_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__["default"])(function (event) {
    // SafeAnchor handles the disabled case, but we handle it here
    // for other components
    if (disabled) return;
    if (onClick) onClick(event);
    if (onSelectCtx) onSelectCtx(key, event);
    if (onSelect) onSelect(key, event);
  });
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    href: href,
    disabled: disabled,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix, active && 'active', disabled && 'disabled'),
    onClick: handleClick
  }), children);
});
DropdownItem.displayName = 'DropdownItem';
DropdownItem.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (DropdownItem);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/DropdownMenu.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/DropdownMenu.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_overlays_DropdownMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-overlays/DropdownMenu */ "./node_modules/react-overlays/DropdownMenu.js");
/* harmony import */ var react_overlays_DropdownMenu__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_overlays_DropdownMenu__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _NavbarContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NavbarContext */ "./node_modules/react-bootstrap/es/NavbarContext.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");









var wrapRef = function wrapRef(props) {
  var ref = props.ref;

  props.ref = ref.__wrapped || (ref.__wrapped = function (r) {
    return ref(Object(react_dom__WEBPACK_IMPORTED_MODULE_3__["findDOMNode"])(r));
  });

  return props;
};

var defaultProps = {
  alignRight: false,
  flip: true
};
var DropdownMenu = react__WEBPACK_IMPORTED_MODULE_4___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      alignRight = _ref.alignRight,
      rootCloseEvent = _ref.rootCloseEvent,
      flip = _ref.flip,
      popperConfig = _ref.popperConfig,
      showProps = _ref.show,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "alignRight", "rootCloseEvent", "flip", "popperConfig", "show", "as"]);

  var isNavbar = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(_NavbarContext__WEBPACK_IMPORTED_MODULE_6__["default"]);
  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_7__["useBootstrapPrefix"])(bsPrefix, 'dropdown-menu');
  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_overlays_DropdownMenu__WEBPACK_IMPORTED_MODULE_5___default.a, {
    ref: ref // FIXME: the ref situation is out of hand here
    ,
    flip: flip,
    show: showProps,
    alignEnd: alignRight,
    usePopper: !isNavbar,
    popperConfig: popperConfig,
    rootCloseEvent: rootCloseEvent
  }, function (_ref2) {
    var placement = _ref2.placement,
        show = _ref2.show,
        alignEnd = _ref2.alignEnd,
        close = _ref2.close,
        menuProps = _ref2.props;
    wrapRef(menuProps); // For custom components provide additional, non-DOM, props;

    if (typeof Component !== 'string') {
      menuProps.show = show;
      menuProps.close = close;
      menuProps.alignRight = alignEnd;
    }

    var style = props.style;

    if (placement) {
      // we don't need the default popper style,
      // menus are display: none when not shown.
      style = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, style, menuProps.style);
      props['x-placement'] = placement;
    }

    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, menuProps, {
      style: style,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix, show && 'show', alignEnd && prefix + "-right")
    }));
  });
});
DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (DropdownMenu);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/DropdownToggle.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/DropdownToggle.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types-extra/lib/isRequiredForA11y */ "./node_modules/prop-types-extra/lib/isRequiredForA11y.js");
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_overlays_DropdownToggle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-overlays/DropdownToggle */ "./node_modules/react-overlays/DropdownToggle.js");
/* harmony import */ var react_overlays_DropdownToggle__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_overlays_DropdownToggle__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Button */ "./node_modules/react-bootstrap/es/Button.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");











var wrapRef = function wrapRef(props) {
  var ref = props.ref;

  props.ref = ref.__wrapped || (ref.__wrapped = function (r) {
    return ref(Object(react_dom__WEBPACK_IMPORTED_MODULE_4__["findDOMNode"])(r));
  });

  return props;
};

var DropdownToggle =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(DropdownToggle, _React$Component);

  function DropdownToggle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = DropdownToggle.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        bsPrefix = _this$props.bsPrefix,
        split = _this$props.split,
        className = _this$props.className,
        children = _this$props.children,
        childBsPrefix = _this$props.childBsPrefix,
        Component = _this$props.as,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["bsPrefix", "split", "className", "children", "childBsPrefix", "as"]);

    if (childBsPrefix !== undefined) {
      props.bsPrefix = childBsPrefix;
    } // This intentionally forwards size and variant (if set) to the
    // underlying component, to allow it to render size and style variants.


    return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_overlays_DropdownToggle__WEBPACK_IMPORTED_MODULE_6___default.a, null, function (_ref) {
      var toggle = _ref.toggle,
          toggleProps = _ref.props;
      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        onClick: toggle,
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix, split && bsPrefix + "-split")
      }, wrapRef(toggleProps), props), children);
    });
  };

  return DropdownToggle;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component); // Needs to be a class FTM, because it needs to accept a ref that can be used with findDOMNode


DropdownToggle.defaultProps = {
  as: _Button__WEBPACK_IMPORTED_MODULE_8__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_9__["createBootstrapComponent"])(DropdownToggle, 'dropdown-toggle'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Fade.js":
/*!*************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Fade.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-transition-group/Transition */ "./node_modules/react-transition-group/esm/Transition.js");
/* harmony import */ var dom_helpers_transition_end__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dom-helpers/transition/end */ "./node_modules/dom-helpers/transition/end.js");
/* harmony import */ var dom_helpers_transition_end__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_transition_end__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/triggerBrowserReflow */ "./node_modules/react-bootstrap/es/utils/triggerBrowserReflow.js");




var _fadeStyles;






var defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var fadeStyles = (_fadeStyles = {}, _fadeStyles[react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_5__["ENTERING"]] = 'show', _fadeStyles[react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_5__["ENTERED"]] = 'show', _fadeStyles);

var Fade =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Fade, _React$Component);

  function Fade() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleEnter = function (node) {
      Object(_utils_triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_7__["default"])(node);
      if (_this.props.onEnter) _this.props.onEnter(node);
    };

    return _this;
  }

  var _proto = Fade.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["className", "children"]);

    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      addEndListener: dom_helpers_transition_end__WEBPACK_IMPORTED_MODULE_6___default.a
    }, props, {
      onEnter: this.handleEnter
    }), function (status, innerProps) {
      return react__WEBPACK_IMPORTED_MODULE_4___default.a.cloneElement(children, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, innerProps, {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('fade', className, children.props.className, fadeStyles[status])
      }));
    });
  };

  return Fade;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

Fade.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Fade);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Feedback.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Feedback.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);





var propTypes = {
  /**
   * Specify whether the feedback is for valid or invalid fields
   *
   * @type {('valid'|'invalid')}
   */
  type: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string.isRequired,
  as: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.elementType
};
var defaultProps = {
  type: 'valid'
};
var Feedback = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      className = _ref.className,
      type = _ref.type,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["as", "className", "type"]);

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, type && type + "-feedback")
  }));
});
Feedback.displayName = 'Feedback';
Feedback.propTypes = propTypes;
Feedback.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Feedback);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Figure.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Figure.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");
/* harmony import */ var _FigureImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FigureImage */ "./node_modules/react-bootstrap/es/FigureImage.js");
/* harmony import */ var _FigureCaption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FigureCaption */ "./node_modules/react-bootstrap/es/FigureCaption.js");



var Figure = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('figure', {
  Component: 'figure'
});
Figure.Image = _FigureImage__WEBPACK_IMPORTED_MODULE_1__["default"];
Figure.Caption = _FigureCaption__WEBPACK_IMPORTED_MODULE_2__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Figure);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/FigureCaption.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/FigureCaption.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");

var FigureCaption = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('figure-caption', {
  Component: 'figcaption'
});
/* harmony default export */ __webpack_exports__["default"] = (FigureCaption);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/FigureImage.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/FigureImage.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Image */ "./node_modules/react-bootstrap/es/Image.js");






var propTypes = {
  /**
   * @default 'img'
   */
  bsPrefix: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /**
   * Sets image as fluid image.
   */
  fluid: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Sets image shape as rounded.
   */
  rounded: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Sets image shape as circle.
   */
  roundedCircle: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /**
   * Sets image shape as thumbnail.
   */
  thumbnail: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
};
var defaultProps = {
  fluid: true
};
var FigureImage = react__WEBPACK_IMPORTED_MODULE_4___default.a.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["className"]);

  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Image__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, 'figure-img')
  }));
});
FigureImage.displayName = 'FigureImage';
FigureImage.propTypes = propTypes;
FigureImage.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (FigureImage);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Form.js":
/*!*************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Form.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _FormGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FormGroup */ "./node_modules/react-bootstrap/es/FormGroup.js");
/* harmony import */ var _FormControl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FormControl */ "./node_modules/react-bootstrap/es/FormControl.js");
/* harmony import */ var _FormCheck__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FormCheck */ "./node_modules/react-bootstrap/es/FormCheck.js");
/* harmony import */ var _FormLabel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./FormLabel */ "./node_modules/react-bootstrap/es/FormLabel.js");
/* harmony import */ var _FormText__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./FormText */ "./node_modules/react-bootstrap/es/FormText.js");











var defaultProps = {
  inline: false
};
var Form = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      inline = _ref.inline,
      className = _ref.className,
      validated = _ref.validated,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'form' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "inline", "className", "validated", "as"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'form');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, validated && 'was-validated', inline && bsPrefix + "-inline")
  }));
});
Form.displayName = 'Form';
Form.defaultProps = defaultProps;
Form.Row = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_4__["default"])('form-row');
Form.Group = _FormGroup__WEBPACK_IMPORTED_MODULE_6__["default"];
Form.Control = _FormControl__WEBPACK_IMPORTED_MODULE_7__["default"];
Form.Check = _FormCheck__WEBPACK_IMPORTED_MODULE_8__["default"];
Form.Label = _FormLabel__WEBPACK_IMPORTED_MODULE_9__["default"];
Form.Text = _FormText__WEBPACK_IMPORTED_MODULE_10__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Form);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/FormCheck.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/FormCheck.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _FormContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormContext */ "./node_modules/react-bootstrap/es/FormContext.js");
/* harmony import */ var _Feedback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Feedback */ "./node_modules/react-bootstrap/es/Feedback.js");
/* harmony import */ var _FormCheckInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FormCheckInput */ "./node_modules/react-bootstrap/es/FormCheckInput.js");
/* harmony import */ var _FormCheckLabel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FormCheckLabel */ "./node_modules/react-bootstrap/es/FormCheckLabel.js");









var defaultProps = {
  type: 'checkbox',
  inline: false,
  disabled: false,
  isValid: false,
  isInvalid: false,
  title: ''
};
var FormCheck = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      inline = _ref.inline,
      disabled = _ref.disabled,
      isValid = _ref.isValid,
      isInvalid = _ref.isInvalid,
      feedback = _ref.feedback,
      className = _ref.className,
      style = _ref.style,
      title = _ref.title,
      type = _ref.type,
      label = _ref.label,
      children = _ref.children,
      custom = _ref.custom,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["id", "bsPrefix", "inline", "disabled", "isValid", "isInvalid", "feedback", "className", "style", "title", "type", "label", "children", "custom"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'form-check');

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_FormContext__WEBPACK_IMPORTED_MODULE_5__["default"]),
      controlId = _useContext.controlId;

  var innerFormContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return {
      controlId: id || controlId,
      custom: custom
    };
  }, [controlId, custom, id]);
  var hasLabel = label != null && label !== false && !children;
  var input = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_FormCheckInput__WEBPACK_IMPORTED_MODULE_7__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    type: type,
    ref: ref,
    isValid: isValid,
    isInvalid: isInvalid,
    isStatic: !hasLabel,
    disabled: disabled
  }));
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_FormContext__WEBPACK_IMPORTED_MODULE_5__["default"].Provider, {
    value: innerFormContext
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    style: style,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, !custom && bsPrefix, custom && "custom-control custom-" + type, inline && (custom ? 'custom-control' : bsPrefix) + "-inline")
  }, children || react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, input, hasLabel && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_FormCheckLabel__WEBPACK_IMPORTED_MODULE_8__["default"], {
    title: title
  }, label), (isValid || isInvalid) && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Feedback__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: isValid ? 'valid' : 'invalid'
  }, feedback))));
});
FormCheck.displayName = 'FormCheck';
FormCheck.defaultProps = defaultProps;
FormCheck.Input = _FormCheckInput__WEBPACK_IMPORTED_MODULE_7__["default"];
FormCheck.Label = _FormCheckLabel__WEBPACK_IMPORTED_MODULE_8__["default"];
/* harmony default export */ __webpack_exports__["default"] = (FormCheck);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/FormCheckInput.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/FormCheckInput.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _FormContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormContext */ "./node_modules/react-bootstrap/es/FormContext.js");






var defaultProps = {
  type: 'checkbox'
};
var FormCheckInput = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var id = _ref.id,
      bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      isValid = _ref.isValid,
      isInvalid = _ref.isInvalid,
      isStatic = _ref.isStatic,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["id", "bsPrefix", "className", "isValid", "isInvalid", "isStatic"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'form-check-input');

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_FormContext__WEBPACK_IMPORTED_MODULE_5__["default"]),
      controlId = _useContext.controlId,
      custom = _useContext.custom;

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    id: id || controlId,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, !custom && bsPrefix, custom && 'custom-control-input', isValid && 'is-valid', isInvalid && 'is-invalid', isStatic && 'position-static')
  }));
});
FormCheckInput.displayName = 'FormCheckInput';
FormCheckInput.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (FormCheckInput);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/FormCheckLabel.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/FormCheckLabel.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _FormContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormContext */ "./node_modules/react-bootstrap/es/FormContext.js");






var defaultProps = {
  type: 'checkbox'
};
var FormCheckLabel = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      htmlFor = _ref.htmlFor,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "htmlFor"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'form-check-label');

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_FormContext__WEBPACK_IMPORTED_MODULE_5__["default"]),
      controlId = _useContext.controlId,
      custom = _useContext.custom;

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("label", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    htmlFor: htmlFor || controlId,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, !custom && bsPrefix, custom && 'custom-control-label')
  }));
});
FormCheckLabel.displayName = 'FormCheckLabel';
FormCheckLabel.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (FormCheckLabel);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/FormContext.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/FormContext.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var FormContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({
  controlId: undefined
});
/* harmony default export */ __webpack_exports__["default"] = (FormContext);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/FormControl.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/FormControl.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Feedback__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Feedback */ "./node_modules/react-bootstrap/es/Feedback.js");
/* harmony import */ var _FormContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FormContext */ "./node_modules/react-bootstrap/es/FormContext.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");








var FormControl = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      type = _ref.type,
      size = _ref.size,
      id = _ref.id,
      className = _ref.className,
      isValid = _ref.isValid,
      isInvalid = _ref.isInvalid,
      plaintext = _ref.plaintext,
      readOnly = _ref.readOnly,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'input' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "type", "size", "id", "className", "isValid", "isInvalid", "plaintext", "readOnly", "as"]);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_FormContext__WEBPACK_IMPORTED_MODULE_6__["default"]),
      controlId = _useContext.controlId;

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_7__["useBootstrapPrefix"])(bsPrefix, 'form-control');
  var classes;

  if (plaintext) {
    var _classes;

    classes = (_classes = {}, _classes[bsPrefix + "-plaintext"] = true, _classes);
  } else if (type === 'file') {
    var _classes2;

    classes = (_classes2 = {}, _classes2[bsPrefix + "-file"] = true, _classes2);
  } else {
    var _classes3;

    classes = (_classes3 = {}, _classes3[bsPrefix] = true, _classes3[bsPrefix + "-" + size] = size, _classes3);
  }

   true ? warning__WEBPACK_IMPORTED_MODULE_4___default()(controlId == null || !id, '`controlId` is ignored on `<FormControl>` when `id` is specified.') : undefined;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    type: type,
    ref: ref,
    readOnly: readOnly,
    id: id || controlId,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, classes, isValid && "is-valid", isInvalid && "is-invalid")
  }));
});
FormControl.displayName = 'FormControl';
FormControl.Feedback = _Feedback__WEBPACK_IMPORTED_MODULE_5__["default"];
/* harmony default export */ __webpack_exports__["default"] = (FormControl);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/FormGroup.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/FormGroup.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _FormContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FormContext */ "./node_modules/react-bootstrap/es/FormContext.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");






var FormGroup = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      controlId = _ref.controlId,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "children", "controlId", "as"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'form-group');
  var context = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return {
      controlId: controlId
    };
  }, [controlId]);
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_FormContext__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
    value: context
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix)
  }), children));
});
FormGroup.displayName = 'FormGroup';
/* harmony default export */ __webpack_exports__["default"] = (FormGroup);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/FormLabel.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/FormLabel.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Col__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Col */ "./node_modules/react-bootstrap/es/Col.js");
/* harmony import */ var _FormContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FormContext */ "./node_modules/react-bootstrap/es/FormContext.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");








var defaultProps = {
  column: false,
  srOnly: false
};
var FormLabel = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      column = _ref.column,
      srOnly = _ref.srOnly,
      className = _ref.className,
      htmlFor = _ref.htmlFor,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "column", "srOnly", "className", "htmlFor"]);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_FormContext__WEBPACK_IMPORTED_MODULE_6__["default"]),
      controlId = _useContext.controlId;

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_7__["useBootstrapPrefix"])(bsPrefix, 'form-label');
  var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix, srOnly && 'sr-only', column && 'col-form-label');
   true ? warning__WEBPACK_IMPORTED_MODULE_4___default()(controlId == null || !htmlFor, '`controlId` is ignored on `<FormLabel>` when `htmlFor` is specified.') : undefined;
  htmlFor = htmlFor || controlId;
  if (column) return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Col__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    as: "label",
    className: classes,
    htmlFor: htmlFor
  }, props));
  return (// eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
    react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("label", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      ref: ref,
      className: classes,
      htmlFor: htmlFor
    }, props))
  );
});
FormLabel.displayName = 'FormLabel';
FormLabel.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (FormLabel);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/FormText.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/FormText.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");





var FormText = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'small' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "as"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'form-text');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix)
  }));
});
FormText.displayName = 'FormText';
/* harmony default export */ __webpack_exports__["default"] = (FormText);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Image.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Image.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");







var Image =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Image, _React$Component);

  function Image() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Image.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        bsPrefix = _this$props.bsPrefix,
        className = _this$props.className,
        fluid = _this$props.fluid,
        rounded = _this$props.rounded,
        roundedCircle = _this$props.roundedCircle,
        thumbnail = _this$props.thumbnail,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["bsPrefix", "className", "fluid", "rounded", "roundedCircle", "thumbnail"]);

    var classes = classnames__WEBPACK_IMPORTED_MODULE_3___default()(fluid && bsPrefix + "-fluid", rounded && "rounded", roundedCircle && "rounded-circle", thumbnail && bsPrefix + "-thumbnail");
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("img", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, classes)
    }));
  };

  return Image;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

Image.defaultProps = {
  fluid: false,
  rounded: false,
  roundedCircle: false,
  thumbnail: false
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["createBootstrapComponent"])(Image, 'img'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/InputGroup.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/InputGroup.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");







/**
 *
 * @property {InputGroupAppend} Append
 * @property {InputGroupPrepend} Prepend
 * @property {InputGroupText} Text
 * @property {InputGroupRadio} Radio
 * @property {InputGroupCheckbox} Checkbox
 */

var InputGroup =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(InputGroup, _React$Component);

  function InputGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = InputGroup.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        bsPrefix = _this$props.bsPrefix,
        size = _this$props.size,
        className = _this$props.className,
        _this$props$as = _this$props.as,
        Component = _this$props$as === void 0 ? 'div' : _this$props$as,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["bsPrefix", "size", "className", "as"]);

    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix, size && bsPrefix + "-" + size)
    }));
  };

  return InputGroup;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

var InputGroupAppend = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('input-group-append');
var InputGroupPrepend = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('input-group-prepend');
var InputGroupText = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_5__["default"])('input-group-text', {
  Component: 'span'
});

var InputGroupCheckbox = function InputGroupCheckbox(props) {
  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(InputGroupText, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("input", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    type: "checkbox"
  }, props)));
};

var InputGroupRadio = function InputGroupRadio(props) {
  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(InputGroupText, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("input", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    type: "radio"
  }, props)));
};

var DecoratedInputGroup = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__["createBootstrapComponent"])(InputGroup, 'input-group');
DecoratedInputGroup.Text = InputGroupText;
DecoratedInputGroup.Radio = InputGroupRadio;
DecoratedInputGroup.Checkbox = InputGroupCheckbox;
DecoratedInputGroup.Append = InputGroupAppend;
DecoratedInputGroup.Prepend = InputGroupPrepend;
/* harmony default export */ __webpack_exports__["default"] = (DecoratedInputGroup);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Jumbotron.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Jumbotron.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");






var defaultProps = {
  fluid: false
};

var Jumbotron =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Jumbotron, _React$Component);

  function Jumbotron() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Jumbotron.prototype;

  _proto.render = function render() {
    var _classes;

    var _this$props = this.props,
        _this$props$as = _this$props.as,
        Component = _this$props$as === void 0 ? 'div' : _this$props$as,
        className = _this$props.className,
        fluid = _this$props.fluid,
        bsPrefix = _this$props.bsPrefix,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["as", "className", "fluid", "bsPrefix"]);

    var classes = (_classes = {}, _classes[bsPrefix] = true, _classes[bsPrefix + "-fluid"] = fluid, _classes);
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(className, classes)
    }));
  };

  return Jumbotron;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

Jumbotron.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["createBootstrapComponent"])(Jumbotron, 'jumbotron'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ListGroup.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ListGroup.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _AbstractNav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AbstractNav */ "./node_modules/react-bootstrap/es/AbstractNav.js");
/* harmony import */ var _ListGroupItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ListGroupItem */ "./node_modules/react-bootstrap/es/ListGroupItem.js");










var ListGroup =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(ListGroup, _React$Component);

  function ListGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ListGroup.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        bsPrefix = _this$props.bsPrefix,
        variant = _this$props.variant,
        _this$props$as = _this$props.as,
        as = _this$props$as === void 0 ? 'div' : _this$props$as,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["className", "bsPrefix", "variant", "as"]);

    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_AbstractNav__WEBPACK_IMPORTED_MODULE_7__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      as: as,
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix, variant && bsPrefix + "-" + variant)
    }));
  };

  return ListGroup;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

ListGroup.defaultProps = {
  variant: null
};
var DecoratedListGroup = Object(uncontrollable__WEBPACK_IMPORTED_MODULE_5__["default"])(Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__["createBootstrapComponent"])(ListGroup, 'list-group'), {
  activeKey: 'onSelect'
});
DecoratedListGroup.Item = _ListGroupItem__WEBPACK_IMPORTED_MODULE_8__["default"];
/* harmony default export */ __webpack_exports__["default"] = (DecoratedListGroup);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ListGroupItem.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ListGroupItem.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _AbstractNavItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AbstractNavItem */ "./node_modules/react-bootstrap/es/AbstractNavItem.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/es/SelectableContext.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");









var ListGroupItem =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(ListGroupItem, _React$Component);

  function ListGroupItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          disabled = _this$props.disabled;

      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (onClick) onClick(event);
    };

    return _this;
  }

  var _proto = ListGroupItem.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        bsPrefix = _this$props2.bsPrefix,
        active = _this$props2.active,
        disabled = _this$props2.disabled,
        className = _this$props2.className,
        variant = _this$props2.variant,
        action = _this$props2.action,
        as = _this$props2.as,
        eventKey = _this$props2.eventKey,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props2, ["bsPrefix", "active", "disabled", "className", "variant", "action", "as", "eventKey"]);

    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_AbstractNavItem__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      eventKey: Object(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["makeEventKey"])(eventKey, props.href) // eslint-disable-next-line
      ,
      as: as || (action ? props.href ? 'a' : 'button' : 'div'),
      onClick: this.handleClick,
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix, active && 'active', disabled && 'disabled', variant && bsPrefix + "-" + variant, action && bsPrefix + "-action")
    }));
  };

  return ListGroupItem;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

ListGroupItem.defaultProps = {
  variant: null,
  active: false,
  disabled: false
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_7__["createBootstrapComponent"])(ListGroupItem, 'list-group-item'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Media.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Media.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");






var Media = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "as"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'media');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix)
  }));
});
Media.displayName = 'Media';
Media.Body = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_4__["default"])('media-body');
/* harmony default export */ __webpack_exports__["default"] = (Media);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Modal.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Modal.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dom_helpers_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dom-helpers/events */ "./node_modules/dom-helpers/events/index.js");
/* harmony import */ var dom_helpers_events__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_events__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dom-helpers/ownerDocument */ "./node_modules/dom-helpers/ownerDocument.js");
/* harmony import */ var dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var dom_helpers_util_inDOM__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dom-helpers/util/inDOM */ "./node_modules/dom-helpers/util/inDOM.js");
/* harmony import */ var dom_helpers_util_inDOM__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_util_inDOM__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! dom-helpers/util/scrollbarSize */ "./node_modules/dom-helpers/util/scrollbarSize.js");
/* harmony import */ var dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_overlays_Modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-overlays/Modal */ "./node_modules/react-overlays/Modal.js");
/* harmony import */ var react_overlays_Modal__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_overlays_Modal__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/es/Fade.js");
/* harmony import */ var _ModalBody__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ModalBody */ "./node_modules/react-bootstrap/es/ModalBody.js");
/* harmony import */ var _ModalDialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ModalDialog */ "./node_modules/react-bootstrap/es/ModalDialog.js");
/* harmony import */ var _ModalFooter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ModalFooter */ "./node_modules/react-bootstrap/es/ModalFooter.js");
/* harmony import */ var _ModalHeader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ModalHeader */ "./node_modules/react-bootstrap/es/ModalHeader.js");
/* harmony import */ var _ModalTitle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ModalTitle */ "./node_modules/react-bootstrap/es/ModalTitle.js");
/* harmony import */ var _utils_BootstrapModalManager__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils/BootstrapModalManager */ "./node_modules/react-bootstrap/es/utils/BootstrapModalManager.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _ModalContext__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ModalContext */ "./node_modules/react-bootstrap/es/ModalContext.js");



















var defaultProps = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: _ModalDialog__WEBPACK_IMPORTED_MODULE_12__["default"],
  manager: new _utils_BootstrapModalManager__WEBPACK_IMPORTED_MODULE_16__["default"]()
};
/* eslint-disable no-use-before-define, react/no-multi-comp */

function DialogTransition(props) {
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_Fade__WEBPACK_IMPORTED_MODULE_10__["default"], props);
}

function BackdropTransition(props) {
  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_Fade__WEBPACK_IMPORTED_MODULE_10__["default"], props);
}
/* eslint-enable no-use-before-define */


var Modal =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Modal, _React$Component);

  function Modal(_props, context) {
    var _this;

    _this = _React$Component.call(this, _props, context) || this;

    _this.setModalRef = function (ref) {
      _this._modal = ref;
    };

    _this.handleDialogMouseDown = function () {
      _this._waitingForMouseUp = true;
    };

    _this.handleMouseUp = function (e) {
      if (_this._waitingForMouseUp && e.target === _this._modal.dialog) {
        _this._ignoreBackdropClick = true;
      }

      _this._waitingForMouseUp = false;
    };

    _this.handleClick = function (e) {
      if (_this._ignoreBackdropClick || e.target !== e.currentTarget) {
        _this._ignoreBackdropClick = false;
        return;
      }

      _this.props.onHide();
    };

    _this.handleEnter = function (node) {
      var _this$props;

      if (node) {
        node.style.display = 'block';

        _this.updateDialogStyle(node);
      }

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (_this.props.onEnter) (_this$props = _this.props).onEnter.apply(_this$props, [node].concat(args));
    };

    _this.handleEntering = function (node) {
      var _this$props2;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (_this.props.onEntering) (_this$props2 = _this.props).onEntering.apply(_this$props2, [node].concat(args)); // FIXME: This should work even when animation is disabled.

      dom_helpers_events__WEBPACK_IMPORTED_MODULE_4___default.a.on(window, 'resize', _this.handleWindowResize);
    };

    _this.handleExited = function (node) {
      var _this$props3;

      if (node) node.style.display = ''; // RHL removes it sometimes

      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      if (_this.props.onExited) (_this$props3 = _this.props).onExited.apply(_this$props3, args); // FIXME: This should work even when animation is disabled.

      dom_helpers_events__WEBPACK_IMPORTED_MODULE_4___default.a.off(window, 'resize', _this.handleWindowResize);
    };

    _this.handleWindowResize = function () {
      _this.updateDialogStyle(_this._modal.dialog);
    };

    _this.renderBackdrop = function (props) {
      var _this$props4 = _this.props,
          bsPrefix = _this$props4.bsPrefix,
          backdropClassName = _this$props4.backdropClassName;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(bsPrefix + "-backdrop", backdropClassName)
      }));
    };

    _this.state = {
      style: {}
    };
    _this.modalContext = {
      onHide: function onHide() {
        return _this.props.onHide();
      }
    };
    return _this;
  }

  var _proto = Modal.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    // Clean up the listener if we need to.
    dom_helpers_events__WEBPACK_IMPORTED_MODULE_4___default.a.off(window, 'resize', this.handleWindowResize);
  };

  _proto.updateDialogStyle = function updateDialogStyle(node) {
    if (!dom_helpers_util_inDOM__WEBPACK_IMPORTED_MODULE_6___default.a) return;
    var manager = this.props.manager;
    var containerIsOverflowing = manager.isContainerOverflowing(this._modal);
    var modalIsOverflowing = node.scrollHeight > dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_5___default()(node).documentElement.clientHeight;
    this.setState({
      style: {
        paddingRight: containerIsOverflowing && !modalIsOverflowing ? dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_7___default()() : undefined,
        paddingLeft: !containerIsOverflowing && modalIsOverflowing ? dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_7___default()() : undefined
      }
    });
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        bsPrefix = _this$props5.bsPrefix,
        className = _this$props5.className,
        style = _this$props5.style,
        dialogClassName = _this$props5.dialogClassName,
        children = _this$props5.children,
        Dialog = _this$props5.dialogAs,
        show = _this$props5.show,
        animation = _this$props5.animation,
        backdrop = _this$props5.backdrop,
        keyboard = _this$props5.keyboard,
        manager = _this$props5.manager,
        onEscapeKeyDown = _this$props5.onEscapeKeyDown,
        onShow = _this$props5.onShow,
        onHide = _this$props5.onHide,
        container = _this$props5.container,
        autoFocus = _this$props5.autoFocus,
        enforceFocus = _this$props5.enforceFocus,
        restoreFocus = _this$props5.restoreFocus,
        onEntered = _this$props5.onEntered,
        onExit = _this$props5.onExit,
        onExiting = _this$props5.onExiting,
        _ = _this$props5.onExited,
        _1 = _this$props5.onEntering,
        _6 = _this$props5.onEnter,
        _4 = _this$props5.onEntering,
        _2 = _this$props5.backdropClassName,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props5, ["bsPrefix", "className", "style", "dialogClassName", "children", "dialogAs", "show", "animation", "backdrop", "keyboard", "manager", "onEscapeKeyDown", "onShow", "onHide", "container", "autoFocus", "enforceFocus", "restoreFocus", "onEntered", "onExit", "onExiting", "onExited", "onEntering", "onEnter", "onEntering", "backdropClassName"]);

    var clickHandler = backdrop === true ? this.handleClick : null;

    var baseModalStyle = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, style, this.state.style); // Sets `display` always block when `animation` is false


    if (!animation) baseModalStyle.display = 'block';
    return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_ModalContext__WEBPACK_IMPORTED_MODULE_18__["default"].Provider, {
      value: this.modalContext
    }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(react_overlays_Modal__WEBPACK_IMPORTED_MODULE_9___default.a, {
      show: show,
      backdrop: backdrop,
      container: container,
      keyboard: keyboard,
      autoFocus: autoFocus,
      enforceFocus: enforceFocus,
      restoreFocus: restoreFocus,
      onEscapeKeyDown: onEscapeKeyDown,
      onShow: onShow,
      onHide: onHide,
      onEntered: onEntered,
      onExit: onExit,
      onExiting: onExiting,
      manager: manager,
      ref: this.setModalRef,
      style: baseModalStyle,
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix),
      containerClassName: bsPrefix + "-open",
      transition: animation ? DialogTransition : undefined,
      backdropTransition: animation ? BackdropTransition : undefined,
      renderBackdrop: this.renderBackdrop,
      onClick: clickHandler,
      onMouseUp: this.handleMouseUp,
      onEnter: this.handleEnter,
      onEntering: this.handleEntering,
      onExited: this.handleExited
    }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(Dialog, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
      onMouseDown: this.handleDialogMouseDown,
      className: dialogClassName
    }), children)));
  };

  return Modal;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

Modal.defaultProps = defaultProps;
var DecoratedModal = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_17__["createBootstrapComponent"])(Modal, 'modal');
DecoratedModal.Body = _ModalBody__WEBPACK_IMPORTED_MODULE_11__["default"];
DecoratedModal.Header = _ModalHeader__WEBPACK_IMPORTED_MODULE_14__["default"];
DecoratedModal.Title = _ModalTitle__WEBPACK_IMPORTED_MODULE_15__["default"];
DecoratedModal.Footer = _ModalFooter__WEBPACK_IMPORTED_MODULE_13__["default"];
DecoratedModal.Dialog = _ModalDialog__WEBPACK_IMPORTED_MODULE_12__["default"];
DecoratedModal.TRANSITION_DURATION = 300;
DecoratedModal.BACKDROP_TRANSITION_DURATION = 150;
/* harmony default export */ __webpack_exports__["default"] = (DecoratedModal);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ModalBody.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ModalBody.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('modal-body'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ModalContext.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ModalContext.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ModalContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({
  onHide: function onHide() {}
});
/* harmony default export */ __webpack_exports__["default"] = (ModalContext);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ModalDialog.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ModalDialog.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");





var ModalDialog = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      centered = _ref.centered,
      size = _ref.size,
      children = _ref.children,
      scrollable = _ref.scrollable,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "centered", "size", "children", "scrollable"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'modal');
  var dialogClass = bsPrefix + "-dialog";
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(dialogClass, className, size && bsPrefix + "-" + size, centered && dialogClass + "-centered", scrollable && dialogClass + "-scrollable")
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(bsPrefix + "-content")
  }, children));
});
ModalDialog.displayName = 'ModalDialog';
/* harmony default export */ __webpack_exports__["default"] = (ModalDialog);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ModalFooter.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ModalFooter.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('modal-footer'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ModalHeader.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ModalHeader.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _CloseButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CloseButton */ "./node_modules/react-bootstrap/es/CloseButton.js");
/* harmony import */ var _ModalContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ModalContext */ "./node_modules/react-bootstrap/es/ModalContext.js");








var defaultProps = {
  closeLabel: 'Close',
  closeButton: false
};
var ModalHeader = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      closeLabel = _ref.closeLabel,
      closeButton = _ref.closeButton,
      onHide = _ref.onHide,
      className = _ref.className,
      children = _ref.children,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "closeLabel", "closeButton", "onHide", "className", "children"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'modal-header');
  var context = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_ModalContext__WEBPACK_IMPORTED_MODULE_7__["default"]);
  var handleClick = Object(_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__["default"])(function () {
    if (context) context.onHide();
    if (onHide) onHide();
  });
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix)
  }), children, closeButton && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_CloseButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: closeLabel,
    onClick: handleClick
  }));
});
ModalHeader.displayName = 'ModalHeader';
ModalHeader.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (ModalHeader);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ModalTitle.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ModalTitle.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");
/* harmony import */ var _utils_divWithClassName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/divWithClassName */ "./node_modules/react-bootstrap/es/utils/divWithClassName.js");


var DivStyledAsH4 = Object(_utils_divWithClassName__WEBPACK_IMPORTED_MODULE_1__["default"])('h4');
/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('modal-title', {
  Component: DivStyledAsH4
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Nav.js":
/*!************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Nav.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types_extra_lib_all__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types-extra/lib/all */ "./node_modules/prop-types-extra/lib/all.js");
/* harmony import */ var prop_types_extra_lib_all__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types_extra_lib_all__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var uncontrollable_hook__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uncontrollable/hook */ "./node_modules/uncontrollable/hook.js");
/* harmony import */ var uncontrollable_hook__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uncontrollable_hook__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _NavbarContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NavbarContext */ "./node_modules/react-bootstrap/es/NavbarContext.js");
/* harmony import */ var _CardContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CardContext */ "./node_modules/react-bootstrap/es/CardContext.js");
/* harmony import */ var _AbstractNav__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AbstractNav */ "./node_modules/react-bootstrap/es/AbstractNav.js");
/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./NavItem */ "./node_modules/react-bootstrap/es/NavItem.js");
/* harmony import */ var _NavLink__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./NavLink */ "./node_modules/react-bootstrap/es/NavLink.js");












var defaultProps = {
  justify: false,
  fill: false
};
var Nav = react__WEBPACK_IMPORTED_MODULE_4___default.a.forwardRef(function (uncontrolledProps, ref) {
  var _classNames;

  var _useUncontrolled = uncontrollable_hook__WEBPACK_IMPORTED_MODULE_5___default()(uncontrolledProps, {
    activeKey: 'onSelect'
  }),
      _useUncontrolled$as = _useUncontrolled.as,
      as = _useUncontrolled$as === void 0 ? 'div' : _useUncontrolled$as,
      bsPrefix = _useUncontrolled.bsPrefix,
      variant = _useUncontrolled.variant,
      fill = _useUncontrolled.fill,
      justify = _useUncontrolled.justify,
      navbar = _useUncontrolled.navbar,
      className = _useUncontrolled.className,
      children = _useUncontrolled.children,
      activeKey = _useUncontrolled.activeKey,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_useUncontrolled, ["as", "bsPrefix", "variant", "fill", "justify", "navbar", "className", "children", "activeKey"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__["useBootstrapPrefix"])(bsPrefix, 'nav');
  var navbarBsPrefix, cardHeaderBsPrefix;
  var navbarContext = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(_NavbarContext__WEBPACK_IMPORTED_MODULE_7__["default"]);
  var cardContext = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(_CardContext__WEBPACK_IMPORTED_MODULE_8__["default"]);

  if (navbarContext) {
    navbarBsPrefix = navbarContext.bsPrefix;
    navbar = navbar == null ? true : navbar;
  } else if (cardContext) {
    cardHeaderBsPrefix = cardContext.cardHeaderBsPrefix;
  }

  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_AbstractNav__WEBPACK_IMPORTED_MODULE_9__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    as: as,
    ref: ref,
    activeKey: activeKey,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, (_classNames = {}, _classNames[bsPrefix] = !navbar, _classNames[navbarBsPrefix + "-nav"] = navbar, _classNames[cardHeaderBsPrefix + "-" + variant] = !!cardHeaderBsPrefix, _classNames[bsPrefix + "-" + variant] = !!variant, _classNames[bsPrefix + "-fill"] = fill, _classNames[bsPrefix + "-justified"] = justify, _classNames))
  }, props), children);
});
Nav.displayName = 'Nav';
Nav.defaultProps = defaultProps;
Nav.Item = _NavItem__WEBPACK_IMPORTED_MODULE_10__["default"];
Nav.Link = _NavLink__WEBPACK_IMPORTED_MODULE_11__["default"];
Nav._Nav = Nav; // for Testing until enzyme is working with context

/* harmony default export */ __webpack_exports__["default"] = (Nav);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/NavContext.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/NavContext.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var NavContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(null);
/* harmony default export */ __webpack_exports__["default"] = (NavContext);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/NavDropdown.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/NavDropdown.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/react-bootstrap/es/Dropdown.js");
/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NavItem */ "./node_modules/react-bootstrap/es/NavItem.js");
/* harmony import */ var _NavLink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NavLink */ "./node_modules/react-bootstrap/es/NavLink.js");








var NavDropdown =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(NavDropdown, _React$Component);

  function NavDropdown() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = NavDropdown.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        id = _this$props.id,
        title = _this$props.title,
        children = _this$props.children,
        bsPrefix = _this$props.bsPrefix,
        rootCloseEvent = _this$props.rootCloseEvent,
        menuRole = _this$props.menuRole,
        disabled = _this$props.disabled,
        active = _this$props.active,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["id", "title", "children", "bsPrefix", "rootCloseEvent", "menuRole", "disabled", "active"]);

    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      as: _NavItem__WEBPACK_IMPORTED_MODULE_5__["default"]
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Toggle, {
      id: id,
      eventKey: null,
      active: active,
      disabled: disabled,
      childBsPrefix: bsPrefix,
      as: _NavLink__WEBPACK_IMPORTED_MODULE_6__["default"]
    }, title), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Menu, {
      role: menuRole,
      rootCloseEvent: rootCloseEvent
    }, children));
  };

  return NavDropdown;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

NavDropdown.Item = _Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Item;
NavDropdown.Divider = _Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Divider;
NavDropdown.Header = _Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Header;
/* harmony default export */ __webpack_exports__["default"] = (NavDropdown);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/NavItem.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/NavItem.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");





var NavItem = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef( // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'div' : _ref$as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "children", "as"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'nav-item');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix)
  }), children);
});
NavItem.displayName = 'NavItem';
/* harmony default export */ __webpack_exports__["default"] = (NavItem);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/NavLink.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/NavLink.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/es/SafeAnchor.js");
/* harmony import */ var _AbstractNavItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AbstractNavItem */ "./node_modules/react-bootstrap/es/AbstractNavItem.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");







var defaultProps = {
  disabled: false,
  as: _SafeAnchor__WEBPACK_IMPORTED_MODULE_4__["default"]
};
var NavLink = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      disabled = _ref.disabled,
      className = _ref.className,
      href = _ref.href,
      eventKey = _ref.eventKey,
      onSelect = _ref.onSelect,
      as = _ref.as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "disabled", "className", "href", "eventKey", "onSelect", "as"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_6__["useBootstrapPrefix"])(bsPrefix, 'nav-link');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_AbstractNavItem__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    href: href,
    ref: ref,
    eventKey: eventKey,
    as: as,
    disabled: disabled,
    onSelect: onSelect,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix, disabled && 'disabled')
  }));
});
NavLink.displayName = 'NavLink';
NavLink.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (NavLink);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Navbar.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Navbar.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");
/* harmony import */ var _NavbarBrand__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NavbarBrand */ "./node_modules/react-bootstrap/es/NavbarBrand.js");
/* harmony import */ var _NavbarCollapse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NavbarCollapse */ "./node_modules/react-bootstrap/es/NavbarCollapse.js");
/* harmony import */ var _NavbarToggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NavbarToggle */ "./node_modules/react-bootstrap/es/NavbarToggle.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _NavbarContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./NavbarContext */ "./node_modules/react-bootstrap/es/NavbarContext.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/es/SelectableContext.js");













var defaultProps = {
  expand: true,
  variant: 'light',
  collapseOnSelect: false
};

var Navbar =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Navbar, _React$Component);

  function Navbar() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;

    _this.handleCollapse = function () {
      var _this$props = _this.props,
          onToggle = _this$props.onToggle,
          expanded = _this$props.expanded,
          collapseOnSelect = _this$props.collapseOnSelect,
          onSelect = _this$props.onSelect;
      if (onSelect) onSelect.apply(void 0, arguments);

      if (collapseOnSelect && expanded) {
        onToggle(false);
      }
    };

    _this.handleToggle = function () {
      var _this$props2 = _this.props,
          onToggle = _this$props2.onToggle,
          expanded = _this$props2.expanded;
      onToggle(!expanded);
    };

    _this.state = {
      navbarContext: {
        onToggle: _this.handleToggle
      }
    };
    return _this;
  }

  Navbar.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var bsPrefix = _ref.bsPrefix,
        expanded = _ref.expanded;
    return {
      navbarContext: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, prevState.navbarContext, {
        bsPrefix: bsPrefix,
        expanded: expanded
      })
    };
  };

  var _proto = Navbar.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        bsPrefix = _this$props3.bsPrefix,
        expand = _this$props3.expand,
        variant = _this$props3.variant,
        bg = _this$props3.bg,
        fixed = _this$props3.fixed,
        sticky = _this$props3.sticky,
        className = _this$props3.className,
        children = _this$props3.children,
        _this$props3$as = _this$props3.as,
        Component = _this$props3$as === void 0 ? 'nav' : _this$props3$as,
        _1 = _this$props3.expanded,
        _2 = _this$props3.onToggle,
        _3 = _this$props3.onSelect,
        _4 = _this$props3.collapseOnSelect,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props3, ["bsPrefix", "expand", "variant", "bg", "fixed", "sticky", "className", "children", "as", "expanded", "onToggle", "onSelect", "collapseOnSelect"]); // will result in some false positives but that seems better
    // than false negatives. strict `undefined` check allows explicit
    // "nulling" of the role if the user really doesn't want one


    if (props.role === undefined && Component !== 'nav') {
      props.role = 'navigation';
    }

    var expandClass = bsPrefix + "-expand";
    if (typeof expand === 'string') expandClass = expandClass + "-" + expand;
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_NavbarContext__WEBPACK_IMPORTED_MODULE_11__["default"].Provider, {
      value: this.state.navbarContext
    }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_SelectableContext__WEBPACK_IMPORTED_MODULE_12__["default"].Provider, {
      value: this.handleCollapse
    }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix, expand && expandClass, variant && bsPrefix + "-" + variant, bg && "bg-" + bg, sticky && "sticky-" + sticky, fixed && "fixed-" + fixed)
    }), children)));
  };

  return Navbar;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

Navbar.defaultProps = defaultProps;
var DecoratedNavbar = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_10__["createBootstrapComponent"])(Object(uncontrollable__WEBPACK_IMPORTED_MODULE_5__["default"])(Navbar, {
  expanded: 'onToggle'
}), 'navbar');
DecoratedNavbar.Brand = _NavbarBrand__WEBPACK_IMPORTED_MODULE_7__["default"];
DecoratedNavbar.Toggle = _NavbarToggle__WEBPACK_IMPORTED_MODULE_9__["default"];
DecoratedNavbar.Collapse = _NavbarCollapse__WEBPACK_IMPORTED_MODULE_8__["default"];
DecoratedNavbar.Text = Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_6__["default"])('navbar-text', {
  Component: 'span'
});
/* harmony default export */ __webpack_exports__["default"] = (DecoratedNavbar);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/NavbarBrand.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/NavbarBrand.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");





var NavbarBrand = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      as = _ref.as,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "as"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'navbar-brand');
  var Component = as || (props.href ? 'a' : 'span');
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix)
  }));
});
NavbarBrand.displayName = 'NavbarBrand';
/* harmony default export */ __webpack_exports__["default"] = (NavbarBrand);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/NavbarCollapse.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/NavbarCollapse.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Collapse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Collapse */ "./node_modules/react-bootstrap/es/Collapse.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _NavbarContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NavbarContext */ "./node_modules/react-bootstrap/es/NavbarContext.js");






var NavbarCollapse = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      bsPrefix = _ref.bsPrefix,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["children", "bsPrefix"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'navbar-collapse');
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_NavbarContext__WEBPACK_IMPORTED_MODULE_5__["default"].Consumer, null, function (context) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Collapse__WEBPACK_IMPORTED_MODULE_3__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      in: !!(context && context.expanded)
    }, props), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      ref: ref,
      className: bsPrefix
    }, children));
  });
});
NavbarCollapse.displayName = 'NavbarCollapse';
/* harmony default export */ __webpack_exports__["default"] = (NavbarCollapse);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/NavbarContext.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/NavbarContext.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(null));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/NavbarToggle.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/NavbarToggle.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _NavbarContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NavbarContext */ "./node_modules/react-bootstrap/es/NavbarContext.js");







var defaultProps = {
  label: 'Toggle navigation'
};
var NavbarToggle = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      label = _ref.label,
      _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'button' : _ref$as,
      onClick = _ref.onClick,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "children", "label", "as", "onClick"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'navbar-toggler');

  var _ref2 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_NavbarContext__WEBPACK_IMPORTED_MODULE_6__["default"]) || {},
      onToggle = _ref2.onToggle,
      expanded = _ref2.expanded;

  var handleClick = Object(_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__["default"])(function (e) {
    if (onClick) onClick(e);
    if (onToggle) onToggle();
  });

  if (Component === 'button') {
    props.type = 'button';
  }

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    onClick: handleClick,
    "aria-label": label,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix, !!expanded && 'collapsed')
  }), children || react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: bsPrefix + "-icon"
  }));
});
NavbarToggle.displayName = 'NavbarToggle';
NavbarToggle.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (NavbarToggle);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Overlay.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Overlay.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_overlays_Overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-overlays/Overlay */ "./node_modules/react-overlays/Overlay.js");
/* harmony import */ var react_overlays_Overlay__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_overlays_Overlay__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/es/Fade.js");







var defaultProps = {
  transition: _Fade__WEBPACK_IMPORTED_MODULE_6__["default"],
  rootClose: false,
  show: false,
  placement: 'top'
};

function wrapRefs(props, arrowProps) {
  var ref = props.ref;
  var aRef = arrowProps.ref;

  props.ref = ref.__wrapped || (ref.__wrapped = function (r) {
    return ref(Object(react_dom__WEBPACK_IMPORTED_MODULE_3__["findDOMNode"])(r));
  });

  arrowProps.ref = aRef.__wrapped || (aRef.__wrapped = function (r) {
    return aRef(Object(react_dom__WEBPACK_IMPORTED_MODULE_3__["findDOMNode"])(r));
  });
}

function Overlay(_ref) {
  var overlay = _ref.children,
      transition = _ref.transition,
      outerProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["children", "transition"]);

  transition = transition === true ? _Fade__WEBPACK_IMPORTED_MODULE_6__["default"] : transition || null;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_overlays_Overlay__WEBPACK_IMPORTED_MODULE_5___default.a, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, outerProps, {
    transition: transition
  }), function (_ref2) {
    var overlayProps = _ref2.props,
        arrowProps = _ref2.arrowProps,
        show = _ref2.show,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref2, ["props", "arrowProps", "show"]);

    wrapRefs(overlayProps, arrowProps);
    if (typeof overlay === 'function') return overlay(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, overlayProps, {
      show: show,
      arrowProps: arrowProps
    }));
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(overlay, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, overlayProps, {
      arrowProps: arrowProps,
      className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(overlay.props.className, !transition && show && 'show'),
      style: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, overlay.props.style, overlayProps.style)
    }));
  });
}

Overlay.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Overlay);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/OverlayTrigger.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/OverlayTrigger.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var dom_helpers_query_contains__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/query/contains */ "./node_modules/dom-helpers/query/contains.js");
/* harmony import */ var dom_helpers_query_contains__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_query_contains__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Overlay */ "./node_modules/react-bootstrap/es/Overlay.js");









var RefHolder =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(RefHolder, _React$Component);

  function RefHolder() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = RefHolder.prototype;

  _proto.render = function render() {
    return this.props.children;
  };

  return RefHolder;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

var normalizeDelay = function normalizeDelay(delay) {
  return delay && typeof delay === 'object' ? delay : {
    show: delay,
    hide: delay
  };
};

var defaultProps = {
  defaultOverlayShown: false,
  trigger: ['hover', 'focus']
}; // eslint-disable-next-line react/no-multi-comp

var OverlayTrigger =
/*#__PURE__*/
function (_React$Component2) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(OverlayTrigger, _React$Component2);

  function OverlayTrigger(props, context) {
    var _this;

    _this = _React$Component2.call(this, props, context) || this;

    _this.getTarget = function () {
      return react_dom__WEBPACK_IMPORTED_MODULE_5___default.a.findDOMNode(_this.trigger.current);
    };

    _this.handleShow = function () {
      clearTimeout(_this._timeout);
      _this._hoverState = 'show';
      var delay = normalizeDelay(_this.props.delay);

      if (!delay.show) {
        _this.show();

        return;
      }

      _this._timeout = setTimeout(function () {
        if (_this._hoverState === 'show') _this.show();
      }, delay.show);
    };

    _this.handleHide = function () {
      clearTimeout(_this._timeout);
      _this._hoverState = 'hide';
      var delay = normalizeDelay(_this.props.delay);

      if (!delay.hide) {
        _this.hide();

        return;
      }

      _this._timeout = setTimeout(function () {
        if (_this._hoverState === 'hide') _this.hide();
      }, delay.hide);
    };

    _this.handleFocus = function (e) {
      var _this$getChildProps = _this.getChildProps(),
          onFocus = _this$getChildProps.onFocus;

      _this.handleShow(e);

      if (onFocus) onFocus(e);
    };

    _this.handleBlur = function (e) {
      var _this$getChildProps2 = _this.getChildProps(),
          onBlur = _this$getChildProps2.onBlur;

      _this.handleHide(e);

      if (onBlur) onBlur(e);
    };

    _this.handleClick = function (e) {
      var _this$getChildProps3 = _this.getChildProps(),
          onClick = _this$getChildProps3.onClick;

      if (_this.state.show) _this.hide();else _this.show();
      if (onClick) onClick(e);
    };

    _this.handleMouseOver = function (e) {
      _this.handleMouseOverOut(_this.handleShow, e, 'fromElement');
    };

    _this.handleMouseOut = function (e) {
      return _this.handleMouseOverOut(_this.handleHide, e, 'toElement');
    };

    _this.trigger = react__WEBPACK_IMPORTED_MODULE_4___default.a.createRef();
    _this.state = {
      show: !!props.defaultShow
    }; // We add aria-describedby in the case where the overlay is a role="tooltip"
    // for other cases describedby isn't appropriate (e.g. a popover with inputs) so we don't add it.

    _this.ariaModifier = {
      enabled: true,
      order: 900,
      fn: function fn(data) {
        var popper = data.instance.popper;

        var target = _this.getTarget();

        if (!_this.state.show || !target) return data;
        var role = popper.getAttribute('role') || '';

        if (popper.id && role.toLowerCase() === 'tooltip') {
          target.setAttribute('aria-describedby', popper.id);
        }

        return data;
      }
    };
    return _this;
  }

  var _proto2 = OverlayTrigger.prototype;

  _proto2.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this._timeout);
  };

  _proto2.getChildProps = function getChildProps() {
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.Children.only(this.props.children).props;
  };

  // Simple implementation of mouseEnter and mouseLeave.
  // React's built version is broken: https://github.com/facebook/react/issues/4251
  // for cases when the trigger is disabled and mouseOut/Over can cause flicker
  // moving from one child element to another.
  _proto2.handleMouseOverOut = function handleMouseOverOut(handler, e, relatedNative) {
    var target = e.currentTarget;
    var related = e.relatedTarget || e.nativeEvent[relatedNative];

    if ((!related || related !== target) && !dom_helpers_query_contains__WEBPACK_IMPORTED_MODULE_3___default()(target, related)) {
      handler(e);
    }
  };

  _proto2.hide = function hide() {
    this.setState({
      show: false
    });
  };

  _proto2.show = function show() {
    this.setState({
      show: true
    });
  };

  _proto2.render = function render() {
    var _this$props = this.props,
        trigger = _this$props.trigger,
        overlay = _this$props.overlay,
        children = _this$props.children,
        _this$props$popperCon = _this$props.popperConfig,
        popperConfig = _this$props$popperCon === void 0 ? {} : _this$props$popperCon,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["trigger", "overlay", "children", "popperConfig"]);

    delete props.delay;
    delete props.defaultShow;
    var child = react__WEBPACK_IMPORTED_MODULE_4___default.a.Children.only(children);
    var triggerProps = {};
    var triggers = trigger == null ? [] : [].concat(trigger);

    if (triggers.indexOf('click') !== -1) {
      triggerProps.onClick = this.handleClick;
    }

    if (triggers.indexOf('focus') !== -1) {
      triggerProps.onFocus = this.handleShow;
      triggerProps.onBlur = this.handleHide;
    }

    if (triggers.indexOf('hover') !== -1) {
       true ? warning__WEBPACK_IMPORTED_MODULE_6___default()(triggers.length >= 1, '[react-bootstrap] Specifying only the `"hover"` trigger limits the ' + 'visibility of the overlay to just mouse users. Consider also ' + 'including the `"focus"` trigger so that touch and keyboard only ' + 'users can see the overlay as well.') : undefined;
      triggerProps.onMouseOver = this.handleMouseOver;
      triggerProps.onMouseOut = this.handleMouseOut;
    }

    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(RefHolder, {
      ref: this.trigger
    }, Object(react__WEBPACK_IMPORTED_MODULE_4__["cloneElement"])(child, triggerProps)), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Overlay__WEBPACK_IMPORTED_MODULE_7__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      popperConfig: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, popperConfig, {
        modifiers: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, popperConfig.modifiers, {
          ariaModifier: this.ariaModifier
        })
      }),
      show: this.state.show,
      onHide: this.handleHide,
      target: this.getTarget
    }), overlay));
  };

  return OverlayTrigger;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

OverlayTrigger.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (OverlayTrigger);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/PageItem.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/PageItem.js ***!
  \*****************************************************/
/*! exports provided: default, First, Prev, Ellipsis, Next, Last */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "First", function() { return First; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Prev", function() { return Prev; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ellipsis", function() { return Ellipsis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Next", function() { return Next; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Last", function() { return Last; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/es/SafeAnchor.js");




/* eslint-disable react/no-multi-comp */



var defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)'
};
function PageItem(_ref) {
  var active = _ref.active,
      disabled = _ref.disabled,
      className = _ref.className,
      style = _ref.style,
      activeLabel = _ref.activeLabel,
      children = _ref.children,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, ["active", "disabled", "className", "style", "activeLabel", "children"]);

  var Component = active || disabled ? 'span' : _SafeAnchor__WEBPACK_IMPORTED_MODULE_5__["default"];
  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("li", {
    style: style,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, 'page-item', {
      active: active,
      disabled: disabled
    })
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    className: "page-link",
    disabled: disabled
  }, props), children, active && activeLabel && react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
    className: "sr-only"
  }, activeLabel)));
}
PageItem.defaultProps = defaultProps;

function createButton(name, defaultValue, label) {
  var _class, _temp;

  if (label === void 0) {
    label = name;
  }

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_class, _React$Component);

    function _class() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = _class.prototype;

    _proto.render = function render() {
      var _this$props = this.props,
          children = _this$props.children,
          props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(_this$props, ["children"]);

      delete props.active;
      return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(PageItem, props, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
        "aria-hidden": "true"
      }, children || defaultValue), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
        className: "sr-only"
      }, label));
    };

    return _class;
  }(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component), _class.displayName = name, _temp;
}

var First = createButton('First', "\xAB");
var Prev = createButton('Prev', "\u2039", 'Previous');
var Ellipsis = createButton('Ellipsis', "\u2026", 'More');
var Next = createButton('Next', "\u203A");
var Last = createButton('Last', "\xBB");

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Pagination.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Pagination.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _PageItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PageItem */ "./node_modules/react-bootstrap/es/PageItem.js");







/**
 * @property {PageItem} Item
 * @property {PageItem} First
 * @property {PageItem} Prev
 * @property {PageItem} Ellipsis
 * @property {PageItem} Next
 * @property {PageItem} Last
 */

var Pagination =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Pagination, _React$Component);

  function Pagination() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Pagination.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        bsPrefix = _this$props.bsPrefix,
        className = _this$props.className,
        children = _this$props.children,
        size = _this$props.size,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["bsPrefix", "className", "children", "size"]);

    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("ul", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix, size && bsPrefix + "-" + size)
    }), children);
  };

  return Pagination;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

var DecoratedPagination = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["createBootstrapComponent"])(Pagination, 'pagination');
DecoratedPagination.First = _PageItem__WEBPACK_IMPORTED_MODULE_6__["First"];
DecoratedPagination.Prev = _PageItem__WEBPACK_IMPORTED_MODULE_6__["Prev"];
DecoratedPagination.Ellipsis = _PageItem__WEBPACK_IMPORTED_MODULE_6__["Ellipsis"];
DecoratedPagination.Item = _PageItem__WEBPACK_IMPORTED_MODULE_6__["default"];
DecoratedPagination.Next = _PageItem__WEBPACK_IMPORTED_MODULE_6__["Next"];
DecoratedPagination.Last = _PageItem__WEBPACK_IMPORTED_MODULE_6__["Last"];
/* harmony default export */ __webpack_exports__["default"] = (DecoratedPagination);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Popover.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Popover.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types-extra/lib/isRequiredForA11y */ "./node_modules/prop-types-extra/lib/isRequiredForA11y.js");
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");






var defaultProps = {
  placement: 'right'
};

function Popover(_ref) {
  var bsPrefix = _ref.bsPrefix,
      innerRef = _ref.innerRef,
      placement = _ref.placement,
      className = _ref.className,
      style = _ref.style,
      title = _ref.title,
      children = _ref.children,
      arrowProps = _ref.arrowProps,
      _ = _ref.scheduleUpdate,
      _1 = _ref.outOfBoundaries,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "innerRef", "placement", "className", "style", "title", "children", "arrowProps", "scheduleUpdate", "outOfBoundaries"]);

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    role: "tooltip",
    ref: innerRef,
    style: style,
    "x-placement": placement,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix, "bs-popover-" + placement)
  }, props), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "arrow"
  }, arrowProps)), title && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: bsPrefix + "-header h3"
  }, title), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: bsPrefix + "-body"
  }, children));
}

Popover.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["createBootstrapComponent"])(Popover, 'popover'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ProgressBar.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ProgressBar.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _utils_ElementChildren__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/ElementChildren */ "./node_modules/react-bootstrap/es/utils/ElementChildren.js");







var ROUND_PRECISION = 1000;
/**
 * Validate that children, if any, are instances of `<ProgressBar>`.
 */

function onlyProgressBar(props, propName, componentName) {
  var children = props[propName];

  if (!children) {
    return null;
  }

  var error = null;
  react__WEBPACK_IMPORTED_MODULE_4___default.a.Children.forEach(children, function (child) {
    if (error) {
      return;
    }
    /**
     * Compare types in a way that works with libraries that patch and proxy
     * components like react-hot-loader.
     *
     * see https://github.com/gaearon/react-hot-loader#checking-element-types
     */


    var element = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(DecoratedProgressBar, null);
    if (child.type === element.type) return;
    var childIdentifier = react__WEBPACK_IMPORTED_MODULE_4___default.a.isValidElement(child) ? child.type.displayName || child.type.name || child.type : child;
    error = new Error("Children of " + componentName + " can contain only ProgressBar " + ("components. Found " + childIdentifier + "."));
  });
  return error;
}

var defaultProps = {
  min: 0,
  max: 100,
  animated: false,
  isChild: false,
  srOnly: false,
  striped: false
};

function getPercentage(now, min, max) {
  var percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

var ProgressBar =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(ProgressBar, _React$Component);

  function ProgressBar() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ProgressBar.prototype;

  _proto.renderProgressBar = function renderProgressBar(_ref) {
    var _classNames;

    var min = _ref.min,
        now = _ref.now,
        max = _ref.max,
        label = _ref.label,
        srOnly = _ref.srOnly,
        striped = _ref.striped,
        animated = _ref.animated,
        className = _ref.className,
        style = _ref.style,
        variant = _ref.variant,
        bsPrefix = _ref.bsPrefix,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["min", "now", "max", "label", "srOnly", "striped", "animated", "className", "style", "variant", "bsPrefix"]);

    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      role: "progressbar",
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix + "-bar", (_classNames = {}, _classNames["bg-" + variant] = variant, _classNames[bsPrefix + "-bar-animated"] = animated, _classNames[bsPrefix + "-bar-striped"] = animated || striped, _classNames)),
      style: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        width: getPercentage(now, min, max) + "%"
      }, style),
      "aria-valuenow": now,
      "aria-valuemin": min,
      "aria-valuemax": max
    }), srOnly ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
      className: "sr-only"
    }, label) : label);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isChild = _this$props.isChild,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["isChild"]);

    if (isChild) {
      return this.renderProgressBar(props);
    }

    var min = props.min,
        now = props.now,
        max = props.max,
        label = props.label,
        srOnly = props.srOnly,
        striped = props.striped,
        animated = props.animated,
        bsPrefix = props.bsPrefix,
        variant = props.variant,
        className = props.className,
        children = props.children,
        wrapperProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(props, ["min", "now", "max", "label", "srOnly", "striped", "animated", "bsPrefix", "variant", "className", "children"]);

    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, wrapperProps, {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix)
    }), children ? Object(_utils_ElementChildren__WEBPACK_IMPORTED_MODULE_6__["map"])(children, function (child) {
      return Object(react__WEBPACK_IMPORTED_MODULE_4__["cloneElement"])(child, {
        isChild: true
      });
    }) : this.renderProgressBar({
      min: min,
      now: now,
      max: max,
      label: label,
      srOnly: srOnly,
      striped: striped,
      animated: animated,
      bsPrefix: bsPrefix,
      variant: variant
    }));
  };

  return ProgressBar;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

ProgressBar.defaultProps = defaultProps;
var DecoratedProgressBar = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["createBootstrapComponent"])(ProgressBar, 'progress');
/* harmony default export */ __webpack_exports__["default"] = (DecoratedProgressBar);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ResponsiveEmbed.js":
/*!************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ResponsiveEmbed.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");






var defaultProps = {
  aspectRatio: '1by1'
};

var ResponsiveEmbed =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(ResponsiveEmbed, _React$Component);

  function ResponsiveEmbed() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ResponsiveEmbed.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        bsPrefix = _this$props.bsPrefix,
        className = _this$props.className,
        children = _this$props.children,
        aspectRatio = _this$props.aspectRatio,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["bsPrefix", "className", "children", "aspectRatio"]);

    var child = react__WEBPACK_IMPORTED_MODULE_4___default.a.Children.only(children);
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(bsPrefix, className, aspectRatio && bsPrefix + "-" + aspectRatio)
    }), react__WEBPACK_IMPORTED_MODULE_4___default.a.cloneElement(child, {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(child.props.className, bsPrefix + "-item")
    }));
  };

  return ResponsiveEmbed;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

ResponsiveEmbed.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["createBootstrapComponent"])(ResponsiveEmbed, 'embed-responsive'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Row.js":
/*!************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Row.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");







var Row =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Row, _React$Component);

  function Row() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Row.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        bsPrefix = _this$props.bsPrefix,
        noGutters = _this$props.noGutters,
        _this$props$as = _this$props.as,
        Component = _this$props$as === void 0 ? 'div' : _this$props$as,
        className = _this$props.className,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["bsPrefix", "noGutters", "as", "className"]);

    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix, noGutters && 'no-gutters')
    }));
  };

  return Row;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

Row.defaultProps = {
  noGutters: false
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["createBootstrapComponent"])(Row, 'row'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/SafeAnchor.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/SafeAnchor.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_createChainedFunction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/createChainedFunction */ "./node_modules/react-bootstrap/es/utils/createChainedFunction.js");







function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, DropdownItems, etc.
 */


var SafeAnchor =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__["default"])(SafeAnchor, _React$Component);

  function SafeAnchor(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.handleClick = _this.handleClick.bind(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this));
    return _this;
  }

  var _proto = SafeAnchor.prototype;

  _proto.handleClick = function handleClick(event) {
    var _this$props = this.props,
        disabled = _this$props.disabled,
        href = _this$props.href,
        onClick = _this$props.onClick;

    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  _proto.handleKeyDown = function handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        _this$props2$as = _this$props2.as,
        Component = _this$props2$as === void 0 ? 'a' : _this$props2$as,
        disabled = _this$props2.disabled,
        onKeyDown = _this$props2.onKeyDown,
        innerRef = _this$props2.innerRef,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props2, ["as", "disabled", "onKeyDown", "innerRef"]);

    if (isTrivialHref(props.href)) {
      props.role = props.role || 'button'; // we want to make sure there is a href attribute on the node
      // otherwise, the cursor incorrectly styled (except with role='button')

      props.href = props.href || '#';
    }

    if (disabled) {
      props.tabIndex = -1;
      props['aria-disabled'] = true;
    }

    if (innerRef) props.ref = innerRef;
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      onClick: this.handleClick,
      onKeyDown: Object(_utils_createChainedFunction__WEBPACK_IMPORTED_MODULE_5__["default"])(this.handleKeyDown, onKeyDown)
    }));
  };

  return SafeAnchor;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (SafeAnchor);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/SelectableContext.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/SelectableContext.js ***!
  \**************************************************************/
/*! exports provided: makeEventKey, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeEventKey", function() { return makeEventKey; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var SelectableContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();
var makeEventKey = function makeEventKey(eventKey, href) {
  if (eventKey != null) return String(eventKey);
  return href || null;
};
/* harmony default export */ __webpack_exports__["default"] = (SelectableContext);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Spinner.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Spinner.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");







var Spinner =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Spinner, _React$Component);

  function Spinner() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Spinner.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        bsPrefix = _this$props.bsPrefix,
        variant = _this$props.variant,
        animation = _this$props.animation,
        size = _this$props.size,
        children = _this$props.children,
        _this$props$as = _this$props.as,
        Component = _this$props$as === void 0 ? 'div' : _this$props$as,
        className = _this$props.className,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["bsPrefix", "variant", "animation", "size", "children", "as", "className"]);

    var bsSpinnerPrefix = bsPrefix + "-" + animation;
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsSpinnerPrefix, size && bsSpinnerPrefix + "-" + size, variant && "text-" + variant)
    }), children);
  };

  return Spinner;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["createBootstrapComponent"])(Spinner, 'spinner'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/SplitButton.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/SplitButton.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Button */ "./node_modules/react-bootstrap/es/Button.js");
/* harmony import */ var _ButtonGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ButtonGroup */ "./node_modules/react-bootstrap/es/ButtonGroup.js");
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/react-bootstrap/es/Dropdown.js");







/**
 * @inherits Button, Dropdown
 */

var SplitButton =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(SplitButton, _React$Component);

  function SplitButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SplitButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        id = _this$props.id,
        bsPrefix = _this$props.bsPrefix,
        size = _this$props.size,
        variant = _this$props.variant,
        title = _this$props.title,
        toggleLabel = _this$props.toggleLabel,
        children = _this$props.children,
        onClick = _this$props.onClick,
        href = _this$props.href,
        target = _this$props.target,
        menuRole = _this$props.menuRole,
        rootCloseEvent = _this$props.rootCloseEvent,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["id", "bsPrefix", "size", "variant", "title", "toggleLabel", "children", "onClick", "href", "target", "menuRole", "rootCloseEvent"]);

    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      as: _ButtonGroup__WEBPACK_IMPORTED_MODULE_5__["default"]
    }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
      size: size,
      variant: variant,
      disabled: props.disabled,
      bsPrefix: bsPrefix,
      href: href,
      target: target,
      onClick: onClick
    }, title), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_6__["default"].Toggle, {
      split: true,
      id: id,
      size: size,
      variant: variant,
      disabled: props.disabled,
      childBsPrefix: bsPrefix
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
      className: "sr-only"
    }, toggleLabel)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_6__["default"].Menu, {
      role: menuRole,
      rootCloseEvent: rootCloseEvent
    }, children));
  };

  return SplitButton;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

SplitButton.defaultProps = {
  toggleLabel: 'Toggle dropdown'
};
/* harmony default export */ __webpack_exports__["default"] = (SplitButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Tab.js":
/*!************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Tab.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TabContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabContainer */ "./node_modules/react-bootstrap/es/TabContainer.js");
/* harmony import */ var _TabContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TabContent */ "./node_modules/react-bootstrap/es/TabContent.js");
/* harmony import */ var _TabPane__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TabPane */ "./node_modules/react-bootstrap/es/TabPane.js");





/* eslint-disable react/require-render-return, react/no-unused-prop-types */

var Tab =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Tab, _React$Component);

  function Tab() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tab.prototype;

  _proto.render = function render() {
    throw new Error('ReactBootstrap: The `Tab` component is not meant to be rendered! ' + "It's an abstract component that is only valid as a direct Child of the `Tabs` Component. " + 'For custom tabs components use TabPane and TabsContainer directly');
  };

  return Tab;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

Tab.Container = _TabContainer__WEBPACK_IMPORTED_MODULE_2__["default"];
Tab.Content = _TabContent__WEBPACK_IMPORTED_MODULE_3__["default"];
Tab.Pane = _TabPane__WEBPACK_IMPORTED_MODULE_4__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Tab);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/TabContainer.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/TabContainer.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _TabContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TabContext */ "./node_modules/react-bootstrap/es/TabContext.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/es/SelectableContext.js");







var TabContainer =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(TabContainer, _React$Component);

  function TabContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.getControlledId = function (key) {
      return _this.getKey(key, 'tabpane');
    };

    _this.getControllerId = function (key) {
      return _this.getKey(key, 'tab');
    };

    _this.state = {
      tabContext: {
        onSelect: _this.props.onSelect,
        activeKey: _this.props.activeKey,
        transition: _this.props.transition,
        mountOnEnter: _this.props.mountOnEnter,
        unmountOnExit: _this.props.unmountOnExit,
        getControlledId: _this.getControlledId,
        getControllerId: _this.getControllerId
      }
    };
    return _this;
  }

  TabContainer.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var activeKey = _ref.activeKey,
        mountOnEnter = _ref.mountOnEnter,
        unmountOnExit = _ref.unmountOnExit,
        transition = _ref.transition;
    return {
      tabContext: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, prevState.tabContext, {
        activeKey: activeKey,
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
        transition: transition
      })
    };
  };

  var _proto = TabContainer.prototype;

  _proto.getKey = function getKey(key, type) {
    var _this$props = this.props,
        generateChildId = _this$props.generateChildId,
        id = _this$props.id;
    if (generateChildId) return generateChildId(key, type);
    return id ? id + "-" + type + "-" + key : null;
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        onSelect = _this$props2.onSelect;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_TabContext__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
      value: this.state.tabContext
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_SelectableContext__WEBPACK_IMPORTED_MODULE_5__["default"].Provider, {
      value: onSelect
    }, children));
  };

  return TabContainer;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(uncontrollable__WEBPACK_IMPORTED_MODULE_3__["default"])(TabContainer, {
  activeKey: 'onSelect'
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/TabContent.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/TabContent.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");







var TabContent =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(TabContent, _React$Component);

  function TabContent() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = TabContent.prototype;

  _proto.render = function render() {
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    var _this$props = this.props,
        bsPrefix = _this$props.bsPrefix,
        _this$props$as = _this$props.as,
        Component = _this$props$as === void 0 ? 'div' : _this$props$as,
        className = _this$props.className,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["bsPrefix", "as", "className"]);

    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, bsPrefix)
    }));
  };

  return TabContent;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["createBootstrapComponent"])(TabContent, 'tab-content'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/TabContext.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/TabContext.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var TabContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(null);
/* harmony default export */ __webpack_exports__["default"] = (TabContext);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/TabPane.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/TabPane.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _TabContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TabContext */ "./node_modules/react-bootstrap/es/TabContext.js");
/* harmony import */ var _SelectableContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SelectableContext */ "./node_modules/react-bootstrap/es/SelectableContext.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/es/Fade.js");









function useTabContext(props) {
  var context = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_TabContext__WEBPACK_IMPORTED_MODULE_5__["default"]);
  if (!context) return props;

  var activeKey = context.activeKey,
      getControlledId = context.getControlledId,
      getControllerId = context.getControllerId,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(context, ["activeKey", "getControlledId", "getControllerId"]);

  var shouldTransition = props.transition !== false && rest.transition !== false;
  var key = Object(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["makeEventKey"])(props.eventKey);
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    active: props.active == null && key != null ? Object(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["makeEventKey"])(activeKey) === key : props.active,
    id: getControlledId(props.eventKey),
    'aria-labelledby': getControllerId(props.eventKey),
    transition: shouldTransition && (props.transition || rest.transition || _Fade__WEBPACK_IMPORTED_MODULE_7__["default"]),
    mountOnEnter: props.mountOnEnter != null ? props.mountOnEnter : rest.mountOnEnter,
    unmountOnExit: props.unmountOnExit != null ? props.unmountOnExit : rest.unmountOnExit
  });
}

var TabPane = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (props, ref) {
  var _useTabContext = useTabContext(props),
      bsPrefix = _useTabContext.bsPrefix,
      className = _useTabContext.className,
      active = _useTabContext.active,
      onEnter = _useTabContext.onEnter,
      onEntering = _useTabContext.onEntering,
      onEntered = _useTabContext.onEntered,
      onExit = _useTabContext.onExit,
      onExiting = _useTabContext.onExiting,
      onExited = _useTabContext.onExited,
      mountOnEnter = _useTabContext.mountOnEnter,
      unmountOnExit = _useTabContext.unmountOnExit,
      Transition = _useTabContext.transition,
      _useTabContext$as = _useTabContext.as,
      Component = _useTabContext$as === void 0 ? 'div' : _useTabContext$as,
      _ = _useTabContext.eventKey,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_useTabContext, ["bsPrefix", "className", "active", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "mountOnEnter", "unmountOnExit", "transition", "as", "eventKey"]);

  var prefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__["useBootstrapPrefix"])(bsPrefix, 'tab-pane');
  if (!active && unmountOnExit) return null;
  var pane = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, {
    ref: ref,
    role: "tabpanel",
    "aria-hidden": !active,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix, {
      active: active
    })
  }));
  if (Transition) pane = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Transition, {
    in: active,
    onEnter: onEnter,
    onEntering: onEntering,
    onEntered: onEntered,
    onExit: onExit,
    onExiting: onExiting,
    onExited: onExited,
    mountOnEnter: mountOnEnter,
    unmountOnExit: mountOnEnter
  }, pane); // We provide an empty the TabContext so `<Nav>`s in `<TabPane>`s don't
  // conflict with the top level one.

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_TabContext__WEBPACK_IMPORTED_MODULE_5__["default"].Provider, {
    value: null
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_SelectableContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
    value: null
  }, pane));
});
TabPane.displayName = 'TabPane';
/* harmony default export */ __webpack_exports__["default"] = (TabPane);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Table.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Table.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");







var Table =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Table, _React$Component);

  function Table() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Table.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        bsPrefix = _this$props.bsPrefix,
        className = _this$props.className,
        striped = _this$props.striped,
        bordered = _this$props.bordered,
        borderless = _this$props.borderless,
        hover = _this$props.hover,
        size = _this$props.size,
        variant = _this$props.variant,
        responsive = _this$props.responsive,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["bsPrefix", "className", "striped", "bordered", "borderless", "hover", "size", "variant", "responsive"]);

    var classes = classnames__WEBPACK_IMPORTED_MODULE_3___default()(bsPrefix, className, variant && bsPrefix + "-" + variant, size && bsPrefix + "-" + size, striped && bsPrefix + "-striped", bordered && bsPrefix + "-bordered", borderless && bsPrefix + "-borderless", hover && bsPrefix + "-hover");
    var table = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("table", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      className: classes
    }));

    if (responsive) {
      var responsiveClass = bsPrefix + "-responsive";

      if (typeof responsive === 'string') {
        responsiveClass = responsiveClass + "-" + responsive;
      }

      return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
        className: responsiveClass
      }, table);
    }

    return table;
  };

  return Table;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["createBootstrapComponent"])(Table, 'table'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Tabs.js":
/*!*************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Tabs.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types-extra/lib/isRequiredForA11y */ "./node_modules/prop-types-extra/lib/isRequiredForA11y.js");
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Nav */ "./node_modules/react-bootstrap/es/Nav.js");
/* harmony import */ var _NavLink__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NavLink */ "./node_modules/react-bootstrap/es/NavLink.js");
/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NavItem */ "./node_modules/react-bootstrap/es/NavItem.js");
/* harmony import */ var _TabContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TabContainer */ "./node_modules/react-bootstrap/es/TabContainer.js");
/* harmony import */ var _TabContent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TabContent */ "./node_modules/react-bootstrap/es/TabContent.js");
/* harmony import */ var _TabPane__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./TabPane */ "./node_modules/react-bootstrap/es/TabPane.js");
/* harmony import */ var _utils_ElementChildren__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/ElementChildren */ "./node_modules/react-bootstrap/es/utils/ElementChildren.js");













var TabContainer = _TabContainer__WEBPACK_IMPORTED_MODULE_9__["default"].ControlledComponent;
var defaultProps = {
  variant: 'tabs',
  mountOnEnter: false,
  unmountOnExit: false
};

function getDefaultActiveKey(children) {
  var defaultActiveKey;
  Object(_utils_ElementChildren__WEBPACK_IMPORTED_MODULE_12__["forEach"])(children, function (child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(Tabs, _React$Component);

  function Tabs() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Tabs.prototype;

  _proto.renderTab = function renderTab(child) {
    var _child$props = child.props,
        title = _child$props.title,
        eventKey = _child$props.eventKey,
        disabled = _child$props.disabled,
        tabClassName = _child$props.tabClassName;

    if (title == null) {
      return null;
    }

    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_NavItem__WEBPACK_IMPORTED_MODULE_8__["default"], {
      as: _NavLink__WEBPACK_IMPORTED_MODULE_7__["default"],
      eventKey: eventKey,
      disabled: disabled,
      className: tabClassName
    }, title);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        id = _this$props.id,
        onSelect = _this$props.onSelect,
        transition = _this$props.transition,
        mountOnEnter = _this$props.mountOnEnter,
        unmountOnExit = _this$props.unmountOnExit,
        children = _this$props.children,
        _this$props$activeKey = _this$props.activeKey,
        activeKey = _this$props$activeKey === void 0 ? getDefaultActiveKey(children) : _this$props$activeKey,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["id", "onSelect", "transition", "mountOnEnter", "unmountOnExit", "children", "activeKey"]);

    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(TabContainer, {
      id: id,
      activeKey: activeKey,
      onSelect: onSelect,
      transition: transition,
      mountOnEnter: mountOnEnter,
      unmountOnExit: unmountOnExit
    }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Nav__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      role: "tablist",
      as: "nav"
    }), Object(_utils_ElementChildren__WEBPACK_IMPORTED_MODULE_12__["map"])(children, this.renderTab)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_TabContent__WEBPACK_IMPORTED_MODULE_10__["default"], null, Object(_utils_ElementChildren__WEBPACK_IMPORTED_MODULE_12__["map"])(children, function (child) {
      var childProps = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, child.props);

      delete childProps.title;
      delete childProps.disabled;
      delete childProps.tabClassName;
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_TabPane__WEBPACK_IMPORTED_MODULE_11__["default"], childProps);
    })));
  };

  return Tabs;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

Tabs.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Object(uncontrollable__WEBPACK_IMPORTED_MODULE_5__["default"])(Tabs, {
  activeKey: 'onSelect'
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ThemeProvider.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ThemeProvider.js ***!
  \**********************************************************/
/*! exports provided: useBootstrapPrefix, createBootstrapComponent, ThemeConsumer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useBootstrapPrefix", function() { return useBootstrapPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBootstrapComponent", function() { return createBootstrapComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeConsumer", function() { return Consumer; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _restart_context_forwardRef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @restart/context/forwardRef */ "./node_modules/@restart/context/forwardRef.js");
/* harmony import */ var _restart_context_forwardRef__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_restart_context_forwardRef__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




var ThemeContext = react__WEBPACK_IMPORTED_MODULE_3___default.a.createContext(new Map());
var Consumer = ThemeContext.Consumer,
    Provider = ThemeContext.Provider;

var ThemeProvider =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(ThemeProvider, _React$Component);

  function ThemeProvider() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.prefixes = new Map();
    Object.keys(_this.props.prefixes).forEach(function (key) {
      _this.prefixes.set(key, _this.props.prefixes[key]);
    });
    return _this;
  }

  var _proto = ThemeProvider.prototype;

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Provider, {
      value: this.prefixes
    }, this.props.children);
  };

  return ThemeProvider;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

function useBootstrapPrefix(prefix, defaultPrefix) {
  var prefixes = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(ThemeContext);
  return prefix || prefixes.get(defaultPrefix) || defaultPrefix;
}

function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = {
    prefix: opts
  };
  var isClassy = Component.prototype && Component.prototype.isReactComponent; // If it's a functional component make sure we don't break it with a ref

  var _opts = opts,
      prefix = _opts.prefix,
      _opts$forwardRefAs = _opts.forwardRefAs,
      forwardRefAs = _opts$forwardRefAs === void 0 ? isClassy ? 'ref' : 'innerRef' : _opts$forwardRefAs;
  return _restart_context_forwardRef__WEBPACK_IMPORTED_MODULE_2___default()(function (_ref, ref) {
    var props = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _ref);

    props[forwardRefAs] = ref;
    var prefixes = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(ThemeContext);
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      // eslint-disable-next-line react/prop-types
      bsPrefix: props.bsPrefix || prefixes.get(prefix) || prefix
    }));
  }, {
    displayName: "Bootstrap(" + (Component.displayName || Component.name) + ")"
  });
}


/* harmony default export */ __webpack_exports__["default"] = (ThemeProvider);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Toast.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Toast.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/es/Fade.js");
/* harmony import */ var _ToastHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ToastHeader */ "./node_modules/react-bootstrap/es/ToastHeader.js");
/* harmony import */ var _ToastBody__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ToastBody */ "./node_modules/react-bootstrap/es/ToastBody.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _ToastContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ToastContext */ "./node_modules/react-bootstrap/es/ToastContext.js");









var defaultProps = {
  animation: true,
  autohide: false,
  delay: 3000,
  show: true,
  transition: _Fade__WEBPACK_IMPORTED_MODULE_4__["default"]
};

var Toast = function Toast(_ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      children = _ref.children,
      Transition = _ref.transition,
      show = _ref.show,
      animation = _ref.animation,
      delay = _ref.delay,
      autohide = _ref.autohide,
      onClose = _ref.onClose,
      innerRef = _ref.innerRef,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "className", "children", "transition", "show", "animation", "delay", "autohide", "onClose", "innerRef"]);

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (autohide && show) {
      var timer = setTimeout(function () {
        onClose();
      }, delay);
      return function () {
        clearTimeout(timer);
      };
    }

    return function () {
      return null;
    };
  }, [autohide, show]);
  var useAnimation = Transition && animation;
  var toast = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: innerRef,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(bsPrefix, className, !useAnimation && show && 'show'),
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true"
  }), children);
  var toastContext = {
    onClose: onClose
  };
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ToastContext__WEBPACK_IMPORTED_MODULE_8__["default"].Provider, {
    value: toastContext
  }, useAnimation ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Transition, {
    in: show
  }, toast) : toast);
};

Toast.defaultProps = defaultProps;
var DecoratedToast = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_7__["createBootstrapComponent"])(Toast, 'toast');
DecoratedToast.Body = _ToastBody__WEBPACK_IMPORTED_MODULE_6__["default"];
DecoratedToast.Header = _ToastHeader__WEBPACK_IMPORTED_MODULE_5__["default"];
/* harmony default export */ __webpack_exports__["default"] = (DecoratedToast);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ToastBody.js":
/*!******************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ToastBody.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/createWithBsPrefix */ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js");

/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('toast-body'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ToastContext.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ToastContext.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ToastContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({
  onClose: function onClose() {}
});
/* harmony default export */ __webpack_exports__["default"] = (ToastContext);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ToastHeader.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ToastHeader.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony import */ var _CloseButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CloseButton */ "./node_modules/react-bootstrap/es/CloseButton.js");
/* harmony import */ var _ToastContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ToastContext */ "./node_modules/react-bootstrap/es/ToastContext.js");








var defaultProps = {
  closeLabel: 'Close',
  closeButton: true
};

var ToastHeader = function ToastHeader(_ref) {
  var bsPrefix = _ref.bsPrefix,
      closeLabel = _ref.closeLabel,
      closeButton = _ref.closeButton,
      className = _ref.className,
      children = _ref.children,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "closeLabel", "closeButton", "className", "children"]);

  bsPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, 'toast-header');
  var context = Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_ToastContext__WEBPACK_IMPORTED_MODULE_7__["default"]);
  var handleClick = Object(_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__["default"])(function () {
    if (context) {
      context.onClose();
    }
  });
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(bsPrefix, className)
  }), children, closeButton && react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_CloseButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
    label: closeLabel,
    onClick: handleClick,
    className: "ml-2 mb-1",
    "data-dismiss": "toast"
  }));
};

ToastHeader.displayName = 'ToastHeader';
ToastHeader.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (ToastHeader);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ToggleButton.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ToggleButton.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Button */ "./node_modules/react-bootstrap/es/Button.js");







var noop = function noop() {};

var ToggleButton =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(ToggleButton, _React$Component);

  function ToggleButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      focused: false
    };

    _this.handleFocus = function (e) {
      if (e.target.tagName === 'INPUT') _this.setState({
        focused: true
      });
    };

    _this.handleBlur = function (e) {
      if (e.target.tagName === 'INPUT') _this.setState({
        focused: false
      });
    };

    return _this;
  }

  var _proto = ToggleButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        name = _this$props.name,
        className = _this$props.className,
        checked = _this$props.checked,
        type = _this$props.type,
        onChange = _this$props.onChange,
        value = _this$props.value,
        disabled = _this$props.disabled,
        inputRef = _this$props.inputRef,
        innerRef = _this$props.innerRef,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, ["children", "name", "className", "checked", "type", "onChange", "value", "disabled", "inputRef", "innerRef"]);

    var focused = this.state.focused;
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Button__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      ref: innerRef,
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(className, focused && 'focus', disabled && 'disabled'),
      type: null,
      active: !!checked,
      as: "label"
    }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("input", {
      name: name,
      type: type,
      value: value,
      ref: inputRef,
      autoComplete: "off",
      checked: !!checked,
      disabled: !!disabled,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onChange: onChange || noop
    }), children);
  };

  return ToggleButton;
}(react__WEBPACK_IMPORTED_MODULE_4___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_4___default.a.forwardRef(function (props, ref) {
  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(ToggleButton, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    innerRef: ref
  }, props));
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/ToggleButtonGroup.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/ToggleButtonGroup.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var uncontrollable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js");
/* harmony import */ var _utils_createChainedFunction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/createChainedFunction */ "./node_modules/react-bootstrap/es/utils/createChainedFunction.js");
/* harmony import */ var _utils_ElementChildren__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/ElementChildren */ "./node_modules/react-bootstrap/es/utils/ElementChildren.js");
/* harmony import */ var _ButtonGroup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ButtonGroup */ "./node_modules/react-bootstrap/es/ButtonGroup.js");
/* harmony import */ var _ToggleButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ToggleButton */ "./node_modules/react-bootstrap/es/ToggleButton.js");










var defaultProps = {
  type: 'radio'
};

var ToggleButtonGroup =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(ToggleButtonGroup, _React$Component);

  function ToggleButtonGroup() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ToggleButtonGroup.prototype;

  _proto.getValues = function getValues() {
    var value = this.props.value;
    return value == null ? [] : [].concat(value);
  };

  _proto.handleToggle = function handleToggle(value, event) {
    var _this$props = this.props,
        type = _this$props.type,
        onChange = _this$props.onChange;
    var values = this.getValues();
    var isActive = values.indexOf(value) !== -1;

    if (type === 'radio') {
      if (!isActive) onChange(value, event);
      return;
    }

    if (isActive) {
      onChange(values.filter(function (n) {
        return n !== value;
      }), event);
    } else {
      onChange([].concat(values, [value]), event);
    }
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        type = _this$props2.type,
        name = _this$props2.name,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props2, ["children", "type", "name"]);

    delete props.onChange;
    delete props.value;
    var values = this.getValues();
    !(type !== 'radio' || !!name) ?  true ? invariant__WEBPACK_IMPORTED_MODULE_4___default()(false, 'A `name` is required to group the toggle buttons when the `type` ' + 'is set to "radio"') : undefined : void 0;
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ButtonGroup__WEBPACK_IMPORTED_MODULE_8__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      toggle: true
    }), Object(_utils_ElementChildren__WEBPACK_IMPORTED_MODULE_7__["map"])(children, function (child) {
      var _child$props = child.props,
          value = _child$props.value,
          onChange = _child$props.onChange;

      var handler = function handler(e) {
        return _this.handleToggle(value, e);
      };

      return react__WEBPACK_IMPORTED_MODULE_3___default.a.cloneElement(child, {
        type: type,
        name: child.name || name,
        checked: values.indexOf(value) !== -1,
        onChange: Object(_utils_createChainedFunction__WEBPACK_IMPORTED_MODULE_6__["default"])(onChange, handler)
      });
    }));
  };

  return ToggleButtonGroup;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

ToggleButtonGroup.defaultProps = defaultProps;
var UncontrolledToggleButtonGroup = Object(uncontrollable__WEBPACK_IMPORTED_MODULE_5__["default"])(ToggleButtonGroup, {
  value: 'onChange'
});
UncontrolledToggleButtonGroup.Button = _ToggleButton__WEBPACK_IMPORTED_MODULE_9__["default"];
/* harmony default export */ __webpack_exports__["default"] = (UncontrolledToggleButtonGroup);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/Tooltip.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/es/Tooltip.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types-extra/lib/isRequiredForA11y */ "./node_modules/prop-types-extra/lib/isRequiredForA11y.js");
/* harmony import */ var prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types_extra_lib_isRequiredForA11y__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");






var defaultProps = {
  placement: 'right'
};

function Tooltip(_ref) {
  var bsPrefix = _ref.bsPrefix,
      innerRef = _ref.innerRef,
      placement = _ref.placement,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      arrowProps = _ref.arrowProps,
      _ = _ref.scheduleUpdate,
      _1 = _ref.outOfBoundaries,
      props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["bsPrefix", "innerRef", "placement", "className", "style", "children", "arrowProps", "scheduleUpdate", "outOfBoundaries"]);

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: innerRef,
    style: style,
    role: "tooltip",
    "x-placement": placement,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix, "bs-tooltip-" + placement)
  }, props), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "arrow"
  }, arrowProps)), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: bsPrefix + "-inner"
  }, children));
}

Tooltip.defaultProps = defaultProps;
/* harmony default export */ __webpack_exports__["default"] = (Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["createBootstrapComponent"])(Tooltip, 'tooltip'));

/***/ }),

/***/ "./node_modules/react-bootstrap/es/index.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/es/index.js ***!
  \**************************************************/
/*! exports provided: Accordion, Alert, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardColumns, CardDeck, CardImg, CardGroup, Carousel, CarouselItem, CloseButton, Col, Collapse, Dropdown, DropdownButton, DropdownItem, Fade, Form, FormControl, FormCheck, FormGroup, FormLabel, FormText, Container, Image, Figure, InputGroup, Jumbotron, ListGroup, ListGroupItem, Media, Modal, ModalBody, ModalDialog, ModalFooter, ModalTitle, Nav, Navbar, NavbarBrand, NavDropdown, NavItem, Overlay, OverlayTrigger, PageItem, Pagination, Popover, ProgressBar, ResponsiveEmbed, Row, SafeAnchor, Spinner, SplitButton, Tab, TabContainer, TabContent, Table, TabPane, Tabs, ThemeProvider, ToggleButton, ToggleButtonGroup, Tooltip, Toast, ToastBody, ToastHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Accordion */ "./node_modules/react-bootstrap/es/Accordion.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Accordion", function() { return _Accordion__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Alert */ "./node_modules/react-bootstrap/es/Alert.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Alert", function() { return _Alert__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Badge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Badge */ "./node_modules/react-bootstrap/es/Badge.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Badge", function() { return _Badge__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Breadcrumb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Breadcrumb */ "./node_modules/react-bootstrap/es/Breadcrumb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Breadcrumb", function() { return _Breadcrumb__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BreadcrumbItem */ "./node_modules/react-bootstrap/es/BreadcrumbItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbItem", function() { return _BreadcrumbItem__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Button */ "./node_modules/react-bootstrap/es/Button.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _Button__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _ButtonGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ButtonGroup */ "./node_modules/react-bootstrap/es/ButtonGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonGroup", function() { return _ButtonGroup__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _ButtonToolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ButtonToolbar */ "./node_modules/react-bootstrap/es/ButtonToolbar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonToolbar", function() { return _ButtonToolbar__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Card */ "./node_modules/react-bootstrap/es/Card.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return _Card__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _CardColumns__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CardColumns */ "./node_modules/react-bootstrap/es/CardColumns.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CardColumns", function() { return _CardColumns__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _CardDeck__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CardDeck */ "./node_modules/react-bootstrap/es/CardDeck.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CardDeck", function() { return _CardDeck__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _CardImg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./CardImg */ "./node_modules/react-bootstrap/es/CardImg.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CardImg", function() { return _CardImg__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _CardGroup__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./CardGroup */ "./node_modules/react-bootstrap/es/CardGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CardGroup", function() { return _CardGroup__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _Carousel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Carousel */ "./node_modules/react-bootstrap/es/Carousel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Carousel", function() { return _Carousel__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _CarouselItem__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./CarouselItem */ "./node_modules/react-bootstrap/es/CarouselItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CarouselItem", function() { return _CarouselItem__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _CloseButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./CloseButton */ "./node_modules/react-bootstrap/es/CloseButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CloseButton", function() { return _CloseButton__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _Col__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Col */ "./node_modules/react-bootstrap/es/Col.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Col", function() { return _Col__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _Collapse__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Collapse */ "./node_modules/react-bootstrap/es/Collapse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Collapse", function() { return _Collapse__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/react-bootstrap/es/Dropdown.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dropdown", function() { return _Dropdown__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _DropdownButton__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./DropdownButton */ "./node_modules/react-bootstrap/es/DropdownButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownButton", function() { return _DropdownButton__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _DropdownItem__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./DropdownItem */ "./node_modules/react-bootstrap/es/DropdownItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownItem", function() { return _DropdownItem__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/es/Fade.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fade", function() { return _Fade__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Form */ "./node_modules/react-bootstrap/es/Form.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return _Form__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _FormControl__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./FormControl */ "./node_modules/react-bootstrap/es/FormControl.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormControl", function() { return _FormControl__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _FormCheck__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./FormCheck */ "./node_modules/react-bootstrap/es/FormCheck.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormCheck", function() { return _FormCheck__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _FormGroup__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./FormGroup */ "./node_modules/react-bootstrap/es/FormGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormGroup", function() { return _FormGroup__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _FormLabel__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./FormLabel */ "./node_modules/react-bootstrap/es/FormLabel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormLabel", function() { return _FormLabel__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _FormText__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./FormText */ "./node_modules/react-bootstrap/es/FormText.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormText", function() { return _FormText__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./Container */ "./node_modules/react-bootstrap/es/Container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return _Container__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./Image */ "./node_modules/react-bootstrap/es/Image.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return _Image__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony import */ var _Figure__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./Figure */ "./node_modules/react-bootstrap/es/Figure.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Figure", function() { return _Figure__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony import */ var _InputGroup__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./InputGroup */ "./node_modules/react-bootstrap/es/InputGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputGroup", function() { return _InputGroup__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony import */ var _Jumbotron__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./Jumbotron */ "./node_modules/react-bootstrap/es/Jumbotron.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Jumbotron", function() { return _Jumbotron__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony import */ var _ListGroup__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./ListGroup */ "./node_modules/react-bootstrap/es/ListGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListGroup", function() { return _ListGroup__WEBPACK_IMPORTED_MODULE_33__["default"]; });

/* harmony import */ var _ListGroupItem__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./ListGroupItem */ "./node_modules/react-bootstrap/es/ListGroupItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListGroupItem", function() { return _ListGroupItem__WEBPACK_IMPORTED_MODULE_34__["default"]; });

/* harmony import */ var _Media__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./Media */ "./node_modules/react-bootstrap/es/Media.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Media", function() { return _Media__WEBPACK_IMPORTED_MODULE_35__["default"]; });

/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./Modal */ "./node_modules/react-bootstrap/es/Modal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return _Modal__WEBPACK_IMPORTED_MODULE_36__["default"]; });

/* harmony import */ var _ModalBody__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./ModalBody */ "./node_modules/react-bootstrap/es/ModalBody.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalBody", function() { return _ModalBody__WEBPACK_IMPORTED_MODULE_37__["default"]; });

/* harmony import */ var _ModalDialog__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./ModalDialog */ "./node_modules/react-bootstrap/es/ModalDialog.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalDialog", function() { return _ModalDialog__WEBPACK_IMPORTED_MODULE_38__["default"]; });

/* harmony import */ var _ModalFooter__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./ModalFooter */ "./node_modules/react-bootstrap/es/ModalFooter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalFooter", function() { return _ModalFooter__WEBPACK_IMPORTED_MODULE_39__["default"]; });

/* harmony import */ var _ModalTitle__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./ModalTitle */ "./node_modules/react-bootstrap/es/ModalTitle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalTitle", function() { return _ModalTitle__WEBPACK_IMPORTED_MODULE_40__["default"]; });

/* harmony import */ var _Nav__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./Nav */ "./node_modules/react-bootstrap/es/Nav.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Nav", function() { return _Nav__WEBPACK_IMPORTED_MODULE_41__["default"]; });

/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./Navbar */ "./node_modules/react-bootstrap/es/Navbar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Navbar", function() { return _Navbar__WEBPACK_IMPORTED_MODULE_42__["default"]; });

/* harmony import */ var _NavbarBrand__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./NavbarBrand */ "./node_modules/react-bootstrap/es/NavbarBrand.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavbarBrand", function() { return _NavbarBrand__WEBPACK_IMPORTED_MODULE_43__["default"]; });

/* harmony import */ var _NavDropdown__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./NavDropdown */ "./node_modules/react-bootstrap/es/NavDropdown.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavDropdown", function() { return _NavDropdown__WEBPACK_IMPORTED_MODULE_44__["default"]; });

/* harmony import */ var _NavItem__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./NavItem */ "./node_modules/react-bootstrap/es/NavItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavItem", function() { return _NavItem__WEBPACK_IMPORTED_MODULE_45__["default"]; });

/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./Overlay */ "./node_modules/react-bootstrap/es/Overlay.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Overlay", function() { return _Overlay__WEBPACK_IMPORTED_MODULE_46__["default"]; });

/* harmony import */ var _OverlayTrigger__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./OverlayTrigger */ "./node_modules/react-bootstrap/es/OverlayTrigger.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OverlayTrigger", function() { return _OverlayTrigger__WEBPACK_IMPORTED_MODULE_47__["default"]; });

/* harmony import */ var _PageItem__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./PageItem */ "./node_modules/react-bootstrap/es/PageItem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageItem", function() { return _PageItem__WEBPACK_IMPORTED_MODULE_48__["default"]; });

/* harmony import */ var _Pagination__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./Pagination */ "./node_modules/react-bootstrap/es/Pagination.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pagination", function() { return _Pagination__WEBPACK_IMPORTED_MODULE_49__["default"]; });

/* harmony import */ var _Popover__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./Popover */ "./node_modules/react-bootstrap/es/Popover.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Popover", function() { return _Popover__WEBPACK_IMPORTED_MODULE_50__["default"]; });

/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./ProgressBar */ "./node_modules/react-bootstrap/es/ProgressBar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProgressBar", function() { return _ProgressBar__WEBPACK_IMPORTED_MODULE_51__["default"]; });

/* harmony import */ var _ResponsiveEmbed__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./ResponsiveEmbed */ "./node_modules/react-bootstrap/es/ResponsiveEmbed.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResponsiveEmbed", function() { return _ResponsiveEmbed__WEBPACK_IMPORTED_MODULE_52__["default"]; });

/* harmony import */ var _Row__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./Row */ "./node_modules/react-bootstrap/es/Row.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return _Row__WEBPACK_IMPORTED_MODULE_53__["default"]; });

/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/es/SafeAnchor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SafeAnchor", function() { return _SafeAnchor__WEBPACK_IMPORTED_MODULE_54__["default"]; });

/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./Spinner */ "./node_modules/react-bootstrap/es/Spinner.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Spinner", function() { return _Spinner__WEBPACK_IMPORTED_MODULE_55__["default"]; });

/* harmony import */ var _SplitButton__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./SplitButton */ "./node_modules/react-bootstrap/es/SplitButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SplitButton", function() { return _SplitButton__WEBPACK_IMPORTED_MODULE_56__["default"]; });

/* harmony import */ var _Tab__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./Tab */ "./node_modules/react-bootstrap/es/Tab.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tab", function() { return _Tab__WEBPACK_IMPORTED_MODULE_57__["default"]; });

/* harmony import */ var _TabContainer__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./TabContainer */ "./node_modules/react-bootstrap/es/TabContainer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabContainer", function() { return _TabContainer__WEBPACK_IMPORTED_MODULE_58__["default"]; });

/* harmony import */ var _TabContent__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./TabContent */ "./node_modules/react-bootstrap/es/TabContent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabContent", function() { return _TabContent__WEBPACK_IMPORTED_MODULE_59__["default"]; });

/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./Table */ "./node_modules/react-bootstrap/es/Table.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return _Table__WEBPACK_IMPORTED_MODULE_60__["default"]; });

/* harmony import */ var _TabPane__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./TabPane */ "./node_modules/react-bootstrap/es/TabPane.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabPane", function() { return _TabPane__WEBPACK_IMPORTED_MODULE_61__["default"]; });

/* harmony import */ var _Tabs__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./Tabs */ "./node_modules/react-bootstrap/es/Tabs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return _Tabs__WEBPACK_IMPORTED_MODULE_62__["default"]; });

/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return _ThemeProvider__WEBPACK_IMPORTED_MODULE_63__["default"]; });

/* harmony import */ var _ToggleButton__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./ToggleButton */ "./node_modules/react-bootstrap/es/ToggleButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToggleButton", function() { return _ToggleButton__WEBPACK_IMPORTED_MODULE_64__["default"]; });

/* harmony import */ var _ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./ToggleButtonGroup */ "./node_modules/react-bootstrap/es/ToggleButtonGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToggleButtonGroup", function() { return _ToggleButtonGroup__WEBPACK_IMPORTED_MODULE_65__["default"]; });

/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./Tooltip */ "./node_modules/react-bootstrap/es/Tooltip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return _Tooltip__WEBPACK_IMPORTED_MODULE_66__["default"]; });

/* harmony import */ var _Toast__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./Toast */ "./node_modules/react-bootstrap/es/Toast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Toast", function() { return _Toast__WEBPACK_IMPORTED_MODULE_67__["default"]; });

/* harmony import */ var _ToastBody__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./ToastBody */ "./node_modules/react-bootstrap/es/ToastBody.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToastBody", function() { return _ToastBody__WEBPACK_IMPORTED_MODULE_68__["default"]; });

/* harmony import */ var _ToastHeader__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./ToastHeader */ "./node_modules/react-bootstrap/es/ToastHeader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToastHeader", function() { return _ToastHeader__WEBPACK_IMPORTED_MODULE_69__["default"]; });














































































































































/***/ }),

/***/ "./node_modules/react-bootstrap/es/utils/BootstrapModalManager.js":
/*!************************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/utils/BootstrapModalManager.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BootstrapModalManager; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/query/querySelectorAll */ "./node_modules/dom-helpers/query/querySelectorAll.js");
/* harmony import */ var dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dom_helpers_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dom-helpers/style */ "./node_modules/dom-helpers/style/index.js");
/* harmony import */ var dom_helpers_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_style__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/util/scrollbarSize */ "./node_modules/dom-helpers/util/scrollbarSize.js");
/* harmony import */ var dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_overlays_ModalManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-overlays/ModalManager */ "./node_modules/react-overlays/ModalManager.js");
/* harmony import */ var react_overlays_ModalManager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_overlays_ModalManager__WEBPACK_IMPORTED_MODULE_4__);





var Selector = {
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top',
  NAVBAR_TOGGLER: '.navbar-toggler'
};

var BootstrapModalManager =
/*#__PURE__*/
function (_ModalManager) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BootstrapModalManager, _ModalManager);

  function BootstrapModalManager() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _ModalManager.call.apply(_ModalManager, [this].concat(args)) || this;

    _this.adjustAndStore = function (prop, element, adjust) {
      var actual = element.style[prop];
      element.dataset[prop] = actual;
      dom_helpers_style__WEBPACK_IMPORTED_MODULE_2___default()(element, prop, parseFloat(dom_helpers_style__WEBPACK_IMPORTED_MODULE_2___default()(element, prop)) + adjust + "px");
    };

    _this.restore = function (prop, element) {
      var value = element.dataset[prop];

      if (value !== undefined) {
        delete element.dataset[prop];
        dom_helpers_style__WEBPACK_IMPORTED_MODULE_2___default()(element, prop, value);
      }
    };

    return _this;
  }

  var _proto = BootstrapModalManager.prototype;

  _proto.setContainerStyle = function setContainerStyle(containerState, container) {
    var _this2 = this;

    _ModalManager.prototype.setContainerStyle.call(this, containerState, container);

    if (!containerState.overflowing) return;
    var size = dom_helpers_util_scrollbarSize__WEBPACK_IMPORTED_MODULE_3___default()();
    dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_1___default()(container, Selector.FIXED_CONTENT).forEach(function (el) {
      return _this2.adjustAndStore('paddingRight', el, size);
    });
    dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_1___default()(container, Selector.STICKY_CONTENT).forEach(function (el) {
      return _this2.adjustAndStore('margingRight', el, -size);
    });
    dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_1___default()(container, Selector.NAVBAR_TOGGLER).forEach(function (el) {
      return _this2.adjustAndStore('margingRight', el, size);
    });
  };

  _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
    var _this3 = this;

    _ModalManager.prototype.removeContainerStyle.call(this, containerState, container);

    dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_1___default()(container, Selector.FIXED_CONTENT).forEach(function (el) {
      return _this3.restore('paddingRight', el);
    });
    dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_1___default()(container, Selector.STICKY_CONTENT).forEach(function (el) {
      return _this3.restore('margingRight', el);
    });
    dom_helpers_query_querySelectorAll__WEBPACK_IMPORTED_MODULE_1___default()(container, Selector.NAVBAR_TOGGLER).forEach(function (el) {
      return _this3.restore('margingRight', el);
    });
  };

  return BootstrapModalManager;
}(react_overlays_ModalManager__WEBPACK_IMPORTED_MODULE_4___default.a);



/***/ }),

/***/ "./node_modules/react-bootstrap/es/utils/ElementChildren.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/utils/ElementChildren.js ***!
  \******************************************************************/
/*! exports provided: map, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Iterates through children that are typically specified as `props.children`,
 * but only maps over children that are "valid elements".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 */

function map(children, func) {
  var index = 0;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.map(children, function (child) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(child) ? func(child, index++) : child;
  });
}
/**
 * Iterates through children that are "valid elements".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 */


function forEach(children, func) {
  var index = 0;
  react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.forEach(children, function (child) {
    if (react__WEBPACK_IMPORTED_MODULE_0___default.a.isValidElement(child)) func(child, index++);
  });
}



/***/ }),

/***/ "./node_modules/react-bootstrap/es/utils/createChainedFunction.js":
/*!************************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/utils/createChainedFunction.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (f) {
    return f != null;
  }).reduce(function (acc, f) {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (acc === null) return f;
    return function chainedFunction() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      acc.apply(this, args);
      f.apply(this, args);
    };
  }, null);
}

/* harmony default export */ __webpack_exports__["default"] = (createChainedFunction);

/***/ }),

/***/ "./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js":
/*!*********************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/utils/createWithBsPrefix.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createWithBsPrefix; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dom_helpers_util_camelize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dom-helpers/util/camelize */ "./node_modules/dom-helpers/util/camelize.js");
/* harmony import */ var dom_helpers_util_camelize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dom_helpers_util_camelize__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ThemeProvider */ "./node_modules/react-bootstrap/es/ThemeProvider.js");







var pascalCase = function pascalCase(str) {
  return str[0].toUpperCase() + dom_helpers_util_camelize__WEBPACK_IMPORTED_MODULE_4___default()(str).slice(1);
};

function createWithBsPrefix(prefix, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$displayName = _ref.displayName,
      displayName = _ref$displayName === void 0 ? pascalCase(prefix) : _ref$displayName,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'div' : _ref$Component,
      defaultProps = _ref.defaultProps;

  var BsComponent = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef( // eslint-disable-next-line react/prop-types
  function (_ref2, ref) {
    var className = _ref2.className,
        bsPrefix = _ref2.bsPrefix,
        _ref2$as = _ref2.as,
        Tag = _ref2$as === void 0 ? Component : _ref2$as,
        props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref2, ["className", "bsPrefix", "as"]);

    var resolvedPrefix = Object(_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__["useBootstrapPrefix"])(bsPrefix, prefix);
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Tag, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      ref: ref,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, resolvedPrefix)
    }, props));
  });
  BsComponent.defaultProps = defaultProps;
  BsComponent.displayName = displayName;
  return BsComponent;
}

/***/ }),

/***/ "./node_modules/react-bootstrap/es/utils/divWithClassName.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/utils/divWithClassName.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = (function (className) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.forwardRef(function (p, ref) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, p, {
      ref: ref,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(p.className, className)
    }));
  });
});

/***/ }),

/***/ "./node_modules/react-bootstrap/es/utils/triggerBrowserReflow.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-bootstrap/es/utils/triggerBrowserReflow.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return triggerBrowserReflow; });
// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
function triggerBrowserReflow(node) {
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}

/***/ }),

/***/ "./node_modules/react-context-toolbox/forwardRef.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-context-toolbox/forwardRef.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = forwardRef;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function forwardRef(renderFn, _ref) {
  var displayName = _ref.displayName,
      propTypes = _ref.propTypes,
      defaultProps = _ref.defaultProps,
      _ref$allowFallback = _ref.allowFallback,
      allowFallback = _ref$allowFallback === void 0 ? false : _ref$allowFallback;

  var render = function render(props, ref) {
    return renderFn(props, ref);
  };

  Object.assign(render, {
    displayName: displayName
  });
  if (_react.default.forwardRef || !allowFallback) return Object.assign(_react.default.forwardRef(render), {
    propTypes: propTypes,
    defaultProps: defaultProps
  });
  return Object.assign(function (props) {
    return render(props, null);
  }, {
    displayName: displayName,
    propTypes: propTypes,
    defaultProps: defaultProps
  });
}

/***/ }),

/***/ "./node_modules/react-context-toolbox/mapContextToProps.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-context-toolbox/mapContextToProps.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = mapContextToProps;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _forwardRef = _interopRequireDefault(__webpack_require__(/*! ./forwardRef */ "./node_modules/react-context-toolbox/forwardRef.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getDisplayName = function getDisplayName(Component) {
  var name = typeof Component === 'string' ? Component : Component.name || Component.displayName;
  return name ? "ContextTransform(" + name + ")" : 'ContextTransform';
};

var ensureConsumer = function ensureConsumer(c) {
  return c.Consumer || c;
};

function $mapContextToProps(_ref, Component) {
  var maybeArrayOfConsumers = _ref.consumers,
      mapToProps = _ref.mapToProps,
      displayName = _ref.displayName,
      _ref$forwardRefAs = _ref.forwardRefAs,
      forwardRefAs = _ref$forwardRefAs === void 0 ? 'ref' : _ref$forwardRefAs;
  var consumers = maybeArrayOfConsumers;

  if (!Array.isArray(maybeArrayOfConsumers)) {
    consumers = [maybeArrayOfConsumers];
  }

  var SingleConsumer = ensureConsumer(consumers[0]);

  function singleRender(props, ref) {
    var _extends2;

    var propsWithRef = _extends((_extends2 = {}, _extends2[forwardRefAs] = ref, _extends2), props);

    return _react.default.createElement(SingleConsumer, null, function (value) {
      return _react.default.createElement(Component, _extends({}, propsWithRef, mapToProps(value, props)));
    });
  }

  function multiRender(props, ref) {
    var _extends3;

    var propsWithRef = _extends((_extends3 = {}, _extends3[forwardRefAs] = ref, _extends3), props);

    return consumers.reduceRight(function (inner, Context) {
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var Consumer = ensureConsumer(Context);
        return _react.default.createElement(Consumer, null, function (value) {
          return inner.apply(void 0, args.concat([value]));
        });
      };
    }, function () {
      for (var _len2 = arguments.length, contexts = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        contexts[_key2] = arguments[_key2];
      }

      return _react.default.createElement(Component, _extends({}, propsWithRef, mapToProps.apply(void 0, contexts.concat([props]))));
    })();
  }

  var contextTransform = consumers.length === 1 ? singleRender : multiRender;
  return (0, _forwardRef.default)(contextTransform, {
    displayName: displayName || getDisplayName(Component)
  });
}

function mapContextToProps(maybeOpts, mapToProps, Component) {
  if (arguments.length === 2) return $mapContextToProps(maybeOpts, mapToProps);
  return $mapContextToProps({
    consumers: maybeOpts,
    mapToProps: mapToProps
  }, Component);
}

/***/ }),

/***/ "./node_modules/react-overlays/Dropdown.js":
/*!*************************************************!*\
  !*** ./node_modules/react-overlays/Dropdown.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _matches = _interopRequireDefault(__webpack_require__(/*! dom-helpers/query/matches */ "./node_modules/dom-helpers/query/matches.js"));

var _querySelectorAll = _interopRequireDefault(__webpack_require__(/*! dom-helpers/query/querySelectorAll */ "./node_modules/dom-helpers/query/querySelectorAll.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _uncontrollable = _interopRequireDefault(__webpack_require__(/*! uncontrollable */ "./node_modules/uncontrollable/esm/index.js"));

var Popper = _interopRequireWildcard(__webpack_require__(/*! react-popper */ "./node_modules/react-popper/lib/esm/index.js"));

var _DropdownContext = _interopRequireDefault(__webpack_require__(/*! ./DropdownContext */ "./node_modules/react-overlays/DropdownContext.js"));

var _DropdownMenu = _interopRequireDefault(__webpack_require__(/*! ./DropdownMenu */ "./node_modules/react-overlays/DropdownMenu.js"));

var _DropdownToggle = _interopRequireDefault(__webpack_require__(/*! ./DropdownToggle */ "./node_modules/react-overlays/DropdownToggle.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var propTypes = {
  /**
   * A render prop that returns the root dropdown element. The `props`
   * argument should spread through to an element containing _both_ the
   * menu and toggle in order to handle keyboard events for focus management.
   *
   * @type {Function ({
   *   props: {
   *     onKeyDown: (SyntheticEvent) => void,
   *   },
   * }) => React.Element}
   */
  children: _propTypes.default.func.isRequired,

  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   */
  drop: _propTypes.default.oneOf(['up', 'left', 'right', 'down']),

  /**
   * Controls the focus behavior for when the Dropdown is opened. Set to
   * `true` to always focus the first menu item, `keyboard` to focus only when
   * navigating via the keyboard, or `false` to disable completely
   *
   * The Default behavior is `false` **unless** the Menu has a `role="menu"`
   * where it will default to `keyboard` to match the recommended [ARIA Authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton).
   */
  focusFirstItemOnShow: _propTypes.default.oneOf([false, true, 'keyboard']),

  /**
   * A css slector string that will return __focusable__ menu items.
   * Selectors should be relative to the menu component:
   * e.g. ` > li:not('.disabled')`
   */
  itemSelector: _propTypes.default.string.isRequired,

  /**
   * Align the menu to the 'end' side of the placement side of the Dropdown toggle. The default placement is `top-start` or `bottom-start`.
   */
  alignEnd: _propTypes.default.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  show: _propTypes.default.bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(
   *   isOpen: boolean,
   *   event: SyntheticEvent,
   * ): void
   * ```
   *
   * @controllable show
   */
  onToggle: _propTypes.default.func
};
var defaultProps = {
  itemSelector: '* > *'
};
/**
 * `Dropdown` is set of structural components for building, accessible dropdown menus with close-on-click,
 * keyboard navigation, and correct focus handling. As with all the react-overlay's
 * components its BYOS (bring your own styles). Dropdown is primarily
 * built from three base components, you should compose to build your Dropdowns.
 *
 * - `Dropdown`, which wraps the menu and toggle, and handles keyboard navigation
 * - `Dropdown.Toggle` generally a button that triggers the menu opening
 * - `Dropdown.Menu` The overlaid, menu, positioned to the toggle with PopperJs
 */

var Dropdown =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Dropdown, _React$Component);

  Dropdown.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var drop = _ref.drop,
        alignEnd = _ref.alignEnd,
        show = _ref.show;
    var lastShow = prevState.context.show;
    return {
      lastShow: lastShow,
      context: _extends({}, prevState.context, {
        drop: drop,
        show: show,
        alignEnd: alignEnd
      })
    };
  };

  function Dropdown(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    _this.handleClick = function (event) {
      _this.toggleOpen(event);
    };

    _this.handleKeyDown = function (event) {
      var key = event.key,
          target = event.target; // Second only to https://github.com/twbs/bootstrap/blob/8cfbf6933b8a0146ac3fbc369f19e520bd1ebdac/js/src/dropdown.js#L400
      // in inscrutability

      var isInput = /input|textarea/i.test(target.tagName);

      if (isInput && (key === ' ' || key !== 'Escape' && _this.menu.contains(target))) {
        return;
      }

      _this._lastSourceEvent = event.type;

      switch (key) {
        case 'ArrowUp':
          {
            var next = _this.getNextFocusedChild(target, -1);

            if (next && next.focus) next.focus();
            event.preventDefault();
            return;
          }

        case 'ArrowDown':
          event.preventDefault();

          if (!_this.props.show) {
            _this.toggleOpen(event);
          } else {
            var _next = _this.getNextFocusedChild(target, 1);

            if (_next && _next.focus) _next.focus();
          }

          return;

        case 'Escape':
        case 'Tab':
          _this.props.onToggle(false, event);

          break;

        default:
      }
    };

    _this._focusInDropdown = false;
    _this.menu = null;
    _this.state = {
      context: {
        close: _this.handleClose,
        toggle: _this.handleClick,
        menuRef: function menuRef(r) {
          _this.menu = r;
        },
        toggleRef: function toggleRef(r) {
          var toggleNode = r && _reactDom.default.findDOMNode(r);

          _this.setState(function (_ref2) {
            var context = _ref2.context;
            return {
              context: _extends({}, context, {
                toggleNode: toggleNode
              })
            };
          });
        }
      }
    };
    return _this;
  }

  var _proto = Dropdown.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var show = this.props.show;
    var prevOpen = prevProps.show;

    if (show && !prevOpen) {
      this.maybeFocusFirst();
    }

    this._lastSourceEvent = null;

    if (!show && prevOpen) {
      // if focus hasn't already moved from the menu let's return it
      // to the toggle
      if (this._focusInDropdown) {
        this._focusInDropdown = false;
        this.focus();
      }
    }
  };

  _proto.getNextFocusedChild = function getNextFocusedChild(current, offset) {
    if (!this.menu) return null;
    var itemSelector = this.props.itemSelector;
    var items = (0, _querySelectorAll.default)(this.menu, itemSelector);
    var index = items.indexOf(current) + offset;
    index = Math.max(0, Math.min(index, items.length));
    return items[index];
  };

  _proto.hasMenuRole = function hasMenuRole() {
    return this.menu && (0, _matches.default)(this.menu, '[role=menu]');
  };

  _proto.focus = function focus() {
    var toggleNode = this.state.context.toggleNode;

    if (toggleNode && toggleNode.focus) {
      toggleNode.focus();
    }
  };

  _proto.maybeFocusFirst = function maybeFocusFirst() {
    var type = this._lastSourceEvent;
    var focusFirstItemOnShow = this.props.focusFirstItemOnShow;

    if (focusFirstItemOnShow == null) {
      focusFirstItemOnShow = this.hasMenuRole() ? 'keyboard' : false;
    }

    if (focusFirstItemOnShow === false || focusFirstItemOnShow === 'keyboard' && !/^key.+$/.test(type)) {
      return;
    }

    var itemSelector = this.props.itemSelector;
    var first = (0, _querySelectorAll.default)(this.menu, itemSelector)[0];
    if (first && first.focus) first.focus();
  };

  _proto.toggleOpen = function toggleOpen(event) {
    var show = !this.props.show;
    this.props.onToggle(show, event);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["children"]);

    delete props.onToggle;

    if (this.menu && this.state.lastShow && !this.props.show) {
      this._focusInDropdown = this.menu.contains(document.activeElement);
    }

    return _react.default.createElement(_DropdownContext.default.Provider, {
      value: this.state.context
    }, _react.default.createElement(Popper.Manager, null, children({
      props: {
        onKeyDown: this.handleKeyDown
      }
    })));
  };

  return Dropdown;
}(_react.default.Component);

Dropdown.displayName = 'ReactOverlaysDropdown';
Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
var UncontrolledDropdown = (0, _uncontrollable.default)(Dropdown, {
  show: 'onToggle'
});
UncontrolledDropdown.Menu = _DropdownMenu.default;
UncontrolledDropdown.Toggle = _DropdownToggle.default;
var _default = UncontrolledDropdown;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/react-overlays/DropdownContext.js":
/*!********************************************************!*\
  !*** ./node_modules/react-overlays/DropdownContext.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownContext = _react.default.createContext({
  menuRef: function menuRef() {},
  toggleRef: function toggleRef() {},
  onToggle: function onToggle() {},
  toggleNode: undefined,
  alignEnd: null,
  show: null,
  drop: null
});

var _default = DropdownContext;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/react-overlays/DropdownMenu.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-overlays/DropdownMenu.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactPopper = __webpack_require__(/*! react-popper */ "./node_modules/react-popper/lib/esm/index.js");

var _DropdownContext = _interopRequireDefault(__webpack_require__(/*! ./DropdownContext */ "./node_modules/react-overlays/DropdownContext.js"));

var _RootCloseWrapper = _interopRequireDefault(__webpack_require__(/*! ./RootCloseWrapper */ "./node_modules/react-overlays/RootCloseWrapper.js"));

var _mapContextToProps = _interopRequireDefault(__webpack_require__(/*! react-context-toolbox/mapContextToProps */ "./node_modules/react-context-toolbox/mapContextToProps.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownMenu, _React$Component);

  function DropdownMenu() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      toggleId: null
    };
    _this.popperIsInitialized = false;

    _this.handleClose = function (e) {
      if (!_this.props.onToggle) return;

      _this.props.onToggle(false, e);
    };

    return _this;
  }

  var _proto = DropdownMenu.prototype;

  _proto.getSnapshotBeforeUpdate = function getSnapshotBeforeUpdate(prevProps) {
    // If, to the best we can tell, this update won't reinitialize popper,
    // manually schedule an update
    var shouldUpdatePopper = !prevProps.show && this.props.show && this.popperIsInitialized && // a new reference node will already trigger this internally
    prevProps.toggleNode === this.props.toggleNode;

    if (this.props.show && this.props.usePopper && !this.popperIsInitialized) {
      this.popperIsInitialized = true;
    }

    return !!shouldUpdatePopper;
  };

  _proto.componentDidUpdate = function componentDidUpdate(_, __, shouldUpdatePopper) {
    if (shouldUpdatePopper && this.scheduleUpdate) {
      this.scheduleUpdate();
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        show = _this$props.show,
        flip = _this$props.flip,
        menuRef = _this$props.menuRef,
        alignEnd = _this$props.alignEnd,
        drop = _this$props.drop,
        usePopper = _this$props.usePopper,
        toggleNode = _this$props.toggleNode,
        rootCloseEvent = _this$props.rootCloseEvent,
        _this$props$popperCon = _this$props.popperConfig,
        popperConfig = _this$props$popperCon === void 0 ? {} : _this$props$popperCon;
    var placement = alignEnd ? 'bottom-end' : 'bottom-start';
    if (drop === 'up') placement = alignEnd ? 'top-end' : 'top-start';
    if (drop === 'right') placement = alignEnd ? 'right-end' : 'right-start';
    if (drop === 'left') placement = alignEnd ? 'left-end' : 'left-start';
    var menu = null;
    var menuProps = {
      ref: menuRef,
      'aria-labelledby': toggleNode && toggleNode.id
    };
    var childArgs = {
      show: show,
      alignEnd: alignEnd,
      close: this.handleClose
    };

    if (!usePopper) {
      menu = this.props.children(_extends({}, childArgs, {
        props: menuProps
      }));
    } else if (this.popperIsInitialized || show) {
      // Add it this way, so it doesn't override someones usage
      // with react-poppers <Reference>
      if (toggleNode) popperConfig.referenceElement = toggleNode;
      menu = _react.default.createElement(_reactPopper.Popper, _extends({}, popperConfig, {
        innerRef: menuRef,
        placement: placement,
        eventsEnabled: !!show,
        modifiers: _extends({
          flip: {
            enabled: !!flip
          }
        }, popperConfig.modifiers)
      }), function (_ref) {
        var ref = _ref.ref,
            style = _ref.style,
            popper = _objectWithoutPropertiesLoose(_ref, ["ref", "style"]);

        _this2.scheduleUpdate = popper.scheduleUpdate;
        return _this2.props.children(_extends({}, popper, childArgs, {
          props: _extends({}, menuProps, {
            ref: ref,
            style: style
          })
        }));
      });
    }

    return menu && _react.default.createElement(_RootCloseWrapper.default, {
      disabled: !show,
      event: rootCloseEvent,
      onRootClose: this.handleClose
    }, menu);
  };

  return DropdownMenu;
}(_react.default.Component);

DropdownMenu.displayName = 'ReactOverlaysDropdownMenu';
DropdownMenu.propTypes = {
  /**
   * A render prop that returns a Menu element. The `props`
   * argument should spread through to **a component that can accept a ref**.
   *
   * @type {Function ({
   *   show: boolean,
   *   alignEnd: boolean,
   *   close: (?SyntheticEvent) => void,
   *   placement: Placement,
   *   outOfBoundaries: ?boolean,
   *   scheduleUpdate: () => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     aria-labelledby: ?string
   *   },
   *   arrowProps: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *   },
   * }) => React.Element}
   */
  children: _propTypes.default.func.isRequired,

  /**
   * Controls the visible state of the menu, generally this is
   * provided by the parent `Dropdown` component,
   * but may also be specified as a prop directly.
   */
  show: _propTypes.default.bool,

  /**
   * Aligns the dropdown menu to the 'end' of it's placement position.
   * Generally this is provided by the parent `Dropdown` component,
   * but may also be specified as a prop directly.
   */
  alignEnd: _propTypes.default.bool,

  /**
   * Enables the Popper.js `flip` modifier, allowing the Dropdown to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip: _propTypes.default.bool,
  usePopper: _propTypes.default.oneOf([true, false]),

  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: _propTypes.default.object,

  /**
   * Override the default event used by RootCloseWrapper.
   */
  rootCloseEvent: _propTypes.default.string,

  /** @private */
  onToggle: _propTypes.default.func,

  /** @private */
  menuRef: _propTypes.default.func,

  /** @private */
  drop: _propTypes.default.string,

  /** @private */
  toggleNode: _propTypes.default.any
};
DropdownMenu.defaultProps = {
  usePopper: true
};
var DecoratedDropdownMenu = (0, _mapContextToProps.default)(_DropdownContext.default, function (_ref2, props) {
  var show = _ref2.show,
      alignEnd = _ref2.alignEnd,
      toggle = _ref2.toggle,
      drop = _ref2.drop,
      menuRef = _ref2.menuRef,
      toggleNode = _ref2.toggleNode;
  return {
    drop: drop,
    menuRef: menuRef,
    toggleNode: toggleNode,
    onToggle: toggle,
    show: show == null ? props.show : show,
    alignEnd: alignEnd == null ? props.alignEnd : alignEnd
  };
}, DropdownMenu);
var _default = DecoratedDropdownMenu;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/react-overlays/DropdownToggle.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-overlays/DropdownToggle.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _DropdownContext = _interopRequireDefault(__webpack_require__(/*! ./DropdownContext */ "./node_modules/react-overlays/DropdownContext.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  /**
   * A render prop that returns a Toggle element. The `props`
   * argument should spread through to **a component that can accept a ref**. Use
   * the `onToggle` argument to toggle the menu open or closed
   *
   * @type {Function ({
   *   show: boolean,
   *   toggle: (show: boolean) => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     aria-haspopup: true
   *     aria-expanded: boolean
   *   },
   * }) => React.Element}
   */
  children: _propTypes.default.func.isRequired
};

function DropdownToggle(_ref) {
  var children = _ref.children;
  return _react.default.createElement(_DropdownContext.default.Consumer, null, function (_ref2) {
    var show = _ref2.show,
        toggle = _ref2.toggle,
        toggleRef = _ref2.toggleRef;
    return children({
      show: show,
      toggle: toggle,
      props: {
        ref: toggleRef,
        'aria-haspopup': true,
        'aria-expanded': !!show
      }
    });
  });
}

DropdownToggle.displayName = 'ReactOverlaysDropdownToggle';
DropdownToggle.propTypes = propTypes;
var _default = DropdownToggle;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/react-overlays/Overlay.js":
/*!************************************************!*\
  !*** ./node_modules/react-overlays/Overlay.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _elementType = _interopRequireDefault(__webpack_require__(/*! prop-types-extra/lib/elementType */ "./node_modules/prop-types-extra/lib/elementType.js"));

var _componentOrElement = _interopRequireDefault(__webpack_require__(/*! prop-types-extra/lib/componentOrElement */ "./node_modules/prop-types-extra/lib/componentOrElement.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _Portal = _interopRequireDefault(__webpack_require__(/*! ./Portal */ "./node_modules/react-overlays/Portal.js"));

var _RootCloseWrapper = _interopRequireDefault(__webpack_require__(/*! ./RootCloseWrapper */ "./node_modules/react-overlays/RootCloseWrapper.js"));

var _reactPopper = __webpack_require__(/*! react-popper */ "./node_modules/react-popper/lib/esm/index.js");

var _forwardRef = _interopRequireDefault(__webpack_require__(/*! react-context-toolbox/forwardRef */ "./node_modules/react-context-toolbox/forwardRef.js"));

var _WaitForContainer = _interopRequireDefault(__webpack_require__(/*! ./WaitForContainer */ "./node_modules/react-overlays/WaitForContainer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * Built on top of `<Position/>` and `<Portal/>`, the overlay component is
 * great for custom tooltip overlays.
 */
var Overlay =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Overlay, _React$Component);

  function Overlay(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    _this.handleHidden = function () {
      _this.setState({
        exited: true
      });

      if (_this.props.onExited) {
        var _this$props;

        (_this$props = _this.props).onExited.apply(_this$props, arguments);
      }
    };

    _this.state = {
      exited: !props.show
    };
    _this.onHiddenListener = _this.handleHidden.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._lastTarget = null;
    return _this;
  }

  Overlay.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    if (nextProps.show) {
      return {
        exited: false
      };
    } else if (!nextProps.transition) {
      // Otherwise let handleHidden take care of marking exited.
      return {
        exited: true
      };
    }

    return null;
  };

  var _proto = Overlay.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setState({
      target: this.getTarget()
    });
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props === prevProps) return;
    var target = this.getTarget();

    if (target !== this.state.target) {
      this.setState({
        target: target
      });
    }
  };

  _proto.getTarget = function getTarget() {
    var target = this.props.target;
    target = typeof target === 'function' ? target() : target;
    return target && _reactDom.default.findDOMNode(target) || null;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        _0 = _this$props2.target,
        container = _this$props2.container,
        containerPadding = _this$props2.containerPadding,
        placement = _this$props2.placement,
        rootClose = _this$props2.rootClose,
        children = _this$props2.children,
        flip = _this$props2.flip,
        _this$props2$popperCo = _this$props2.popperConfig,
        popperConfig = _this$props2$popperCo === void 0 ? {} : _this$props2$popperCo,
        Transition = _this$props2.transition,
        props = _objectWithoutPropertiesLoose(_this$props2, ["target", "container", "containerPadding", "placement", "rootClose", "children", "flip", "popperConfig", "transition"]);

    var target = this.state.target; // Don't un-render the overlay while it's transitioning out.

    var mountOverlay = props.show || Transition && !this.state.exited;

    if (!mountOverlay) {
      // Don't bother showing anything if we don't have to.
      return null;
    }

    var child = children;
    var _popperConfig$modifie = popperConfig.modifiers,
        modifiers = _popperConfig$modifie === void 0 ? {} : _popperConfig$modifie;

    var popperProps = _extends({}, popperConfig, {
      placement: placement,
      referenceElement: target,
      enableEvents: props.show,
      modifiers: _extends({}, modifiers, {
        preventOverflow: _extends({
          padding: containerPadding || 5
        }, modifiers.preventOverflow),
        flip: _extends({
          enabled: !!flip
        }, modifiers.preventOverflow)
      })
    });

    child = _react.default.createElement(_reactPopper.Popper, popperProps, function (_ref) {
      var arrowProps = _ref.arrowProps,
          style = _ref.style,
          ref = _ref.ref,
          popper = _objectWithoutPropertiesLoose(_ref, ["arrowProps", "style", "ref"]);

      _this2.popper = popper;

      var innerChild = _this2.props.children(_extends({}, popper, {
        // popper doesn't set the initial placement
        placement: popper.placement || placement,
        show: props.show,
        arrowProps: arrowProps,
        props: {
          ref: ref,
          style: style
        }
      }));

      if (Transition) {
        var onExit = props.onExit,
            onExiting = props.onExiting,
            onEnter = props.onEnter,
            onEntering = props.onEntering,
            onEntered = props.onEntered;
        innerChild = _react.default.createElement(Transition, {
          in: props.show,
          appear: true,
          onExit: onExit,
          onExiting: onExiting,
          onExited: _this2.onHiddenListener,
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered
        }, innerChild);
      }

      return innerChild;
    });

    if (rootClose) {
      child = _react.default.createElement(_RootCloseWrapper.default, {
        onRootClose: props.onHide,
        event: props.rootCloseEvent,
        disabled: props.rootCloseDisabled
      }, child);
    }

    return _react.default.createElement(_Portal.default, {
      container: container
    }, child);
  };

  return Overlay;
}(_react.default.Component);

Overlay.propTypes = _extends({}, _Portal.default.propTypes, {
  /**
   * Set the visibility of the Overlay
   */
  show: _propTypes.default.bool,

  /** Specify where the overlay element is positioned in relation to the target element */
  placement: _propTypes.default.oneOf(_reactPopper.placements),

  /**
   * A Node, Component instance, or function that returns either. The `container` will have the Portal children
   * appended to it.
   */
  container: _propTypes.default.oneOfType([_componentOrElement.default, _propTypes.default.func]),

  /**
   * Enables the Popper.js `flip` modifier, allowing the Overlay to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   */
  flip: _propTypes.default.bool,

  /**
   * A render prop that returns an element to overlay and position. See
   * the [react-popper documentation](https://github.com/FezVrasta/react-popper#children) for more info.
   *
   * @type {Function ({
   *   show: boolean,
   *   placement: Placement,
   *   outOfBoundaries: ?boolean,
   *   scheduleUpdate: () => void,
   *   props: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *     aria-labelledby: ?string
   *   },
   *   arrowProps: {
   *     ref: (?HTMLElement) => void,
   *     style: { [string]: string | number },
   *   },
   * }) => React.Element}
   */
  children: _propTypes.default.func.isRequired,

  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: _propTypes.default.object,

  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose: _propTypes.default.bool,

  /**
   * Specify event for toggling overlay
   */
  rootCloseEvent: _RootCloseWrapper.default.propTypes.event,

  /**
   * Specify disabled for disable RootCloseWrapper
   */
  rootCloseDisabled: _RootCloseWrapper.default.propTypes.disabled,

  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   *
   * __required__ when `rootClose` is `true`.
   *
   * @type func
   */
  onHide: function onHide(props) {
    var propType = _propTypes.default.func;

    if (props.rootClose) {
      propType = propType.isRequired;
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return propType.apply(void 0, [props].concat(args));
  },

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component
   * used to animate the overlay as it changes visibility.
   */
  transition: _elementType.default,

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: _propTypes.default.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: _propTypes.default.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: _propTypes.default.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: _propTypes.default.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: _propTypes.default.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: _propTypes.default.func
});

var _default = (0, _forwardRef.default)(function (props, ref) {
  return (// eslint-disable-next-line react/prop-types
    _react.default.createElement(_WaitForContainer.default, {
      container: props.container
    }, function (container) {
      return _react.default.createElement(Overlay, _extends({}, props, {
        ref: ref,
        container: container
      }));
    })
  );
}, {
  displayName: 'withContainer(Overlay)'
});

exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/react-overlays/RootCloseWrapper.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-overlays/RootCloseWrapper.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _contains = _interopRequireDefault(__webpack_require__(/*! dom-helpers/query/contains */ "./node_modules/dom-helpers/query/contains.js"));

var _listen = _interopRequireDefault(__webpack_require__(/*! dom-helpers/events/listen */ "./node_modules/dom-helpers/events/listen.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _ownerDocument = _interopRequireDefault(__webpack_require__(/*! ./utils/ownerDocument */ "./node_modules/react-overlays/utils/ownerDocument.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var escapeKeyCode = 27;

var noop = function noop() {};

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
/**
 * The `<RootCloseWrapper/>` component registers your callback on the document
 * when rendered. Powers the `<Overlay/>` component. This is used achieve modal
 * style behavior where your callback is triggered when the user tries to
 * interact with the rest of the document or hits the `esc` key.
 */


var RootCloseWrapper =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(RootCloseWrapper, _React$Component);

  function RootCloseWrapper(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    _this.addEventListeners = function () {
      var event = _this.props.event;
      var doc = (0, _ownerDocument.default)(_assertThisInitialized(_assertThisInitialized(_this))); // Use capture for this listener so it fires before React's listener, to
      // avoid false positives in the contains() check below if the target DOM
      // element is removed in the React mouse callback.

      _this.removeMouseCaptureListener = (0, _listen.default)(doc, event, _this.handleMouseCapture, true);
      _this.removeMouseListener = (0, _listen.default)(doc, event, _this.handleMouse);
      _this.removeKeyupListener = (0, _listen.default)(doc, 'keyup', _this.handleKeyUp);

      if ('ontouchstart' in doc.documentElement) {
        _this.mobileSafariHackListeners = [].slice.call(document.body.children).map(function (el) {
          return (0, _listen.default)(el, 'mousemove', noop);
        });
      }
    };

    _this.removeEventListeners = function () {
      if (_this.removeMouseCaptureListener) _this.removeMouseCaptureListener();
      if (_this.removeMouseListener) _this.removeMouseListener();
      if (_this.removeKeyupListener) _this.removeKeyupListener();
      if (_this.mobileSafariHackListeners) _this.mobileSafariHackListeners.forEach(function (remove) {
        return remove();
      });
    };

    _this.handleMouseCapture = function (e) {
      _this.preventMouseRootClose = isModifiedEvent(e) || !isLeftClickEvent(e) || (0, _contains.default)(_reactDom.default.findDOMNode(_assertThisInitialized(_assertThisInitialized(_this))), e.target);
    };

    _this.handleMouse = function (e) {
      if (!_this.preventMouseRootClose && _this.props.onRootClose) {
        _this.props.onRootClose(e);
      }
    };

    _this.handleKeyUp = function (e) {
      if (e.keyCode === escapeKeyCode && _this.props.onRootClose) {
        _this.props.onRootClose(e);
      }
    };

    _this.preventMouseRootClose = false;
    return _this;
  }

  var _proto = RootCloseWrapper.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (!this.props.disabled) {
      this.addEventListeners();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!this.props.disabled && prevProps.disabled) {
      this.addEventListeners();
    } else if (this.props.disabled && !prevProps.disabled) {
      this.removeEventListeners();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (!this.props.disabled) {
      this.removeEventListeners();
    }
  };

  _proto.render = function render() {
    return this.props.children;
  };

  return RootCloseWrapper;
}(_react.default.Component);

RootCloseWrapper.displayName = 'RootCloseWrapper';
RootCloseWrapper.propTypes = {
  /**
   * Callback fired after click or mousedown. Also triggers when user hits `esc`.
   */
  onRootClose: _propTypes.default.func,

  /**
   * Children to render.
   */
  children: _propTypes.default.element,

  /**
   * Disable the the RootCloseWrapper, preventing it from triggering `onRootClose`.
   */
  disabled: _propTypes.default.bool,

  /**
   * Choose which document mouse event to bind to.
   */
  event: _propTypes.default.oneOf(['click', 'mousedown'])
};
RootCloseWrapper.defaultProps = {
  event: 'click'
};
var _default = RootCloseWrapper;
exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./node_modules/react-popper/lib/esm/Manager.js":
/*!******************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/Manager.js ***!
  \******************************************************/
/*! exports provided: ManagerContext, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagerContext", function() { return ManagerContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Manager; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var create_react_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! create-react-context */ "./node_modules/create-react-context/lib/index.js");
/* harmony import */ var create_react_context__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(create_react_context__WEBPACK_IMPORTED_MODULE_5__);






var ManagerContext = create_react_context__WEBPACK_IMPORTED_MODULE_5___default()({
  setReferenceNode: undefined,
  referenceNode: undefined
});

var Manager =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default()(Manager, _React$Component);

  function Manager() {
    var _this;

    _this = _React$Component.call(this) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "setReferenceNode", function (referenceNode) {
      if (!referenceNode || _this.state.context.referenceNode === referenceNode) {
        return;
      }

      _this.setState(function (_ref) {
        var context = _ref.context;
        return {
          context: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, context, {
            referenceNode: referenceNode
          })
        };
      });
    });

    _this.state = {
      context: {
        setReferenceNode: _this.setReferenceNode,
        referenceNode: undefined
      }
    };
    return _this;
  }

  var _proto = Manager.prototype;

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](ManagerContext.Provider, {
      value: this.state.context
    }, this.props.children);
  };

  return Manager;
}(react__WEBPACK_IMPORTED_MODULE_4__["Component"]);



/***/ }),

/***/ "./node_modules/react-popper/lib/esm/Popper.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/Popper.js ***!
  \*****************************************************/
/*! exports provided: InnerPopper, placements, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InnerPopper", function() { return InnerPopper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "placements", function() { return placements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Popper; });
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Manager */ "./node_modules/react-popper/lib/esm/Manager.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils */ "./node_modules/react-popper/lib/esm/utils.js");









var initialStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
  pointerEvents: 'none'
};
var initialArrowStyle = {};
var InnerPopper =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(InnerPopper, _React$Component);

  function InnerPopper() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "state", {
      data: undefined,
      placement: undefined
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "popperInstance", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "popperNode", null);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "arrowNode", null);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "setPopperNode", function (popperNode) {
      if (!popperNode || _this.popperNode === popperNode) return;
      Object(_utils__WEBPACK_IMPORTED_MODULE_8__["safeInvoke"])(_this.props.innerRef, popperNode);
      _this.popperNode = popperNode;

      _this.updatePopperInstance();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "setArrowNode", function (arrowNode) {
      _this.arrowNode = arrowNode;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "updateStateModifier", {
      enabled: true,
      order: 900,
      fn: function fn(data) {
        var placement = data.placement;

        _this.setState({
          data: data,
          placement: placement
        });

        return data;
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getOptions", function () {
      return {
        placement: _this.props.placement,
        eventsEnabled: _this.props.eventsEnabled,
        positionFixed: _this.props.positionFixed,
        modifiers: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, _this.props.modifiers, {
          arrow: _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, _this.props.modifiers && _this.props.modifiers.arrow, {
            enabled: !!_this.arrowNode,
            element: _this.arrowNode
          }),
          applyStyle: {
            enabled: false
          },
          updateStateModifier: _this.updateStateModifier
        })
      };
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getPopperStyle", function () {
      return !_this.popperNode || !_this.state.data ? initialStyle : _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
        position: _this.state.data.offsets.popper.position
      }, _this.state.data.styles);
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getPopperPlacement", function () {
      return !_this.state.data ? undefined : _this.state.placement;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getArrowStyle", function () {
      return !_this.arrowNode || !_this.state.data ? initialArrowStyle : _this.state.data.arrowStyles;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "getOutOfBoundariesState", function () {
      return _this.state.data ? _this.state.data.hide : undefined;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "destroyPopperInstance", function () {
      if (!_this.popperInstance) return;

      _this.popperInstance.destroy();

      _this.popperInstance = null;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "updatePopperInstance", function () {
      _this.destroyPopperInstance();

      var _assertThisInitialize = _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this),
          popperNode = _assertThisInitialize.popperNode;

      var referenceElement = _this.props.referenceElement;
      if (!referenceElement || !popperNode) return;
      _this.popperInstance = new popper_js__WEBPACK_IMPORTED_MODULE_6__["default"](referenceElement, popperNode, _this.getOptions());
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "scheduleUpdate", function () {
      if (_this.popperInstance) {
        _this.popperInstance.scheduleUpdate();
      }
    });

    return _this;
  }

  var _proto = InnerPopper.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // If the Popper.js options have changed, update the instance (destroy + create)
    if (this.props.placement !== prevProps.placement || this.props.referenceElement !== prevProps.referenceElement || this.props.positionFixed !== prevProps.positionFixed) {
      this.updatePopperInstance();
    } else if (this.props.eventsEnabled !== prevProps.eventsEnabled && this.popperInstance) {
      this.props.eventsEnabled ? this.popperInstance.enableEventListeners() : this.popperInstance.disableEventListeners();
    } // A placement difference in state means popper determined a new placement
    // apart from the props value. By the time the popper element is rendered with
    // the new position Popper has already measured it, if the place change triggers
    // a size change it will result in a misaligned popper. So we schedule an update to be sure.


    if (prevState.placement !== this.state.placement) {
      this.scheduleUpdate();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    Object(_utils__WEBPACK_IMPORTED_MODULE_8__["safeInvoke"])(this.props.innerRef, null);
    this.destroyPopperInstance();
  };

  _proto.render = function render() {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_8__["unwrapArray"])(this.props.children)({
      ref: this.setPopperNode,
      style: this.getPopperStyle(),
      placement: this.getPopperPlacement(),
      outOfBoundaries: this.getOutOfBoundariesState(),
      scheduleUpdate: this.scheduleUpdate,
      arrowProps: {
        ref: this.setArrowNode,
        style: this.getArrowStyle()
      }
    });
  };

  return InnerPopper;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(InnerPopper, "defaultProps", {
  placement: 'bottom',
  eventsEnabled: true,
  referenceElement: undefined,
  positionFixed: false
});

var placements = popper_js__WEBPACK_IMPORTED_MODULE_6__["default"].placements;

function Popper(_ref) {
  var referenceElement = _ref.referenceElement,
      props = _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0___default()(_ref, ["referenceElement"]);

  return react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_Manager__WEBPACK_IMPORTED_MODULE_7__["ManagerContext"].Consumer, null, function (_ref2) {
    var referenceNode = _ref2.referenceNode;
    return react__WEBPACK_IMPORTED_MODULE_5__["createElement"](InnerPopper, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
      referenceElement: referenceElement !== undefined ? referenceElement : referenceNode
    }, props));
  });
}

/***/ }),

/***/ "./node_modules/react-popper/lib/esm/Reference.js":
/*!********************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/Reference.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Reference; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Manager */ "./node_modules/react-popper/lib/esm/Manager.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "./node_modules/react-popper/lib/esm/utils.js");









var InnerReference =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default()(InnerReference, _React$Component);

  function InnerReference() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "refHandler", function (node) {
      Object(_utils__WEBPACK_IMPORTED_MODULE_7__["safeInvoke"])(_this.props.innerRef, node);
      Object(_utils__WEBPACK_IMPORTED_MODULE_7__["safeInvoke"])(_this.props.setReferenceNode, node);
    });

    return _this;
  }

  var _proto = InnerReference.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    Object(_utils__WEBPACK_IMPORTED_MODULE_7__["safeInvoke"])(this.props.innerRef, null);
  };

  _proto.render = function render() {
    warning__WEBPACK_IMPORTED_MODULE_5___default()(Boolean(this.props.setReferenceNode), '`Reference` should not be used outside of a `Manager` component.');
    return Object(_utils__WEBPACK_IMPORTED_MODULE_7__["unwrapArray"])(this.props.children)({
      ref: this.refHandler
    });
  };

  return InnerReference;
}(react__WEBPACK_IMPORTED_MODULE_4__["Component"]);

function Reference(props) {
  return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](_Manager__WEBPACK_IMPORTED_MODULE_6__["ManagerContext"].Consumer, null, function (_ref) {
    var setReferenceNode = _ref.setReferenceNode;
    return react__WEBPACK_IMPORTED_MODULE_4__["createElement"](InnerReference, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
      setReferenceNode: setReferenceNode
    }, props));
  });
}

/***/ }),

/***/ "./node_modules/react-popper/lib/esm/index.js":
/*!****************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/index.js ***!
  \****************************************************/
/*! exports provided: Popper, placements, Manager, Reference */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Popper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popper */ "./node_modules/react-popper/lib/esm/Popper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Popper", function() { return _Popper__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "placements", function() { return _Popper__WEBPACK_IMPORTED_MODULE_0__["placements"]; });

/* harmony import */ var _Manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Manager */ "./node_modules/react-popper/lib/esm/Manager.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Manager", function() { return _Manager__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Reference__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Reference */ "./node_modules/react-popper/lib/esm/Reference.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reference", function() { return _Reference__WEBPACK_IMPORTED_MODULE_2__["default"]; });

// Public components



 // Public types

/***/ }),

/***/ "./node_modules/react-popper/lib/esm/utils.js":
/*!****************************************************!*\
  !*** ./node_modules/react-popper/lib/esm/utils.js ***!
  \****************************************************/
/*! exports provided: unwrapArray, safeInvoke */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unwrapArray", function() { return unwrapArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safeInvoke", function() { return safeInvoke; });
/**
 * Takes an argument and if it's an array, returns the first item in the array,
 * otherwise returns the argument. Used for Preact compatibility.
 */
var unwrapArray = function unwrapArray(arg) {
  return Array.isArray(arg) ? arg[0] : arg;
};
/**
 * Takes a maybe-undefined function and arbitrary args and invokes the function
 * only if it is defined.
 */

var safeInvoke = function safeInvoke(fn) {
  if (typeof fn === "function") {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.apply(void 0, args);
  }
};

/***/ }),

/***/ "./node_modules/react-slick/lib/arrows.js":
/*!************************************************!*\
  !*** ./node_modules/react-slick/lib/arrows.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextArrow = exports.PrevArrow = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _innerSliderUtils = __webpack_require__(/*! ./utils/innerSliderUtils */ "./node_modules/react-slick/lib/utils/innerSliderUtils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var PrevArrow =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(PrevArrow, _React$PureComponent);

  function PrevArrow() {
    _classCallCheck(this, PrevArrow);

    return _possibleConstructorReturn(this, _getPrototypeOf(PrevArrow).apply(this, arguments));
  }

  _createClass(PrevArrow, [{
    key: "clickHandler",
    value: function clickHandler(options, e) {
      if (e) {
        e.preventDefault();
      }

      this.props.clickHandler(options, e);
    }
  }, {
    key: "render",
    value: function render() {
      var prevClasses = {
        "slick-arrow": true,
        "slick-prev": true
      };
      var prevHandler = this.clickHandler.bind(this, {
        message: "previous"
      });

      if (!this.props.infinite && (this.props.currentSlide === 0 || this.props.slideCount <= this.props.slidesToShow)) {
        prevClasses["slick-disabled"] = true;
        prevHandler = null;
      }

      var prevArrowProps = {
        key: "0",
        "data-role": "none",
        className: (0, _classnames["default"])(prevClasses),
        style: {
          display: "block"
        },
        onClick: prevHandler
      };
      var customProps = {
        currentSlide: this.props.currentSlide,
        slideCount: this.props.slideCount
      };
      var prevArrow;

      if (this.props.prevArrow) {
        prevArrow = _react["default"].cloneElement(this.props.prevArrow, _objectSpread({}, prevArrowProps, {}, customProps));
      } else {
        prevArrow = _react["default"].createElement("button", _extends({
          key: "0",
          type: "button"
        }, prevArrowProps), " ", "Previous");
      }

      return prevArrow;
    }
  }]);

  return PrevArrow;
}(_react["default"].PureComponent);

exports.PrevArrow = PrevArrow;

var NextArrow =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(NextArrow, _React$PureComponent2);

  function NextArrow() {
    _classCallCheck(this, NextArrow);

    return _possibleConstructorReturn(this, _getPrototypeOf(NextArrow).apply(this, arguments));
  }

  _createClass(NextArrow, [{
    key: "clickHandler",
    value: function clickHandler(options, e) {
      if (e) {
        e.preventDefault();
      }

      this.props.clickHandler(options, e);
    }
  }, {
    key: "render",
    value: function render() {
      var nextClasses = {
        "slick-arrow": true,
        "slick-next": true
      };
      var nextHandler = this.clickHandler.bind(this, {
        message: "next"
      });

      if (!(0, _innerSliderUtils.canGoNext)(this.props)) {
        nextClasses["slick-disabled"] = true;
        nextHandler = null;
      }

      var nextArrowProps = {
        key: "1",
        "data-role": "none",
        className: (0, _classnames["default"])(nextClasses),
        style: {
          display: "block"
        },
        onClick: nextHandler
      };
      var customProps = {
        currentSlide: this.props.currentSlide,
        slideCount: this.props.slideCount
      };
      var nextArrow;

      if (this.props.nextArrow) {
        nextArrow = _react["default"].cloneElement(this.props.nextArrow, _objectSpread({}, nextArrowProps, {}, customProps));
      } else {
        nextArrow = _react["default"].createElement("button", _extends({
          key: "1",
          type: "button"
        }, nextArrowProps), " ", "Next");
      }

      return nextArrow;
    }
  }]);

  return NextArrow;
}(_react["default"].PureComponent);

exports.NextArrow = NextArrow;

/***/ }),

/***/ "./node_modules/react-slick/lib/default-props.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-slick/lib/default-props.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultProps = {
  accessibility: true,
  adaptiveHeight: false,
  afterChange: null,
  appendDots: function appendDots(dots) {
    return _react["default"].createElement("ul", {
      style: {
        display: "block"
      }
    }, dots);
  },
  arrows: true,
  autoplay: false,
  autoplaySpeed: 3000,
  beforeChange: null,
  centerMode: false,
  centerPadding: "50px",
  className: "",
  cssEase: "ease",
  customPaging: function customPaging(i) {
    return _react["default"].createElement("button", null, i + 1);
  },
  dots: false,
  dotsClass: "slick-dots",
  draggable: true,
  easing: "linear",
  edgeFriction: 0.35,
  fade: false,
  focusOnSelect: false,
  infinite: true,
  initialSlide: 0,
  lazyLoad: null,
  nextArrow: null,
  onEdge: null,
  onInit: null,
  onLazyLoadError: null,
  onReInit: null,
  pauseOnDotsHover: false,
  pauseOnFocus: false,
  pauseOnHover: true,
  prevArrow: null,
  responsive: null,
  rows: 1,
  rtl: false,
  slide: "div",
  slidesPerRow: 1,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  swipe: true,
  swipeEvent: null,
  swipeToSlide: false,
  touchMove: true,
  touchThreshold: 5,
  useCSS: true,
  useTransform: true,
  variableWidth: false,
  vertical: false,
  waitForAnimate: true
};
var _default = defaultProps;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/react-slick/lib/dots.js":
/*!**********************************************!*\
  !*** ./node_modules/react-slick/lib/dots.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dots = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var getDotCount = function getDotCount(spec) {
  var dots;

  if (spec.infinite) {
    dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
  } else {
    dots = Math.ceil((spec.slideCount - spec.slidesToShow) / spec.slidesToScroll) + 1;
  }

  return dots;
};

var Dots =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Dots, _React$PureComponent);

  function Dots() {
    _classCallCheck(this, Dots);

    return _possibleConstructorReturn(this, _getPrototypeOf(Dots).apply(this, arguments));
  }

  _createClass(Dots, [{
    key: "clickHandler",
    value: function clickHandler(options, e) {
      // In Autoplay the focus stays on clicked button even after transition
      // to next slide. That only goes away by click somewhere outside
      e.preventDefault();
      this.props.clickHandler(options);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var dotCount = getDotCount({
        slideCount: this.props.slideCount,
        slidesToScroll: this.props.slidesToScroll,
        slidesToShow: this.props.slidesToShow,
        infinite: this.props.infinite
      }); // Apply join & split to Array to pre-fill it for IE8
      //
      // Credit: http://stackoverflow.com/a/13735425/1849458

      var _this$props = this.props,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseOver = _this$props.onMouseOver,
          onMouseLeave = _this$props.onMouseLeave;
      var mouseEvents = {
        onMouseEnter: onMouseEnter,
        onMouseOver: onMouseOver,
        onMouseLeave: onMouseLeave
      };
      var dots = Array.apply(null, Array(dotCount + 1).join("0").split("")).map(function (x, i) {
        var leftBound = i * _this.props.slidesToScroll;
        var rightBound = i * _this.props.slidesToScroll + (_this.props.slidesToScroll - 1);
        var className = (0, _classnames["default"])({
          "slick-active": _this.props.currentSlide >= leftBound && _this.props.currentSlide <= rightBound
        });
        var dotOptions = {
          message: "dots",
          index: i,
          slidesToScroll: _this.props.slidesToScroll,
          currentSlide: _this.props.currentSlide
        };

        var onClick = _this.clickHandler.bind(_this, dotOptions);

        return _react["default"].createElement("li", {
          key: i,
          className: className
        }, _react["default"].cloneElement(_this.props.customPaging(i), {
          onClick: onClick
        }));
      });
      return _react["default"].cloneElement(this.props.appendDots(dots), _objectSpread({
        className: this.props.dotsClass
      }, mouseEvents));
    }
  }]);

  return Dots;
}(_react["default"].PureComponent);

exports.Dots = Dots;

/***/ }),

/***/ "./node_modules/react-slick/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/react-slick/lib/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slider = _interopRequireDefault(__webpack_require__(/*! ./slider */ "./node_modules/react-slick/lib/slider.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _slider["default"];
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/react-slick/lib/initial-state.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-slick/lib/initial-state.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var initialState = {
  animating: false,
  autoplaying: null,
  currentDirection: 0,
  currentLeft: null,
  currentSlide: 0,
  direction: 1,
  dragging: false,
  edgeDragged: false,
  initialized: false,
  lazyLoadedList: [],
  listHeight: null,
  listWidth: null,
  scrolling: false,
  slideCount: null,
  slideHeight: null,
  slideWidth: null,
  swipeLeft: null,
  swiped: false,
  // used by swipeEvent. differentites between touch and swipe.
  swiping: false,
  touchObject: {
    startX: 0,
    startY: 0,
    curX: 0,
    curY: 0
  },
  trackStyle: {},
  trackWidth: 0
};
var _default = initialState;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/react-slick/lib/inner-slider.js":
/*!******************************************************!*\
  !*** ./node_modules/react-slick/lib/inner-slider.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InnerSlider = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _initialState = _interopRequireDefault(__webpack_require__(/*! ./initial-state */ "./node_modules/react-slick/lib/initial-state.js"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _innerSliderUtils = __webpack_require__(/*! ./utils/innerSliderUtils */ "./node_modules/react-slick/lib/utils/innerSliderUtils.js");

var _track = __webpack_require__(/*! ./track */ "./node_modules/react-slick/lib/track.js");

var _dots = __webpack_require__(/*! ./dots */ "./node_modules/react-slick/lib/dots.js");

var _arrows = __webpack_require__(/*! ./arrows */ "./node_modules/react-slick/lib/arrows.js");

var _resizeObserverPolyfill = _interopRequireDefault(__webpack_require__(/*! resize-observer-polyfill */ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InnerSlider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InnerSlider, _React$Component);

  function InnerSlider(props) {
    var _this;

    _classCallCheck(this, InnerSlider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InnerSlider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "listRefHandler", function (ref) {
      return _this.list = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "trackRefHandler", function (ref) {
      return _this.track = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "adaptHeight", function () {
      if (_this.props.adaptiveHeight && _this.list) {
        var elem = _this.list.querySelector("[data-index=\"".concat(_this.state.currentSlide, "\"]"));

        _this.list.style.height = (0, _innerSliderUtils.getHeight)(elem) + "px";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "UNSAFE_componentWillMount", function () {
      _this.ssrInit();

      _this.props.onInit && _this.props.onInit();

      if (_this.props.lazyLoad) {
        var slidesToLoad = (0, _innerSliderUtils.getOnDemandLazySlides)(_objectSpread({}, _this.props, {}, _this.state));

        if (slidesToLoad.length > 0) {
          _this.setState(function (prevState) {
            return {
              lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
            };
          });

          if (_this.props.onLazyLoad) {
            _this.props.onLazyLoad(slidesToLoad);
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var spec = _objectSpread({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props);

      _this.updateState(spec, true, function () {
        _this.adaptHeight();

        _this.props.autoplay && _this.autoPlay("update");
      });

      if (_this.props.lazyLoad === "progressive") {
        _this.lazyLoadTimer = setInterval(_this.progressiveLazyLoad, 1000);
      }

      _this.ro = new _resizeObserverPolyfill["default"](function () {
        if (_this.state.animating) {
          _this.onWindowResized(false); // don't set trackStyle hence don't break animation


          _this.callbackTimers.push(setTimeout(function () {
            return _this.onWindowResized();
          }, _this.props.speed));
        } else {
          _this.onWindowResized();
        }
      });

      _this.ro.observe(_this.list);

      Array.prototype.forEach.call(document.querySelectorAll(".slick-slide"), function (slide) {
        slide.onfocus = _this.props.pauseOnFocus ? _this.onSlideFocus : null;
        slide.onblur = _this.props.pauseOnFocus ? _this.onSlideBlur : null;
      }); // To support server-side rendering

      if (!window) {
        return;
      }

      if (window.addEventListener) {
        window.addEventListener("resize", _this.onWindowResized);
      } else {
        window.attachEvent("onresize", _this.onWindowResized);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      if (_this.animationEndCallback) {
        clearTimeout(_this.animationEndCallback);
      }

      if (_this.lazyLoadTimer) {
        clearInterval(_this.lazyLoadTimer);
      }

      if (_this.callbackTimers.length) {
        _this.callbackTimers.forEach(function (timer) {
          return clearTimeout(timer);
        });

        _this.callbackTimers = [];
      }

      if (window.addEventListener) {
        window.removeEventListener("resize", _this.onWindowResized);
      } else {
        window.detachEvent("onresize", _this.onWindowResized);
      }

      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "UNSAFE_componentWillReceiveProps", function (nextProps) {
      var spec = _objectSpread({
        listRef: _this.list,
        trackRef: _this.track
      }, nextProps, {}, _this.state);

      var setTrackStyle = false;

      for (var _i = 0, _Object$keys = Object.keys(_this.props); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];

        if (!nextProps.hasOwnProperty(key)) {
          setTrackStyle = true;
          break;
        }

        if (_typeof(nextProps[key]) === "object" || typeof nextProps[key] === "function") {
          continue;
        }

        if (nextProps[key] !== _this.props[key]) {
          setTrackStyle = true;
          break;
        }
      }

      _this.updateState(spec, setTrackStyle, function () {
        if (_this.state.currentSlide >= _react["default"].Children.count(nextProps.children)) {
          _this.changeSlide({
            message: "index",
            index: _react["default"].Children.count(nextProps.children) - nextProps.slidesToShow,
            currentSlide: _this.state.currentSlide
          });
        }

        if (nextProps.autoplay) {
          _this.autoPlay("update");
        } else {
          _this.pause("paused");
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      _this.checkImagesLoad();

      _this.props.onReInit && _this.props.onReInit();

      if (_this.props.lazyLoad) {
        var slidesToLoad = (0, _innerSliderUtils.getOnDemandLazySlides)(_objectSpread({}, _this.props, {}, _this.state));

        if (slidesToLoad.length > 0) {
          _this.setState(function (prevState) {
            return {
              lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
            };
          });

          if (_this.props.onLazyLoad) {
            _this.props.onLazyLoad(slidesToLoad);
          }
        }
      } // if (this.props.onLazyLoad) {
      //   this.props.onLazyLoad([leftMostSlide])
      // }


      _this.adaptHeight();
    });

    _defineProperty(_assertThisInitialized(_this), "onWindowResized", function (setTrackStyle) {
      if (_this.debouncedResize) _this.debouncedResize.cancel();
      _this.debouncedResize = (0, _lodash["default"])(function () {
        return _this.resizeWindow(setTrackStyle);
      }, 50);

      _this.debouncedResize();
    });

    _defineProperty(_assertThisInitialized(_this), "resizeWindow", function () {
      var setTrackStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!_reactDom["default"].findDOMNode(_this.track)) return;

      var spec = _objectSpread({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props, {}, _this.state);

      _this.updateState(spec, setTrackStyle, function () {
        if (_this.props.autoplay) _this.autoPlay("update");else _this.pause("paused");
      }); // animating state should be cleared while resizing, otherwise autoplay stops working


      _this.setState({
        animating: false
      });

      clearTimeout(_this.animationEndCallback);
      delete _this.animationEndCallback;
    });

    _defineProperty(_assertThisInitialized(_this), "updateState", function (spec, setTrackStyle, callback) {
      var updatedState = (0, _innerSliderUtils.initializedState)(spec);
      spec = _objectSpread({}, spec, {}, updatedState, {
        slideIndex: updatedState.currentSlide
      });
      var targetLeft = (0, _innerSliderUtils.getTrackLeft)(spec);
      spec = _objectSpread({}, spec, {
        left: targetLeft
      });
      var trackStyle = (0, _innerSliderUtils.getTrackCSS)(spec);

      if (setTrackStyle || _react["default"].Children.count(_this.props.children) !== _react["default"].Children.count(spec.children)) {
        updatedState["trackStyle"] = trackStyle;
      }

      _this.setState(updatedState, callback);
    });

    _defineProperty(_assertThisInitialized(_this), "ssrInit", function () {
      if (_this.props.variableWidth) {
        var _trackWidth = 0,
            _trackLeft = 0;
        var childrenWidths = [];
        var preClones = (0, _innerSliderUtils.getPreClones)(_objectSpread({}, _this.props, {}, _this.state, {
          slideCount: _this.props.children.length
        }));
        var postClones = (0, _innerSliderUtils.getPostClones)(_objectSpread({}, _this.props, {}, _this.state, {
          slideCount: _this.props.children.length
        }));

        _this.props.children.forEach(function (child) {
          childrenWidths.push(child.props.style.width);
          _trackWidth += child.props.style.width;
        });

        for (var i = 0; i < preClones; i++) {
          _trackLeft += childrenWidths[childrenWidths.length - 1 - i];
          _trackWidth += childrenWidths[childrenWidths.length - 1 - i];
        }

        for (var _i2 = 0; _i2 < postClones; _i2++) {
          _trackWidth += childrenWidths[_i2];
        }

        for (var _i3 = 0; _i3 < _this.state.currentSlide; _i3++) {
          _trackLeft += childrenWidths[_i3];
        }

        var _trackStyle = {
          width: _trackWidth + "px",
          left: -_trackLeft + "px"
        };

        if (_this.props.centerMode) {
          var currentWidth = "".concat(childrenWidths[_this.state.currentSlide], "px");
          _trackStyle.left = "calc(".concat(_trackStyle.left, " + (100% - ").concat(currentWidth, ") / 2 ) ");
        }

        _this.setState({
          trackStyle: _trackStyle
        });

        return;
      }

      var childrenCount = _react["default"].Children.count(_this.props.children);

      var spec = _objectSpread({}, _this.props, {}, _this.state, {
        slideCount: childrenCount
      });

      var slideCount = (0, _innerSliderUtils.getPreClones)(spec) + (0, _innerSliderUtils.getPostClones)(spec) + childrenCount;
      var trackWidth = 100 / _this.props.slidesToShow * slideCount;
      var slideWidth = 100 / slideCount;
      var trackLeft = -slideWidth * ((0, _innerSliderUtils.getPreClones)(spec) + _this.state.currentSlide) * trackWidth / 100;

      if (_this.props.centerMode) {
        trackLeft += (100 - slideWidth * trackWidth / 100) / 2;
      }

      var trackStyle = {
        width: trackWidth + "%",
        left: trackLeft + "%"
      };

      _this.setState({
        slideWidth: slideWidth + "%",
        trackStyle: trackStyle
      });
    });

    _defineProperty(_assertThisInitialized(_this), "checkImagesLoad", function () {
      var images = document.querySelectorAll(".slick-slide img");
      var imagesCount = images.length,
          loadedCount = 0;
      Array.prototype.forEach.call(images, function (image) {
        var handler = function handler() {
          return ++loadedCount && loadedCount >= imagesCount && _this.onWindowResized();
        };

        if (!image.onclick) {
          image.onclick = function () {
            return image.parentNode.focus();
          };
        } else {
          var prevClickHandler = image.onclick;

          image.onclick = function () {
            prevClickHandler();
            image.parentNode.focus();
          };
        }

        if (!image.onload) {
          if (_this.props.lazyLoad) {
            image.onload = function () {
              _this.adaptHeight();

              _this.callbackTimers.push(setTimeout(_this.onWindowResized, _this.props.speed));
            };
          } else {
            image.onload = handler;

            image.onerror = function () {
              handler();
              _this.props.onLazyLoadError && _this.props.onLazyLoadError();
            };
          }
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "progressiveLazyLoad", function () {
      var slidesToLoad = [];

      var spec = _objectSpread({}, _this.props, {}, _this.state);

      for (var index = _this.state.currentSlide; index < _this.state.slideCount + (0, _innerSliderUtils.getPostClones)(spec); index++) {
        if (_this.state.lazyLoadedList.indexOf(index) < 0) {
          slidesToLoad.push(index);
          break;
        }
      }

      for (var _index = _this.state.currentSlide - 1; _index >= -(0, _innerSliderUtils.getPreClones)(spec); _index--) {
        if (_this.state.lazyLoadedList.indexOf(_index) < 0) {
          slidesToLoad.push(_index);
          break;
        }
      }

      if (slidesToLoad.length > 0) {
        _this.setState(function (state) {
          return {
            lazyLoadedList: state.lazyLoadedList.concat(slidesToLoad)
          };
        });

        if (_this.props.onLazyLoad) {
          _this.props.onLazyLoad(slidesToLoad);
        }
      } else {
        if (_this.lazyLoadTimer) {
          clearInterval(_this.lazyLoadTimer);
          delete _this.lazyLoadTimer;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "slideHandler", function (index) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$props = _this.props,
          asNavFor = _this$props.asNavFor,
          beforeChange = _this$props.beforeChange,
          onLazyLoad = _this$props.onLazyLoad,
          speed = _this$props.speed,
          afterChange = _this$props.afterChange; // capture currentslide before state is updated

      var currentSlide = _this.state.currentSlide;

      var _slideHandler = (0, _innerSliderUtils.slideHandler)(_objectSpread({
        index: index
      }, _this.props, {}, _this.state, {
        trackRef: _this.track,
        useCSS: _this.props.useCSS && !dontAnimate
      })),
          state = _slideHandler.state,
          nextState = _slideHandler.nextState;

      if (!state) return;
      beforeChange && beforeChange(currentSlide, state.currentSlide);
      var slidesToLoad = state.lazyLoadedList.filter(function (value) {
        return _this.state.lazyLoadedList.indexOf(value) < 0;
      });
      onLazyLoad && slidesToLoad.length > 0 && onLazyLoad(slidesToLoad);

      _this.setState(state, function () {
        asNavFor && asNavFor.innerSlider.slideHandler(index);
        if (!nextState) return;
        _this.animationEndCallback = setTimeout(function () {
          var animating = nextState.animating,
              firstBatch = _objectWithoutProperties(nextState, ["animating"]);

          _this.setState(firstBatch, function () {
            _this.callbackTimers.push(setTimeout(function () {
              return _this.setState({
                animating: animating
              });
            }, 10));

            afterChange && afterChange(state.currentSlide);
            delete _this.animationEndCallback;
          });
        }, speed);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeSlide", function (options) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var spec = _objectSpread({}, _this.props, {}, _this.state);

      var targetSlide = (0, _innerSliderUtils.changeSlide)(spec, options);
      if (targetSlide !== 0 && !targetSlide) return;

      if (dontAnimate === true) {
        _this.slideHandler(targetSlide, dontAnimate);
      } else {
        _this.slideHandler(targetSlide);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clickHandler", function (e) {
      if (_this.clickable === false) {
        e.stopPropagation();
        e.preventDefault();
      }

      _this.clickable = true;
    });

    _defineProperty(_assertThisInitialized(_this), "keyHandler", function (e) {
      var dir = (0, _innerSliderUtils.keyHandler)(e, _this.props.accessibility, _this.props.rtl);
      dir !== "" && _this.changeSlide({
        message: dir
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectHandler", function (options) {
      _this.changeSlide(options);
    });

    _defineProperty(_assertThisInitialized(_this), "disableBodyScroll", function () {
      var preventDefault = function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
      };

      window.ontouchmove = preventDefault;
    });

    _defineProperty(_assertThisInitialized(_this), "enableBodyScroll", function () {
      window.ontouchmove = null;
    });

    _defineProperty(_assertThisInitialized(_this), "swipeStart", function (e) {
      if (_this.props.verticalSwiping) {
        _this.disableBodyScroll();
      }

      var state = (0, _innerSliderUtils.swipeStart)(e, _this.props.swipe, _this.props.draggable);
      state !== "" && _this.setState(state);
    });

    _defineProperty(_assertThisInitialized(_this), "swipeMove", function (e) {
      var state = (0, _innerSliderUtils.swipeMove)(e, _objectSpread({}, _this.props, {}, _this.state, {
        trackRef: _this.track,
        listRef: _this.list,
        slideIndex: _this.state.currentSlide
      }));
      if (!state) return;

      if (state["swiping"]) {
        _this.clickable = false;
      }

      _this.setState(state);
    });

    _defineProperty(_assertThisInitialized(_this), "swipeEnd", function (e) {
      var state = (0, _innerSliderUtils.swipeEnd)(e, _objectSpread({}, _this.props, {}, _this.state, {
        trackRef: _this.track,
        listRef: _this.list,
        slideIndex: _this.state.currentSlide
      }));
      if (!state) return;
      var triggerSlideHandler = state["triggerSlideHandler"];
      delete state["triggerSlideHandler"];

      _this.setState(state);

      if (triggerSlideHandler === undefined) return;

      _this.slideHandler(triggerSlideHandler);

      if (_this.props.verticalSwiping) {
        _this.enableBodyScroll();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "slickPrev", function () {
      // this and fellow methods are wrapped in setTimeout
      // to make sure initialize setState has happened before
      // any of such methods are called
      _this.callbackTimers.push(setTimeout(function () {
        return _this.changeSlide({
          message: "previous"
        });
      }, 0));
    });

    _defineProperty(_assertThisInitialized(_this), "slickNext", function () {
      _this.callbackTimers.push(setTimeout(function () {
        return _this.changeSlide({
          message: "next"
        });
      }, 0));
    });

    _defineProperty(_assertThisInitialized(_this), "slickGoTo", function (slide) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      slide = Number(slide);
      if (isNaN(slide)) return "";

      _this.callbackTimers.push(setTimeout(function () {
        return _this.changeSlide({
          message: "index",
          index: slide,
          currentSlide: _this.state.currentSlide
        }, dontAnimate);
      }, 0));
    });

    _defineProperty(_assertThisInitialized(_this), "play", function () {
      var nextIndex;

      if (_this.props.rtl) {
        nextIndex = _this.state.currentSlide - _this.props.slidesToScroll;
      } else {
        if ((0, _innerSliderUtils.canGoNext)(_objectSpread({}, _this.props, {}, _this.state))) {
          nextIndex = _this.state.currentSlide + _this.props.slidesToScroll;
        } else {
          return false;
        }
      }

      _this.slideHandler(nextIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "autoPlay", function (playType) {
      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
      }

      var autoplaying = _this.state.autoplaying;

      if (playType === "update") {
        if (autoplaying === "hovered" || autoplaying === "focused" || autoplaying === "paused") {
          return;
        }
      } else if (playType === "leave") {
        if (autoplaying === "paused" || autoplaying === "focused") {
          return;
        }
      } else if (playType === "blur") {
        if (autoplaying === "paused" || autoplaying === "hovered") {
          return;
        }
      }

      _this.autoplayTimer = setInterval(_this.play, _this.props.autoplaySpeed + 50);

      _this.setState({
        autoplaying: "playing"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "pause", function (pauseType) {
      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
        _this.autoplayTimer = null;
      }

      var autoplaying = _this.state.autoplaying;

      if (pauseType === "paused") {
        _this.setState({
          autoplaying: "paused"
        });
      } else if (pauseType === "focused") {
        if (autoplaying === "hovered" || autoplaying === "playing") {
          _this.setState({
            autoplaying: "focused"
          });
        }
      } else {
        // pauseType  is 'hovered'
        if (autoplaying === "playing") {
          _this.setState({
            autoplaying: "hovered"
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDotsOver", function () {
      return _this.props.autoplay && _this.pause("hovered");
    });

    _defineProperty(_assertThisInitialized(_this), "onDotsLeave", function () {
      return _this.props.autoplay && _this.state.autoplaying === "hovered" && _this.autoPlay("leave");
    });

    _defineProperty(_assertThisInitialized(_this), "onTrackOver", function () {
      return _this.props.autoplay && _this.pause("hovered");
    });

    _defineProperty(_assertThisInitialized(_this), "onTrackLeave", function () {
      return _this.props.autoplay && _this.state.autoplaying === "hovered" && _this.autoPlay("leave");
    });

    _defineProperty(_assertThisInitialized(_this), "onSlideFocus", function () {
      return _this.props.autoplay && _this.pause("focused");
    });

    _defineProperty(_assertThisInitialized(_this), "onSlideBlur", function () {
      return _this.props.autoplay && _this.state.autoplaying === "focused" && _this.autoPlay("blur");
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var className = (0, _classnames["default"])("slick-slider", _this.props.className, {
        "slick-vertical": _this.props.vertical,
        "slick-initialized": true
      });

      var spec = _objectSpread({}, _this.props, {}, _this.state);

      var trackProps = (0, _innerSliderUtils.extractObject)(spec, ["fade", "cssEase", "speed", "infinite", "centerMode", "focusOnSelect", "currentSlide", "lazyLoad", "lazyLoadedList", "rtl", "slideWidth", "slideHeight", "listHeight", "vertical", "slidesToShow", "slidesToScroll", "slideCount", "trackStyle", "variableWidth", "unslick", "centerPadding"]);
      var pauseOnHover = _this.props.pauseOnHover;
      trackProps = _objectSpread({}, trackProps, {
        onMouseEnter: pauseOnHover ? _this.onTrackOver : null,
        onMouseLeave: pauseOnHover ? _this.onTrackLeave : null,
        onMouseOver: pauseOnHover ? _this.onTrackOver : null,
        focusOnSelect: _this.props.focusOnSelect ? _this.selectHandler : null
      });
      var dots;

      if (_this.props.dots === true && _this.state.slideCount >= _this.props.slidesToShow) {
        var dotProps = (0, _innerSliderUtils.extractObject)(spec, ["dotsClass", "slideCount", "slidesToShow", "currentSlide", "slidesToScroll", "clickHandler", "children", "customPaging", "infinite", "appendDots"]);
        var pauseOnDotsHover = _this.props.pauseOnDotsHover;
        dotProps = _objectSpread({}, dotProps, {
          clickHandler: _this.changeSlide,
          onMouseEnter: pauseOnDotsHover ? _this.onDotsLeave : null,
          onMouseOver: pauseOnDotsHover ? _this.onDotsOver : null,
          onMouseLeave: pauseOnDotsHover ? _this.onDotsLeave : null
        });
        dots = _react["default"].createElement(_dots.Dots, dotProps);
      }

      var prevArrow, nextArrow;
      var arrowProps = (0, _innerSliderUtils.extractObject)(spec, ["infinite", "centerMode", "currentSlide", "slideCount", "slidesToShow", "prevArrow", "nextArrow"]);
      arrowProps.clickHandler = _this.changeSlide;

      if (_this.props.arrows) {
        prevArrow = _react["default"].createElement(_arrows.PrevArrow, arrowProps);
        nextArrow = _react["default"].createElement(_arrows.NextArrow, arrowProps);
      }

      var verticalHeightStyle = null;

      if (_this.props.vertical) {
        verticalHeightStyle = {
          height: _this.state.listHeight
        };
      }

      var centerPaddingStyle = null;

      if (_this.props.vertical === false) {
        if (_this.props.centerMode === true) {
          centerPaddingStyle = {
            padding: "0px " + _this.props.centerPadding
          };
        }
      } else {
        if (_this.props.centerMode === true) {
          centerPaddingStyle = {
            padding: _this.props.centerPadding + " 0px"
          };
        }
      }

      var listStyle = _objectSpread({}, verticalHeightStyle, {}, centerPaddingStyle);

      var touchMove = _this.props.touchMove;
      var listProps = {
        className: "slick-list",
        style: listStyle,
        onClick: _this.clickHandler,
        onMouseDown: touchMove ? _this.swipeStart : null,
        onMouseMove: _this.state.dragging && touchMove ? _this.swipeMove : null,
        onMouseUp: touchMove ? _this.swipeEnd : null,
        onMouseLeave: _this.state.dragging && touchMove ? _this.swipeEnd : null,
        onTouchStart: touchMove ? _this.swipeStart : null,
        onTouchMove: _this.state.dragging && touchMove ? _this.swipeMove : null,
        onTouchEnd: touchMove ? _this.swipeEnd : null,
        onTouchCancel: _this.state.dragging && touchMove ? _this.swipeEnd : null,
        onKeyDown: _this.props.accessibility ? _this.keyHandler : null
      };
      var innerSliderProps = {
        className: className,
        dir: "ltr",
        style: _this.props.style
      };

      if (_this.props.unslick) {
        listProps = {
          className: "slick-list"
        };
        innerSliderProps = {
          className: className
        };
      }

      return _react["default"].createElement("div", innerSliderProps, !_this.props.unslick ? prevArrow : "", _react["default"].createElement("div", _extends({
        ref: _this.listRefHandler
      }, listProps), _react["default"].createElement(_track.Track, _extends({
        ref: _this.trackRefHandler
      }, trackProps), _this.props.children)), !_this.props.unslick ? nextArrow : "", !_this.props.unslick ? dots : "");
    });

    _this.list = null;
    _this.track = null;
    _this.state = _objectSpread({}, _initialState["default"], {
      currentSlide: _this.props.initialSlide,
      slideCount: _react["default"].Children.count(_this.props.children)
    });
    _this.callbackTimers = [];
    _this.clickable = true;
    _this.debouncedResize = null;
    return _this;
  }

  return InnerSlider;
}(_react["default"].Component);

exports.InnerSlider = InnerSlider;

/***/ }),

/***/ "./node_modules/react-slick/lib/slider.js":
/*!************************************************!*\
  !*** ./node_modules/react-slick/lib/slider.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _innerSlider = __webpack_require__(/*! ./inner-slider */ "./node_modules/react-slick/lib/inner-slider.js");

var _json2mq = _interopRequireDefault(__webpack_require__(/*! json2mq */ "./node_modules/json2mq/index.js"));

var _defaultProps = _interopRequireDefault(__webpack_require__(/*! ./default-props */ "./node_modules/react-slick/lib/default-props.js"));

var _innerSliderUtils = __webpack_require__(/*! ./utils/innerSliderUtils */ "./node_modules/react-slick/lib/utils/innerSliderUtils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var enquire = (0, _innerSliderUtils.canUseDOM)() && __webpack_require__(/*! enquire.js */ "./node_modules/enquire.js/src/index.js");

var Slider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "innerSliderRefHandler", function (ref) {
      return _this.innerSlider = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "slickPrev", function () {
      return _this.innerSlider.slickPrev();
    });

    _defineProperty(_assertThisInitialized(_this), "slickNext", function () {
      return _this.innerSlider.slickNext();
    });

    _defineProperty(_assertThisInitialized(_this), "slickGoTo", function (slide) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return _this.innerSlider.slickGoTo(slide, dontAnimate);
    });

    _defineProperty(_assertThisInitialized(_this), "slickPause", function () {
      return _this.innerSlider.pause("paused");
    });

    _defineProperty(_assertThisInitialized(_this), "slickPlay", function () {
      return _this.innerSlider.autoPlay("play");
    });

    _this.state = {
      breakpoint: null
    };
    _this._responsiveMediaHandlers = [];
    return _this;
  }

  _createClass(Slider, [{
    key: "media",
    value: function media(query, handler) {
      // javascript handler for  css media query
      enquire.register(query, handler);

      this._responsiveMediaHandlers.push({
        query: query,
        handler: handler
      });
    } // handles responsive breakpoints

  }, {
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      var _this2 = this;

      // performance monitoring
      //if (process.env.NODE_ENV !== 'production') {
      //const { whyDidYouUpdate } = require('why-did-you-update')
      //whyDidYouUpdate(React)
      //}
      if (this.props.responsive) {
        var breakpoints = this.props.responsive.map(function (breakpt) {
          return breakpt.breakpoint;
        }); // sort them in increasing order of their numerical value

        breakpoints.sort(function (x, y) {
          return x - y;
        });
        breakpoints.forEach(function (breakpoint, index) {
          // media query for each breakpoint
          var bQuery;

          if (index === 0) {
            bQuery = (0, _json2mq["default"])({
              minWidth: 0,
              maxWidth: breakpoint
            });
          } else {
            bQuery = (0, _json2mq["default"])({
              minWidth: breakpoints[index - 1] + 1,
              maxWidth: breakpoint
            });
          } // when not using server side rendering


          (0, _innerSliderUtils.canUseDOM)() && _this2.media(bQuery, function () {
            _this2.setState({
              breakpoint: breakpoint
            });
          });
        }); // Register media query for full screen. Need to support resize from small to large
        // convert javascript object to media query string

        var query = (0, _json2mq["default"])({
          minWidth: breakpoints.slice(-1)[0]
        });
        (0, _innerSliderUtils.canUseDOM)() && this.media(query, function () {
          _this2.setState({
            breakpoint: null
          });
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._responsiveMediaHandlers.forEach(function (obj) {
        enquire.unregister(obj.query, obj.handler);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var settings;
      var newProps;

      if (this.state.breakpoint) {
        newProps = this.props.responsive.filter(function (resp) {
          return resp.breakpoint === _this3.state.breakpoint;
        });
        settings = newProps[0].settings === "unslick" ? "unslick" : _objectSpread({}, _defaultProps["default"], {}, this.props, {}, newProps[0].settings);
      } else {
        settings = _objectSpread({}, _defaultProps["default"], {}, this.props);
      } // force scrolling by one if centerMode is on


      if (settings.centerMode) {
        if (settings.slidesToScroll > 1 && "development" !== "production") {
          console.warn("slidesToScroll should be equal to 1 in centerMode, you are using ".concat(settings.slidesToScroll));
        }

        settings.slidesToScroll = 1;
      } // force showing one slide and scrolling by one if the fade mode is on


      if (settings.fade) {
        if (settings.slidesToShow > 1 && "development" !== "production") {
          console.warn("slidesToShow should be equal to 1 when fade is true, you're using ".concat(settings.slidesToShow));
        }

        if (settings.slidesToScroll > 1 && "development" !== "production") {
          console.warn("slidesToScroll should be equal to 1 when fade is true, you're using ".concat(settings.slidesToScroll));
        }

        settings.slidesToShow = 1;
        settings.slidesToScroll = 1;
      } // makes sure that children is an array, even when there is only 1 child


      var children = _react["default"].Children.toArray(this.props.children); // Children may contain false or null, so we should filter them
      // children may also contain string filled with spaces (in certain cases where we use jsx strings)


      children = children.filter(function (child) {
        if (typeof child === "string") {
          return !!child.trim();
        }

        return !!child;
      }); // rows and slidesPerRow logic is handled here

      if (settings.variableWidth && (settings.rows > 1 || settings.slidesPerRow > 1)) {
        console.warn("variableWidth is not supported in case of rows > 1 or slidesPerRow > 1");
        settings.variableWidth = false;
      }

      var newChildren = [];
      var currentWidth = null;

      for (var i = 0; i < children.length; i += settings.rows * settings.slidesPerRow) {
        var newSlide = [];

        for (var j = i; j < i + settings.rows * settings.slidesPerRow; j += settings.slidesPerRow) {
          var row = [];

          for (var k = j; k < j + settings.slidesPerRow; k += 1) {
            if (settings.variableWidth && children[k].props.style) {
              currentWidth = children[k].props.style.width;
            }

            if (k >= children.length) break;
            row.push(_react["default"].cloneElement(children[k], {
              key: 100 * i + 10 * j + k,
              tabIndex: -1,
              style: {
                width: "".concat(100 / settings.slidesPerRow, "%"),
                display: "inline-block"
              }
            }));
          }

          newSlide.push(_react["default"].createElement("div", {
            key: 10 * i + j
          }, row));
        }

        if (settings.variableWidth) {
          newChildren.push(_react["default"].createElement("div", {
            key: i,
            style: {
              width: currentWidth
            }
          }, newSlide));
        } else {
          newChildren.push(_react["default"].createElement("div", {
            key: i
          }, newSlide));
        }
      }

      if (settings === "unslick") {
        var className = "regular slider " + (this.props.className || "");
        return _react["default"].createElement("div", {
          className: className
        }, newChildren);
      } else if (newChildren.length <= settings.slidesToShow) {
        settings.unslick = true;
      }

      return _react["default"].createElement(_innerSlider.InnerSlider, _extends({
        style: this.props.style,
        ref: this.innerSliderRefHandler
      }, settings), newChildren);
    }
  }]);

  return Slider;
}(_react["default"].Component);

exports["default"] = Slider;

/***/ }),

/***/ "./node_modules/react-slick/lib/track.js":
/*!***********************************************!*\
  !*** ./node_modules/react-slick/lib/track.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Track = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _innerSliderUtils = __webpack_require__(/*! ./utils/innerSliderUtils */ "./node_modules/react-slick/lib/utils/innerSliderUtils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// given specifications/props for a slide, fetch all the classes that need to be applied to the slide
var getSlideClasses = function getSlideClasses(spec) {
  var slickActive, slickCenter, slickCloned;
  var centerOffset, index;

  if (spec.rtl) {
    index = spec.slideCount - 1 - spec.index;
  } else {
    index = spec.index;
  }

  slickCloned = index < 0 || index >= spec.slideCount;

  if (spec.centerMode) {
    centerOffset = Math.floor(spec.slidesToShow / 2);
    slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;

    if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) {
      slickActive = true;
    }
  } else {
    slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
  }

  var slickCurrent = index === spec.currentSlide;
  return {
    "slick-slide": true,
    "slick-active": slickActive,
    "slick-center": slickCenter,
    "slick-cloned": slickCloned,
    "slick-current": slickCurrent // dubious in case of RTL

  };
};

var getSlideStyle = function getSlideStyle(spec) {
  var style = {};

  if (spec.variableWidth === undefined || spec.variableWidth === false) {
    style.width = spec.slideWidth;
  }

  if (spec.fade) {
    style.position = "relative";

    if (spec.vertical) {
      style.top = -spec.index * parseInt(spec.slideHeight);
    } else {
      style.left = -spec.index * parseInt(spec.slideWidth);
    }

    style.opacity = spec.currentSlide === spec.index ? 1 : 0;
    style.transition = "opacity " + spec.speed + "ms " + spec.cssEase + ", " + "visibility " + spec.speed + "ms " + spec.cssEase;
    style.WebkitTransition = "opacity " + spec.speed + "ms " + spec.cssEase + ", " + "visibility " + spec.speed + "ms " + spec.cssEase;
  }

  return style;
};

var getKey = function getKey(child, fallbackKey) {
  return child.key || fallbackKey;
};

var renderSlides = function renderSlides(spec) {
  var key;
  var slides = [];
  var preCloneSlides = [];
  var postCloneSlides = [];

  var childrenCount = _react["default"].Children.count(spec.children);

  var startIndex = (0, _innerSliderUtils.lazyStartIndex)(spec);
  var endIndex = (0, _innerSliderUtils.lazyEndIndex)(spec);

  _react["default"].Children.forEach(spec.children, function (elem, index) {
    var child;
    var childOnClickOptions = {
      message: "children",
      index: index,
      slidesToScroll: spec.slidesToScroll,
      currentSlide: spec.currentSlide
    }; // in case of lazyLoad, whether or not we want to fetch the slide

    if (!spec.lazyLoad || spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0) {
      child = elem;
    } else {
      child = _react["default"].createElement("div", null);
    }

    var childStyle = getSlideStyle(_objectSpread({}, spec, {
      index: index
    }));
    var slideClass = child.props.className || "";
    var slideClasses = getSlideClasses(_objectSpread({}, spec, {
      index: index
    })); // push a cloned element of the desired slide

    slides.push(_react["default"].cloneElement(child, {
      key: "original" + getKey(child, index),
      "data-index": index,
      className: (0, _classnames["default"])(slideClasses, slideClass),
      tabIndex: "-1",
      "aria-hidden": !slideClasses["slick-active"],
      style: _objectSpread({
        outline: "none"
      }, child.props.style || {}, {}, childStyle),
      onClick: function onClick(e) {
        child.props && child.props.onClick && child.props.onClick(e);

        if (spec.focusOnSelect) {
          spec.focusOnSelect(childOnClickOptions);
        }
      }
    })); // if slide needs to be precloned or postcloned

    if (spec.infinite && spec.fade === false) {
      var preCloneNo = childrenCount - index;

      if (preCloneNo <= (0, _innerSliderUtils.getPreClones)(spec) && childrenCount !== spec.slidesToShow) {
        key = -preCloneNo;

        if (key >= startIndex) {
          child = elem;
        }

        slideClasses = getSlideClasses(_objectSpread({}, spec, {
          index: key
        }));
        preCloneSlides.push(_react["default"].cloneElement(child, {
          key: "precloned" + getKey(child, key),
          "data-index": key,
          tabIndex: "-1",
          className: (0, _classnames["default"])(slideClasses, slideClass),
          "aria-hidden": !slideClasses["slick-active"],
          style: _objectSpread({}, child.props.style || {}, {}, childStyle),
          onClick: function onClick(e) {
            child.props && child.props.onClick && child.props.onClick(e);

            if (spec.focusOnSelect) {
              spec.focusOnSelect(childOnClickOptions);
            }
          }
        }));
      }

      if (childrenCount !== spec.slidesToShow) {
        key = childrenCount + index;

        if (key < endIndex) {
          child = elem;
        }

        slideClasses = getSlideClasses(_objectSpread({}, spec, {
          index: key
        }));
        postCloneSlides.push(_react["default"].cloneElement(child, {
          key: "postcloned" + getKey(child, key),
          "data-index": key,
          tabIndex: "-1",
          className: (0, _classnames["default"])(slideClasses, slideClass),
          "aria-hidden": !slideClasses["slick-active"],
          style: _objectSpread({}, child.props.style || {}, {}, childStyle),
          onClick: function onClick(e) {
            child.props && child.props.onClick && child.props.onClick(e);

            if (spec.focusOnSelect) {
              spec.focusOnSelect(childOnClickOptions);
            }
          }
        }));
      }
    }
  });

  if (spec.rtl) {
    return preCloneSlides.concat(slides, postCloneSlides).reverse();
  } else {
    return preCloneSlides.concat(slides, postCloneSlides);
  }
};

var Track =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Track, _React$PureComponent);

  function Track() {
    _classCallCheck(this, Track);

    return _possibleConstructorReturn(this, _getPrototypeOf(Track).apply(this, arguments));
  }

  _createClass(Track, [{
    key: "render",
    value: function render() {
      var slides = renderSlides(this.props);
      var _this$props = this.props,
          onMouseEnter = _this$props.onMouseEnter,
          onMouseOver = _this$props.onMouseOver,
          onMouseLeave = _this$props.onMouseLeave;
      var mouseEvents = {
        onMouseEnter: onMouseEnter,
        onMouseOver: onMouseOver,
        onMouseLeave: onMouseLeave
      };
      return _react["default"].createElement("div", _extends({
        className: "slick-track",
        style: this.props.trackStyle
      }, mouseEvents), slides);
    }
  }]);

  return Track;
}(_react["default"].PureComponent);

exports.Track = Track;

/***/ }),

/***/ "./node_modules/react-slick/lib/utils/innerSliderUtils.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-slick/lib/utils/innerSliderUtils.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canUseDOM = exports.slidesOnLeft = exports.slidesOnRight = exports.siblingDirection = exports.getTotalSlides = exports.getPostClones = exports.getPreClones = exports.getTrackLeft = exports.getTrackAnimateCSS = exports.getTrackCSS = exports.checkSpecKeys = exports.getSlideCount = exports.checkNavigable = exports.getNavigableIndexes = exports.swipeEnd = exports.swipeMove = exports.swipeStart = exports.keyHandler = exports.changeSlide = exports.slideHandler = exports.initializedState = exports.extractObject = exports.canGoNext = exports.getSwipeDirection = exports.getHeight = exports.getWidth = exports.lazySlidesOnRight = exports.lazySlidesOnLeft = exports.lazyEndIndex = exports.lazyStartIndex = exports.getRequiredLazySlides = exports.getOnDemandLazySlides = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getOnDemandLazySlides = function getOnDemandLazySlides(spec) {
  var onDemandSlides = [];
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);

  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
    if (spec.lazyLoadedList.indexOf(slideIndex) < 0) {
      onDemandSlides.push(slideIndex);
    }
  }

  return onDemandSlides;
}; // return list of slides that need to be present


exports.getOnDemandLazySlides = getOnDemandLazySlides;

var getRequiredLazySlides = function getRequiredLazySlides(spec) {
  var requiredSlides = [];
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);

  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
    requiredSlides.push(slideIndex);
  }

  return requiredSlides;
}; // startIndex that needs to be present


exports.getRequiredLazySlides = getRequiredLazySlides;

var lazyStartIndex = function lazyStartIndex(spec) {
  return spec.currentSlide - lazySlidesOnLeft(spec);
};

exports.lazyStartIndex = lazyStartIndex;

var lazyEndIndex = function lazyEndIndex(spec) {
  return spec.currentSlide + lazySlidesOnRight(spec);
};

exports.lazyEndIndex = lazyEndIndex;

var lazySlidesOnLeft = function lazySlidesOnLeft(spec) {
  return spec.centerMode ? Math.floor(spec.slidesToShow / 2) + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : 0;
};

exports.lazySlidesOnLeft = lazySlidesOnLeft;

var lazySlidesOnRight = function lazySlidesOnRight(spec) {
  return spec.centerMode ? Math.floor((spec.slidesToShow - 1) / 2) + 1 + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : spec.slidesToShow;
}; // get width of an element


exports.lazySlidesOnRight = lazySlidesOnRight;

var getWidth = function getWidth(elem) {
  return elem && elem.offsetWidth || 0;
};

exports.getWidth = getWidth;

var getHeight = function getHeight(elem) {
  return elem && elem.offsetHeight || 0;
};

exports.getHeight = getHeight;

var getSwipeDirection = function getSwipeDirection(touchObject) {
  var verticalSwiping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var xDist, yDist, r, swipeAngle;
  xDist = touchObject.startX - touchObject.curX;
  yDist = touchObject.startY - touchObject.curY;
  r = Math.atan2(yDist, xDist);
  swipeAngle = Math.round(r * 180 / Math.PI);

  if (swipeAngle < 0) {
    swipeAngle = 360 - Math.abs(swipeAngle);
  }

  if (swipeAngle <= 45 && swipeAngle >= 0 || swipeAngle <= 360 && swipeAngle >= 315) {
    return "left";
  }

  if (swipeAngle >= 135 && swipeAngle <= 225) {
    return "right";
  }

  if (verticalSwiping === true) {
    if (swipeAngle >= 35 && swipeAngle <= 135) {
      return "up";
    } else {
      return "down";
    }
  }

  return "vertical";
}; // whether or not we can go next


exports.getSwipeDirection = getSwipeDirection;

var canGoNext = function canGoNext(spec) {
  var canGo = true;

  if (!spec.infinite) {
    if (spec.centerMode && spec.currentSlide >= spec.slideCount - 1) {
      canGo = false;
    } else if (spec.slideCount <= spec.slidesToShow || spec.currentSlide >= spec.slideCount - spec.slidesToShow) {
      canGo = false;
    }
  }

  return canGo;
}; // given an object and a list of keys, return new object with given keys


exports.canGoNext = canGoNext;

var extractObject = function extractObject(spec, keys) {
  var newObject = {};
  keys.forEach(function (key) {
    return newObject[key] = spec[key];
  });
  return newObject;
}; // get initialized state


exports.extractObject = extractObject;

var initializedState = function initializedState(spec) {
  // spec also contains listRef, trackRef
  var slideCount = _react["default"].Children.count(spec.children);

  var listWidth = Math.ceil(getWidth(_reactDom["default"].findDOMNode(spec.listRef)));
  var trackWidth = Math.ceil(getWidth(_reactDom["default"].findDOMNode(spec.trackRef)));
  var slideWidth;

  if (!spec.vertical) {
    var centerPaddingAdj = spec.centerMode && parseInt(spec.centerPadding) * 2;

    if (typeof spec.centerPadding === "string" && spec.centerPadding.slice(-1) === "%") {
      centerPaddingAdj *= listWidth / 100;
    }

    slideWidth = Math.ceil((listWidth - centerPaddingAdj) / spec.slidesToShow);
  } else {
    slideWidth = listWidth;
  }

  var slideHeight = _reactDom["default"].findDOMNode(spec.listRef) && getHeight(_reactDom["default"].findDOMNode(spec.listRef).querySelector('[data-index="0"]'));
  var listHeight = slideHeight * spec.slidesToShow;
  var currentSlide = spec.currentSlide === undefined ? spec.initialSlide : spec.currentSlide;

  if (spec.rtl && spec.currentSlide === undefined) {
    currentSlide = slideCount - 1 - spec.initialSlide;
  }

  var lazyLoadedList = spec.lazyLoadedList || [];
  var slidesToLoad = getOnDemandLazySlides({
    currentSlide: currentSlide,
    lazyLoadedList: lazyLoadedList
  }, spec);
  lazyLoadedList.concat(slidesToLoad);
  var state = {
    slideCount: slideCount,
    slideWidth: slideWidth,
    listWidth: listWidth,
    trackWidth: trackWidth,
    currentSlide: currentSlide,
    slideHeight: slideHeight,
    listHeight: listHeight,
    lazyLoadedList: lazyLoadedList
  };

  if (spec.autoplaying === null && spec.autoplay) {
    state["autoplaying"] = "playing";
  }

  return state;
};

exports.initializedState = initializedState;

var slideHandler = function slideHandler(spec) {
  var waitForAnimate = spec.waitForAnimate,
      animating = spec.animating,
      fade = spec.fade,
      infinite = spec.infinite,
      index = spec.index,
      slideCount = spec.slideCount,
      lazyLoadedList = spec.lazyLoadedList,
      lazyLoad = spec.lazyLoad,
      currentSlide = spec.currentSlide,
      centerMode = spec.centerMode,
      slidesToScroll = spec.slidesToScroll,
      slidesToShow = spec.slidesToShow,
      useCSS = spec.useCSS;
  if (waitForAnimate && animating) return {};
  var animationSlide = index,
      finalSlide,
      animationLeft,
      finalLeft;
  var state = {},
      nextState = {};

  if (fade) {
    if (!infinite && (index < 0 || index >= slideCount)) return {};

    if (index < 0) {
      animationSlide = index + slideCount;
    } else if (index >= slideCount) {
      animationSlide = index - slideCount;
    }

    if (lazyLoad && lazyLoadedList.indexOf(animationSlide) < 0) {
      lazyLoadedList.push(animationSlide);
    }

    state = {
      animating: true,
      currentSlide: animationSlide,
      lazyLoadedList: lazyLoadedList
    };
    nextState = {
      animating: false
    };
  } else {
    finalSlide = animationSlide;

    if (animationSlide < 0) {
      finalSlide = animationSlide + slideCount;
      if (!infinite) finalSlide = 0;else if (slideCount % slidesToScroll !== 0) finalSlide = slideCount - slideCount % slidesToScroll;
    } else if (!canGoNext(spec) && animationSlide > currentSlide) {
      animationSlide = finalSlide = currentSlide;
    } else if (centerMode && animationSlide >= slideCount) {
      animationSlide = infinite ? slideCount : slideCount - 1;
      finalSlide = infinite ? 0 : slideCount - 1;
    } else if (animationSlide >= slideCount) {
      finalSlide = animationSlide - slideCount;
      if (!infinite) finalSlide = slideCount - slidesToShow;else if (slideCount % slidesToScroll !== 0) finalSlide = 0;
    }

    animationLeft = getTrackLeft(_objectSpread({}, spec, {
      slideIndex: animationSlide
    }));
    finalLeft = getTrackLeft(_objectSpread({}, spec, {
      slideIndex: finalSlide
    }));

    if (!infinite) {
      if (animationLeft === finalLeft) animationSlide = finalSlide;
      animationLeft = finalLeft;
    }

    lazyLoad && lazyLoadedList.concat(getOnDemandLazySlides(_objectSpread({}, spec, {
      currentSlide: animationSlide
    })));

    if (!useCSS) {
      state = {
        currentSlide: finalSlide,
        trackStyle: getTrackCSS(_objectSpread({}, spec, {
          left: finalLeft
        })),
        lazyLoadedList: lazyLoadedList
      };
    } else {
      state = {
        animating: true,
        currentSlide: finalSlide,
        trackStyle: getTrackAnimateCSS(_objectSpread({}, spec, {
          left: animationLeft
        })),
        lazyLoadedList: lazyLoadedList
      };
      nextState = {
        animating: false,
        currentSlide: finalSlide,
        trackStyle: getTrackCSS(_objectSpread({}, spec, {
          left: finalLeft
        })),
        swipeLeft: null
      };
    }
  }

  return {
    state: state,
    nextState: nextState
  };
};

exports.slideHandler = slideHandler;

var changeSlide = function changeSlide(spec, options) {
  var indexOffset, previousInt, slideOffset, unevenOffset, targetSlide;
  var slidesToScroll = spec.slidesToScroll,
      slidesToShow = spec.slidesToShow,
      slideCount = spec.slideCount,
      currentSlide = spec.currentSlide,
      lazyLoad = spec.lazyLoad,
      infinite = spec.infinite;
  unevenOffset = slideCount % slidesToScroll !== 0;
  indexOffset = unevenOffset ? 0 : (slideCount - currentSlide) % slidesToScroll;

  if (options.message === "previous") {
    slideOffset = indexOffset === 0 ? slidesToScroll : slidesToShow - indexOffset;
    targetSlide = currentSlide - slideOffset;

    if (lazyLoad && !infinite) {
      previousInt = currentSlide - slideOffset;
      targetSlide = previousInt === -1 ? slideCount - 1 : previousInt;
    }
  } else if (options.message === "next") {
    slideOffset = indexOffset === 0 ? slidesToScroll : indexOffset;
    targetSlide = currentSlide + slideOffset;

    if (lazyLoad && !infinite) {
      targetSlide = (currentSlide + slidesToScroll) % slideCount + indexOffset;
    }
  } else if (options.message === "dots") {
    // Click on dots
    targetSlide = options.index * options.slidesToScroll;

    if (targetSlide === options.currentSlide) {
      return null;
    }
  } else if (options.message === "children") {
    // Click on the slides
    targetSlide = options.index;

    if (targetSlide === options.currentSlide) {
      return null;
    }

    if (infinite) {
      var direction = siblingDirection(_objectSpread({}, spec, {
        targetSlide: targetSlide
      }));

      if (targetSlide > options.currentSlide && direction === "left") {
        targetSlide = targetSlide - slideCount;
      } else if (targetSlide < options.currentSlide && direction === "right") {
        targetSlide = targetSlide + slideCount;
      }
    }
  } else if (options.message === "index") {
    targetSlide = Number(options.index);

    if (targetSlide === options.currentSlide) {
      return null;
    }
  }

  return targetSlide;
};

exports.changeSlide = changeSlide;

var keyHandler = function keyHandler(e, accessibility, rtl) {
  if (e.target.tagName.match("TEXTAREA|INPUT|SELECT") || !accessibility) return "";
  if (e.keyCode === 37) return rtl ? "next" : "previous";
  if (e.keyCode === 39) return rtl ? "previous" : "next";
  return "";
};

exports.keyHandler = keyHandler;

var swipeStart = function swipeStart(e, swipe, draggable) {
  e.target.tagName === "IMG" && e.preventDefault();
  if (!swipe || !draggable && e.type.indexOf("mouse") !== -1) return "";
  return {
    dragging: true,
    touchObject: {
      startX: e.touches ? e.touches[0].pageX : e.clientX,
      startY: e.touches ? e.touches[0].pageY : e.clientY,
      curX: e.touches ? e.touches[0].pageX : e.clientX,
      curY: e.touches ? e.touches[0].pageY : e.clientY
    }
  };
};

exports.swipeStart = swipeStart;

var swipeMove = function swipeMove(e, spec) {
  // spec also contains, trackRef and slideIndex
  var scrolling = spec.scrolling,
      animating = spec.animating,
      vertical = spec.vertical,
      swipeToSlide = spec.swipeToSlide,
      verticalSwiping = spec.verticalSwiping,
      rtl = spec.rtl,
      currentSlide = spec.currentSlide,
      edgeFriction = spec.edgeFriction,
      edgeDragged = spec.edgeDragged,
      onEdge = spec.onEdge,
      swiped = spec.swiped,
      swiping = spec.swiping,
      slideCount = spec.slideCount,
      slidesToScroll = spec.slidesToScroll,
      infinite = spec.infinite,
      touchObject = spec.touchObject,
      swipeEvent = spec.swipeEvent,
      listHeight = spec.listHeight,
      listWidth = spec.listWidth;
  if (scrolling) return;
  if (animating) return e.preventDefault();
  if (vertical && swipeToSlide && verticalSwiping) e.preventDefault();
  var swipeLeft,
      state = {};
  var curLeft = getTrackLeft(spec);
  touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;
  touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;
  touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)));
  var verticalSwipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curY - touchObject.startY, 2)));

  if (!verticalSwiping && !swiping && verticalSwipeLength > 10) {
    return {
      scrolling: true
    };
  }

  if (verticalSwiping) touchObject.swipeLength = verticalSwipeLength;
  var positionOffset = (!rtl ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);
  if (verticalSwiping) positionOffset = touchObject.curY > touchObject.startY ? 1 : -1;
  var dotCount = Math.ceil(slideCount / slidesToScroll);
  var swipeDirection = getSwipeDirection(spec.touchObject, verticalSwiping);
  var touchSwipeLength = touchObject.swipeLength;

  if (!infinite) {
    if (currentSlide === 0 && swipeDirection === "right" || currentSlide + 1 >= dotCount && swipeDirection === "left" || !canGoNext(spec) && swipeDirection === "left") {
      touchSwipeLength = touchObject.swipeLength * edgeFriction;

      if (edgeDragged === false && onEdge) {
        onEdge(swipeDirection);
        state["edgeDragged"] = true;
      }
    }
  }

  if (!swiped && swipeEvent) {
    swipeEvent(swipeDirection);
    state["swiped"] = true;
  }

  if (!vertical) {
    if (!rtl) {
      swipeLeft = curLeft + touchSwipeLength * positionOffset;
    } else {
      swipeLeft = curLeft - touchSwipeLength * positionOffset;
    }
  } else {
    swipeLeft = curLeft + touchSwipeLength * (listHeight / listWidth) * positionOffset;
  }

  if (verticalSwiping) {
    swipeLeft = curLeft + touchSwipeLength * positionOffset;
  }

  state = _objectSpread({}, state, {
    touchObject: touchObject,
    swipeLeft: swipeLeft,
    trackStyle: getTrackCSS(_objectSpread({}, spec, {
      left: swipeLeft
    }))
  });

  if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) {
    return state;
  }

  if (touchObject.swipeLength > 10) {
    state["swiping"] = true;
    e.preventDefault();
  }

  return state;
};

exports.swipeMove = swipeMove;

var swipeEnd = function swipeEnd(e, spec) {
  var dragging = spec.dragging,
      swipe = spec.swipe,
      touchObject = spec.touchObject,
      listWidth = spec.listWidth,
      touchThreshold = spec.touchThreshold,
      verticalSwiping = spec.verticalSwiping,
      listHeight = spec.listHeight,
      currentSlide = spec.currentSlide,
      swipeToSlide = spec.swipeToSlide,
      scrolling = spec.scrolling,
      onSwipe = spec.onSwipe;

  if (!dragging) {
    if (swipe) e.preventDefault();
    return {};
  }

  var minSwipe = verticalSwiping ? listHeight / touchThreshold : listWidth / touchThreshold;
  var swipeDirection = getSwipeDirection(touchObject, verticalSwiping); // reset the state of touch related state variables.

  var state = {
    dragging: false,
    edgeDragged: false,
    scrolling: false,
    swiping: false,
    swiped: false,
    swipeLeft: null,
    touchObject: {}
  };

  if (scrolling) {
    return state;
  }

  if (!touchObject.swipeLength) {
    return state;
  }

  if (touchObject.swipeLength > minSwipe) {
    e.preventDefault();

    if (onSwipe) {
      onSwipe(swipeDirection);
    }

    var slideCount, newSlide;

    switch (swipeDirection) {
      case "left":
      case "up":
        newSlide = currentSlide + getSlideCount(spec);
        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
        state["currentDirection"] = 0;
        break;

      case "right":
      case "down":
        newSlide = currentSlide - getSlideCount(spec);
        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
        state["currentDirection"] = 1;
        break;

      default:
        slideCount = currentSlide;
    }

    state["triggerSlideHandler"] = slideCount;
  } else {
    // Adjust the track back to it's original position.
    var currentLeft = getTrackLeft(spec);
    state["trackStyle"] = getTrackAnimateCSS(_objectSpread({}, spec, {
      left: currentLeft
    }));
  }

  return state;
};

exports.swipeEnd = swipeEnd;

var getNavigableIndexes = function getNavigableIndexes(spec) {
  var max = spec.infinite ? spec.slideCount * 2 : spec.slideCount;
  var breakpoint = spec.infinite ? spec.slidesToShow * -1 : 0;
  var counter = spec.infinite ? spec.slidesToShow * -1 : 0;
  var indexes = [];

  while (breakpoint < max) {
    indexes.push(breakpoint);
    breakpoint = counter + spec.slidesToScroll;
    counter += Math.min(spec.slidesToScroll, spec.slidesToShow);
  }

  return indexes;
};

exports.getNavigableIndexes = getNavigableIndexes;

var checkNavigable = function checkNavigable(spec, index) {
  var navigables = getNavigableIndexes(spec);
  var prevNavigable = 0;

  if (index > navigables[navigables.length - 1]) {
    index = navigables[navigables.length - 1];
  } else {
    for (var n in navigables) {
      if (index < navigables[n]) {
        index = prevNavigable;
        break;
      }

      prevNavigable = navigables[n];
    }
  }

  return index;
};

exports.checkNavigable = checkNavigable;

var getSlideCount = function getSlideCount(spec) {
  var centerOffset = spec.centerMode ? spec.slideWidth * Math.floor(spec.slidesToShow / 2) : 0;

  if (spec.swipeToSlide) {
    var swipedSlide;

    var slickList = _reactDom["default"].findDOMNode(spec.listRef);

    var slides = slickList.querySelectorAll(".slick-slide");
    Array.from(slides).every(function (slide) {
      if (!spec.vertical) {
        if (slide.offsetLeft - centerOffset + getWidth(slide) / 2 > spec.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      } else {
        if (slide.offsetTop + getHeight(slide) / 2 > spec.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      }

      return true;
    });

    if (!swipedSlide) {
      return 0;
    }

    var currentIndex = spec.rtl === true ? spec.slideCount - spec.currentSlide : spec.currentSlide;
    var slidesTraversed = Math.abs(swipedSlide.dataset.index - currentIndex) || 1;
    return slidesTraversed;
  } else {
    return spec.slidesToScroll;
  }
};

exports.getSlideCount = getSlideCount;

var checkSpecKeys = function checkSpecKeys(spec, keysArray) {
  return keysArray.reduce(function (value, key) {
    return value && spec.hasOwnProperty(key);
  }, true) ? null : console.error("Keys Missing:", spec);
};

exports.checkSpecKeys = checkSpecKeys;

var getTrackCSS = function getTrackCSS(spec) {
  checkSpecKeys(spec, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth"]);
  var trackWidth, trackHeight;
  var trackChildren = spec.slideCount + 2 * spec.slidesToShow;

  if (!spec.vertical) {
    trackWidth = getTotalSlides(spec) * spec.slideWidth;
  } else {
    trackHeight = trackChildren * spec.slideHeight;
  }

  var style = {
    opacity: 1,
    transition: "",
    WebkitTransition: ""
  };

  if (spec.useTransform) {
    var WebkitTransform = !spec.vertical ? "translate3d(" + spec.left + "px, 0px, 0px)" : "translate3d(0px, " + spec.left + "px, 0px)";
    var transform = !spec.vertical ? "translate3d(" + spec.left + "px, 0px, 0px)" : "translate3d(0px, " + spec.left + "px, 0px)";
    var msTransform = !spec.vertical ? "translateX(" + spec.left + "px)" : "translateY(" + spec.left + "px)";
    style = _objectSpread({}, style, {
      WebkitTransform: WebkitTransform,
      transform: transform,
      msTransform: msTransform
    });
  } else {
    if (spec.vertical) {
      style["top"] = spec.left;
    } else {
      style["left"] = spec.left;
    }
  }

  if (spec.fade) style = {
    opacity: 1
  };
  if (trackWidth) style.width = trackWidth;
  if (trackHeight) style.height = trackHeight; // Fallback for IE8

  if (window && !window.addEventListener && window.attachEvent) {
    if (!spec.vertical) {
      style.marginLeft = spec.left + "px";
    } else {
      style.marginTop = spec.left + "px";
    }
  }

  return style;
};

exports.getTrackCSS = getTrackCSS;

var getTrackAnimateCSS = function getTrackAnimateCSS(spec) {
  checkSpecKeys(spec, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth", "speed", "cssEase"]);
  var style = getTrackCSS(spec); // useCSS is true by default so it can be undefined

  if (spec.useTransform) {
    style.WebkitTransition = "-webkit-transform " + spec.speed + "ms " + spec.cssEase;
    style.transition = "transform " + spec.speed + "ms " + spec.cssEase;
  } else {
    if (spec.vertical) {
      style.transition = "top " + spec.speed + "ms " + spec.cssEase;
    } else {
      style.transition = "left " + spec.speed + "ms " + spec.cssEase;
    }
  }

  return style;
};

exports.getTrackAnimateCSS = getTrackAnimateCSS;

var getTrackLeft = function getTrackLeft(spec) {
  if (spec.unslick) {
    return 0;
  }

  checkSpecKeys(spec, ["slideIndex", "trackRef", "infinite", "centerMode", "slideCount", "slidesToShow", "slidesToScroll", "slideWidth", "listWidth", "variableWidth", "slideHeight"]);
  var slideIndex = spec.slideIndex,
      trackRef = spec.trackRef,
      infinite = spec.infinite,
      centerMode = spec.centerMode,
      slideCount = spec.slideCount,
      slidesToShow = spec.slidesToShow,
      slidesToScroll = spec.slidesToScroll,
      slideWidth = spec.slideWidth,
      listWidth = spec.listWidth,
      variableWidth = spec.variableWidth,
      slideHeight = spec.slideHeight,
      fade = spec.fade,
      vertical = spec.vertical;
  var slideOffset = 0;
  var targetLeft;
  var targetSlide;
  var verticalOffset = 0;

  if (fade || spec.slideCount === 1) {
    return 0;
  }

  var slidesToOffset = 0;

  if (infinite) {
    slidesToOffset = -getPreClones(spec); // bring active slide to the beginning of visual area
    // if next scroll doesn't have enough children, just reach till the end of original slides instead of shifting slidesToScroll children

    if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
      slidesToOffset = -(slideIndex > slideCount ? slidesToShow - (slideIndex - slideCount) : slideCount % slidesToScroll);
    } // shift current slide to center of the frame


    if (centerMode) {
      slidesToOffset += parseInt(slidesToShow / 2);
    }
  } else {
    if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
      slidesToOffset = slidesToShow - slideCount % slidesToScroll;
    }

    if (centerMode) {
      slidesToOffset = parseInt(slidesToShow / 2);
    }
  }

  slideOffset = slidesToOffset * slideWidth;
  verticalOffset = slidesToOffset * slideHeight;

  if (!vertical) {
    targetLeft = slideIndex * slideWidth * -1 + slideOffset;
  } else {
    targetLeft = slideIndex * slideHeight * -1 + verticalOffset;
  }

  if (variableWidth === true) {
    var targetSlideIndex;

    var trackElem = _reactDom["default"].findDOMNode(trackRef);

    targetSlideIndex = slideIndex + getPreClones(spec);
    targetSlide = trackElem && trackElem.childNodes[targetSlideIndex];
    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;

    if (centerMode === true) {
      targetSlideIndex = infinite ? slideIndex + getPreClones(spec) : slideIndex;
      targetSlide = trackElem && trackElem.children[targetSlideIndex];
      targetLeft = 0;

      for (var slide = 0; slide < targetSlideIndex; slide++) {
        targetLeft -= trackElem && trackElem.children[slide] && trackElem.children[slide].offsetWidth;
      }

      targetLeft -= parseInt(spec.centerPadding);
      targetLeft += targetSlide && (listWidth - targetSlide.offsetWidth) / 2;
    }
  }

  return targetLeft;
};

exports.getTrackLeft = getTrackLeft;

var getPreClones = function getPreClones(spec) {
  if (spec.unslick || !spec.infinite) {
    return 0;
  }

  if (spec.variableWidth) {
    return spec.slideCount;
  }

  return spec.slidesToShow + (spec.centerMode ? 1 : 0);
};

exports.getPreClones = getPreClones;

var getPostClones = function getPostClones(spec) {
  if (spec.unslick || !spec.infinite) {
    return 0;
  }

  return spec.slideCount;
};

exports.getPostClones = getPostClones;

var getTotalSlides = function getTotalSlides(spec) {
  return spec.slideCount === 1 ? 1 : getPreClones(spec) + spec.slideCount + getPostClones(spec);
};

exports.getTotalSlides = getTotalSlides;

var siblingDirection = function siblingDirection(spec) {
  if (spec.targetSlide > spec.currentSlide) {
    if (spec.targetSlide > spec.currentSlide + slidesOnRight(spec)) {
      return "left";
    }

    return "right";
  } else {
    if (spec.targetSlide < spec.currentSlide - slidesOnLeft(spec)) {
      return "right";
    }

    return "left";
  }
};

exports.siblingDirection = siblingDirection;

var slidesOnRight = function slidesOnRight(_ref) {
  var slidesToShow = _ref.slidesToShow,
      centerMode = _ref.centerMode,
      rtl = _ref.rtl,
      centerPadding = _ref.centerPadding;

  // returns no of slides on the right of active slide
  if (centerMode) {
    var right = (slidesToShow - 1) / 2 + 1;
    if (parseInt(centerPadding) > 0) right += 1;
    if (rtl && slidesToShow % 2 === 0) right += 1;
    return right;
  }

  if (rtl) {
    return 0;
  }

  return slidesToShow - 1;
};

exports.slidesOnRight = slidesOnRight;

var slidesOnLeft = function slidesOnLeft(_ref2) {
  var slidesToShow = _ref2.slidesToShow,
      centerMode = _ref2.centerMode,
      rtl = _ref2.rtl,
      centerPadding = _ref2.centerPadding;

  // returns no of slides on the left of active slide
  if (centerMode) {
    var left = (slidesToShow - 1) / 2 + 1;
    if (parseInt(centerPadding) > 0) left += 1;
    if (!rtl && slidesToShow % 2 === 0) left += 1;
    return left;
  }

  if (rtl) {
    return slidesToShow - 1;
  }

  return 0;
};

exports.slidesOnLeft = slidesOnLeft;

var canUseDOM = function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
};

exports.canUseDOM = canUseDOM;

/***/ }),

/***/ "./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js":
/*!*************************************************************************!*\
  !*** ./node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return /** @class */ (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            /**
             * @returns {boolean}
             */
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {*} key
         * @returns {*}
         */
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        /**
         * @param {*} key
         * @returns {void}
         */
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        /**
         * @returns {void}
         */
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;
/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }
    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserverController.
     *
     * @private
     */
    function ResizeObserverController() {
        /**
         * Indicates whether DOM listeners have been added.
         *
         * @private {boolean}
         */
        this.connected_ = false;
        /**
         * Tells that controller has subscribed for Mutation Events.
         *
         * @private {boolean}
         */
        this.mutationEventsAdded_ = false;
        /**
         * Keeps reference to the instance of MutationObserver.
         *
         * @private {MutationObserver}
         */
        this.mutationsObserver_ = null;
        /**
         * A list of connected observers.
         *
         * @private {Array<ResizeObserverSPI>}
         */
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    /**
     * Adds observer to observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be added.
     * @returns {void}
     */
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        // Add listeners if they haven't been added yet.
        if (!this.connected_) {
            this.connect_();
        }
    };
    /**
     * Removes observer from observers list.
     *
     * @param {ResizeObserverSPI} observer - Observer to be removed.
     * @returns {void}
     */
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        // Remove observer if it's present in registry.
        if (~index) {
            observers.splice(index, 1);
        }
        // Remove listeners if controller has no connected observers.
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    /**
     * Invokes the update of observers. It will continue running updates insofar
     * it detects changes.
     *
     * @returns {void}
     */
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        // Continue running updates if changes have been detected as there might
        // be future ones caused by CSS transitions.
        if (changesDetected) {
            this.refresh();
        }
    };
    /**
     * Updates every observer from observers list and notifies them of queued
     * entries.
     *
     * @private
     * @returns {boolean} Returns "true" if any observer has detected changes in
     *      dimensions of it's elements.
     */
    ResizeObserverController.prototype.updateObservers_ = function () {
        // Collect observers that have active observations.
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        // Deliver notifications in a separate cycle in order to avoid any
        // collisions between observers, e.g. when multiple instances of
        // ResizeObserver are tracking the same element and the callback of one
        // of them changes content dimensions of the observed target. Sometimes
        // this may result in notifications being blocked for the rest of observers.
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    /**
     * Initializes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.connect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already added.
        if (!isBrowser || this.connected_) {
            return;
        }
        // Subscription to the "Transitionend" event is used as a workaround for
        // delayed transitions. This way it's possible to capture at least the
        // final state of an element.
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    /**
     * Removes DOM listeners.
     *
     * @private
     * @returns {void}
     */
    ResizeObserverController.prototype.disconnect_ = function () {
        // Do nothing if running in a non-browser environment or if listeners
        // have been already removed.
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    /**
     * "Transitionend" event handler.
     *
     * @private
     * @param {TransitionEvent} event
     * @returns {void}
     */
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        // Detect whether transition may affect dimensions of an element.
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    /**
     * Returns instance of the ResizeObserverController.
     *
     * @returns {ResizeObserverController}
     */
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    /**
     * Holds reference to the controller's instance.
     *
     * @private {ResizeObserverController}
     */
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);
/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}
/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width), height = toFloat(styles.height);
    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObservation.
     *
     * @param {Element} target - Element to be observed.
     */
    function ResizeObservation(target) {
        /**
         * Broadcasted width of content rectangle.
         *
         * @type {number}
         */
        this.broadcastWidth = 0;
        /**
         * Broadcasted height of content rectangle.
         *
         * @type {number}
         */
        this.broadcastHeight = 0;
        /**
         * Reference to the last observed content rectangle.
         *
         * @private {DOMRectInit}
         */
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    /**
     * Updates content rectangle and tells whether it's width or height properties
     * have changed since the last broadcast.
     *
     * @returns {boolean}
     */
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    /**
     * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
     * from the corresponding properties of the last observed content rectangle.
     *
     * @returns {DOMRectInit} Last observed content rectangle.
     */
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());

var ResizeObserverEntry = /** @class */ (function () {
    /**
     * Creates an instance of ResizeObserverEntry.
     *
     * @param {Element} target - Element that is being observed.
     * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
     */
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        // According to the specification following properties are not writable
        // and are also not enumerable in the native implementation.
        //
        // Property accessors are not being used as they'd require to define a
        // private WeakMap storage which may cause memory leaks in browsers that
        // don't support this type of collections.
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());

var ResizeObserverSPI = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback function that is invoked
     *      when one of the observed elements changes it's content dimensions.
     * @param {ResizeObserverController} controller - Controller instance which
     *      is responsible for the updates of observer.
     * @param {ResizeObserver} callbackCtx - Reference to the public
     *      ResizeObserver instance which will be passed to callback function.
     */
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        /**
         * Collection of resize observations that have detected changes in dimensions
         * of elements.
         *
         * @private {Array<ResizeObservation>}
         */
        this.activeObservations_ = [];
        /**
         * Registry of the ResizeObservation instances.
         *
         * @private {Map<Element, ResizeObservation>}
         */
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    /**
     * Starts observing provided element.
     *
     * @param {Element} target - Element to be observed.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is already being observed.
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        // Force the update of observations.
        this.controller_.refresh();
    };
    /**
     * Stops observing provided element.
     *
     * @param {Element} target - Element to stop observing.
     * @returns {void}
     */
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        // Do nothing if current environment doesn't have the Element interface.
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        // Do nothing if element is not being observed.
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    /**
     * Stops observing all elements.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    /**
     * Collects observation instances the associated element of which has changed
     * it's content rectangle.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    /**
     * Invokes initial callback function with a list of ResizeObserverEntry
     * instances collected from active resize observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.broadcastActive = function () {
        // Do nothing if observer doesn't have active observations.
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        // Create ResizeObserverEntry instance for every active observation.
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    /**
     * Clears the collection of active observations.
     *
     * @returns {void}
     */
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    /**
     * Tells whether observer has active observations.
     *
     * @returns {boolean}
     */
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = /** @class */ (function () {
    /**
     * Creates a new instance of ResizeObserver.
     *
     * @param {ResizeObserverCallback} callback - Callback that is invoked when
     *      dimensions of the observed elements change.
     */
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
// Expose public methods of ResizeObserver.
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

/* harmony default export */ __webpack_exports__["default"] = (index);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/string-convert/camel2hyphen.js":
/*!*****************************************************!*\
  !*** ./node_modules/string-convert/camel2hyphen.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var camel2hyphen = function (str) {
  return str
          .replace(/[A-Z]/g, function (match) {
            return '-' + match.toLowerCase();
          })
          .toLowerCase();
};

module.exports = camel2hyphen;

/***/ }),

/***/ "./node_modules/uncontrollable/esm/hook.js":
/*!*************************************************!*\
  !*** ./node_modules/uncontrollable/esm/hook.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useUncontrolled; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./node_modules/uncontrollable/esm/utils.js");



function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



function useUncontrolled(props, config) {
  return Object.keys(config).reduce(function (result, fieldName) {
    var _extends2;

    var defaultValue = result[_utils__WEBPACK_IMPORTED_MODULE_3__["defaultKey"](fieldName)],
        propsValue = result[fieldName],
        rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(result, [_utils__WEBPACK_IMPORTED_MODULE_3__["defaultKey"](fieldName), fieldName].map(_toPropertyKey));

    var handlerName = config[fieldName];
    var prevProps = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])({});

    var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(defaultValue),
        stateValue = _useState[0],
        setState = _useState[1];

    var isProp = _utils__WEBPACK_IMPORTED_MODULE_3__["isProp"](props, fieldName);
    var wasProp = _utils__WEBPACK_IMPORTED_MODULE_3__["isProp"](prevProps.current, fieldName);
    prevProps.current = props;
    /**
     * If a prop switches from controlled to Uncontrolled
     * reset its value to the defaultValue
     */

    if (!isProp && wasProp) {
      setState(defaultValue);
    }

    var propsHandler = props[handlerName];
    var handler = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function (value) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (propsHandler) propsHandler.apply(void 0, [value].concat(args));
      setState(value);
    }, [setState, propsHandler]);
    return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rest, (_extends2 = {}, _extends2[fieldName] = isProp ? propsValue : stateValue, _extends2[handlerName] = handler, _extends2));
  }, props);
}

/***/ }),

/***/ "./node_modules/uncontrollable/esm/index.js":
/*!**************************************************!*\
  !*** ./node_modules/uncontrollable/esm/index.js ***!
  \**************************************************/
/*! exports provided: useUncontrolled, uncontrollable, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uncontrollable", function() { return uncontrollable; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./node_modules/uncontrollable/esm/utils.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hook.js */ "./node_modules/uncontrollable/esm/hook.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useUncontrolled", function() { return _hook_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });








function uncontrollable(Component, controlledValues, methods) {
  if (methods === void 0) {
    methods = [];
  }

  var displayName = Component.displayName || Component.name || 'Component';
  var canAcceptRef = _utils__WEBPACK_IMPORTED_MODULE_5__["canAcceptRef"](Component);
  var controlledProps = Object.keys(controlledValues);
  var PROPS_TO_OMIT = controlledProps.map(_utils__WEBPACK_IMPORTED_MODULE_5__["defaultKey"]);
  !(canAcceptRef || !methods.length) ?  true ? invariant__WEBPACK_IMPORTED_MODULE_4___default()(false, '[uncontrollable] stateless function components cannot pass through methods ' + 'because they have no associated instances. Check component: ' + displayName + ', ' + 'attempting to pass through methods: ' + methods.join(', ')) : undefined : void 0;

  var UncontrolledComponent =
  /*#__PURE__*/
  function (_React$Component) {
    Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__["default"])(UncontrolledComponent, _React$Component);

    function UncontrolledComponent() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.handlers = Object.create(null);
      controlledProps.forEach(function (propName) {
        var handlerName = controlledValues[propName];

        var handleChange = function handleChange(value) {
          if (_this.props[handlerName]) {
            var _this$props;

            _this._notifying = true;

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            (_this$props = _this.props)[handlerName].apply(_this$props, [value].concat(args));

            _this._notifying = false;
          }

          _this._values[propName] = value;
          if (!_this.unmounted) _this.forceUpdate();
        };

        _this.handlers[handlerName] = handleChange;
      });
      if (methods.length) _this.attachRef = function (ref) {
        _this.inner = ref;
      };
      return _this;
    }

    var _proto = UncontrolledComponent.prototype;

    _proto.shouldComponentUpdate = function shouldComponentUpdate() {
      //let the forceUpdate trigger the update
      return !this._notifying;
    };

    _proto.componentWillMount = function componentWillMount() {
      var _this2 = this;

      var props = this.props;
      this._values = Object.create(null);
      controlledProps.forEach(function (key) {
        _this2._values[key] = props[_utils__WEBPACK_IMPORTED_MODULE_5__["defaultKey"](key)];
      });
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var props = this.props;
      controlledProps.forEach(function (key) {
        /**
         * If a prop switches from controlled to Uncontrolled
         * reset its value to the defaultValue
         */
        if (!_utils__WEBPACK_IMPORTED_MODULE_5__["isProp"](nextProps, key) && _utils__WEBPACK_IMPORTED_MODULE_5__["isProp"](props, key)) {
          _this3._values[key] = nextProps[_utils__WEBPACK_IMPORTED_MODULE_5__["defaultKey"](key)];
        }
      });
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.unmounted = true;
    };

    _proto.render = function render() {
      var _this4 = this;

      var _this$props2 = this.props,
          innerRef = _this$props2.innerRef,
          props = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props2, ["innerRef"]);

      PROPS_TO_OMIT.forEach(function (prop) {
        delete props[prop];
      });
      var newProps = {};
      controlledProps.forEach(function (propName) {
        var propValue = _this4.props[propName];
        newProps[propName] = propValue !== undefined ? propValue : _this4._values[propName];
      });
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, newProps, this.handlers, {
        ref: innerRef || this.attachRef
      }));
    };

    return UncontrolledComponent;
  }(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

  UncontrolledComponent.displayName = "Uncontrolled(" + displayName + ")";
  UncontrolledComponent.propTypes = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    innerRef: function innerRef() {}
  }, _utils__WEBPACK_IMPORTED_MODULE_5__["uncontrolledPropTypes"](controlledValues, displayName));
  methods.forEach(function (method) {
    UncontrolledComponent.prototype[method] = function $proxiedMethod() {
      var _this$inner;

      return (_this$inner = this.inner)[method].apply(_this$inner, arguments);
    };
  });
  var WrappedComponent = UncontrolledComponent;

  if (react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef) {
    WrappedComponent = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function (props, ref) {
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(UncontrolledComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        innerRef: ref
      }));
    });
    WrappedComponent.propTypes = UncontrolledComponent.propTypes;
  }

  WrappedComponent.ControlledComponent = Component;
  /**
   * useful when wrapping a Component and you want to control
   * everything
   */

  WrappedComponent.deferControlTo = function (newComponent, additions, nextMethods) {
    if (additions === void 0) {
      additions = {};
    }

    return uncontrollable(newComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, controlledValues, additions), nextMethods);
  };

  return WrappedComponent;
}
/* harmony default export */ __webpack_exports__["default"] = (uncontrollable);

/***/ }),

/***/ "./node_modules/uncontrollable/esm/utils.js":
/*!**************************************************!*\
  !*** ./node_modules/uncontrollable/esm/utils.js ***!
  \**************************************************/
/*! exports provided: uncontrolledPropTypes, isProp, defaultKey, canAcceptRef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uncontrolledPropTypes", function() { return uncontrolledPropTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isProp", function() { return isProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultKey", function() { return defaultKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canAcceptRef", function() { return canAcceptRef; });
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_0__);


var noop = function noop() {};

function readOnlyPropType(handler, name) {
  return function (props, propName) {
    if (props[propName] !== undefined) {
      if (!props[handler]) {
        return new Error("You have provided a `" + propName + "` prop to `" + name + "` " + ("without an `" + handler + "` handler prop. This will render a read-only field. ") + ("If the field should be mutable use `" + defaultKey(propName) + "`. ") + ("Otherwise, set `" + handler + "`."));
      }
    }
  };
}

function uncontrolledPropTypes(controlledValues, displayName) {
  var propTypes = {};
  Object.keys(controlledValues).forEach(function (prop) {
    // add default propTypes for folks that use runtime checks
    propTypes[defaultKey(prop)] = noop;

    if (true) {
      var handler = controlledValues[prop];
      !(typeof handler === 'string' && handler.trim().length) ?  true ? invariant__WEBPACK_IMPORTED_MODULE_0___default()(false, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop) : undefined : void 0;
      propTypes[prop] = readOnlyPropType(handler, displayName);
    }
  });
  return propTypes;
}
function isProp(props, prop) {
  return props[prop] !== undefined;
}
function defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

function canAcceptRef(component) {
  return !!component && (typeof component !== 'function' || component.prototype && component.prototype.isReactComponent);
}

/***/ }),

/***/ "./node_modules/uncontrollable/hook.js":
/*!*********************************************!*\
  !*** ./node_modules/uncontrollable/hook.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = useUncontrolled;

var _extends3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"));

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var Utils = _interopRequireWildcard(__webpack_require__(/*! ./utils */ "./node_modules/uncontrollable/utils.js"));

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function useUncontrolled(props, config) {
  return Object.keys(config).reduce(function (result, fieldName) {
    var _extends2;

    var defaultValue = result[Utils.defaultKey(fieldName)],
        propsValue = result[fieldName],
        rest = (0, _objectWithoutPropertiesLoose2.default)(result, [Utils.defaultKey(fieldName), fieldName].map(_toPropertyKey));
    var handlerName = config[fieldName];
    var prevProps = (0, _react.useRef)({});

    var _useState = (0, _react.useState)(defaultValue),
        stateValue = _useState[0],
        setState = _useState[1];

    var isProp = Utils.isProp(props, fieldName);
    var wasProp = Utils.isProp(prevProps.current, fieldName);
    prevProps.current = props;
    /**
     * If a prop switches from controlled to Uncontrolled
     * reset its value to the defaultValue
     */

    if (!isProp && wasProp) {
      setState(defaultValue);
    }

    var propsHandler = props[handlerName];
    var handler = (0, _react.useCallback)(function (value) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (propsHandler) propsHandler.apply(void 0, [value].concat(args));
      setState(value);
    }, [setState, propsHandler]);
    return (0, _extends3.default)({}, rest, (_extends2 = {}, _extends2[fieldName] = isProp ? propsValue : stateValue, _extends2[handlerName] = handler, _extends2));
  }, props);
}

module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/uncontrollable/utils.js":
/*!**********************************************!*\
  !*** ./node_modules/uncontrollable/utils.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.uncontrolledPropTypes = uncontrolledPropTypes;
exports.isProp = isProp;
exports.defaultKey = defaultKey;
exports.canAcceptRef = canAcceptRef;

var _invariant = _interopRequireDefault(__webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js"));

var noop = function noop() {};

function readOnlyPropType(handler, name) {
  return function (props, propName) {
    if (props[propName] !== undefined) {
      if (!props[handler]) {
        return new Error("You have provided a `" + propName + "` prop to `" + name + "` " + ("without an `" + handler + "` handler prop. This will render a read-only field. ") + ("If the field should be mutable use `" + defaultKey(propName) + "`. ") + ("Otherwise, set `" + handler + "`."));
      }
    }
  };
}

function uncontrolledPropTypes(controlledValues, displayName) {
  var propTypes = {};
  Object.keys(controlledValues).forEach(function (prop) {
    // add default propTypes for folks that use runtime checks
    propTypes[defaultKey(prop)] = noop;

    if (true) {
      var handler = controlledValues[prop];
      !(typeof handler === 'string' && handler.trim().length) ?  true ? (0, _invariant.default)(false, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop) : undefined : void 0;
      propTypes[prop] = readOnlyPropType(handler, displayName);
    }
  });
  return propTypes;
}

function isProp(props, prop) {
  return props[prop] !== undefined;
}

function defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */


function canAcceptRef(component) {
  return !!component && (typeof component !== 'function' || component.prototype && component.prototype.isReactComponent);
}

/***/ })

}]);
//# sourceMappingURL=12.chunk.js.map