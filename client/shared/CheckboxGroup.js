import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class CheckboxGroup extends Component {
  field = ({ input, meta, options }) => {
    const { name, onChange, onBlur, onFocus } = input;
    const { touched, error } = meta;
    const inputValue = input.value;

    const checkboxes = options.map(({ label, value }, index) => {
      const handleChange = event => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(value);
        } else {
          arr.splice(arr.indexOf(value), 1);
        }
        onBlur(arr);
        return onChange(arr);
      };
      const checked = inputValue.includes(value);
      const id = `checkbox-${name}-${index}`;
      return (
        <label key={id} htmlFor={id}>
          <input
            type="checkbox"
            id={id}
            name={`${name}[${index}]`}
            value={value}
            checked={checked}
            onChange={handleChange}
            onFocus={onFocus}
          />
          <span>
            {label}
          </span>
        </label>
      );
    });

    return (
      <div>
        <div>
          {checkboxes}
        </div>
        {touched &&
          error &&
          <p className="error">
            {error}
          </p>}
      </div>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}
