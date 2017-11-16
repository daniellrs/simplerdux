(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './reduxFields', './createReduxField', './reduxFieldsStore', './reducers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./reduxFields'), require('./createReduxField'), require('./reduxFieldsStore'), require('./reducers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reduxFields, global.createReduxField, global.reduxFieldsStore, global.reducers);
    global.index = mod.exports;
  }
})(this, function (exports, _reduxFields, _createReduxField, _reduxFieldsStore, _reducers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fieldsReduxReducer = exports.reduxFieldsStore = exports.createReduxField = exports.getAllFields = exports.clearAllFields = exports.getDefinedPropsField = exports.destroyField = exports.setField = exports.getField = exports.fieldChangeListener = exports.getObjectFieldsKey = exports.initializeField = undefined;

  var _createReduxField2 = _interopRequireDefault(_createReduxField);

  var _reduxFieldsStore2 = _interopRequireDefault(_reduxFieldsStore);

  var _reducers2 = _interopRequireDefault(_reducers);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.initializeField = _reduxFields.initializeField;
  exports.getObjectFieldsKey = _reduxFields.getObjectFieldsKey;
  exports.fieldChangeListener = _reduxFields.fieldChangeListener;
  exports.getField = _reduxFields.getField;
  exports.setField = _reduxFields.setField;
  exports.destroyField = _reduxFields.destroyField;
  exports.getDefinedPropsField = _reduxFields.getDefinedPropsField;
  exports.clearAllFields = _reduxFields.clearAllFields;
  exports.getAllFields = _reduxFields.getAllFields;
  exports.createReduxField = _createReduxField2.default;
  exports.reduxFieldsStore = _reduxFieldsStore2.default;
  exports.fieldsReduxReducer = _reducers2.default;
});