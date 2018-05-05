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
  exports.getAllFields = exports.clearAllFields = exports.getDefinedPropsField = exports.destroyField = exports.setField = exports.getField = exports.fieldChangeListener = exports.setObjectFieldsValue = exports.getObjectFieldsKey = exports.initializeField = undefined;

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

  var initializeField = exports.initializeField = function initializeField(field) {

    var fieldObject = getField(field);

    if (!fieldObject.initialized) {

      var fieldValue = {
        initialized: true,
        value: fieldObject.value,
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

  var setObjectFieldsValue = exports.setObjectFieldsValue = function setObjectFieldsValue(field, obj) {
    for (var _len = arguments.length, recursive = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      recursive[_key - 2] = arguments[_key];
    }

    Object.keys(obj).map(function (k) {
      if (recursive.length === 0 || !recursive[0] || _typeof(obj[k]) !== 'object' || Array.isArray(obj[k])) {
        setField(field + '.' + k, obj[k]);
      } else {
        recursive.shift();
        setObjectFieldsValue.apply(undefined, [field + '.' + k, obj[k]].concat(recursive));
      }
    });
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

  var getField = exports.getField = function getField(field, props) {

    if (!field) {
      console.error('A field name must be declared to get the field object');
      return {};
    }

    var fieldObject = {};
    var path = field.split('.');

    try {
      fieldObject = props || getAllFields();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var part = _step.value;

          fieldObject = fieldObject[part];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } catch (e) {}

    return fieldObject || {};
  };

  var setField = exports.setField = function setField(field, value) {

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || Array.isArray(value)) {
      value = { value: value };
    }

    return reduxField(field, value);
  };

  var destroyField = exports.destroyField = function destroyField(field) {
    return reduxField(field, undefined, true);
  };

  var getDefinedPropsField = exports.getDefinedPropsField = function getDefinedPropsField(field, props) {
    return getField(field, props);
  };

  var clearAllFields = exports.clearAllFields = function clearAllFields() {
    _fieldsReduxStore2.default.getStore().dispatch(fieldsRedux.clearAllFields());
  };

  var getAllFields = exports.getAllFields = function getAllFields() {
    return getStoreState().fields;
  };

  var idkeychanger = 0;

  var reduxField = function reduxField(field, value, remove) {

    if (!field) {
      console.error('A field name must be declared');
      return;
    }

    var fields = {};
    var allFields = getAllFields();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = Object.keys(allFields)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;

        fields[key] = _extends({}, allFields[key]);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var path = field.split('.');
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
        } else if (remove) {
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

    if (value || remove) {
      _fieldsReduxStore2.default.getStore().dispatch(fieldsRedux.setFields(fields));
    }

    return fieldObject;
  };

  var getStoreState = function getStoreState() {
    return _fieldsReduxStore2.default.getStore().getState()['fieldsReduxReducer'] ? _fieldsReduxStore2.default.getStore().getState()['fieldsReduxReducer'] : _fieldsReduxStore2.default.getStore().getState();
  };
});