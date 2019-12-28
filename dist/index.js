import React, { PureComponent, Component, Fragment, useState, useEffect } from 'react';
import { Select, Input, Button, Checkbox, DatePicker, Icon, Spin, Table, message, Upload, Form, Modal, Col, Row, Typography, notification } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ContentState, EditorState, convertToRaw, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { compose } from 'redux';
import { Field, reduxForm, stopSubmit } from 'redux-form';
import requestMiddleware, { request } from 'sm-redux-saga-request';
import { buildUrlSearchForArray } from 'sm-string-helper';
import regeneratorRuntime from 'regenerator-runtime';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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

function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var actions = {
  FETCH_CRUD_FILTER_VALUES: 'FETCH_CRUD_FILTER_VALUES',
  FETCH_CRUD_MODELS: 'FETCH_CRUD_MODELS',
  SET_CRUD_ACTIONS_FUNC: 'SET_CRUD_ACTIONS_FUNC',
  SET_CRUD_PARAMS: 'SET_CRUD_PARAMS',
  DELETE_MODEL: 'DELETE_MODEL',
  RESTORE_MODEL: 'RESTORE_MODEL',
  CHANGE_MODEL: 'CHANGE_MODEL',
  CREATE_MODEL: 'CREATE_MODEL',
  TOGGLE_CREATE_MODEL_MODAL: 'TOGGLE_CREATE_MODEL_MODAL',
  SET_MODEL_MODAL_FORM: 'SET_MODEL_MODAL_FORM',
  FETCH_CRUD_CHILDREN: 'FETCH_CRUD_CHILDREN',
  SET_UPLOADER_FILES: 'SET_UPLOADER_FILES',
  SET_UPLOADER_DEFAULT_FILE_LIST: 'SET_UPLOADER_DEFAULT_FILE_LIST',
  FETCH_FILE_CONFIG: 'FETCH_FILE_CONFIG',
  fetchFileConfig: function fetchFileConfig(url, modelName) {
    return {
      type: actions.FETCH_FILE_CONFIG,
      payload: {
        url: url,
        modelName: modelName
      }
    };
  },
  setUploaderDefaultFileList: function setUploaderDefaultFileList(defaultFileList, modelName) {
    return {
      type: actions.SET_UPLOADER_DEFAULT_FILE_LIST,
      payload: {
        defaultFileList: defaultFileList,
        modelName: modelName
      }
    };
  },
  setUploaderFiles: function setUploaderFiles(files, modelName) {
    return {
      type: actions.SET_UPLOADER_FILES,
      payload: {
        files: files,
        modelName: modelName
      }
    };
  },
  fetchCrudChildren: function fetchCrudChildren(id, modelName, url) {
    return {
      type: actions.FETCH_CRUD_CHILDREN,
      payload: {
        id: id,
        params: {
          modelName: modelName
        },
        url: url
      }
    };
  },
  toggleCreateModelModal: function toggleCreateModelModal(modelName) {
    return {
      type: actions.TOGGLE_CREATE_MODEL_MODAL,
      payload: {
        modelName: modelName
      }
    };
  },
  deleteModel: function deleteModel(id, action, modelName) {
    return {
      type: actions.DELETE_MODEL,
      payload: {
        id: id,
        action: action,
        modelName: modelName
      }
    };
  },
  restoreModel: function restoreModel(id, url, modelName) {
    return {
      type: actions.RESTORE_MODEL,
      payload: {
        id: id,
        url: url,
        modelName: modelName
      }
    };
  },
  createModel: function createModel(form, url, modelName) {
    return {
      type: actions.CREATE_MODEL,
      payload: {
        form: form,
        url: url,
        modelName: modelName
      }
    };
  },
  changeModel: function changeModel(form, action, modelName) {
    return {
      type: actions.CHANGE_MODEL,
      payload: {
        form: form,
        action: action,
        modelName: modelName
      }
    };
  },
  setModelModalForm: function setModelModalForm(modalType, initialValues, action) {
    return {
      type: actions.SET_MODEL_MODAL_FORM,
      payload: {
        modalType: modalType,
        initialValues: initialValues,
        action: action
      }
    };
  },
  setCrudActionsFunc: function setCrudActionsFunc(func, modelName) {
    return {
      type: actions.SET_CRUD_ACTIONS_FUNC,
      payload: {
        func: func,
        modelName: modelName
      }
    };
  },
  setCrudParams: function setCrudParams(params) {
    return {
      type: actions.SET_CRUD_PARAMS,
      payload: params
    };
  },
  fetchCrudModels: function fetchCrudModels(params, filters) {
    return {
      type: actions.FETCH_CRUD_MODELS,
      payload: {
        params: params,
        filters: filters
      }
    };
  },
  fetchCrudFilterValues: function fetchCrudFilterValues(modelName, filter, query) {
    return {
      type: actions.FETCH_CRUD_FILTER_VALUES,
      payload: {
        query: query,
        filter: filter,
        modelName: modelName
      }
    };
  }
};

var moment$1 = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    module.exports = factory();
}(commonjsGlobal, (function () {
    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate (y) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            var args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays :
            this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
        return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
            : (m) ? weekdays[m.day()] : weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && ('object' !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = commonjsRequire;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':   return months;
                case 'quarter': return months / 3;
                case 'year':    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asQuarters     = makeAs('Q');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asQuarters     = asQuarters;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.24.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));
});

var ru = createCommonjsModule(function (module, exports) {
(function (global, factory) {
   typeof commonjsRequire === 'function' ? factory(moment$1) :
   typeof undefined === 'function' && undefined.amd ? undefined(['../moment'], factory) :
   factory(global.moment);
}(commonjsGlobal, (function (moment$$1) {

    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'ss': withoutSuffix ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
            'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
            'hh': 'час_часа_часов',
            'dd': 'день_дня_дней',
            'MM': 'месяц_месяца_месяцев',
            'yy': 'год_года_лет'
        };
        if (key === 'm') {
            return withoutSuffix ? 'минута' : 'минуту';
        }
        else {
            return number + ' ' + plural(format[key], +number);
        }
    }
    var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

    // http://new.gramota.ru/spravka/rules/139-prop : § 103
    // Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
    // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
    var ru = moment$$1.defineLocale('ru', {
        months : {
            format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
            standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
        },
        monthsShort : {
            // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
            format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
            standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
        },
        weekdays : {
            standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
            format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
            isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
        },
        weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
        weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
        monthsParse : monthsParse,
        longMonthsParse : monthsParse,
        shortMonthsParse : monthsParse,

        // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
        monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

        // копия предыдущего
        monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

        // полные названия с падежами
        monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,

        // Выражение, которое соотвествует только сокращённым формам
        monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
        longDateFormat : {
            LT : 'H:mm',
            LTS : 'H:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY г.',
            LLL : 'D MMMM YYYY г., H:mm',
            LLLL : 'dddd, D MMMM YYYY г., H:mm'
        },
        calendar : {
            sameDay: '[Сегодня, в] LT',
            nextDay: '[Завтра, в] LT',
            lastDay: '[Вчера, в] LT',
            nextWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                            return '[В следующее] dddd, [в] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[В следующий] dddd, [в] LT';
                        case 3:
                        case 5:
                        case 6:
                            return '[В следующую] dddd, [в] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[Во] dddd, [в] LT';
                    } else {
                        return '[В] dddd, [в] LT';
                    }
                }
            },
            lastWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                            return '[В прошлое] dddd, [в] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[В прошлый] dddd, [в] LT';
                        case 3:
                        case 5:
                        case 6:
                            return '[В прошлую] dddd, [в] LT';
                    }
                } else {
                    if (this.day() === 2) {
                        return '[Во] dddd, [в] LT';
                    } else {
                        return '[В] dddd, [в] LT';
                    }
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'через %s',
            past : '%s назад',
            s : 'несколько секунд',
            ss : relativeTimeWithPlural,
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : 'час',
            hh : relativeTimeWithPlural,
            d : 'день',
            dd : relativeTimeWithPlural,
            M : 'месяц',
            MM : relativeTimeWithPlural,
            y : 'год',
            yy : relativeTimeWithPlural
        },
        meridiemParse: /ночи|утра|дня|вечера/i,
        isPM : function (input) {
            return /^(дня|вечера)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночи';
            } else if (hour < 12) {
                return 'утра';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечера';
            }
        },
        dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'M':
                case 'd':
                case 'DDD':
                    return number + '-й';
                case 'D':
                    return number + '-го';
                case 'w':
                case 'W':
                    return number + '-я';
                default:
                    return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return ru;

})));
});

var DropDownWrap =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DropDownWrap, _PureComponent);

  function DropDownWrap(props) {
    var _this;

    _classCallCheck(this, DropDownWrap);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropDownWrap).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getItemStyle", function (i) {
      var itemHeight = _this.props.itemHeight;
      return {
        position: "absolute",
        top: itemHeight * i,
        height: itemHeight,
        width: "100%"
      };
    });

    _defineProperty(_assertThisInitialized(_this), "reactList", function (allHeight, startIndex, endIndex) {
      return _this.setState({
        allHeight: allHeight,
        startIndex: startIndex,
        endIndex: endIndex
      });
    });

    var _allHeight = props.allHeight,
        _startIndex = props.startIndex,
        _endIndex = props.endIndex;
    _this.state = {
      allHeight: _allHeight,
      startIndex: _startIndex,
      endIndex: _endIndex
    };
    return _this;
  }

  _createClass(DropDownWrap, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var menu = this.props.menu;
      var _this$state = this.state,
          startIndex = _this$state.startIndex,
          endIndex = _this$state.endIndex,
          allHeight = _this$state.allHeight; // 截取 Select 下拉列表中需要显示的部分

      var cloneMenu = React.cloneElement(menu, {
        menuItems: menu.props.menuItems.slice(startIndex, endIndex).map(function (item, i) {
          var realIndex = (startIndex || 0) + Number(i);

          var style = _this2.getItemStyle(realIndex); // 未搜到数据提示高度使用默认高度


          if (item.key === "NOT_FOUND") {
            delete style.height;
          }

          return React.cloneElement(item, {
            style: _objectSpread2({}, item.style, {}, style)
          });
        }),
        dropdownMenuStyle: _objectSpread2({}, menu.props.dropdownMenuStyle, {
          height: allHeight,
          maxHeight: allHeight,
          overflow: "hidden"
        })
      });
      return cloneMenu;
    }
  }]);

  return DropDownWrap;
}(PureComponent);

var ITEM_ELEMENT_NUMBER = 30; // Select size 配置

var ITEM_HEIGHT_CFG = {
  small: 24,
  large: 40,
  "default": 32
};
var ARROW_CODE = {
  40: 'down',
  38: 'up'
};
var DROPDOWN_HEIGHT = 224;

