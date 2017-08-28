import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { injectReducer } from 'utilities/asyncInjectors';
import configureStore from 'utilities/configureStore';
import withStep from './withStep';
import stepReducer from '../reducer';
import { nextStep } from '../actions';
import { MODULE_KEY } from '../constants';

describe('withStep HOC test', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
    injectReducer(store, MODULE_KEY, stepReducer);
  });

  it('Should render div', () => {
    const div = () => <div>Test</div>;
    const Component = withStep('test', 0)(div);
    const wrapped = mount(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    expect(wrapped.contains(div())).toBe(true);
  });

  it('Should render nothing', () => {
    const div = () => <div>Test</div>;
    const Component = withStep('test', 1)(div);
    const wrapped = mount(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    expect(wrapped.html()).toBe(null);
  });

  it('Should render div if nextStep action is dispatched', () => {
    const div = () => <div>Test</div>;
    const Component = withStep('test', 1)(div);
    store.dispatch(nextStep('test'));
    const wrapped = mount(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    expect(wrapped.contains(div())).toBe(true);
  });

  it('Should render div if the step is passed', () => {
    const div = () => <div>Test</div>;
    const Component = withStep('test', 0, { showIfPassed: true })(div);
    store.dispatch(nextStep('test'));
    const wrapped = mount(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    expect(wrapped.contains(div())).toBe(true);
  });
});
