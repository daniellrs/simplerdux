(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Input', './Notification'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Input'), require('./Notification'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Input, global.Notification);
    global.index = mod.exports;
  }
})(this, function (exports, _Input, _Notification) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Notification = exports.Input = undefined;

  var _Input2 = _interopRequireDefault(_Input);

  var _Notification2 = _interopRequireDefault(_Notification);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.Input = _Input2.default;
  exports.Notification = _Notification2.default;
});