var SuperSelect =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(SuperSelect, _PureComponent);

  function SuperSelect(props) {
    var _this;

    _classCallCheck(this, SuperSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SuperSelect).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "scrollToValue", function () {
      if (!_this.scrollEle) return;
      var children = _this.props.children;
      var value = _this.state.value;
      var index = children.findIndex(function (item) {
        return item.key === value;
      }) || 0;
      var y = _this.ITEM_HEIGHT * index;
      _this.scrollEle.scrollTop = y;
      setTimeout(function () {
        _this.forceUpdate();
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "getItemStyle", function (i) {
      return {
        position: 'absolute',
        top: _this.ITEM_HEIGHT * i,
        width: '100%',
        height: _this.ITEM_HEIGHT
      };
    });

    _defineProperty(_assertThisInitialized(_this), "addEvent", function () {
      _this.scrollEle = document.querySelector(".".concat(_this.dropdownClassName)); // 下拉菜单未展开时元素不存在

      if (!_this.scrollEle) return;

      _this.scrollEle.addEventListener('scroll', _this.onScroll, false);

      _this.inputEle = document.querySelector("#".concat(_this.id));
      if (!_this.inputEle) return;

      _this.inputEle.addEventListener('keydown', _this.onKeyDown, false);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      var _ref = e || {},
          keyCode = _ref.keyCode;

      setTimeout(function () {
        var activeItem = document.querySelector(".".concat(_this.dropdownClassName, " .ant-select-dropdown-menu-item-active"));
        if (!activeItem) return;
        var offsetTop = activeItem.offsetTop;
        var isUp = ARROW_CODE[keyCode] === 'up';
        var isDown = ARROW_CODE[keyCode] === 'down'; // 在所有列表第一行按上键

        if (offsetTop - _this.prevTop > DROPDOWN_HEIGHT && isUp) {
          _this.scrollEle.scrollTo(0, _this.allHeight - DROPDOWN_HEIGHT);

          _this.prevTop = _this.allHeight;
          return;
        } // 在所有列表中最后一行按下键


        if (_this.prevTop > offsetTop + DROPDOWN_HEIGHT && isDown) {
          _this.scrollEle.scrollTo(0, 0);

          _this.prevTop = 0;
          return;
        }

        _this.prevTop = offsetTop; // 向下滚动到下拉框最后一行时，向下滚动一行的高度

        if (offsetTop > _this.scrollEle.scrollTop + DROPDOWN_HEIGHT - _this.ITEM_HEIGHT + 10 && isDown) {
          _this.scrollEle.scrollTo(0, _this.scrollTop + _this.ITEM_HEIGHT);

          return;
        } // 向上滚动到下拉框第一一行时，向上滚动一行的高度


        if (offsetTop < _this.scrollEle.scrollTop && isUp) {
          _this.scrollEle.scrollTo(0, _this.scrollTop - _this.ITEM_HEIGHT);
        }
      }, 100);
    });

    _defineProperty(_assertThisInitialized(_this), "onScroll", function () {
      return _this.throttleByHeight(_this.onScrollReal);
    });

    _defineProperty(_assertThisInitialized(_this), "onScrollReal", function () {
      _this.allList = _this.getUseChildrenList();

      var _this$getStartAndEndI = _this.getStartAndEndIndex(),
          startIndex = _this$getStartAndEndI.startIndex,
          endIndex = _this$getStartAndEndI.endIndex;

      _this.prevScrollTop = _this.scrollTop; // 重新渲染列表组件 Wrap

      var allHeight = _this.allList.length * _this.ITEM_HEIGHT || 100;

      _this.wrap.reactList(allHeight, startIndex, endIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "throttleByHeight", function () {
      _this.scrollTop = _this.scrollEle.scrollTop; // 滚动的高度

      var delta = _this.prevScrollTop - _this.scrollTop;
      delta = delta < 0 ? 0 - delta : delta;
      delta > _this.reactDelta && _this.onScrollReal();
    });

    _defineProperty(_assertThisInitialized(_this), "getUseChildrenList", function () {
      return _this.state.filterChildren || _this.state.children;
    });

    _defineProperty(_assertThisInitialized(_this), "getStartAndEndIndex", function () {
      // 滚动后显示在列表可视区中的第一个 item 的 index
      var showIndex = Number((_this.scrollTop / _this.ITEM_HEIGHT).toFixed(0));
      var startIndex = showIndex - ITEM_ELEMENT_NUMBER < 0 ? 0 : showIndex - ITEM_ELEMENT_NUMBER / 2;
      var endIndex = showIndex + ITEM_ELEMENT_NUMBER;
      return {
        startIndex: startIndex,
        endIndex: endIndex
      };
    });

    _defineProperty(_assertThisInitialized(_this), "setSuperDrowDownMenu", function (visible) {
      if (!visible) return;
      _this.allList = _this.getUseChildrenList();

      if (!_this.eventTimer) {
        _this.eventTimer = setTimeout(function () {
          return _this.addEvent();
        }, 0);
      } else {
        var allHeight = _this.allList.length * _this.ITEM_HEIGHT || 100; // 下拉列表单独重新渲染

        var _this$getStartAndEndI2 = _this.getStartAndEndIndex(),
            startIndex = _this$getStartAndEndI2.startIndex,
            endIndex = _this$getStartAndEndI2.endIndex;

        _this.wrap && _this.wrap.reactList(allHeight, startIndex, endIndex);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDeselect", function (value) {
      var onDeselect = _this.props.onDeselect;
      onDeselect && onDeselect(value);
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value, opt) {
      var _this$props = _this.props,
          showSearch = _this$props.showSearch,
          onChange = _this$props.onChange,
          autoClearSearchValue = _this$props.autoClearSearchValue;

      if (showSearch || _this.isMultiple) {
        // 搜索模式下选择后是否需要重置搜索状态
        if (autoClearSearchValue !== false) {
          _this.setState({
            filterChildren: null
          }, function () {
            // 搜索成功后重新设置列表的总高度
            _this.setSuperDrowDownMenu(true);
          });
        }
      }

      _this.setState({
        value: value
      });

      onChange && onChange(value, opt);
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", function (v) {
      var _this$props2 = _this.props,
          showSearch = _this$props2.showSearch,
          onSearch = _this$props2.onSearch,
          filterOption = _this$props2.filterOption,
          children = _this$props2.children;

      if (showSearch && filterOption !== false) {
        // 须根据 filterOption（如有该自定义函数）手动 filter 搜索匹配的列表
        var filterChildren = null;

        if (typeof filterOption === 'function') {
          filterChildren = children.filter(function (item) {
            return filterOption(v, item);
          });
        } else if (filterOption === undefined) {
          filterChildren = children.filter(function (item) {
            return _this.filterOption(v, item);
          });
        } // 设置下拉列表显示数据


        _this.setState({
          filterChildren: v === '' ? null : filterChildren
        }, function () {
          // 搜索成功后需要重新设置列表的总高度
          _this.setSuperDrowDownMenu(true);
        });
      }

      onSearch && onSearch(v);
    });

    _defineProperty(_assertThisInitialized(_this), "filterOption", function (v, option) {
      // 自定义过滤对应的 option 属性配置
      var filterProps = _this.props.optionFilterProp || 'value';
      return "".concat(option.props[filterProps]).indexOf(v) >= 0;
    });

    _defineProperty(_assertThisInitialized(_this), "removeEvent", function () {
      if (!_this.scrollEle) return;

      _this.scrollEle.removeEventListener('scroll', _this.onScroll, false);

      if (!_this.inputEle) return;

      _this.inputEle.removeEventListener('keydown', _this.onKeyDown, false);
    });

    var mode = props.mode,
        defaultValue = props.defaultValue,
        _value = props.value;
    _this.isMultiple = ['tags', 'multiple'].includes(mode); // 设置默认 value

    var defaultV = _this.isMultiple ? [] : '';
    defaultV = _value || defaultValue || defaultV;
    _this.state = {
      children: props.children || [],
      filterChildren: null,
      value: defaultV
    }; // 下拉菜单项行高

    _this.ITEM_HEIGHT = ITEM_HEIGHT_CFG[props.size || 'default']; // 可视区 dom 高度

    _this.visibleDomHeight = _this.ITEM_HEIGHT * ITEM_ELEMENT_NUMBER; // 滚动时重新渲染的 scrollTop 判断值，大于 reactDelta 则刷新下拉列表

    _this.reactDelta = _this.visibleDomHeight / 3; // 是否拖动滚动条快速滚动状态

    _this.isStopReact = false; // 上一次滚动的 scrollTop 值

    _this.prevScrollTop = 0; // 上一次按下方向键时 scrollTop 值

    _this.prevTop = 0;
    _this.scrollTop = 0; // className

    _this.dropdownClassName = "dc".concat(+new Date());
    _this.id = "sid".concat(+new Date());
    return _this;
  }

  _createClass(SuperSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // defaultOpens=true 时添加滚动事件
      setTimeout(function () {
        _this2.addEvent();
      }, 500);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      var _this$props3 = this.props,
          mode = _this$props3.mode,
          defaultValue = _this$props3.defaultValue,
          value = _this$props3.value,
          children = _this$props3.children;

      if (prevProps.children !== children) {
        this.isMultiple = ['tags', 'multiple'].includes(mode);
        this.setState({
          children: children || [],
          filterChildren: null
        });
      }

      if (prevProps.value !== value) {
        // 更新时设置默认 value
        var defaultV = this.isMultiple ? [] : '';
        defaultV = value || defaultValue || defaultV;
        this.setState({
          value: defaultV
        }, function () {
          _this3.scrollToValue();
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeEvent();
    } // value 存在时需要滚动到 value 所在位置

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props4 = this.props,
          dropdownStyle = _this$props4.dropdownStyle,
          optionLabelProp = _this$props4.optionLabelProp,
          notFoundContent = _this$props4.notFoundContent,
          props = _objectWithoutProperties(_this$props4, ["dropdownStyle", "optionLabelProp", "notFoundContent"]);

      this.allList = this.getUseChildrenList();
      this.allHeight = this.allList.length * this.ITEM_HEIGHT || 100;

      var _this$getStartAndEndI3 = this.getStartAndEndIndex(),
          startIndex = _this$getStartAndEndI3.startIndex,
          endIndex = _this$getStartAndEndI3.endIndex;

      dropdownStyle = _objectSpread2({
        maxHeight: "".concat(DROPDOWN_HEIGHT, "px")
      }, dropdownStyle, {
        overflow: 'auto',
        position: 'relative'
      });
      var value = this.state.value; // 判断处于 antd Form 中时不自动设置 value

      var _props = _objectSpread2({}, props); // 先删除 value，再手动赋值，防止空 value 影响 placeholder


      delete _props.value; // value 为空字符会隐藏 placeholder，改为 undefined

      if (typeof value === 'string' && !value) {
        _props.value = undefined;
      } else {
        _props.value = value;
      }

      optionLabelProp = optionLabelProp || 'children';
      return React.createElement(Select, _extends({}, _props, {
        id: this.id,
        onSearch: this.onSearch,
        onChange: this.onChange,
        dropdownClassName: this.dropdownClassName,
        optionLabelProp: optionLabelProp,
        dropdownStyle: dropdownStyle,
        onDropdownVisibleChange: this.setSuperDrowDownMenu,
        onDeselect: this.onDeselect,
        ref: function ref(ele) {
          return _this4.select = ele;
        },
        dropdownRender: function dropdownRender(menu) {
          return React.createElement(DropDownWrap, _extends({
            startIndex: startIndex,
            endIndex: endIndex,
            allHeight: _this4.allHeight,
            menu: menu,
            itemHeight: _this4.ITEM_HEIGHT
          }, {
            ref: function ref(ele) {
              return _this4.wrap = ele;
            }
          }));
        }
      }), this.allList);
    }
  }]);

  return SuperSelect;
}(PureComponent);

var Option = Select.Option;
var children = [];

for (var i = 0; i < 10000; i++) {
  children.push(React.createElement(Option, {
    value: i + 'aa',
    key: i
  }, i));
}

function Index(_ref) {
  var data = _ref.data,
      options = _ref.options;
  var setSelectedKeys = data.setSelectedKeys,
      selectedKeys = data.selectedKeys,
      confirm = data.confirm,
      clearFilters = data.clearFilters;
  return React.createElement("div", {
    style: {
      width: '300px'
    }
  }, React.createElement(SuperSelect, {
    value: selectedKeys,
    placeholder: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C" // onChange={(e) => {
    // 	setSelectedKeys(e);
    // 	// confirm();
    // }}
    ,
    onPressEnter: function onPressEnter() {
      confirm();
    },
    style: {
      width: '130px',
      marginRight: '8px'
    },
    showSearch: true,
    filterOption: function filterOption(search, option) {
      return option.props.children.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    },
    onSearch: function onSearch() {}
  }, options.map(function (opt) {
    return React.createElement(Select.Option, {
      value: opt.value,
      key: opt.value,
      onClick: function onClick(e) {
        setSelectedKeys(opt.value); // setTimeout(() => confirm(), 100);
      }
    }, opt.text);
  }))) // <Select
  // 	value={selectedKeys}
  // 	placeholder="Выбрать"
  // 	onChange={(e) => {
  // 		setSelectedKeys(e);
  // 		confirm();
  // 	}}
  // 	onPressEnter={() => { confirm() }}
  // 	style={{
  // 		width: '130px',
  // 		marginRight: '8px'
  // 	}}
  // 	showSearch
  // 	filterOption={(search, option) =>
  // 		option.props.children.toLowerCase()
  // 			.indexOf(search.toLowerCase()) >= 0
  // 	}
  // 	onSearch={() => {}}
  // >
  // 	{options.map(opt => (
  // 		<Select.Option
  // 			value={opt.value}
  // 			key={opt.value}
  // 			onClick={(e) => {
  // 				setSelectedKeys(opt.value);
  // 				setTimeout(() => confirm(), 100);
  // 			}}
  // 		>
  // 			{opt.text}
  // 		</Select.Option>
  // 	))}
  // </Select>
  ;
}
Index.propTypes = {
  children: propTypes.node,
  key: propTypes.string,
  index: propTypes.number,
  style: propTypes.object,
  isScrolling: propTypes.bool,
  isVisible: propTypes.bool
};

var Option$1 = Select.Option;
var filterDropdown = (function (name, type, options) {
  return function (props) {
    var setSelectedKeys = props.setSelectedKeys,
        selectedKeys = props.selectedKeys,
        confirm = props.confirm,
        clearFilters = props.clearFilters;
    return React.createElement("div", {
      className: "custom-filter-dropdown"
    }, type === 'checkbox' ? React.createElement("span", null, React.createElement(Checkbox, {
      value: selectedKeys,
      onChange: function onChange(e) {
        return setSelectedKeys(e.target.checked.toString());
      },
      onPressEnter: function onPressEnter() {
        confirm();
      }
    }), React.createElement("br", null)) : type === 'select' ? React.createElement(Index, {
      options: options,
      data: props
    }) : type === 'date' ? React.createElement(DatePicker, {
      value: selectedKeys && !(selectedKeys instanceof Array) ? moment(selectedKeys, 'DD/MM/YYYY').locale('ru') : null,
      onChange: function onChange(value) {
        return setSelectedKeys(value);
      },
      onPressEnter: function onPressEnter() {
        confirm();
      },
      placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443",
      format: "DD/MM/YYYY",
      style: {
        marginRight: '8px'
      }
    }) : React.createElement(Input, {
      type: type,
      placeholder: "\u041F\u043E\u0438\u0441\u043A",
      value: selectedKeys,
      onChange: function onChange(e) {
        return setSelectedKeys(e.target.value ? e.target.value : null);
      },
      onPressEnter: function onPressEnter() {
        confirm();
      }
    }), React.createElement(Button, {
      type: "primary",
      onClick: function onClick() {
        confirm();
      }
    }, "\u041F\u043E\u0438\u0441\u043A"), React.createElement(Button, {
      onClick: function onClick() {
        clearFilters();
      }
    }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C"));
  };
});

function filterRenderer(filterType, columnName, options) {
  switch (filterType) {
    case 'input_number':
      return filterDropdown(columnName, 'number');

    case 'input_text':
      return filterDropdown(columnName, 'text');

    case 'date_picker':
      return filterDropdown(columnName, 'date');

    case 'select_one':
      return filterDropdown(columnName, 'select', options);

    case 'boolean':
      return filterDropdown(columnName, 'checkbox');

    default:
      return null;
  }
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\t.crud-action {\n\t\tfont-size: 20px;\n\t\tpadding: 0 5px;\n\t}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var ActionStyled = styled.span(_templateObject());

var Action =
/*#__PURE__*/
function (_Component) {
  _inherits(Action, _Component);

  function Action() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Action);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Action)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getIcon", function (id) {
      switch (id) {
        case 'update':
          return 'edit';

        case 'delete':
          return 'delete';

        case 'create':
          return 'plus-circle';

        case 'restore':
          return 'select';

        case 'view-back':
        case 'view':
          return 'eye';

        case 'check':
          return 'user';

        case 'took':
          return 'login';

        case 'return':
          return 'logout';

        case 'finish':
          return 'check-circle';

        case 'logs':
          return 'form';

        case 'transfer':
          return 'switcher';

        default:
          return _this.props.params.iconsProvider(id);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (ev) {
      var _this$props = _this.props,
          data = _this$props.data,
          row = _this$props.row;

      switch (data.type) {
        case 'query':
          ev.preventDefault();

          _this.props.actionsFunc(data, row);

          break;

        case 'link':
          if (data.method === '_blank') return null;
          ev.preventDefault();

          _this.props.push(data.url);

          break;

        case 'out-link':
        default:
          return null;
      }
    });

    return _this;
  }

  _createClass(Action, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          data = _this$props2.data,
          row = _this$props2.row;
      return React.createElement(ActionStyled, null, React.createElement("a", {
        title: data.name,
        href: data.url,
        target: "_blank",
        className: "crud-action",
        onClick: this.handleClick
      }, React.createElement(Icon, {
        type: this.getIcon(data.id) || data.icon
      })));
    }
  }]);

  return Action;
}(Component);

Action.propTypes = {
  data: propTypes.object.isRequired,
  row: propTypes.object.isRequired,
  modelName: propTypes.string,
  iconTheme: propTypes.string,
  iconsProvider: propTypes.func
};
Action.defaultProps = {
  iconTheme: 'outlined'
};
var Action$1 = connect(function (state, props) {
  return {
    actionsFunc: state.crudActionsFunc[props.modelName],
    params: state.crudParams[props.modelName]
  };
}, {
  push: push
})(Action);

var DateCell = function DateCell(data) {
  return React.createElement("p", null, moment(data).format('DD.MM.YYYY'));
};

var TextCell = function TextCell(text) {
  return React.createElement("span", null, text);
};

var BooleanCell = function BooleanCell(value) {
  return React.createElement("span", null, value ? React.createElement(Icon, {
    type: "check",
    style: {
      color: 'green'
    }
  }) : React.createElement(Icon, {
    type: "close",
    style: {
      color: 'red'
    }
  }));
};

var ArrTextCell = function ArrTextCell(arr) {
  return arr.map(function (elem) {
    return React.createElement("p", null, elem);
  });
};

var HtmlCell = function HtmlCell(html) {
  return React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
};

var ActionsCell = function ActionsCell(row, modelName, iconTheme) {
  return row.actions.map(function (action) {
    return React.createElement(Action$1, {
      data: action,
      row: row,
      key: action.id,
      modelName: modelName,
      iconTheme: iconTheme
    });
  });
};

