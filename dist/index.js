'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var redux = require('redux');
var reactRedux = require('react-redux');

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
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

var inherits = function (subClass, superClass) {
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
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Simplerdux = function Simplerdux() {
  classCallCheck(this, Simplerdux);
};

Simplerdux.localStoragePersistenceName = 'simplerdux-persistence';
Simplerdux.store = undefined;
Simplerdux.actions = {
  setState: function setState(state) {
    return { type: 'setState', state: state };
  },
  clearState: function clearState() {
    return { type: 'clearState' };
  }
};

Simplerdux.reducer = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { simplerdux: {} };
  var action = arguments[1];

  switch (action.type) {
    case 'setState':
      return _extends({}, state, {
        simplerdux: _extends({}, state.simplerdux, action.state)
      });
    case 'clearState':
      return _extends({}, state, {
        simplerdux: {}
      });
    default:
      return state;
  }
};

Simplerdux.setStore = function (providedStore) {
  Simplerdux.store = providedStore;
  Simplerdux.restorePersistedState();
};

Simplerdux.getStore = function () {
  return Simplerdux.store;
};

Simplerdux.restorePersistedState = function () {
  if (!Simplerdux.store) {
    console.error('You have to set simplerdux store before call restorePersistedState()');
    return;
  }

  var persistence = JSON.parse(localStorage.getItem(Simplerdux.localStoragePersistenceName) || '{}');
  Simplerdux.store.dispatch(Simplerdux.actions.setState(persistence));
};

Simplerdux.cleanPersistedState = function () {
  localStorage.removeItem(Simplerdux.localStoragePersistenceName);
};

Simplerdux.getState = function () {
  if (!Simplerdux.store) {
    console.error('You have to set simplerdux store before call getState()');
    return;
  }

  return Simplerdux.store.getState()['simplerdux'];
};

Simplerdux.setState = function (obj, persist) {
  if (!Simplerdux.store) {
    console.error('You have to set simplerdux store before call setState()');
    return;
  }

  if (persist) {
    var persistence = JSON.parse(localStorage.getItem(Simplerdux.localStoragePersistenceName) || '{}');
    localStorage.setItem(Simplerdux.localStoragePersistenceName, JSON.stringify(_extends({}, persistence, obj)));
  }

  Simplerdux.store.dispatch(Simplerdux.actions.setState(obj));
};

Simplerdux.clearState = function () {
  if (!Simplerdux.store) {
    console.error('You have to set simplerdux store before call clearState()');
    return;
  }

  Simplerdux.store.dispatch(Simplerdux.actions.clearState());
};

Simplerdux.bind = function (Component) {
  var SimplerduxComponent = function (_React$Component) {
    inherits(SimplerduxComponent, _React$Component);

    function SimplerduxComponent() {
      classCallCheck(this, SimplerduxComponent);
      return possibleConstructorReturn(this, (SimplerduxComponent.__proto__ || Object.getPrototypeOf(SimplerduxComponent)).apply(this, arguments));
    }

    createClass(SimplerduxComponent, [{
      key: 'render',
      value: function render() {
        return React.createElement(Component, this.props);
      }
    }]);
    return SimplerduxComponent;
  }(React.Component);

  var mapStateToProps = function mapStateToProps(state) {
    return { simplerdux: state['simplerdux'] };
  };

  return reactRedux.connect(mapStateToProps)(SimplerduxComponent);
};

Simplerdux.Provider = function (_ref) {
  var app = _ref.app;


  var store = redux.createStore(Simplerdux.reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  Simplerdux.setStore(store);

  var AppComponent = Simplerdux.bind(app);

  return React.createElement(
    reactRedux.Provider,
    { store: store },
    React.createElement(AppComponent, null)
  );
};

module.exports = Simplerdux;
//# sourceMappingURL=index.js.map
