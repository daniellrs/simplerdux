(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-redux', './fieldsRedux'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-redux'), require('./fieldsRedux'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRedux, global.fieldsRedux);
    global.createField = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRedux, _fieldsRedux) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

  var createField = function createField(WrappedComponent) {
    var HOCComponent = function (_Component) {
      _inherits(HOCComponent, _Component);

      function HOCComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, HOCComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HOCComponent.__proto__ || Object.getPrototypeOf(HOCComponent)).call.apply(_ref, [this].concat(args))), _this), _this.getField = function (field) {
          return field ? (0, _fieldsRedux.getField)(field) : (0, _fieldsRedux.getField)(_this.props.field);
        }, _this.setField = function (p1, p2) {
          var value = (typeof p1 === 'undefined' ? 'undefined' : _typeof(p1)) === 'object';
          (0, _fieldsRedux.setField)(value ? _this.props.field : p1, value ? p1 : p2);
        }, _this.destroyField = function (field) {
          (0, _fieldsRedux.destroyField)(field ? field : _this.props.field);
        }, _this.getDefinedPropsField = function (p1, p2) {
          return (0, _fieldsRedux.getDefinedPropsField)(p2 ? p1 : _this.props.field, p2 ? p2 : p1);
        }, _this.getObjectFieldsKey = function (p1, p2) {
          return (0, _fieldsRedux.getObjectFieldsKey)(p2 ? p1 : _this.props.field, p2 ? p2 : p1);
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(HOCComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _props = this.props,
              field = _props.field,
              defaultValue = _props.defaultValue;

          (0, _fieldsRedux.initializeField)(field, defaultValue);
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
          var _props2 = this.props,
              field = _props2.field,
              fieldDidUpdate = _props2.fieldDidUpdate;

          (0, _fieldsRedux.fieldChangeListener)(field, fieldDidUpdate, prevProps.fields);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var _props3 = this.props,
              field = _props3.field,
              _props3$destroyOnUnmo = _props3.destroyOnUnmount,
              destroyOnUnmount = _props3$destroyOnUnmo === undefined ? true : _props3$destroyOnUnmo;


          if (destroyOnUnmount) {
            (0, _fieldsRedux.destroyField)(field);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({
            getField: this.getField,
            setField: this.setField,
            destroyField: this.destroyField,
            getDefinedPropsField: this.getDefinedPropsField,
            getObjectFieldsKey: this.getObjectFieldsKey
          }, this.props));
        }
      }]);

      return HOCComponent;
    }(_react.Component);

    HOCComponent.propTypes = {
      field: _propTypes2.default.string.isRequired,
      defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.array]),
      fieldDidUpdate: _propTypes2.default.func,
      destroyOnUnmount: _propTypes2.default.bool
    };

    var mapStateToProps = function mapStateToProps(state) {
      var fields = state['fieldsReduxReducer'] ? state['fieldsReduxReducer'].fields : state.fields;

      return { fields: fields };
    };

    return (0, _reactRedux.connect)(mapStateToProps)(HOCComponent);
  };

  exports.default = createField;
});