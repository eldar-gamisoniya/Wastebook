import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.css';

const AsyncComponent = ({ number }) =>
  <div className={styles.someStyle}>
    Some async component {number}
  </div>;

AsyncComponent.propTypes = {
  number: PropTypes.number.isRequired,
};

export default AsyncComponent;
