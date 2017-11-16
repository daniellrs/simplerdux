(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './utils/reduxFields', './utils/createReduxField', './utils/reduxFieldsStore'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./utils/reduxFields'), require('./utils/createReduxField'), require('./utils/reduxFieldsStore'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reduxFields, global.createReduxField, global.reduxFieldsStore);
    global.index = mod.exports;
  }
})(this, function (exports, _reduxFields, _createReduxField, _reduxFieldsStore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.reduxFieldsStore = exports.createReduxField = exports.getAllFields = exports.clearAllFields = exports.getDefinedPropsField = exports.destroyField = exports.setField = exports.getField = exports.fieldChangeListener = exports.getObjectFieldsKey = exports.initializeField = undefined;

  var _createReduxField2 = _interopRequireDefault(_createReduxField);

  var _reduxFieldsStore2 = _interopRequireDefault(_reduxFieldsStore);

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
});