var ArrObjectCell = function ArrObjectCell(obj) {
  if (!Array.isArray(obj) || !obj.length) return null;
  return obj.map(function (_ref) {
    var _ref$created_at = _ref.created_at,
        created_at = _ref$created_at === void 0 ? false : _ref$created_at,
        _ref$updated_at = _ref.updated_at,
        updated_at = _ref$updated_at === void 0 ? false : _ref$updated_at,
        rest = _objectWithoutProperties(_ref, ["created_at", "updated_at"]);

    var restValues = rest ? Object.values(rest) : false;
    var restAttributes = restValues ? restValues.map(function (el, i) {
      return React.createElement("span", {
        key: i
      }, el);
    }) : '';
    return React.createElement(Fragment, null, React.createElement("p", null, created_at ? moment.unix(created_at).format('DD.MM.YYYY') : '', " ", updated_at ? moment.unix(updated_at).format('DD.MM.YYYY') : '', " ", restAttributes), React.createElement("br", null));
  });
};

var renderer = function renderer(value, type, dateFormat) {
  switch (type) {
    case 'date':
      return moment.unix(value).format(dateFormat || 'DD.MM.YYYY');

    case 'array_ext':
      return ArrayCell(value);

    default:
      return value;
  }
};

var ArrayCell = function ArrayCell(_ref2) {
  var values = _ref2.values,
      type = _ref2.type,
      delimiter = _ref2.delimiter,
      style = _ref2.style,
      isHtml = _ref2.isHtml,
      dateFormat = _ref2.dateFormat,
      viewLimit = _ref2.viewLimit;
  if (!Array.isArray(values) || !values.length) return null;
  var handledValues = values.map(function (value, index) {
    return React.createElement("span", {
      style: isHtml && style ? style : null,
      key: index + Date.now()
    }, isHtml ? React.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: value
      }
    }) : '', !isHtml && renderer(value, type, dateFormat), index < values.length - 1 && delimiter);
  });
  return React.createElement(ArrayCellLimit, {
    values: handledValues,
    viewLimit: viewLimit
  });
};

var ArrayCellLimit = function ArrayCellLimit(props) {
  var _useState = useState(!props.viewLimit),
      _useState2 = _slicedToArray(_useState, 2),
      showAll = _useState2[0],
      setShowAll = _useState2[1];

  return showAll ? props.values : React.createElement("div", null, props.values.slice(0, props.viewLimit), setShowAll ? React.createElement("a", {
    onClick: function onClick() {
      return setShowAll(true);
    }
  }, "...") : null);
};

/* eslint-disable no-case-declarations */
var dataRenderer = (function (row, column, modelName, iconTheme) {
  if (row[column.id] !== 0 && !row[column.id] && row[column.id] !== false) return null;

  switch (column.type) {
    case 'object':
      return TextCell(row[column.id].alias || row[column.id].name);

    case 'actions':
      return ActionsCell(row, modelName, iconTheme);

    case 'array':
      return ArrTextCell(row[column.id]);

    case 'array_ext':
      return ArrayCell(row[column.id]);

    case 'array_objects':
      return ArrObjectCell(row[column.id]);

    case 'date':
      return DateCell(Number(row[column.id]) * 1000);

    case 'link':
      var link = row[column.id];
      if (link.url && link.name) return React.createElement(Link, {
        to: link.url
      }, link.name);
      var actionView = row.actions.find(function (e) {
        return e.id === 'view';
      });
      return actionView && actionView.url ? React.createElement(Link, {
        to: actionView.url
      }, row[column.id]) : TextCell(row[column.id]);

    case 'boolean':
      return BooleanCell(row[column.id]);

    case 'html':
      return HtmlCell(row[column.id]);

    default:
      return TextCell(row[column.id]);
  }
});

var antIcon = React.createElement(Icon, {
  type: "loading",
  style: {
    fontSize: 36
  },
  spin: true
});

var Loader = function Loader() {
  return React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    }
  }, React.createElement(Spin //indicator={antIcon}
  , null));
};

var fetchCrudModels = actions.fetchCrudModels,
    fetchCrudChildren = actions.fetchCrudChildren,
    setCrudParams = actions.setCrudParams;
var viewWidth = Math.min(window.innerWidth, screen.width);
var isNotMiddleSizeWindow = viewWidth > 1640 || viewWidth < 800;

var CrudView =
/*#__PURE__*/
function (_Component) {
  _inherits(CrudView, _Component);

  function CrudView() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CrudView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CrudView)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleTableChange", function (pagination, filters, sorter) {
      _this.props.fetchCrudModels({
        modelName: _this.props.modelName,
        url: _this.props.url,
        page: pagination.current,
        order_by: sorter.columnKey,
        order: sorter.order
      }, filters);

      _this.props.setCrudParams(_objectSpread2({}, _this.props.crudParams[_this.props.modelName], {
        page: pagination.current,
        order_by: sorter.columnKey,
        order: sorter.order,
        filters: filters
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "handleExpand", function (isExpanded, row) {
      if (isExpanded) {
        _this.props.fetchCrudChildren(row.id, _this.props.modelName, _this.props.getChildrenUrl(row.id));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getFilterValues", function (col) {
      var filterValues = _this.props.filterValues;
      return filterValues && col.filter.can && filterValues[col.id] ? filterValues[col.id].map(function (elem) {
        return {
          text: elem.name,
          value: elem.id
        };
      }) : [];
    });

    return _this;
  }

  _createClass(CrudView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          modelName = _this$props.modelName,
          url = _this$props.url;
      this.props.fetchCrudModels({
        modelName: modelName,
        url: url
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          items = _this$props2.items,
          modelName = _this$props2.modelName,
          tableStyle = _this$props2.tableStyle,
          TableWrapper = _this$props2.TableWrapper,
          fixActionColumn = _this$props2.fixActionColumn,
          iconTheme = _this$props2.iconTheme,
          size = _this$props2.size,
          tdClass = _this$props2.tdClass,
          scrollX = _this$props2.scrollX,
          pageSize = _this$props2.pageSize,
          rowSelection = _this$props2.rowSelection,
          bordered = _this$props2.bordered;
      if (items && !items.data && items.loading) return React.createElement(Loader, null);
      if (!items || !items.data) return null;
      var listItems = items.data.items.map(function (elem) {
        return _objectSpread2({}, elem, {
          key: elem.id,
          children: elem.has_child ? elem.children || [] : null
        });
      }); // console.log(fixActionColumn, isNotMiddleSizeWindow)

      var columns = items.data.columns.map(function (col) {
        return {
          className: 'crud-table-column' + (tdClass ? ' ' + tdClass : ''),
          title: col.title,
          // <IntlMessages id="antTable.title.id"/>,
          key: col.id,
          fixed: col.id === 'actions' && !isNotMiddleSizeWindow && fixActionColumn ? 'right' : null,
          width: col.id === 'actions' && !isNotMiddleSizeWindow && fixActionColumn ? 150 : 'auto',
          render: function render(object) {
            return dataRenderer(object, col, modelName, iconTheme);
          },
          filters: _this2.getFilterValues(col),
          filterIcon: col.filter.can ? function (filtered) {
            return React.createElement(Icon, {
              type: "filter",
              style: {
                color: filtered ? '#108ee9' : '#aaa'
              },
              theme: "outlined"
            });
          } : null,
          filterDropdown: col.filter.can ? filterRenderer(col.filter.type, col.id, _this2.getFilterValues(col)) : null,
          sorter: col.order.can ? function () {} : null // (a, b) => Number(a.id) - Number(b.id),

        };
      });
      var TableComponent = TableWrapper || Table;
      return React.createElement(TableComponent, {
        columns: columns,
        dataSource: listItems,
        className: "isoSortingTable",
        onChange: this.handleTableChange,
        pagination: {
          defaultCurrent: 1,
          pageSize: items.data.filter.limit || pageSize,
          total: items.data.count,
          hideOnSinglePage: true
        },
        loading: items.loading,
        scroll: !isNotMiddleSizeWindow && fixActionColumn ? {
          x: scrollX
        } : {},
        onExpand: this.handleExpand,
        size: size,
        tableStyle: tableStyle,
        rowClassName: function rowClassName(record) {
          return record.row ? record.row.state : 'default';
        },
        rowSelection: rowSelection,
        bordered: bordered
      });
    }
  }]);

  return CrudView;
}(Component);

