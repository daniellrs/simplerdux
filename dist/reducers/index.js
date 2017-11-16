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

  var reducers = function reducers() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { fields: {} };
    var action = arguments[1];


    switch (action.type) {
      case 'setFields':
        return _extends({}, state, {
          fields: _extends({}, action.fields)
        });
      case 'clearAllFields':
        return _extends({}, state, {
          fields: {}
        });
      default:
        return state;
    }
  };

  exports.default = reducers;
});