(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var setFields = exports.setFields = function setFields(fields) {
    return { type: 'setFields', fields: fields };
  };

  var clearAllFields = exports.clearAllFields = function clearAllFields() {
    return { type: 'clearAllFields' };
  };
});