CrudView.propTypes = {
  modelName: propTypes.string.isRequired,
  url: propTypes.string.isRequired,
  fixActionColumn: propTypes.bool,
  iconTheme: propTypes.string,
  getChildrenUrl: propTypes.func,
  size: propTypes.string,
  tdClass: propTypes.string,
  scrollX: propTypes.number,
  pageSize: propTypes.number,
  rowSelection: propTypes.func
};
CrudView.defaultProps = {
  fixActionColumn: true,
  scrollX: 1300,
  pageSize: 20
};
var CrudView$1 = connect(function (state, props) {
  return {
    items: state.crudModels[props.modelName],
    filterValues: state.crudFilterValues[props.modelName],
    crudParams: state.crudParams
  };
}, {
  fetchCrudModels: fetchCrudModels,
  fetchCrudChildren: fetchCrudChildren,
  setCrudParams: setCrudParams
})(CrudView);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".rdw-option-wrapper {\n  border: 1px solid #F1F1F1;\n  padding: 5px;\n  min-width: 25px;\n  height: 20px;\n  border-radius: 2px;\n  margin: 0 4px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  background: white;\n  text-transform: capitalize;\n}\n.rdw-option-wrapper:hover {\n  box-shadow: 1px 1px 0px #BFBDBD;\n}\n.rdw-option-wrapper:active {\n  box-shadow: 1px 1px 0px #BFBDBD inset;\n}\n.rdw-option-active {\n  box-shadow: 1px 1px 0px #BFBDBD inset;\n}\n.rdw-option-disabled {\n  opacity: 0.3;\n  cursor: default;\n}\n.rdw-dropdown-wrapper {\n  height: 30px;\n  background: white;\n  cursor: pointer;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  margin: 0 3px;\n  text-transform: capitalize;\n  background: white;\n}\n.rdw-dropdown-wrapper:focus {\n  outline: none;\n}\n.rdw-dropdown-wrapper:hover {\n  box-shadow: 1px 1px 0px #BFBDBD;\n  background-color: #FFFFFF;\n}\n.rdw-dropdown-wrapper:active {\n  box-shadow: 1px 1px 0px #BFBDBD inset;\n}\n.rdw-dropdown-carettoopen {\n  height: 0px;\n  width: 0px;\n  position: absolute;\n  top: 35%;\n  right: 10%;\n  border-top: 6px solid black;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n}\n.rdw-dropdown-carettoclose {\n  height: 0px;\n  width: 0px;\n  position: absolute;\n  top: 35%;\n  right: 10%;\n  border-bottom: 6px solid black;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n}\n.rdw-dropdown-selectedtext {\n  display: flex;\n  position: relative;\n  height: 100%;\n  align-items: center;\n  padding: 0 5px;\n}\n.rdw-dropdown-optionwrapper {\n  z-index: 100;\n  position: relative;\n  border: 1px solid #F1F1F1;\n  width: 98%;\n  background: white;\n  border-radius: 2px;\n  margin: 0;\n  padding: 0;\n  max-height: 250px;\n  overflow-y: scroll;\n}\n.rdw-dropdown-optionwrapper:hover {\n  box-shadow: 1px 1px 0px #BFBDBD;\n  background-color: #FFFFFF;\n}\n.rdw-dropdownoption-default {\n  min-height: 25px;\n  display: flex;\n  align-items: center;\n  padding: 0 5px;\n}\n.rdw-dropdownoption-highlighted {\n  background: #F1F1F1;\n}\n.rdw-dropdownoption-active {\n  background: #f5f5f5;\n}\n.rdw-dropdownoption-disabled {\n  opacity: 0.3;\n  cursor: default;\n}\n.rdw-inline-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  flex-wrap: wrap\n}\n.rdw-inline-dropdown {\n  width: 50px;\n}\n.rdw-inline-dropdownoption {\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.rdw-block-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  flex-wrap: wrap\n}\n.rdw-block-dropdown {\n  width: 110px;\n}\n.rdw-fontsize-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  flex-wrap: wrap\n}\n.rdw-fontsize-dropdown {\n  min-width: 40px;\n}\n.rdw-fontsize-option {\n  display: flex;\n  justify-content: center;\n}\n.rdw-fontfamily-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  flex-wrap: wrap\n}\n.rdw-fontfamily-dropdown {\n  width: 115px;\n}\n.rdw-fontfamily-placeholder {\n  white-space: nowrap;\n  max-width: 90px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.rdw-fontfamily-optionwrapper {\n  width: 140px;\n}\n.rdw-list-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  flex-wrap: wrap\n}\n.rdw-list-dropdown {\n  width: 50px;\n  z-index: 90;\n}\n.rdw-list-dropdownOption {\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.rdw-text-align-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  flex-wrap: wrap\n}\n.rdw-text-align-dropdown {\n  width: 50px;\n  z-index: 90;\n}\n.rdw-text-align-dropdownOption {\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.rdw-right-aligned-block {\n  text-align: right;\n}\n.rdw-left-aligned-block {\n  text-align: left !important;\n}\n.rdw-center-aligned-block {\n  text-align: center !important;\n}\n.rdw-justify-aligned-block {\n  text-align: justify !important;\n}\n.rdw-right-aligned-block > div {\n  display: inline-block;\n}\n.rdw-left-aligned-block > div {\n  display: inline-block;\n}\n.rdw-center-aligned-block > div {\n  display: inline-block;\n}\n.rdw-justify-aligned-block > div {\n  display: inline-block;\n}\n.rdw-colorpicker-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  position: relative;\n  flex-wrap: wrap\n}\n.rdw-colorpicker-modal {\n  position: absolute;\n  top: 35px;\n  left: 5px;\n  display: flex;\n  flex-direction: column;\n  width: 175px;\n  height: 175px;\n  border: 1px solid #F1F1F1;\n  padding: 15px;\n  border-radius: 2px;\n  z-index: 100;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n}\n.rdw-colorpicker-modal-header {\n  display: flex;\n  padding-bottom: 5px;\n}\n.rdw-colorpicker-modal-style-label {\n  font-size: 15px;\n  width: 50%;\n  text-align: center;\n  cursor: pointer;\n  padding: 0 10px 5px;\n}\n.rdw-colorpicker-modal-style-label-active {\n  border-bottom: 2px solid #0a66b7;\n}\n.rdw-colorpicker-modal-options {\n  margin: 5px auto;\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-wrap: wrap;\n  overflow: scroll;\n}\n.rdw-colorpicker-cube {\n  width: 22px;\n  height: 22px;\n  border: 1px solid #F1F1F1;\n}\n.rdw-colorpicker-option {\n  margin: 3px;\n  padding: 0;\n  min-height: 20px;\n  border: none;\n  width: 22px;\n  height: 22px;\n  min-width: 22px;\n  box-shadow: 1px 2px 1px #BFBDBD inset;\n}\n.rdw-colorpicker-option:hover {\n  box-shadow: 1px 2px 1px #BFBDBD;\n}\n.rdw-colorpicker-option:active {\n  box-shadow: -1px -2px 1px #BFBDBD;\n}\n.rdw-colorpicker-option-active {\n  box-shadow: 0px 0px 2px 2px #BFBDBD;\n}\n.rdw-link-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  position: relative;\n  flex-wrap: wrap\n}\n.rdw-link-dropdown {\n  width: 50px;\n}\n.rdw-link-dropdownOption {\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.rdw-link-dropdownPlaceholder {\n  margin-left: 8px;\n}\n.rdw-link-modal {\n  position: absolute;\n  top: 35px;\n  left: 5px;\n  display: flex;\n  flex-direction: column;\n  width: 235px;\n  height: 205px;\n  border: 1px solid #F1F1F1;\n  padding: 15px;\n  border-radius: 2px;\n  z-index: 100;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n}\n.rdw-link-modal-label {\n  font-size: 15px;\n}\n.rdw-link-modal-input {\n  margin-top: 5px;\n  border-radius: 2px;\n  border: 1px solid #F1F1F1;\n  height: 25px;\n  margin-bottom: 15px;\n  padding: 0 5px;\n}\n.rdw-link-modal-input:focus {\n  outline: none;\n}\n.rdw-link-modal-buttonsection {\n  margin: 0 auto;\n}\n.rdw-link-modal-target-option {\n  margin-bottom: 20px;\n}\n.rdw-link-modal-target-option > span {\n  margin-left: 5px;\n}\n.rdw-link-modal-btn {\n  margin-left: 10px;\n  width: 75px;\n  height: 30px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  cursor: pointer;\n  background: white;\n  text-transform: capitalize;\n}\n.rdw-link-modal-btn:hover {\n  box-shadow: 1px 1px 0px #BFBDBD;\n}\n.rdw-link-modal-btn:active {\n  box-shadow: 1px 1px 0px #BFBDBD inset;\n}\n.rdw-link-modal-btn:focus {\n  outline: none !important;\n}\n.rdw-link-modal-btn:disabled {\n  background: #ece9e9;\n}\n.rdw-link-dropdownoption {\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.rdw-history-dropdown {\n  width: 50px;\n}\n.rdw-embedded-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  position: relative;\n  flex-wrap: wrap\n}\n.rdw-embedded-modal {\n  position: absolute;\n  top: 35px;\n  left: 5px;\n  display: flex;\n  flex-direction: column;\n  width: 235px;\n  height: 180px;\n  border: 1px solid #F1F1F1;\n  padding: 15px;\n  border-radius: 2px;\n  z-index: 100;\n  background: white;\n  justify-content: space-between;\n  box-shadow: 3px 3px 5px #BFBDBD;\n}\n.rdw-embedded-modal-header {\n  font-size: 15px;\n  display: flex;\n}\n.rdw-embedded-modal-header-option {\n  width: 50%;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n.rdw-embedded-modal-header-label {\n  width: 95px;\n  border: 1px solid #f1f1f1;\n  margin-top: 5px;\n  background: #6EB8D4;\n  border-bottom: 2px solid #0a66b7;\n}\n.rdw-embedded-modal-link-section {\n  display: flex;\n  flex-direction: column;\n}\n.rdw-embedded-modal-link-input {\n  width: 88%;\n  height: 35px;\n  margin: 10px 0;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  font-size: 15px;\n  padding: 0 5px;\n}\n.rdw-embedded-modal-link-input-wrapper {\n  display: flex;\n  align-items: center;\n}\n.rdw-embedded-modal-link-input:focus {\n  outline: none;\n}\n.rdw-embedded-modal-btn-section {\n  display: flex;\n  justify-content: center;\n}\n.rdw-embedded-modal-btn {\n  margin: 0 3px;\n  width: 75px;\n  height: 30px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  cursor: pointer;\n  background: white;\n  text-transform: capitalize;\n}\n.rdw-embedded-modal-btn:hover {\n  box-shadow: 1px 1px 0px #BFBDBD;\n}\n.rdw-embedded-modal-btn:active {\n  box-shadow: 1px 1px 0px #BFBDBD inset;\n}\n.rdw-embedded-modal-btn:focus {\n  outline: none !important;\n}\n.rdw-embedded-modal-btn:disabled {\n  background: #ece9e9;\n}\n.rdw-embedded-modal-size {\n  align-items: center;\n  display: flex;\n  margin: 8px 0;\n  justify-content: space-between;\n}\n.rdw-embedded-modal-size-input {\n  width: 80%;\n  height: 20px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  font-size: 12px;\n}\n.rdw-embedded-modal-size-input:focus {\n  outline: none;\n}\n.rdw-emoji-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  position: relative;\n  flex-wrap: wrap\n}\n.rdw-emoji-modal {\n  overflow: auto;\n  position: absolute;\n  top: 35px;\n  left: 5px;\n  display: flex;\n  flex-wrap: wrap;\n  width: 235px;\n  height: 180px;\n  border: 1px solid #F1F1F1;\n  padding: 15px;\n  border-radius: 2px;\n  z-index: 100;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n}\n.rdw-emoji-icon {\n  margin: 2.5px;\n  height: 24px;\n  width: 24px;\n  cursor: pointer;\n  font-size: 22px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.rdw-spinner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  width: 100%;\n}\n.rdw-spinner > div {\n  width: 12px;\n  height: 12px;\n  background-color: #333;\n\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n  animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n}\n.rdw-spinner .rdw-bounce1 {\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n.rdw-spinner .rdw-bounce2 {\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n@-webkit-keyframes sk-bouncedelay {\n  0%, 80%, 100% { -webkit-transform: scale(0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n@keyframes sk-bouncedelay {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 40% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n  }\n}\n.rdw-image-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  position: relative;\n  flex-wrap: wrap\n}\n.rdw-image-modal {\n  position: absolute;\n  top: 35px;\n  left: 5px;\n  display: flex;\n  flex-direction: column;\n  width: 235px;\n  border: 1px solid #F1F1F1;\n  padding: 15px;\n  border-radius: 2px;\n  z-index: 100;\n  background: white;\n  box-shadow: 3px 3px 5px #BFBDBD;\n}\n.rdw-image-modal-header {\n  font-size: 15px;\n  margin: 10px 0;\n  display: flex;\n}\n.rdw-image-modal-header-option {\n  width: 50%;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n.rdw-image-modal-header-label {\n  width: 80px;\n  background: #f1f1f1;\n  border: 1px solid #f1f1f1;\n  margin-top: 5px;\n}\n.rdw-image-modal-header-label-highlighted {\n  background: #6EB8D4;\n  border-bottom: 2px solid #0a66b7;\n}\n.rdw-image-modal-upload-option {\n  width: 100%;\n  color: gray;\n  cursor: pointer;\n  display: flex;\n  border: none;\n  font-size: 15px;\n  align-items: center;\n  justify-content: center;\n  background-color: #f1f1f1;\n  outline: 2px dashed gray;\n  outline-offset: -10px;\n  margin: 10px 0;\n  padding: 9px 0;\n}\n.rdw-image-modal-upload-option-highlighted {\n  outline: 2px dashed #0a66b7;\n}\n.rdw-image-modal-upload-option-label {\n  cursor: pointer;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 15px;\n}\n.rdw-image-modal-upload-option-label span{\n  padding: 0 20px;\n}\n.rdw-image-modal-upload-option-image-preview {\n  max-width: 100%;\n  max-height: 200px;\n}\n.rdw-image-modal-upload-option-input {\n\twidth: 0.1px;\n\theight: 0.1px;\n\topacity: 0;\n\toverflow: hidden;\n\tposition: absolute;\n\tz-index: -1;\n}\n.rdw-image-modal-url-section {\n  display: flex;\n  align-items: center;\n}\n.rdw-image-modal-url-input {\n  width: 90%;\n  height: 35px;\n  margin: 15px 0 12px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  font-size: 15px;\n  padding: 0 5px;\n}\n.rdw-image-modal-btn-section {\n  margin: 10px auto 0;\n}\n.rdw-image-modal-url-input:focus {\n  outline: none;\n}\n.rdw-image-modal-btn {\n  margin: 0 5px;\n  width: 75px;\n  height: 30px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  cursor: pointer;\n  background: white;\n  text-transform: capitalize;\n}\n.rdw-image-modal-btn:hover {\n  box-shadow: 1px 1px 0px #BFBDBD;\n}\n.rdw-image-modal-btn:active {\n  box-shadow: 1px 1px 0px #BFBDBD inset;\n}\n.rdw-image-modal-btn:focus {\n  outline: none !important;\n}\n.rdw-image-modal-btn:disabled {\n  background: #ece9e9;\n}\n.rdw-image-modal-spinner {\n  position: absolute;\n  top: -3px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n}\n.rdw-image-modal-alt-input {\n  width: 70%;\n  height: 20px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  font-size: 12px;\n  margin-left: 5px;\n}\n.rdw-image-modal-alt-input:focus {\n  outline: none;\n}\n.rdw-image-modal-alt-lbl {\n  font-size: 12px;\n}\n.rdw-image-modal-size {\n  align-items: center;\n  display: flex;\n  margin: 8px 0;\n  justify-content: space-between;\n}\n.rdw-image-modal-size-input {\n  width: 40%;\n  height: 20px;\n  border: 1px solid #F1F1F1;\n  border-radius: 2px;\n  font-size: 12px;\n}\n.rdw-image-modal-size-input:focus {\n  outline: none;\n}\n.rdw-image-mandatory-sign {\n  color: red;\n  margin-left: 3px;\n  margin-right: 3px;\n}\n.rdw-remove-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  position: relative;\n  flex-wrap: wrap\n}\n.rdw-history-wrapper {\n  display: flex;\n  align-items: center;\n  margin-bottom: 6px;\n  flex-wrap: wrap\n}\n.rdw-history-dropdownoption {\n  height: 40px;\n  display: flex;\n  justify-content: center;\n}\n.rdw-history-dropdown {\n  width: 50px;\n}\n.rdw-link-decorator-wrapper {\n  position: relative;\n}\n.rdw-link-decorator-icon {\n  position: absolute;\n  left: 40%;\n  top: 0;\n  cursor: pointer;\n  background-color: white;\n}\n.rdw-mention-link {\n  text-decoration: none;\n  color: #1236ff;\n  background-color: #f0fbff;\n  padding: 1px 2px;\n  border-radius: 2px;\n}\n.rdw-suggestion-wrapper {\n  position: relative;\n}\n.rdw-suggestion-dropdown {\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  border: 1px solid #F1F1F1;\n  min-width: 100px;\n  max-height: 150px;\n  overflow: auto;\n  background: white;\n  z-index: 100;\n}\n.rdw-suggestion-option {\n  padding: 7px 5px;\n  border-bottom: 1px solid #f1f1f1;\n}\n.rdw-suggestion-option-active {\n  background-color: #F1F1F1;\n}\n.rdw-hashtag-link {\n  text-decoration: none;\n  color: #1236ff;\n  background-color: #f0fbff;\n  padding: 1px 2px;\n  border-radius: 2px;\n}\n.rdw-image-alignment-options-popup {\n  position: absolute;\n  background: white;\n  display: flex;\n  padding: 5px 2px;\n  border-radius: 2px;\n  border: 1px solid #F1F1F1;\n  width: 105px;\n  cursor: pointer;\n  z-index: 100;\n}\n.rdw-alignment-option-left {\n  justify-content: flex-start;\n}\n.rdw-image-alignment-option {\n  height: 15px;\n  width: 15px;\n  min-width: 15px;\n}\n.rdw-image-alignment {\n  position: relative;\n}\n.rdw-image-imagewrapper {\n  position: relative;\n}\n.rdw-image-center {\n  display: flex;\n  justify-content: center;\n}\n.rdw-image-left {\n  display: flex;\n}\n.rdw-image-right {\n  display: flex;\n  justify-content: flex-end;\n}\n.rdw-image-alignment-options-popup-right {\n  right: 0;\n}\n.rdw-editor-main {\n  height: 100%;\n  overflow: auto;\n  box-sizing: border-box;\n}\n.rdw-editor-toolbar {\n  padding: 6px 5px 0;\n  border-radius: 2px;\n  border: 1px solid #F1F1F1;\n  display: flex;\n  justify-content: flex-start;\n  background: white;\n  flex-wrap: wrap;\n  font-size: 15px;\n  margin-bottom: 5px;\n  user-select: none;\n}\n.public-DraftStyleDefault-block {\n  margin: 1em 0;\n}\n.rdw-editor-wrapper:focus {\n  outline: none;\n}\n.rdw-editor-wrapper {\n  box-sizing: content-box;\n}\n.rdw-editor-main blockquote {\n  border-left: 5px solid #f1f1f1;\n  padding-left: 5px;\n}\n.rdw-editor-main pre {\n  background: #f1f1f1;\n  border-radius: 3px;\n  padding: 1px 10px;\n}/**\n * Draft v0.9.1\n *\n * Copyright (c) 2013-present, Facebook, Inc.\n * All rights reserved.\n *\n * This source code is licensed under the BSD-style license found in the\n * LICENSE file in the root directory of this source tree. An additional grant\n * of patent rights can be found in the PATENTS file in the same directory.\n */\n.DraftEditor-editorContainer,.DraftEditor-root,.public-DraftEditor-content{height:inherit;text-align:initial}.public-DraftEditor-content[contenteditable=true]{-webkit-user-modify:read-write-plaintext-only}.DraftEditor-root{position:relative}.DraftEditor-editorContainer{background-color:rgba(255,255,255,0);border-left:.1px solid transparent;position:relative;z-index:1}.public-DraftEditor-block{position:relative}.DraftEditor-alignLeft .public-DraftStyleDefault-block{text-align:left}.DraftEditor-alignLeft .public-DraftEditorPlaceholder-root{left:0;text-align:left}.DraftEditor-alignCenter .public-DraftStyleDefault-block{text-align:center}.DraftEditor-alignCenter .public-DraftEditorPlaceholder-root{margin:0 auto;text-align:center;width:100%}.DraftEditor-alignRight .public-DraftStyleDefault-block{text-align:right}.DraftEditor-alignRight .public-DraftEditorPlaceholder-root{right:0;text-align:right}.public-DraftEditorPlaceholder-root{color:#9197a3;position:absolute;z-index:0}.public-DraftEditorPlaceholder-hasFocus{color:#bdc1c9}.DraftEditorPlaceholder-hidden{display:none}.public-DraftStyleDefault-block{position:relative;white-space:pre-wrap}.public-DraftStyleDefault-ltr{direction:ltr;text-align:left}.public-DraftStyleDefault-rtl{direction:rtl;text-align:right}.public-DraftStyleDefault-listLTR{direction:ltr}.public-DraftStyleDefault-listRTL{direction:rtl}.public-DraftStyleDefault-ol,.public-DraftStyleDefault-ul{margin:16px 0;padding:0}.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR{margin-left:1.5em}.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL{margin-right:1.5em}.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR{margin-left:3em}.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL{margin-right:3em}.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR{margin-left:4.5em}.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL{margin-right:4.5em}.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR{margin-left:6em}.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL{margin-right:6em}.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR{margin-left:7.5em}.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL{margin-right:7.5em}.public-DraftStyleDefault-unorderedListItem{list-style-type:square;position:relative}.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0{list-style-type:disc}.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1{list-style-type:circle}.public-DraftStyleDefault-orderedListItem{list-style-type:none;position:relative}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before{left:-36px;position:absolute;text-align:right;width:30px}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before{position:absolute;right:-36px;text-align:left;width:30px}.public-DraftStyleDefault-orderedListItem:before{content:counter(ol0) \". \";counter-increment:ol0}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before{content:counter(ol1) \". \";counter-increment:ol1}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before{content:counter(ol2) \". \";counter-increment:ol2}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before{content:counter(ol3) \". \";counter-increment:ol3}.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before{content:counter(ol4) \". \";counter-increment:ol4}.public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset{counter-reset:ol0}.public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset{counter-reset:ol1}.public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset{counter-reset:ol2}.public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset{counter-reset:ol3}.public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset{counter-reset:ol4}";
styleInject(css);

var DraftEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(DraftEditor, _Component);

  function DraftEditor(props) {
    var _this;

    _classCallCheck(this, DraftEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DraftEditor).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onEditorStateChange", function (editorState) {
      _this.setState({
        editorState: editorState
      });

      _this.props.input.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    });

    _this.state = {
      editorState: props.input && props.input.value ? EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(props.input.value))) : EditorState.createEmpty()
    };
    return _this;
  }

  _createClass(DraftEditor, [{
    key: "render",
    value: function render() {
      var editorState = this.state.editorState;
      return React.createElement(Editor, {
        defaultContentState: "defaultContentState",
        initialEditorState: "initialEditorState",
        defaultEditorState: "defaultEditorState",
        placeholder: "\u0422\u0435\u043A\u0441\u0442",
        editorState: editorState,
        wrapperClassName: "demo-wrapper",
        onEditorStateChange: this.onEditorStateChange,
        editorClassName: "ant-input form-control",
        toolbar: {
          options: ['inline', 'list', 'link', 'history'],
          inline: {
            options: ['bold', 'italic']
          },
          list: {
            options: ['unordered', 'ordered']
          }
        },
        localization: {
          locale: 'ru'
        }
      });
    }
  }]);

  return DraftEditor;
}(Component);

DraftEditor.propTypes = {
  input: propTypes.object,
  initialValue: propTypes.object
};

var layoutStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999
};
var imgStyle = {
  maxWidth: '100%',
  maxHeight: '100%'
};
var closeIconStyle = {
  position: 'fixed',
  top: '10px',
  right: '25px',
  fontSize: '25px'
};

function UploaderFilePreview(props) {
  var preview = props.preview,
      setPreview = props.setPreview,
      files = props.files;
  if (!preview) return null;
  console.log(files, preview);
  var file = files.find(function (e) {
    return e.uid === preview;
  });
  var url = file.url || window.URL.createObjectURL(file);
  return React.createElement("div", {
    style: layoutStyle,
    onClick: function onClick() {
      return setPreview(null);
    }
  }, React.createElement("a", {
    style: closeIconStyle
  }, React.createElement(Icon, {
    type: 'close'
  })), React.createElement("img", {
    src: url,
    style: imgStyle
  }));
}

var setUploaderDefaultFileList = actions.setUploaderDefaultFileList;

var UploadDecorator = function UploadDecorator(UploaderComponent) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Uploader, _Component);

    function Uploader(props) {
      var _this;

      _classCallCheck(this, Uploader);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Uploader).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "setPreview", function (id) {
        _this.setState({
          preview: id
        });
      });

      _defineProperty(_assertThisInitialized(_this), "handleFileRemove", function (file) {
        var newFileList = _this.props.fileListStored.filter(function (f) {
          return f.uid !== file.uid;
        });

        _this.props.onChange(newFileList);
      });

      _this.state = {
        preview: null
      };
      return _this;
    }

    _createClass(Uploader, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var config = this.props.config;
        var listType = this.props.listType || 'text';
        var multiple = this.props.multiple || false;
        var buttonText = this.props.buttonText || undefined;
        var preview = this.state.preview;
        var fileListStored = this.props.fileListStored;
        var uploaderProps = {
          onRemove: this.handleFileRemove,
          accept: config.mimeTypes,
          beforeUpload: function beforeUpload(file) {
            var isMax = fileListStored.length === (config.maxFiles || 100);

            if (file.size > (config.maxSize || 10000000)) {
              message.error('Ошибка загрузки, файл превышает допустимый размер');
              return false;
            }

            if (multiple && isMax) {
              message.error('Ошибка загрузки, превышено допустимое количество загружаемых файлов');
              return false;
            }

            var newFileList = !multiple ? [file] : isMax ? fileListStored : [].concat(_toConsumableArray(fileListStored), [file]);

            _this2.props.onChange(newFileList);

            return false;
          },
          // disabled: fileListStored.length === (config.maxFiles || 100),
          onPreview: function onPreview(file) {
            return _this2.setPreview(file.uid);
          },
          fileList: fileListStored.map(function (f) {
            return {
              old: !!f.old,
              url: f.old ? f.url : window.URL.createObjectURL(f),
              name: f.name,
              uid: f.uid,
              lastModified: f.lastModified,
              lastModifiedDate: f.lastModifiedDate,
              size: f.size,
              type: f.type,
              webkitRelativePath: f.webkitRelativePath
            };
          }),
          listType: listType,
          buttonText: buttonText
        };
        return React.createElement("div", null, React.createElement(UploaderComponent, uploaderProps), React.createElement(UploaderFilePreview, {
          setPreview: this.setPreview,
          preview: preview,
          files: fileListStored
        }));
      }
    }]);

    return Uploader;
  }(Component), _temp;
};

UploadDecorator.propTypes = {
  onChange: propTypes.func.isRequired,
  setUploaderDefaultFileList: propTypes.func.isRequired,
  modelName: propTypes.string.isRequired,
  listType: propTypes.string,
  multiple: propTypes.bool,
  defaultFileList: propTypes.array,
  fileListStored: propTypes.array.isRequired
};

var mapStateToProps = function mapStateToProps(state, props) {
  var uploaderFiles = state.uploaderFiles;
  var modelName = props.modelName;
  var uploaderModelFiles = uploaderFiles && uploaderFiles[modelName] ? uploaderFiles[modelName] : {};
  return {
    defaultFileListStored: uploaderModelFiles.defaultFileList || [],
    fileListStored: uploaderModelFiles.fileList || []
  };
};

var UploadDecorator$1 = compose(connect(mapStateToProps, {
  setUploaderDefaultFileList: setUploaderDefaultFileList
}), UploadDecorator);

function Uploader(props) {
  return React.createElement(Upload, props, React.createElement(Button, {
    type: 'default'
  }, React.createElement(Icon, {
    type: "upload"
  }), " ", props.buttonText));
}

Uploader.propTypes = {
  buttonText: propTypes.string,
  listType: propTypes.string
};
Uploader.defaultProps = {
  buttonText: 'Upload'
};
var Uploader$1 = UploadDecorator$1(Uploader);

var setUploaderFiles = actions.setUploaderFiles,
    setUploaderDefaultFileList$1 = actions.setUploaderDefaultFileList,
    fetchFileConfig = actions.fetchFileConfig;

function CrudUploader(props) {
  useEffect(function () {
    props.setUploaderFiles(props.defaultFileList, props.modelName);
    props.fetchFileConfig(props.crudParams[props.modelName].crudCreate + '/config', props.modelName);
    return function () {
      return props.setUploaderFiles([], props.modelName);
    };
  }, []);
  console.log(props.config[props.modelName]);
  return React.createElement(Uploader$1, _extends({}, props, {
    config: props.config[props.modelName] && props.config[props.modelName].data ? props.config[props.modelName].data.files.config : {},
    onChange: function onChange(files) {
      return props.setUploaderFiles(files, props.modelName);
    }
  }));
}

CrudUploader.propTypes = {
  setUploaderFiles: propTypes.func.isRequired,
  modelName: propTypes.string.isRequired,
  setUploaderDefaultFileList: propTypes.func.isRequired,
  crudParams: propTypes.object.isRequired,
  fetchFileConfig: propTypes.func.isRequired,
  defaultFileList: propTypes.array
};
var Uploader$2 = connect(function (state, props) {
  return {
    modelName: state.isOpenModelModal || props.modelName,
    crudParams: state.crudParams,
    config: state.fileConfig
  };
}, {
  setUploaderFiles: setUploaderFiles,
  setUploaderDefaultFileList: setUploaderDefaultFileList$1,
  fetchFileConfig: fetchFileConfig
})(CrudUploader);

var SelectOption = Select.Option;
var Search = Input.Search;
var renderField = function renderField(_ref) {
  var input = _ref.input,
      label = _ref.label,
      type = _ref.type,
      options = _ref.options,
      mode = _ref.mode,
      min = _ref.min,
      max = _ref.max,
      step = _ref.step,
      _ref$meta = _ref.meta,
      touched = _ref$meta.touched,
      error = _ref$meta.error,
      warning = _ref$meta.warning,
      validating = _ref.validating,
      placeholder = _ref.placeholder,
      rows = _ref.rows,
      size = _ref.size,
      layout = _ref.layout,
      onPressEnter = _ref.onPressEnter,
      defaultValue = _ref.defaultValue,
      addonAfter = _ref.addonAfter,
      enterButton = _ref.enterButton,
      dropdownRender = _ref.dropdownRender,
      uploaderParams = _ref.uploaderParams,
      locale = _ref.locale;
  return React.createElement(Form.Item, _extends({
    hasFeedback: true
  }, layout, {
    label: label,
    validateStatus: error && touched ? 'error' : warning && touched ? 'warning' : validating ? 'validating' : '',
    help: touched && error ? error : ''
  }), function () {
    switch (type) {
      case 'select':
        return React.createElement(Select, _extends({}, input, {
          value: input.value || [],
          mode: mode,
          showSearch: true,
          optionFilterProp: "children",
          disabled: input.disabled ? true : false,
          style: {
            width: '100%'
          },
          placeholder: placeholder,
          dropdownRender: dropdownRender
        }), options.map(function (elem) {
          return React.createElement(SelectOption, {
            value: elem.id,
            key: elem.id
          }, elem.name);
        }));

      case 'textarea':
        return React.createElement(Input.TextArea, _extends({}, input, {
          placeholder: placeholder,
          type: type,
          className: "form-control",
          rows: rows
        }));

      case 'checkbox':
        return React.createElement(Checkbox, input, placeholder);

      case 'search':
        return React.createElement(Search, _extends({
          onPressEnter: onPressEnter
        }, input, {
          value: input.value || defaultValue,
          placeholder: placeholder,
          enterButton: enterButton
        }));

      case 'date':
        return React.createElement(DatePicker, _extends({
          style: {
            width: '100%'
          },
          onPressEnter: onPressEnter
        }, input, {
          value: input.value ? moment(input.value, 'DD/MM/YYYY').locale('ru') : null,
          placeholder: placeholder // onChange={(value) => console.log(value)}
          ,
          format: "DD/MM/YYYY" //locale={locale}

        }));

      case 'editor':
        return React.createElement(Field, {
          name: input.name,
          component: DraftEditor
        });

      case 'uploader':
        return React.createElement(Uploader$2, _extends({}, uploaderParams, {
          defaultFileList: input.value
        }));

      default:
        return React.createElement(Input, _extends({
          onPressEnter: onPressEnter
        }, input, {
          value: input.value || defaultValue,
          placeholder: placeholder,
          type: type,
          className: "form-control",
          min: min,
          max: max,
          step: step,
          size: size,
          addonAfter: addonAfter
        }));
    }
  }());
};

var CreateModalForm =
/*#__PURE__*/
function (_Component) {
  _inherits(CreateModalForm, _Component);

  function CreateModalForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CreateModalForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CreateModalForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (form) {
      _this.props.onCreate(form);
    });

    _defineProperty(_assertThisInitialized(_this), "handleAdd", function () {});

    _defineProperty(_assertThisInitialized(_this), "mapFields", function (fields) {
      return fields.map(function (props) {
        return props.fields ? React.createElement("div", {
          key: props.name
        }, _this.mapFields(props.fields)) : React.createElement(Field, _extends({}, props, {
          component: props.component || _this.props.renderField,
          key: props.name,
          options: _this.props.options[props.optionsKey] || props.options || []
        }));
      });
    });

    return _this;
  }

  _createClass(CreateModalForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          modalType = _this$props.modalType,
          title = _this$props.title,
          titleEdit = _this$props.titleEdit,
          fields = _this$props.fields,
          crudCreateModalLoading = _this$props.crudCreateModalLoading;
      return React.createElement(Modal, {
        title: modalType === 'edit' ? titleEdit : title,
        visible: true,
        onCancel: this.handleCancel,
        cancelText: "\u041E\u0442\u043C\u0435\u043D\u0430",
        confirmLoading: crudCreateModalLoading,
        onOk: this.props.handleSubmit(this.handleSubmit),
        okText: modalType === 'edit' ? 'Сохранить' : 'Создать'
      }, React.createElement("form", {
        onSubmit: this.props.handleSubmit(this.handleSubmit)
      }, this.mapFields(fields)));
    }
  }]);

  return CreateModalForm;
}(Component);

_defineProperty(CreateModalForm, "propTypes", {
  modalType: propTypes.string,
  onClose: propTypes.func.isRequired,
  onCreate: propTypes.func.isRequired,
  title: propTypes.string,
  titleEdit: propTypes.string,
  fields: propTypes.array.isRequired,
  renderField: propTypes.oneOfType([propTypes.func, propTypes.object]),
  handleSubmit: propTypes.func.isRequired,
  uploadFileUrl: propTypes.string
});

_defineProperty(CreateModalForm, "defaultProps", {
  renderField: renderField
});

CreateModalForm = reduxForm({
  form: 'createModel',
  validate: function validate(values, props) {
    var errors = {}; // if(!values.name) errors.name = 'Введите название';

    props.fields.forEach(function (field) {
      if (field.validateFunc) errors = field.validateFunc(values, errors);
    });
    return errors;
  } // initialValues comes from outside

})(CreateModalForm);
CreateModalForm = connect(function (state, props) {
  var options = props.fields.reduce(function (acc, field) {
    if (state[field.optionsKey]) {
      acc[field.optionsKey] = state[field.optionsKey].data;
    }

    return acc;
  }, {});
  return {
    crudCreateModalLoading: state.crudCreateModalLoading,
    options: options
  };
}, {})(CreateModalForm);
var CreateModel = CreateModalForm;

var CreateViewForm =
/*#__PURE__*/
function (_Component) {
  _inherits(CreateViewForm, _Component);

  function CreateViewForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CreateViewForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CreateViewForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      return _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (form) {
      return _this.props.onCreate(form);
    });

    _defineProperty(_assertThisInitialized(_this), "mapFields", function (fields) {
      return fields.map(function (props) {
        return props.fields ? React.createElement("div", {
          key: props.name
        }, _this.mapFields(props.fields)) : React.createElement(Field, _extends({}, props, {
          component: props.component || _this.props.renderField,
          key: props.name,
          options: _this.props.options[props.optionsKey] || props.options || []
        }));
      });
    });

    return _this;
  }

  _createClass(CreateViewForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          title = _this$props.title,
          titleEdit = _this$props.titleEdit,
          fields = _this$props.fields;
      var Title = Typography.Title;
      return React.createElement(Row, {
        align: "middle",
        justify: "space-between"
      }, React.createElement(Col, {
        span: 20
      }, React.createElement(Button, {
        size: "small",
        type: "primary",
        ghost: true,
        onClick: this.handleCancel
      }, "\u041D\u0430\u0437\u0430\u0434"), React.createElement(Title, {
        level: 2
      }, type === 'edit' ? titleEdit : title), React.createElement("form", {
        onSubmit: this.props.handleSubmit(this.handleSubmit)
      }, this.mapFields(fields))), React.createElement(Col, {
        span: 20,
        style: {
          textAlign: 'right'
        }
      }, React.createElement(Button, {
        type: "primary",
        htmlType: "submit",
        onClick: this.props.handleSubmit(this.handleSubmit)
      }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C"), React.createElement(Button, {
        style: {
          marginLeft: 8
        },
        onClick: this.handleCancel
      }, "\u041E\u0442\u043C\u0435\u043D\u0430")));
    }
  }]);

  return CreateViewForm;
}(Component);

