import renderer from 'react-test-renderer';
import React from 'react';
import { shallow } from 'enzyme';
import { StepComponent } from './Step5';

test('Should match snapshot', () => {
  const component = renderer.create(<StepComponent />);
  expect(component.toJSON()).toMatchSnapshot();
});

test('Should contain submit button', () => {
  const wrapper = shallow(<StepComponent />);
  expect(wrapper.find('[type="submit"]')).toHaveLength(1);
});
