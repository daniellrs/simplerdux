(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './actions', './fieldsReduxStore'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./actions'), require('./fieldsReduxStore'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.actions, global.fieldsReduxStore);
    global.fieldsRedux = mod.exports;
  }
})(this, function (exports, _actions, _fieldsReduxStore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getAllFields = exports.clearAllFields = exports.getDefinedPropsField = exports.destroyField = exports.setField = exports.getField = exports.fieldChangeListener = exports.getObjectFieldsKey = exports.initializeField = undefined;

  var fieldsRedux = _interopRequireWildcard(_actions);

  var _fieldsReduxStore2 = _interopRequireDefault(_fieldsReduxStore);

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

  var fieldChangeListener = exports.fieldChangeListener = function fieldChangeListener(field, fieldDidUpdate, prevProps) {

    if (fieldDidUpdate) {

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
        fieldDidUpdate(fieldObject, prevFieldAux);
      }
    }
  };

  var getField = exports.getField = function getField(field) {
    return reduxField(field);
  };

  var setField = exports.setField = function setField(field, value) {
    return reduxField(field, value);
  };

  var destroyField = exports.destroyField = function destroyField(field) {
    return reduxField(field, undefined, 'remove');
  };

  var getDefinedPropsField = exports.getDefinedPropsField = function getDefinedPropsField(field, props) {
    return reduxField(field, undefined, props);
  };

  var clearAllFields = exports.clearAllFields = function clearAllFields() {
    _fieldsReduxStore2.default.getStore().dispatch(fieldsRedux.clearAllFields());
  };

  var getAllFields = exports.getAllFields = function getAllFields() {
    var fields = getStoreState().fields;
    return fields;
  };

  var reduxField = function reduxField(field, value, propAux) {

    var fields = (typeof propAux === 'undefined' ? 'undefined' : _typeof(propAux)) === 'object' ? propAux : getStoreState().fields;
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

        if (value) {
          temp[part] = _extends({}, temp[part], value);
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

    if (value || typeof propAux === 'string' && propAux === 'remove') {
      _fieldsReduxStore2.default.getStore().dispatch(fieldsRedux.setFields(fields));
    }

    return fieldObject;
  };

  var getStoreState = function getStoreState() {
    return _fieldsReduxStore2.default.getStore().getState()['fieldsReduxReducer'] ? _fieldsReduxStore2.default.getStore().getState()['fieldsReduxReducer'] : _fieldsReduxStore2.default.getStore().getState();
  };
});