_defineProperty(CreateViewForm, "propTypes", {
  modalType: propTypes.string,
  onClose: propTypes.func.isRequired,
  onCreate: propTypes.func.isRequired,
  title: propTypes.string,
  titleEdit: propTypes.string,
  fields: propTypes.array.isRequired,
  renderField: propTypes.oneOfType([propTypes.func, propTypes.object])
});

_defineProperty(CreateViewForm, "defaultProps", {
  renderField: renderField
});

CreateViewForm.propTypes = {
  type: propTypes.string,
  options: propTypes.object,
  handleSubmit: propTypes.func
};
CreateViewForm = reduxForm({
  form: 'createModel',
  validate: function validate(values, props) {
    var errors = {}; // if(!values.name) errors.name = 'Введите название';

    props.fields.forEach(function (field) {
      if (field.validateFunc) errors = field.validateFunc(values, errors);
    });
    return errors;
  }
})(CreateViewForm);
CreateViewForm = connect(function (state, props) {
  var options = props.fields.reduce(function (acc, field) {
    if (state[field.optionsKey]) {
      acc[field.optionsKey] = state[field.optionsKey].data;
    }

    return acc;
  }, {});
  return {
    crudCreateModalLoading: state.crudCreateModalLoading,
    options: options
  };
}, {})(CreateViewForm);
var CreateModelView = CreateViewForm;

var CreateViewForm$1 =
/*#__PURE__*/
function (_Component) {
  _inherits(CreateViewForm, _Component);

  function CreateViewForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CreateViewForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CreateViewForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      return _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (form) {
      return _this.props.onCreate(form);
    });

    _defineProperty(_assertThisInitialized(_this), "mapFields", function (fields) {
      if (fields.length) {
        return fields.map(function (elem) {
          return React.createElement(Form, {
            key: elem.name
          }, React.createElement(Form.Item, {
            label: elem.placeholder
          }, React.createElement(Input, {
            type: "text",
            disabled: true,
            value: _this.props.initialValues[elem.name]
          })));
        });
      }

      return null;
    });

    return _this;
  }

  _createClass(CreateViewForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var fields = this.props.fields;
      var Title = Typography.Title;
      return React.createElement(Row, {
        align: "middle",
        justify: "space-between"
      }, React.createElement(Col, {
        span: 20
      }, React.createElement(Title, {
        level: 2
      }, "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0430\u043B\u0435\u0440\u0442\u0430"), this.mapFields(fields)), React.createElement(Col, {
        span: 20,
        style: {
          textAlign: 'right'
        }
      }, React.createElement(Button, {
        style: {
          marginLeft: 8
        },
        onClick: this.handleCancel
      }, "\u041D\u0430\u0437\u0430\u0434")));
    }
  }]);

  return CreateViewForm;
}(Component);

_defineProperty(CreateViewForm$1, "propTypes", {
  modalType: propTypes.string,
  onClose: propTypes.func.isRequired,
  onCreate: propTypes.func.isRequired,
  title: propTypes.string,
  titleEdit: propTypes.string,
  fields: propTypes.array.isRequired,
  renderField: propTypes.oneOfType([propTypes.func, propTypes.object])
});

_defineProperty(CreateViewForm$1, "defaultProps", {
  renderField: renderField
});

CreateViewForm$1.propTypes = {
  type: propTypes.string,
  options: propTypes.object,
  handleSubmit: propTypes.func
};
CreateViewForm$1 = reduxForm({
  form: 'createModel',
  validate: function validate(values, props) {
    var errors = {}; // if(!values.name) errors.name = 'Введите название';

    props.fields.forEach(function (field) {
      if (field.validateFunc) errors = field.validateFunc(values, errors);
    });
    return errors;
  }
})(CreateViewForm$1);
CreateViewForm$1 = connect(function (state, props) {
  var options = props.fields.reduce(function (acc, field) {
    if (state[field.optionsKey]) {
      acc[field.optionsKey] = state[field.optionsKey].data;
    }

    return acc;
  }, {});
  return {
    crudCreateModalLoading: state.crudCreateModalLoading,
    options: options
  };
}, {})(CreateViewForm$1);
var ShowModelView = CreateViewForm$1;

var css$1 = ".anticon:before {\n\tdisplay: initial !important;\n}\n\n.crud-table-column {\n    min-width: 100px!important;\n}\n\n\n.ant-table-row.success {\n    background-color: #c3e6cb;\n}\n\n.ant-table-row.secondary {\n    background-color: #d6d8db;\n}\n\n.ant-table-row.primary {\n    background-color: #b8daff;\n}\n\n.ant-table-row.danger {\n    background-color: #f5c6cb;\n}\n.ant-table-row.warning {\n    background-color: #ffeeba;\n}\n.ant-table-row.info {\n    background-color: #bee5eb;\n}\n.ant-table-row.light {\n    background-color: #fdfdfe;\n}\n.ant-table-row.dark {\n    background-color: #c6c8ca;\n}\n\n.ant-table-row.dark td, .ant-table-row.dark th {\n    border-color: #32383e;\n}\n\n";
styleInject(css$1);

var toggleCreateModelModal = actions.toggleCreateModelModal,
    deleteModel = actions.deleteModel,
    restoreModel = actions.restoreModel,
    createModel = actions.createModel,
    changeModel = actions.changeModel,
    setModelModalForm = actions.setModelModalForm,
    setCrudActionsFunc = actions.setCrudActionsFunc,
    setCrudParams$1 = actions.setCrudParams;
var CrudFull =
/*#__PURE__*/
function (_Component) {
  _inherits(CrudFull, _Component);

  function CrudFull() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CrudFull);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CrudFull)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "actionsFunc", function (action, elem) {
      var customActionsFunc = _this.props.customActionsFunc;

      switch (action.id) {
        case 'update':
          _this.openUpdateFrom(action, elem);

          break;

        case 'view':
          _this.openViewFrom(action, elem);

          break;

        case 'delete':
          _this.handleDelete(action, elem);

          break;

        case 'restore':
          _this.handleRestore(action, elem);

          break;

        default:
          return customActionsFunc ? customActionsFunc(action, elem) : null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "openUpdateFrom", function (action, elem) {
      _this.props.setModelModalForm('edit', elem, action);

      _this.toggleModal(_this.props.modelName);
    });

    _defineProperty(_assertThisInitialized(_this), "openViewFrom", function (action, elem) {
      _this.props.setModelModalForm('view', elem, action);

      _this.toggleModal(_this.props.modelName);
    });

    _defineProperty(_assertThisInitialized(_this), "toggleModal", function (modelName) {
      _this.props.toggleCreateModelModal(modelName);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function (modelName) {
      _this.toggleModal();

      _this.props.setModelModalForm(null, null);
    });

    _defineProperty(_assertThisInitialized(_this), "handleUpdate", function (form) {
      _this.props.changeModel(form, _this.props.objectModal.action, _this.props.modelName);
    });

    _defineProperty(_assertThisInitialized(_this), "handleCreate", function (form) {
      _this.props.createModel(form, _this.props.crudCreate, _this.props.modelName);
    });

    _defineProperty(_assertThisInitialized(_this), "handleDelete", function (action, elem) {
      var conf = window.confirm(_this.props.onDeleteConfirmMessageFunc(elem));
      if (conf) _this.props.deleteModel(elem.id, action, _this.props.modelName);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRestore", function (action, elem) {
      var conf = window.confirm("\u0425\u043E\u0442\u0438\u0442\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \"".concat(elem.name, "\" (ID: ").concat(elem.id, ")?"));
      if (conf) _this.props.restoreModel(elem.id, action.url, _this.props.modelName);
    });

    return _this;
  }

  _createClass(CrudFull, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.setCrudActionsFunc(this.actionsFunc, this.props.modelName);
      this.props.setCrudParams({
        crudRead: this.props.crudRead,
        crudCreate: this.props.crudCreate,
        modelName: this.props.modelName,
        submitShape: this.props.submitShape,
        initialValues: this.props.initialValues,
        iconsProvider: this.props.iconsProvider,
        uploadFilesSettings: this.props.uploadFilesSettings
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          objectModal = _this$props.objectModal,
          isModalOpen = _this$props.isModalOpen,
          modelName = _this$props.modelName,
          crudRead = _this$props.crudRead,
          createButtonTitle = _this$props.createButtonTitle,
          createFormOptions = _this$props.createFormOptions,
          createDisabled = _this$props.createDisabled,
          btnStyle = _this$props.btnStyle,
          tableStyle = _this$props.tableStyle,
          tableWrapper = _this$props.tableWrapper,
          fixActionColumn = _this$props.fixActionColumn,
          updateShape = _this$props.updateShape,
          iconTheme = _this$props.iconTheme,
          getChildrenUrl = _this$props.getChildrenUrl,
          ButtonComponent = _this$props.ButtonComponent,
          size = _this$props.size,
          tdClass = _this$props.tdClass,
          initialModal = _this$props.initialModal,
          scrollX = _this$props.scrollX,
          isView = _this$props.isView,
          renderField = _this$props.renderField,
          CustomButtons = _this$props.CustomButtons,
          rowSelection = _this$props.rowSelection,
          bordered = _this$props.bordered;

      var _ref = createFormOptions || {},
          title = _ref.title,
          titleEdit = _ref.titleEdit,
          fields = _ref.fields;

      var Btn = ButtonComponent || Button; // viewMode

      if (isView && isModalOpen === modelName && objectModal.modalType === 'view') return React.createElement(ShowModelView, {
        title: title || 'Создать',
        titleEdit: titleEdit || 'Редактировать',
        type: objectModal.modalType,
        onClose: this.handleClose,
        fields: fields,
        initialValues: objectModal.initialValues ? updateShape(objectModal.initialValues) : initialModal || {},
        renderField: renderField
      });
      if (isView && isModalOpen === modelName && !createDisabled) return React.createElement(CreateModelView, {
        title: title || 'Создать',
        titleEdit: titleEdit || 'Редактировать',
        type: objectModal.modalType,
        onClose: this.handleClose,
        onCreate: objectModal.modalType === 'edit' ? this.handleUpdate : this.handleCreate,
        fields: fields,
        initialValues: objectModal.initialValues ? updateShape(objectModal.initialValues) : initialModal || {},
        renderField: renderField
      });
      return React.createElement("div", null, !createDisabled ? React.createElement(Btn, {
        type: "primary",
        name: "createButton",
        onClick: function onClick() {
          return _this2.toggleModal(modelName);
        },
        style: _objectSpread2({}, btnStyle, {
          marginBottom: '20px'
        })
      }, createButtonTitle) : null, React.createElement(CustomButtons, null), React.createElement(CrudView$1, {
        modelName: modelName,
        url: crudRead,
        tableStyle: tableStyle,
        TableWrapper: tableWrapper,
        fixActionColumn: fixActionColumn,
        iconTheme: iconTheme,
        getChildrenUrl: getChildrenUrl,
        size: size,
        tdClass: tdClass,
        scrollX: scrollX,
        rowSelection: rowSelection,
        bordered: bordered
      }), isModalOpen === modelName && !createDisabled ? React.createElement(CreateModel, {
        title: title || 'Создать',
        titleEdit: titleEdit || 'Редактировать',
        modalType: objectModal.modalType,
        onClose: this.handleClose,
        onCreate: objectModal.modalType === 'edit' ? this.handleUpdate : this.handleCreate,
        fields: fields,
        initialValues: objectModal.initialValues ? updateShape(objectModal.initialValues) : initialModal || {},
        renderField: renderField
      }) : '');
    }
  }]);

  return CrudFull;
}(Component);
CrudFull.propTypes = {
  crudCreate: propTypes.string,
  crudRead: propTypes.string.isRequired,
  modelName: propTypes.string.isRequired,
  customActionsFunc: propTypes.func,
  createButtonTitle: propTypes.oneOfType([propTypes.string, propTypes.object, propTypes.node]),
  createFormOptions: propTypes.shape({
    fields: propTypes.array.isRequired
  }),
  submitShape: propTypes.func,
  updateShape: propTypes.func,
  getChildrenUrl: propTypes.func,
  createDisabled: propTypes.bool,
  isView: propTypes.bool,
  btnStyle: propTypes.object,
  ButtonComponent: propTypes.object,
  tableStyle: propTypes.object,
  tableWrapper: propTypes.oneOfType([propTypes.object, propTypes.node]),
  fixActionColumn: propTypes.bool,
  iconTheme: propTypes.string,
  size: propTypes.string,
  tdClass: propTypes.string,
  initialModal: propTypes.object,
  iconsProvider: propTypes.func,
  scrollX: propTypes.number,
  onDeleteConfirmMessageFunc: propTypes.func,
  renderField: propTypes.func,
  setCrudActionsFunc: propTypes.func,
  rowSelection: propTypes.oneOfType([propTypes.func, propTypes.object]),
  CustomButtons: propTypes.oneOfType([propTypes.func, propTypes.object]),
  uploadFilesSettings: propTypes.string,
  bordered: propTypes.bool
};
CrudFull.defaultProps = {
  createButtonTitle: 'Добавить',
  submitShape: function submitShape(form) {
    return form;
  },
  updateShape: function updateShape(elem) {
    return elem;
  },
  createDisabled: true,
  btnStyle: {},
  tableStyle: {},
  tableWrapper: null,
  iconTheme: 'outline',
  size: 'default',
  iconsProvider: function iconsProvider() {
    return '';
  },
  CustomButtons: function CustomButtons() {
    return null;
  },
  rowSelection: null,
  onDeleteConfirmMessageFunc: function onDeleteConfirmMessageFunc(elem) {
    return "\u0425\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \"".concat(elem.name, "\" (ID: ").concat(elem.id, ")?");
  },
  uploadFilesSettings: null
};
var crudFull = connect(function (state) {
  return {
    objectModal: state.modelModalForm,
    isModalOpen: state.isOpenModelModal
  };
}, {
  toggleCreateModelModal: toggleCreateModelModal,
  deleteModel: deleteModel,
  restoreModel: restoreModel,
  createModel: createModel,
  changeModel: changeModel,
  setModelModalForm: setModelModalForm,
  setCrudActionsFunc: setCrudActionsFunc,
  setCrudParams: setCrudParams$1
})(CrudFull);

var SUCCESS_REQ = 0;
var SORT_DESC = 'SORT_DESC';
var SORT_ASC = 'SORT_ASC';
var START = '_START';
var SUCCESS = '_SUCCESS';
var ERROR = '_ERROR';
var FAIL = 'FAIL';

