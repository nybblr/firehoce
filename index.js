import { Component, createElement as h } from 'react';

let resolve = (val, ...args) =>
  typeof val === 'function' ? val(...args) : val;

export default (state, setterName, rebase, opts, initial) => BaseComponent =>
  class Firehoce extends Component {
    constructor(...args) {
      super(...args);
      this.state = { [state]: initial };
    }

    init() {
      let { ref, ...config } = resolve(opts, this.props);
      this.ref = rebase.syncState(ref, {
        context: this,
        state,
        ...config
      });
      // Baaaaaad
      this.setter = val => {
        let {[state]: curr} = this.state;
        this.setState({ [state]: resolve(val, curr) })
      }
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
      let opts = {
        [setterName]: setter,
        ...state, ...props
      };
      return h(BaseComponent, opts);
    }
  }
