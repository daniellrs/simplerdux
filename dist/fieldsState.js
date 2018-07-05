(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-redux', './fieldsRedux'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-redux'), require('./fieldsRedux'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactRedux, global.fieldsRedux);
    global.fieldsState = mod.exports;
  }
})(this, function (exports, _react, _reactRedux, _fieldsRedux) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var fieldsState = function fieldsState(WrappedComponent) {
    var HOCComponent = function (_Component) {
      _inherits(HOCComponent, _Component);

      function HOCComponent() {
        _classCallCheck(this, HOCComponent);

        return _possibleConstructorReturn(this, (HOCComponent.__proto__ || Object.getPrototypeOf(HOCComponent)).apply(this, arguments));
      }

      _createClass(HOCComponent, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({
            getField: _fieldsRedux.getField,
            setField: _fieldsRedux.setField,
            destroyField: _fieldsRedux.destroyField,
            getDefinedPropsField: _fieldsRedux.getDefinedPropsField,
            getObjectFieldsKey: _fieldsRedux.getObjectFieldsKey,
            setObjectFieldsValue: _fieldsRedux.setObjectFieldsValue
          }, this.props));
        }
      }]);

      return HOCComponent;
    }(_react.Component);

    var mapStateToProps = function mapStateToProps(state) {
      var fields = state['fieldsReduxReducer'] ? state['fieldsReduxReducer'].fields : state.fields;

      return { fields: fields };
    };

    return (0, _reactRedux.connect)(mapStateToProps)(HOCComponent);
  };

  exports.default = fieldsState;
});