var crudModelsReducer = function crudModelsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      response = action.response,
      error = action.error,
      payload = action.payload;

  switch (type) {
    case actions.FETCH_CRUD_MODELS + SUCCESS:
      return _objectSpread2({}, state, _defineProperty({}, payload.params.modelName, response));

    case actions.FETCH_CRUD_MODELS + ERROR:
      return _objectSpread2({}, state, _defineProperty({}, payload.params.modelName, _objectSpread2({}, state[payload.params.modelName], {
        loading: false,
        error: error
      })));

    case actions.FETCH_CRUD_MODELS + START:
      return _objectSpread2({}, state, _defineProperty({}, payload.params.modelName, _objectSpread2({}, state[payload.params.modelName], {
        loading: true
      })));

    case actions.FETCH_CRUD_CHILDREN + SUCCESS:
      var model = state[payload.params.modelName];
      return _objectSpread2({}, state, _defineProperty({}, payload.params.modelName, _objectSpread2({}, model, {
        data: _objectSpread2({}, model.data, {
          items: model.data.items.map(function (elem) {
            return elem.id === payload.id ? _objectSpread2({}, elem, {
              children: response.data.items
            }) : elem;
          })
        })
      })));

    default:
      return state;
  }
};
var crudFilterValuesReducer = function crudFilterValuesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      response = action.response,
      error = action.error,
      payload = action.payload;

  switch (type) {
    case actions.FETCH_CRUD_FILTER_VALUES + SUCCESS:
      return _objectSpread2({}, state, _defineProperty({
        loading: false
      }, payload.modelName, _objectSpread2({}, state[payload.modelName], _defineProperty({}, payload.filter, response.data))));

    case actions.FETCH_CRUD_FILTER_VALUES + ERROR:
      return _objectSpread2({}, state, {
        loading: false,
        error: error
      });

    case actions.FETCH_CRUD_FILTER_VALUES + START:
      return _objectSpread2({}, state, {
        loading: true
      });

    default:
      return state;
  }
};
var crudActionsFuncReducer = function crudActionsFuncReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      response = action.response,
      error = action.error,
      payload = action.payload;

  switch (type) {
    case actions.SET_CRUD_ACTIONS_FUNC:
      return _objectSpread2({}, state, _defineProperty({}, payload.modelName, payload.func));

    default:
      return state;
  }
};
var isOpenModelModalReducer = function isOpenModelModalReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      response = action.response,
      error = action.error,
      payload = action.payload;

  switch (type) {
    case actions.TOGGLE_CREATE_MODEL_MODAL:
      return state ? null : payload.modelName;

    default:
      return state;
  }
};
var modelModalFormReducer = function modelModalFormReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      response = action.response,
      error = action.error,
      payload = action.payload;

  switch (type) {
    case actions.SET_MODEL_MODAL_FORM:
      return payload;

    default:
      return state;
  }
};
var crudParamsReducer = function crudParamsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      response = action.response,
      error = action.error,
      payload = action.payload;

  switch (type) {
    case actions.SET_CRUD_PARAMS:
      return _objectSpread2({}, state, _defineProperty({}, payload.modelName, payload));

    default:
      return state;
  }
};
var crudCreateModalLoadingReducer = function crudCreateModalLoadingReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case actions.CREATE_MODEL + START:
    case actions.CHANGE_MODEL + START:
      return true;

    case actions.CREATE_MODEL + SUCCESS:
    case actions.CHANGE_MODEL + SUCCESS:
    case actions.CREATE_MODEL + ERROR:
    case actions.CHANGE_MODEL + ERROR:
      return false;

    default:
      return state;
  }
};
var uploaderFilesReducer = function uploaderFilesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      payload = action.payload;

  switch (type) {
    case actions.SET_UPLOADER_FILES:
      return _objectSpread2({}, state, _defineProperty({}, payload.modelName, _objectSpread2({}, state[payload.modelName], {
        fileList: payload.files
      })));

    case actions.SET_UPLOADER_DEFAULT_FILE_LIST:
      return _objectSpread2({}, state, _defineProperty({}, payload.modelName, _objectSpread2({}, state[payload.modelName], {
        defaultFileList: payload.defaultFileList
      })));

    default:
      return state;
  }
};
function fetchFileConfigReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      response = action.response,
      error = action.error,
      payload = action.payload;

  switch (type) {
    case actions.FETCH_FILE_CONFIG + SUCCESS:
      return _objectSpread2({}, state, _defineProperty({}, payload.modelName, response));

    case actions.FETCH_FILE_CONFIG + ERROR:
      return {
        error: error
      };

    default:
      return state;
  }
}
var crudReducers = {
  crudFilterValues: crudFilterValuesReducer,
  crudModels: crudModelsReducer,
  crudActionsFunc: crudActionsFuncReducer,
  isOpenModelModal: isOpenModelModalReducer,
  modelModalForm: modelModalFormReducer,
  crudParams: crudParamsReducer,
  crudCreateModalLoading: crudCreateModalLoadingReducer,
  uploaderFiles: uploaderFilesReducer,
  fileConfig: fetchFileConfigReducer
};

var createSymbol = function createSymbol(name) {
  return "@@redux-saga/" + name;
};

var CANCEL =
/*#__PURE__*/
createSymbol('CANCEL_PROMISE');
var IO =
/*#__PURE__*/
createSymbol('IO');
var MULTICAST =
/*#__PURE__*/
createSymbol('MULTICAST');

var undef = function undef(v) {
  return v === null || v === undefined;
};
var notUndef = function notUndef(v) {
  return v !== null && v !== undefined;
};
var func = function func(f) {
  return typeof f === 'function';
};
var string = function string(s) {
  return typeof s === 'string';
};
var array = Array.isArray;
var pattern = function pattern(pat) {
  return pat && (string(pat) || symbol(pat) || func(pat) || array(pat) && pat.every(pattern));
};
var channel = function channel(ch) {
  return ch && func(ch.take) && func(ch.close);
};
var stringableFunc = function stringableFunc(f) {
  return func(f) && f.hasOwnProperty('toString');
};
var symbol = function symbol(sym) {
  return Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
};
var multicast = function multicast(ch) {
  return channel(ch) && ch[MULTICAST];
};

function delayP(ms, val) {
  if (val === void 0) {
    val = true;
  }

  var timeoutId;
  var promise = new Promise(function (resolve) {
    timeoutId = setTimeout(resolve, ms, val);
  });

  promise[CANCEL] = function () {
    clearTimeout(timeoutId);
  };

  return promise;
}

var konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue =
/*#__PURE__*/
konst(true);

var noop = function noop() {};
var identity = function identity(v) {
  return v;
};

var kThrow = function kThrow(err) {
  throw err;
};

var kReturn = function kReturn(value) {
  return {
    value: value,
    done: true
  };
};

function makeIterator(next, thro, name) {
  if (thro === void 0) {
    thro = kThrow;
  }

  if (name === void 0) {
    name = 'iterator';
  }

  var iterator$$1 = {
    meta: {
      name: name
    },
    next: next,
    throw: thro,
    return: kReturn,
    isSagaIterator: true
  };

  if (typeof Symbol !== 'undefined') {
    iterator$$1[Symbol.iterator] = function () {
      return iterator$$1;
    };
  }

  return iterator$$1;
}

var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;
var zeroBuffer = {
  isEmpty: kTrue,
  put: noop,
  take: noop
};

function ringBuffer(limit, overflowAction) {
  if (limit === void 0) {
    limit = 10;
  }

  var arr = new Array(limit);
  var length = 0;
  var pushIndex = 0;
  var popIndex = 0;

  var push$$1 = function push$$1(it) {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = function take() {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = function flush() {
    var items = [];

    while (length) {
      items.push(take());
    }

    return items;
  };

  return {
    isEmpty: function isEmpty() {
      return length == 0;
    },
    put: function put(it) {
      if (length < limit) {
        push$$1(it);
      } else {
        var doubledLimit;

        switch (overflowAction) {
          case ON_OVERFLOW_THROW:
            throw new Error(BUFFER_OVERFLOW);

          case ON_OVERFLOW_SLIDE:
            arr[pushIndex] = it;
            pushIndex = (pushIndex + 1) % limit;
            popIndex = pushIndex;
            break;

          case ON_OVERFLOW_EXPAND:
            doubledLimit = 2 * limit;
            arr = flush();
            length = arr.length;
            pushIndex = arr.length;
            popIndex = 0;
            arr.length = doubledLimit;
            limit = doubledLimit;
            push$$1(it);
            break;

          default: // DROP

        }
      }
    },
    take: take,
    flush: flush
  };
}

var none = function none() {
  return zeroBuffer;
};
var fixed = function fixed(limit) {
  return ringBuffer(limit, ON_OVERFLOW_THROW);
};
var dropping = function dropping(limit) {
  return ringBuffer(limit, ON_OVERFLOW_DROP);
};
var sliding = function sliding(limit) {
  return ringBuffer(limit, ON_OVERFLOW_SLIDE);
};
var expanding = function expanding(initialSize) {
  return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
};

var buffers = /*#__PURE__*/Object.freeze({
  none: none,
  fixed: fixed,
  dropping: dropping,
  sliding: sliding,
  expanding: expanding
});

var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var CANCEL$1 = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var effectTypes = /*#__PURE__*/Object.freeze({
  TAKE: TAKE,
  PUT: PUT,
  ALL: ALL,
  RACE: RACE,
  CALL: CALL,
  CPS: CPS,
  FORK: FORK,
  JOIN: JOIN,
  CANCEL: CANCEL$1,
  SELECT: SELECT,
  ACTION_CHANNEL: ACTION_CHANNEL,
  CANCELLED: CANCELLED,
  FLUSH: FLUSH,
  GET_CONTEXT: GET_CONTEXT,
  SET_CONTEXT: SET_CONTEXT
});

var makeEffect = function makeEffect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref.combinator = false, _ref.type = type, _ref.payload = payload, _ref;
};
function take(patternOrChannel, multicastPattern) {
  if (patternOrChannel === void 0) {
    patternOrChannel = '*';
  }

  if (pattern(patternOrChannel)) {
    return makeEffect(TAKE, {
      pattern: patternOrChannel
    });
  }

  if (multicast(patternOrChannel) && notUndef(multicastPattern) && pattern(multicastPattern)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel,
      pattern: multicastPattern
    });
  }

  if (channel(patternOrChannel)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel
    });
  }
}
function put(channel$1, action) {

  if (undef(action)) {
    action = channel$1; // `undefined` instead of `null` to make default parameter work

    channel$1 = undefined;
  }

  return makeEffect(PUT, {
    channel: channel$1,
    action: action
  });
}
function all(effects) {
  var eff = makeEffect(ALL, effects);
  eff.combinator = true;
  return eff;
}

function getFnCallDescriptor(fnDescriptor, args) {
  var context = null;
  var fn;

  if (func(fnDescriptor)) {
    fn = fnDescriptor;
  } else {
    if (array(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
    } else {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
    }

    if (context && string(fn) && func(context[fn])) {
      fn = context[fn];
    }
  }

  return {
    context: context,
    fn: fn,
    args: args
  };
}

function call(fnDescriptor) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return makeEffect(CALL, getFnCallDescriptor(fnDescriptor, args));
}
function fork(fnDescriptor) {

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return makeEffect(FORK, getFnCallDescriptor(fnDescriptor, args));
}
function select(selector) {
  if (selector === void 0) {
    selector = identity;
  }

  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return makeEffect(SELECT, {
    selector: selector,
    args: args
  });
}
var delay =
/*#__PURE__*/
call.bind(null, delayP);

var done = function done(value) {
  return {
    done: true,
    value: value
  };
};

var qEnd = {};
function safeName(patternOrChannel) {
  if (channel(patternOrChannel)) {
    return 'channel';
  }

  if (stringableFunc(patternOrChannel)) {
    return String(patternOrChannel);
  }

  if (func(patternOrChannel)) {
    return patternOrChannel.name;
  }

  return String(patternOrChannel);
}
function fsmIterator(fsm, startState, name) {
  var stateUpdater,
      errorState,
      effect$$1,
      nextState = startState;

  function next(arg, error) {
    if (nextState === qEnd) {
      return done(arg);
    }

    if (error && !errorState) {
      nextState = qEnd;
      throw error;
    } else {
      stateUpdater && stateUpdater(arg);
      var currentState = error ? fsm[errorState](error) : fsm[nextState]();
      nextState = currentState.nextState;
      effect$$1 = currentState.effect;
      stateUpdater = currentState.stateUpdater;
      errorState = currentState.errorState;
      return nextState === qEnd ? done(arg) : effect$$1;
    }
  }

  return makeIterator(next, function (error) {
    return next(null, error);
  }, name);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yFork(action)
      };
    }
  }, 'q1', "takeEvery(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function takeEvery$1(patternOrChannel, worker) {

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return fork.apply(void 0, [takeEvery, patternOrChannel, worker].concat(args));
}

function getUrlParameters(search) {
  var query = search || location.search.substr(1);
  var result = {};
  if (!query) return result;
  var preQuery = query.replace('?', '&');
  preQuery.split('&').forEach(function (part) {
    var item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}
function buildUrlSearch(params) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (!params) return '';
  var res = Object.keys(params).reduce(function (acc, key) {
    if (params[key] || params[key] === 0) {
      if (Array.isArray(params[key])) {
        var arr = params[key].reduce(function (sum, elem) {
          return sum + "&".concat(key, "[]=").concat(elem);
        }, '');
        return acc + arr;
      }

      return acc + (!acc ? '' : '&') + "".concat(key, "=").concat(params[key]);
    }

    return acc;
  }, '');
  return res && start ? "?".concat(res) : res ? "&".concat(res) : '';
}

var createNotification = function createNotification(type, message$$1, description) {
  notification[type]({
    message: message$$1,
    description: description
  });
};

function reduceMessages(messages) {
  var parseNameFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (name) {
    return name;
  };
  return messages.reduce(function (acc, elem) {
    if (elem.targetField) acc[parseNameFunc(elem.targetField)] = elem.message;
    return acc;
  }, {});
}

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(notifySaga),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(fetchCrudModelsSaga),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(fetchCrudModelsSuccessSaga),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(fetchCrudFilterValuesSaga),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(filesUpload),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(getHandledFiles),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(createModelSaga),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(updateModelsSaga),
    _marked9 =
/*#__PURE__*/
regeneratorRuntime.mark(deleteModelSaga),
    _marked10 =
/*#__PURE__*/
regeneratorRuntime.mark(restoreModelSaga),
    _marked11 =
/*#__PURE__*/
regeneratorRuntime.mark(changeModelSaga),
    _marked12 =
/*#__PURE__*/
regeneratorRuntime.mark(fetchCrudChildrenSaga),
    _marked13 =
/*#__PURE__*/
regeneratorRuntime.mark(closeModalSaga),
    _marked14 =
/*#__PURE__*/
regeneratorRuntime.mark(submitModelsModalFormFailSaga),
    _marked15 =
/*#__PURE__*/
regeneratorRuntime.mark(fetchFileConfigSaga),
    _marked16 =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);
