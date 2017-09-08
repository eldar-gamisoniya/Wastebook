import React from 'react';
import PropTypes from 'prop-types';

const Step = ({ children }) =>
  <div>
    {children}
  </div>;

Step.propTypes = {
  children: PropTypes.node,
};

Step.defaultProps = {
  children: '',
};

export default Step;
