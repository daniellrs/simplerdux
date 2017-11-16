(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../actions', 'reduxFieldsStore'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../actions'), require('reduxFieldsStore'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.actions, global.reduxFieldsStore);
    global.reduxFields = mod.exports;
  }
})(this, function (exports, _actions, _reduxFieldsStore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getAllFields = exports.clearAllFields = exports.getDefinedPropsField = exports.destroyField = exports.setField = exports.getField = exports.fieldChangeListener = exports.getObjectFieldsKey = exports.initializeField = undefined;

  var reduxFields = _interopRequireWildcard(_actions);

  var _reduxFieldsStore2 = _interopRequireDefault(_reduxFieldsStore);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var initializeField = exports.initializeField = function initializeField(field, defaultValue) {

    var fieldObject = getField(field);

    if (!fieldObject.initialized) {

      defaultValue = typeof defaultValue !== 'undefined' ? defaultValue : '';

      var fieldValue = {
        initialized: true,
        value: fieldObject.value ? fieldObject.value : defaultValue,
        defaultValue: defaultValue,
        type: 'field'
      };

      setField(field, fieldValue);
    }
  };

  var getObjectFieldsKey = exports.getObjectFieldsKey = function getObjectFieldsKey(field, key) {

    var fieldObject = getField(field);

    var obj = {};

    objectFieldsKeyFinder(obj, fieldObject, key);

    return obj;
  };

  var objectFieldsKeyFinder = function objectFieldsKeyFinder(obj, fieldObject, key) {
    Object.keys(fieldObject).map(function (k) {
      if (fieldObject[k].type === 'field') {
        obj[k] = fieldObject[k][key];
      }
      if (_typeof(fieldObject[k]) === 'object') {
        objectFieldsKeyFinder(obj, fieldObject[k], key);
      }
      return undefined;
    });
  };

  var fieldChangeListener = exports.fieldChangeListener = function fieldChangeListener(field, fieldListener, prevProps) {

    if (fieldListener) {

      var fieldObject = getField(field);
      var prevFieldAux = getDefinedPropsField(field, prevProps);

      var changed = false;

      Object.keys(fieldObject).map(function (key) {
        if (fieldObject[key] !== prevFieldAux[key] && _typeof(fieldObject[key]) !== 'object') {
          changed = true;
        }
        return undefined;
      });

      if (changed) {
        fieldListener(fieldObject);
      }
    }
  };

  var getField = exports.getField = function getField(field) {
    return reduxField(field);
  };

  var setField = exports.setField = function setField(field, key, value) {
    return reduxField(field, key, value);
  };

  var destroyField = exports.destroyField = function destroyField(field) {
    return reduxField(field, undefined, undefined, 'remove');
  };

  var getDefinedPropsField = exports.getDefinedPropsField = function getDefinedPropsField(field, props) {
    return reduxField(field, undefined, undefined, props);
  };

  var clearAllFields = exports.clearAllFields = function clearAllFields() {
    _reduxFieldsStore2.default.getStore().dispatch(reduxFields.clearAllFields());
  };

  var getAllFields = exports.getAllFields = function getAllFields() {
    var fields = _reduxFieldsStore2.default.getStore().getState().fields;
    return fields;
  };

  var reduxField = function reduxField(field, key, value, propAux) {

    var fields = (typeof propAux === 'undefined' ? 'undefined' : _typeof(propAux)) === 'object' ? propAux : _reduxFieldsStore2.default.getStore().getState().fields;
    fields = JSON.parse(JSON.stringify(fields));

    var path = field.split(".");
    var temp = {};
    var fieldObject = void 0;

    path.map(function (part, index) {

      if (index === path.length - 1) {

        if (path.length === 1) {
          if (!fields[part]) {
            fields[part] = {};
          }
          temp = fields;
        }

        if (key && typeof value !== 'undefined') {
          temp[part] = _extends({}, temp[part], _defineProperty({}, key, value));
        } else if (key) {
          temp[part] = _extends({}, temp[part], key);
        } else if (typeof propAux === 'string' && propAux === 'remove') {
          delete temp[part];
        }

        fieldObject = temp[part] ? temp[part] : {};
      } else if (index > 0) {
        if (!temp[part]) {
          temp[part] = {};
        }
        temp = temp[part];
      } else {
        if (!fields[part]) {
          fields[part] = {};
        }
        temp = fields[part];
      }

      return undefined;
    });

    if (key || typeof propAux === 'string' && propAux === 'remove') {
      _reduxFieldsStore2.default.getStore().dispatch(reduxFields.setFields(fields));
    }

    return fieldObject;
  };
});