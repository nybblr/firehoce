(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.firehoce = global.firehoce || {}),global.react));
}(this, (function (exports,react) { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

let resolve = (val, ...args) => typeof val === 'function' ? val(...args) : val;

var index = ((state, setterName, rebase, opts, initial) => BaseComponent => class Firehoce extends react.Component {
  constructor(...args) {
    super(...args);
    this.state = { [state]: initial };
  }

  init() {
    let _resolve = resolve(opts, this.props),
        { ref } = _resolve,
        config = _objectWithoutProperties(_resolve, ['ref']);
    this.ref = rebase.syncState(ref, _extends({
      context: this,
      state
    }, config));
    // Baaaaaad
    this.setter = val => {
      let { [state]: curr } = this.state;
      this.setState({ [state]: resolve(val, curr) });
    };
    // Good, but doesn't work in Re-base <3!
    // this.setter = val => {
    //   this.setState(({ [state]: curr }) =>
    //     ({ [state]: resolve(val, curr) }))
    // }
  }

  deinit() {
    rebase.removeBinding(this.ref);
    this.ref = null;
    this.setter = null;
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.deinit();
  }

  componentWillReceiveProps() {
    this.deinit();
    this.init();
  }

  render() {
    let { props, state, setter } = this;
    let opts = _extends({
      [setterName]: setter
    }, state, props);
    return react.createElement(BaseComponent, opts);
  }
});

exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
