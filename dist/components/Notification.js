(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', '../'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('../'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global._);
    global.Notification = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _) {
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

  var Notification = function (_Component) {
    _inherits(Notification, _Component);

    function Notification() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Notification);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Notification.__proto__ || Object.getPrototypeOf(Notification)).call.apply(_ref, [this].concat(args))), _this), _this.id = 0, _this.addToShowingList = function () {
        var _this$props = _this.props,
            getField = _this$props.getField,
            setField = _this$props.setField,
            audio = _this$props.audio;

        var value = getField().value;

        if (value.length > 0) {
          var showing = getField().showing;

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var v = _step.value;

              if (audio) {
                var ad = new Audio(audio);
                ad.play();
              }

              showing.push(_extends({}, v, { id: ++_this.id }));
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

          setField({ value: [], showing: showing });
        }
      }, _this.handleShowingList = function () {
        var _this$props2 = _this.props,
            getField = _this$props2.getField,
            setField = _this$props2.setField;

        var showing = getField().showing;

        if (showing.length > 0) {
          var handledNewOne = false;

          showing = showing.map(function (item) {

            if (!item.showing) {
              setTimeout(function () {
                return _this.timeoutNotification(item);
              }, item.timer || 5000);

              item.showing = true;
              handledNewOne = true;
            }

            return item;
          });

          if (handledNewOne) {
            setField({ showing: showing });
          }
        }
      }, _this.timeoutNotification = function (item) {
        var _this$props3 = _this.props,
            getField = _this$props3.getField,
            setField = _this$props3.setField,
            disappearTimer = _this$props3.disappearTimer;


        var showing = getField().showing.map(function (i) {
          if (i.id === item.id) i.disappearing = true;
          return i;
        });
        setField({ showing: showing });

        setTimeout(function () {
          var showing = getField().showing.filter(function (i) {
            return i.id !== item.id;
          });
          setField({ showing: showing });
        }, disappearTimer + 1000);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Notification, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.setField({ value: [], showing: [] });
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.addToShowingList();
        this.handleShowingList();
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            popUps = _props.popUps,
            getField = _props.getField,
            _props$appearClass = _props.appearClass,
            appearClass = _props$appearClass === undefined ? '' : _props$appearClass,
            _props$disappearClass = _props.disappearClass,
            disappearClass = _props$disappearClass === undefined ? '' : _props$disappearClass;

        var showing = getField().showing || [];

        return _react2.default.createElement(
          'div',
          { className: 'sd-notification' },
          showing.map(function (s) {
            return _react2.default.createElement(
              'div',
              { key: s.id, className: appearClass + ' ' + (s.disappearing ? disappearClass : '') },
              popUps[s.type] && popUps[s.type](s)
            );
          })
        );
      }
    }]);

    return Notification;
  }(_react.Component);

  Notification.propTypes = {
    field: _propTypes2.default.string.isRequired,
    fieldDidUpdate: _propTypes2.default.func,
    destroyOnUnmount: _propTypes2.default.bool,
    appearClass: _propTypes2.default.string,
    disappearClass: _propTypes2.default.string,
    disappearTimer: _propTypes2.default.number,
    popUps: _propTypes2.default.object
  };

  exports.default = (0, _.createField)(Notification);
});