var selectCrudParams = function selectCrudParams(state) {
  return state.crudParams;
};
function notifySaga(action) {
  return regeneratorRuntime.wrap(function notifySaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!action.error) {
            _context.next = 3;
            break;
          }

          _context.next = 3;
          return createNotification('error', action.error.message);

        case 3:
          if (!(action.response.status === SUCCESS_REQ)) {
            _context.next = 6;
            break;
          }

          _context.next = 6;
          return createNotification('success', action.response.message);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function isDateColumn(columns, key) {
  return !!columns.find(function (e) {
    return e.type === 'date' && e.id === key;
  });
}

function getFiltersValues(filters, columns) {
  var res = Object.keys(filters).reduce(function (acc, key) {
    return _objectSpread2({}, acc, _defineProperty({}, key, isDateColumn(columns, key) ? filters[key] instanceof Array || null ? null : moment(filters[key]).unix() : filters[key].constructor !== Array ? filters[key] : null));
  }, {}); // buildUrlSearchForArray(filters[key], key)

  return res;
}

var selectColumns = function selectColumns(modelName) {
  return function (state) {
    return state.crudModels[modelName];
  };
};
function fetchCrudModelsSaga(action) {
  var payload, _ref, order, order_by, page, modelName, passedUrl, crudParams, url, model, columns, filters, start, params, paramsArr, paramsStr;

  return regeneratorRuntime.wrap(function fetchCrudModelsSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          payload = action.payload;
          _ref = payload.params || {}, order = _ref.order, order_by = _ref.order_by, page = _ref.page, modelName = _ref.modelName, passedUrl = _ref.url;
          _context2.next = 4;
          return select(selectCrudParams);

        case 4:
          crudParams = _context2.sent;
          url = passedUrl || crudParams[modelName].crudRead;
          _context2.next = 8;
          return select(selectColumns(modelName));

        case 8:
          model = _context2.sent;
          columns = model && model.data ? model.data.columns : [];
          _context2.next = 12;
          return getFiltersValues(payload.filters || {}, columns);

        case 12:
          filters = _context2.sent;
          start = !Object.keys(getUrlParameters()).length;
          params = payload ? buildUrlSearch(_objectSpread2({}, filters, {
            order: !order ? null : order === 'ascend' ? SORT_ASC : SORT_DESC,
            order_by: order_by,
            page: page
          }), start) : '';
          paramsArr = [params];

          if (payload.filters) {
            Object.keys(payload.filters).forEach(function (key) {
              if (payload.filters[key] && payload.filters[key].constructor === Array) {
                paramsArr.push(buildUrlSearchForArray(payload.filters[key], key));
              }
            });
          }

          paramsStr = paramsArr.reduce(function (acc, e, i) {
            var start = i && !acc && e ? '?' : '';
            var delimiter = acc && e ? '&' : '';
            return acc + start + delimiter + e;
          }, '');
          _context2.next = 20;
          return put(request(_objectSpread2({}, action, {
            method: 'GET',
            auth: true,
            url: "".concat(url).concat(paramsStr)
          })));

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}
function fetchCrudModelsSuccessSaga(action) {
  var response, payload, columns, i, column;
  return regeneratorRuntime.wrap(function fetchCrudModelsSuccessSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          response = action.response, payload = action.payload;

          if (response.data) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return");

        case 3:
          columns = response.data.columns;
          i = 0;

        case 5:
          if (!(i < columns.length)) {
            _context3.next = 13;
            break;
          }

          column = columns[i];

          if (!(column.filter.can && column.filter.query)) {
            _context3.next = 10;
            break;
          }

          _context3.next = 10;
          return put(actions.fetchCrudFilterValues(payload.params.modelName, column.id, column.filter.query));

        case 10:
          i++;
          _context3.next = 5;
          break;

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}
function fetchCrudFilterValuesSaga(action) {
  return regeneratorRuntime.wrap(function fetchCrudFilterValuesSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return put(request(_objectSpread2({}, action, {
            method: 'GET',
            auth: true,
            url: "".concat(action.payload.query)
          })));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}
/*
	 Actions Handling
 */

function filesUpload(modelName, filesStore) {
  var params, uploadFilesSettings, result, modelFiles, i, formData, filesResp, res;
  return regeneratorRuntime.wrap(function filesUpload$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return select(selectCrudParams);

        case 2:
          params = _context5.sent;
          uploadFilesSettings = params[modelName].uploadFilesSettings;
          result = [];

          if (uploadFilesSettings) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", result);

        case 7:
          modelFiles = filesStore && filesStore[modelName] ? filesStore[modelName].fileList : null;

          if (modelFiles) {
            _context5.next = 10;
            break;
          }

          return _context5.abrupt("return", result);

        case 10:
          i = 0;

        case 11:
          if (!(i < modelFiles.length)) {
            _context5.next = 33;
            break;
          }

          if (modelFiles[i].old) {
            _context5.next = 29;
            break;
          }

          formData = new FormData();
          formData.append('file', modelFiles[i]);
          _context5.next = 17;
          return call(fetch, uploadFilesSettings.url, {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + uploadFilesSettings.token
            },
            mode: 'cors',
            body: formData
          });

        case 17:
          filesResp = _context5.sent;
          _context5.next = 20;
          return filesResp.json();

        case 20:
          res = _context5.sent;
          console.log(res);

          if (!(filesResp.status !== 200)) {
            _context5.next = 26;
            break;
          }

          _context5.next = 25;
          return notifySaga({
            error: {
              message: 'Ошибка при загрузке файла'
            },
            response: {}
          });

        case 25:
          console.log(res);

        case 26:
          result.push(res.response);
          _context5.next = 30;
          break;

        case 29:
          result.push(modelFiles[i]);

        case 30:
          i++;
          _context5.next = 11;
          break;

        case 33:
          return _context5.abrupt("return", result);

        case 34:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5);
}

function getHandledFiles(modelName) {
  var filesStore, files;
  return regeneratorRuntime.wrap(function getHandledFiles$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return select(function (state) {
            return state.uploaderFiles;
          });

        case 2:
          filesStore = _context6.sent;
          _context6.next = 5;
          return filesUpload(modelName, filesStore);

        case 5:
          files = _context6.sent;
          return _context6.abrupt("return", files.map(function (f) {
            return _objectSpread2({}, f, {
              id: f.id || f.uid
            });
          }));

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}
function createModelSaga(action) {
  var params, modelName, submitShape, uploadedFiles, form;
  return regeneratorRuntime.wrap(function createModelSaga$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return select(selectCrudParams);

        case 2:
          params = _context7.sent;
          modelName = action.payload.modelName;
          submitShape = params[modelName].submitShape;
          _context7.next = 7;
          return put(_objectSpread2({}, action, {
            type: action.type + START
          }));

        case 7:
          _context7.next = 9;
          return getHandledFiles(modelName);

        case 9:
          uploadedFiles = _context7.sent;
          form = submitShape(action.payload.form, uploadedFiles);
          _context7.next = 13;
          return put(request(_objectSpread2({}, action, {
            method: 'POST',
            auth: true,
            url: "".concat(action.payload.url),
            payload: _objectSpread2({}, form),
            modelName: modelName
          })));

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}
function updateModelsSaga(action) {
  var params, _params, modelName, crudRead, filters, page, order, order_by;

  return regeneratorRuntime.wrap(function updateModelsSaga$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return select(selectCrudParams);

        case 2:
          params = _context8.sent;
          _params = params[action.modelName || action.payload.modelName], modelName = _params.modelName, crudRead = _params.crudRead, filters = _params.filters, page = _params.page, order = _params.order, order_by = _params.order_by;
          _context8.next = 6;
          return put(actions.fetchCrudModels({
            modelName: modelName,
            url: crudRead,
            page: page,
            order_by: order_by,
            order: order
          }, filters));

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
}
function deleteModelSaga(action) {
  return regeneratorRuntime.wrap(function deleteModelSaga$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return put(request(_objectSpread2({}, action, {
            method: action.payload.action.method,
            //'POST',
            auth: true,
            url: "".concat(action.payload.action.url),
            payload: action.payload,
            modelName: action.payload.modelName
          })));

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9);
}
function restoreModelSaga(action) {
  return regeneratorRuntime.wrap(function restoreModelSaga$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return put(request(_objectSpread2({}, action, {
            method: 'POST',
            auth: true,
            url: "".concat(action.payload.url),
            payload: action.payload
          })));

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10);
}
function changeModelSaga(action) {
  var params, uploadedFiles;
  return regeneratorRuntime.wrap(function changeModelSaga$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return select(selectCrudParams);

        case 2:
          params = _context11.sent;
          _context11.next = 5;
          return put(_objectSpread2({}, action, {
            type: action.type + START
          }));

        case 5:
          _context11.next = 7;
          return getHandledFiles(action.payload.modelName);

        case 7:
          uploadedFiles = _context11.sent;
          _context11.next = 10;
          return put(request(_objectSpread2({}, action, {
            method: action.payload.action.method,
            //'POST',
            auth: true,
            url: "".concat(action.payload.action.url),
            payload: params[action.payload.modelName].submitShape(action.payload.form, uploadedFiles),
            modelName: action.payload.modelName
          })));

        case 10:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11);
}
function fetchCrudChildrenSaga(action) {
  return regeneratorRuntime.wrap(function fetchCrudChildrenSaga$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return put(request(_objectSpread2({}, action, {
            method: 'GET',
            auth: true,
            url: "".concat(action.payload.url),
            payload: action.payload
          })));

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked12);
}
function closeModalSaga() {
  return regeneratorRuntime.wrap(function closeModalSaga$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return put(actions.toggleCreateModelModal());

        case 2:
          _context13.next = 4;
          return put(actions.setModelModalForm(null, null));

        case 4:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked13);
}
function submitModelsModalFormFailSaga(action) {
  var errors;
  return regeneratorRuntime.wrap(function submitModelsModalFormFailSaga$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          errors = reduceMessages(action.messages);
          _context14.next = 3;
          return put(stopSubmit('createModel', errors));

        case 3:
          _context14.next = 5;
          return createNotification('error', action.error.message);

        case 5:
        case "end":
          return _context14.stop();
      }
    }
  }, _marked14);
}
function fetchFileConfigSaga(action) {
  return regeneratorRuntime.wrap(function fetchFileConfigSaga$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return put(request(_objectSpread2({}, action, {
            method: 'GET',
            auth: true,
            url: action.payload.url
          })));

        case 2:
        case "end":
          return _context15.stop();
      }
    }
  }, _marked15);
}
function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return all([takeEvery$1(actions.FETCH_CRUD_MODELS, fetchCrudModelsSaga), takeEvery$1(actions.FETCH_CRUD_MODELS + SUCCESS, fetchCrudModelsSuccessSaga), takeEvery$1(actions.FETCH_CRUD_FILTER_VALUES, fetchCrudFilterValuesSaga), takeEvery$1(actions.FETCH_CRUD_CHILDREN, fetchCrudChildrenSaga), takeEvery$1(actions.CREATE_MODEL, createModelSaga), takeEvery$1(actions.CREATE_MODEL + SUCCESS, closeModalSaga), takeEvery$1(actions.CREATE_MODEL + SUCCESS, updateModelsSaga), takeEvery$1(actions.CREATE_MODEL + SUCCESS, notifySaga), takeEvery$1(actions.CREATE_MODEL + ERROR, submitModelsModalFormFailSaga), takeEvery$1(actions.DELETE_MODEL, deleteModelSaga), takeEvery$1(actions.DELETE_MODEL + SUCCESS, updateModelsSaga), takeEvery$1(actions.DELETE_MODEL + SUCCESS, notifySaga), takeEvery$1(actions.DELETE_MODEL + ERROR, notifySaga), takeEvery$1(actions.RESTORE_MODEL, restoreModelSaga), takeEvery$1(actions.RESTORE_MODEL + SUCCESS, updateModelsSaga), takeEvery$1(actions.RESTORE_MODEL + SUCCESS, notifySaga), takeEvery$1(actions.RESTORE_MODEL + ERROR, notifySaga), takeEvery$1(actions.CHANGE_MODEL, changeModelSaga), takeEvery$1(actions.CHANGE_MODEL + SUCCESS, closeModalSaga), takeEvery$1(actions.CHANGE_MODEL + SUCCESS, updateModelsSaga), takeEvery$1(actions.CHANGE_MODEL + SUCCESS, notifySaga), takeEvery$1(actions.CHANGE_MODEL + ERROR, submitModelsModalFormFailSaga), takeEvery$1(actions.FETCH_FILE_CONFIG, fetchFileConfigSaga), fork(requestMiddleware)]);

        case 2:
        case "end":
          return _context16.stop();
      }
    }
  }, _marked16);
}

var _marked$1 =
/*#__PURE__*/
regeneratorRuntime.mark(requestSaga),
    _marked2$1 =
/*#__PURE__*/
regeneratorRuntime.mark(requests);
function getCookie(name) {
  var matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
var getError = function getError(data, response) {
  if (data.status === 0) return {
    message: 'Unknow error: check your authorization. ' + 'No \'Access-Control-Allow-Origin\' header is present on the requested resource.'
  };
  if (data.status === 500) return response;
  if (response.messages) return response.messages[0];
  return '';
};
function requestSaga(action) {
  var payload, method, url, auth, type, token_is_active, SITE, token, body, headers, params, data, response, error;
  return regeneratorRuntime.wrap(function requestSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = action.payload, method = action.method, url = action.url, auth = action.auth, type = action.oldType, token_is_active = action.token_is_active;
          _context.next = 3;
          return select(function (state) {
            return state.X;
          });

        case 3:
          SITE = _context.sent;
          token = getCookie('auth_token');
          _context.prev = 5;
          _context.next = 8;
          return put(_objectSpread2({}, action, {
            type: type + START
          }));

        case 8:
          body = payload ? JSON.stringify(payload) : '';
          headers = new Headers({
            'Content-Type': 'application/json'
          });
          if (auth) headers.set('Authorization', 'Bearer ' + token);
          params = {
            method: method,
            headers: headers,
            mode: 'cors'
          };
          if (body && method !== 'GET') params.body = body;
          _context.next = 15;
          return call(fetch, SITE + url, params);

        case 15:
          data = _context.sent;
          _context.next = 18;
          return data.json();

        case 18:
          response = _context.sent;

          if (!(data.status !== 200)) {
            _context.next = 25;
            break;
          }

          error = getError(data, response);
          _context.next = 23;
          return put(_objectSpread2({}, action, {
            type: type + FAIL,
            error: error
          }));

        case 23:
          _context.next = 27;
          break;

        case 25:
          _context.next = 27;
          return put(_objectSpread2({}, action, {
            type: type + SUCCESS,
            response: {
              data: response.response,
              error: response.status === 100 || response.messages[0].type === 2 ? response.messages[0].message : null,
              status: response.status,
              message: response.status === 0 || response.messages[0].type === 0 ? response.messages[0].message : null
            }
          }));

        case 27:
          _context.next = 32;
          break;

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](5);
          console.log(_context.t0);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$1, null, [[5, 29]]);
}
function requests() {
  return regeneratorRuntime.wrap(function requests$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return all([takeEvery$1('REQUEST', requestSaga)]);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2$1);
}

var reducer = crudReducers;
var saga = rootSaga;
var updateModel = updateModelsSaga;
var requestSaga$1 = requests;
var actions$1 = actions;
var CrudView$2 = CrudView$1;
var CrudFull$1 = crudFull;
var CrudUploader$1 = Uploader$2;

export { reducer, saga, updateModel, requestSaga$1 as requestSaga, actions$1 as actions, CrudView$2 as CrudView, CrudFull$1 as CrudFull, CrudUploader$1 as CrudUploader };
