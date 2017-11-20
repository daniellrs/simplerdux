(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './fieldsRedux', './createField', './fieldsReduxStore', './reducers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./fieldsRedux'), require('./createField'), require('./fieldsReduxStore'), require('./reducers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fieldsRedux, global.createField, global.fieldsReduxStore, global.reducers);
    global.index = mod.exports;
  }
})(this, function (exports, _fieldsRedux, _createField, _fieldsReduxStore, _reducers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fieldsReduxReducer = exports.fieldsReduxStore = exports.createField = exports.getAllFields = exports.clearAllFields = exports.getDefinedPropsField = exports.destroyField = exports.setField = exports.getField = exports.fieldChangeListener = exports.getObjectFieldsKey = exports.initializeField = undefined;

  var _createField2 = _interopRequireDefault(_createField);

  var _fieldsReduxStore2 = _interopRequireDefault(_fieldsReduxStore);

  var _reducers2 = _interopRequireDefault(_reducers);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.initializeField = _fieldsRedux.initializeField;
  exports.getObjectFieldsKey = _fieldsRedux.getObjectFieldsKey;
  exports.fieldChangeListener = _fieldsRedux.fieldChangeListener;
  exports.getField = _fieldsRedux.getField;
  exports.setField = _fieldsRedux.setField;
  exports.destroyField = _fieldsRedux.destroyField;
  exports.getDefinedPropsField = _fieldsRedux.getDefinedPropsField;
  exports.clearAllFields = _fieldsRedux.clearAllFields;
  exports.getAllFields = _fieldsRedux.getAllFields;
  exports.createField = _createField2.default;
  exports.fieldsReduxStore = _fieldsReduxStore2.default;
  exports.fieldsReduxReducer = _reducers2.default;
});