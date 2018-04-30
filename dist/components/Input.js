(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-maskedinput', '../'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-maskedinput'), require('../'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactMaskedinput, global._);
    global.Input = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactMaskedinput, _) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _reactMaskedinput2 = _interopRequireDefault(_reactMaskedinput);

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

  var Input = function (_Component) {
    _inherits(Input, _Component);

    function Input() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Input);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.confs = '', _this.onChange = function (event) {
        var _this$props = _this.props,
            onChange = _this$props.onChange,
            setField = _this$props.setField;


        var value = _this.handleValue(event.target);
        value = _this.handleWithTypeValues(value);

        if (onChange) {
          onChange(value);
        }

        setField({ value: value });
      }, _this.handleValue = function (target) {
        var confs = _this.stateOptions();
        return confs.alias === 'check' ? target.checked : target.value;
      }, _this.handleWithTypeValues = function (value) {
        var _this$props2 = _this.props,
            field = _this$props2.field,
            type = _this$props2.type,
            optionValue = _this$props2.optionValue,
            getField = _this$props2.getField;


        if (type === 'checkbox') {
          var fieldValue = getField(field).value || [];
          var index = fieldValue.indexOf(optionValue);

          if (index < 0) {
            fieldValue.push(optionValue);
          } else {
            fieldValue.splice(index, 1);
          }

          value = fieldValue;
        }

        if (type === 'radio') {
          value = optionValue;
        }

        return value;
      }, _this.events = function () {
        var _this$props3 = _this.props,
            onFocus = _this$props3.onFocus,
            onBlur = _this$props3.onBlur,
            onKeyDown = _this$props3.onKeyDown,
            onKeyPress = _this$props3.onKeyPress,
            onKeyUp = _this$props3.onKeyUp,
            onMouseEnter = _this$props3.onMouseEnter,
            onMouseOver = _this$props3.onMouseOver,
            onMouseMove = _this$props3.onMouseMove,
            onMouseDown = _this$props3.onMouseDown,
            onMouseUp = _this$props3.onMouseUp,
            onClick = _this$props3.onClick,
            onDoubleClick = _this$props3.onDoubleClick,
            onMouseLeave = _this$props3.onMouseLeave,
            onMouseOut = _this$props3.onMouseOut;

        var onChange = _this.onChange;
        return { onChange: onChange, onFocus: onFocus, onBlur: onBlur, onKeyDown: onKeyDown, onKeyPress: onKeyPress, onKeyUp: onKeyUp, onMouseEnter: onMouseEnter, onMouseOver: onMouseOver, onMouseMove: onMouseMove, onMouseDown: onMouseDown, onMouseUp: onMouseUp, onClick: onClick, onDoubleClick: onDoubleClick, onMouseLeave: onMouseLeave, onMouseOut: onMouseOut };
      }, _this.checkInputProps = function () {
        var _this$props4 = _this.props,
            field = _this$props4.field,
            id = _this$props4.id,
            _this$props4$type = _this$props4.type,
            type = _this$props4$type === undefined ? 'text' : _this$props4$type,
            _this$props4$name = _this$props4.name,
            name = _this$props4$name === undefined ? '' : _this$props4$name,
            _this$props4$classNam = _this$props4.className,
            className = _this$props4$classNam === undefined ? '' : _this$props4$classNam,
            placeholder = _this$props4.placeholder,
            min = _this$props4.min,
            max = _this$props4.max,
            step = _this$props4.step,
            maxLength = _this$props4.maxLength,
            minLength = _this$props4.minLength,
            autoFocus = _this$props4.autoFocus,
            disabled = _this$props4.disabled,
            readOnly = _this$props4.readOnly,
            required = _this$props4.required,
            _this$props4$style = _this$props4.style,
            style = _this$props4$style === undefined ? {} : _this$props4$style,
            optionValue = _this$props4.optionValue,
            getField = _this$props4.getField;


        var confs = _this.stateOptions();

        var value = getField(field).value;

        var inputProps = {};

        switch (confs.alias) {
          case 'button':
            break;
          case 'check':
            // value = type === 'radio' ? value.toString() : value;
            inputProps['checked'] = value ? value.indexOf(optionValue) < 0 ? false : true : false;
            break;
          case 'color':
            inputProps['value'] = value;
            break;
          case 'hidden':
            inputProps['value'] = value;
            break;
          default:
            inputProps['min'] = min;
            inputProps['max'] = max;
            inputProps['step'] = step;
            inputProps['maxLength'] = maxLength;
            inputProps['minLength'] = minLength;
            inputProps['value'] = value || '';
            inputProps['placeholder'] = placeholder;
        }

        inputProps['readOnly'] = readOnly;
        inputProps['required'] = required;
        inputProps['disabled'] = disabled;
        inputProps['autoFocus'] = autoFocus;
        inputProps['id'] = id;
        inputProps['type'] = type;
        inputProps['name'] = name;
        inputProps['className'] = className;
        inputProps['style'] = style;

        inputProps = _extends({}, inputProps, _this.events());

        return inputProps;
      }, _this.stateOptions = function () {
        var _this2 = _this,
            confs = _this2.confs;
        var type = _this.props.type;


        if (confs) {
          return confs;
        }

        var confsAux = {};

        switch (type) {
          case 'time':
            confsAux['alias'] = 'text';
            break;
          case 'date':
            confsAux['alias'] = 'text';
            break;
          case 'datetime-local':
            confsAux['alias'] = 'text';
            break;
          case 'email':
            confsAux['alias'] = 'text';
            break;
          case 'url':
            confsAux['alias'] = 'text';
            break;
          case 'month':
            confsAux['alias'] = 'text';
            break;
          case 'week':
            confsAux['alias'] = 'text';
            break;
          case 'number':
            confsAux['alias'] = 'text';
            break;
          case 'password':
            confsAux['alias'] = 'text';
            break;
          case 'search':
            confsAux['alias'] = 'text';
            break;
          case 'button':
            confsAux['alias'] = 'button';
            break;
          case 'submit':
            confsAux['alias'] = 'button';
            break;
          case 'file':
            confsAux['alias'] = 'button';
            break;
          case 'checkbox':
            confsAux['alias'] = 'check';
            break;
          case 'radio':
            confsAux['alias'] = 'check';
            break;
          case 'color':
            confsAux['alias'] = 'color';
            break;
          case 'hidden':
            confsAux['alias'] = 'hidden';
            break;
          case 'range':
            confsAux['alias'] = 'range';
            break;
          default:
            confsAux['alias'] = 'text';
        }

        _this.confs = confsAux;

        return confsAux;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Input, [{
      key: 'render',
      value: function render() {
        var mask = this.props.mask;


        var inputProps = this.checkInputProps();

        return !mask ? _react2.default.createElement('input', inputProps) : _react2.default.createElement(_reactMaskedinput2.default, _extends({ mask: mask }, inputProps));
      }
    }]);

    return Input;
  }(_react.Component);

  Input.propTypes = {
    field: _propTypes2.default.string.isRequired,
    ajax: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    action: _propTypes2.default.string,
    dados: _propTypes2.default.object,
    receiveUpdates: _propTypes2.default.array,
    sendUpdates: _propTypes2.default.array,
    onFieldSuccess: _propTypes2.default.func,
    onActionSuccess: _propTypes2.default.func,
    onAllUpdated: _propTypes2.default.func,
    fieldListener: _propTypes2.default.func,
    destroyOnUnmount: _propTypes2.default.bool,
    mask: _propTypes2.default.string,
    type: _propTypes2.default.oneOf(['time', 'date', 'datetime-local', 'email', 'url', 'month', 'week', 'number', 'password', 'search', 'button', 'submit', 'file', 'checkbox', 'radio', 'color', 'hidden', 'range', 'text']),
    placeholder: _propTypes2.default.string,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    id: _propTypes2.default.string,
    name: _propTypes2.default.string,
    min: _propTypes2.default.string,
    max: _propTypes2.default.string,
    step: _propTypes2.default.string,
    maxLength: _propTypes2.default.string,
    minLength: _propTypes2.default.string,
    autoFocus: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    readOnly: _propTypes2.default.bool,
    required: _propTypes2.default.bool,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onKeyDown: _propTypes2.default.func,
    onKeyPress: _propTypes2.default.func,
    onKeyUp: _propTypes2.default.func,
    onMouseEnter: _propTypes2.default.func,
    onMouseOver: _propTypes2.default.func,
    onMouseMove: _propTypes2.default.func,
    onMouseDown: _propTypes2.default.func,
    onMouseUp: _propTypes2.default.func,
    onClick: _propTypes2.default.func,
    onDoubleClick: _propTypes2.default.func,
    onMouseLeave: _propTypes2.default.func,
    onMouseOut: _propTypes2.default.func
  };

  exports.default = (0, _.createField)(Input);
});