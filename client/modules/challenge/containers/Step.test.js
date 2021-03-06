import renderer from 'react-test-renderer';
import React from 'react';
import { shallow } from 'enzyme';
import Step from './Step';

test('Should match snapshot', () => {
  const component = renderer.create(<Step />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Should render childrens', () => {
  const wrapper = shallow(
    <Step>
      <span>test</span>
      <span>test</span>
    </Step>,
  );
  expect(wrapper.find('div').children()).toHaveLength(2);
});
