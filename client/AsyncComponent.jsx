import React from 'react';
import PropTypes from 'prop-types';
import styles from './AsyncComponent.css';

const AsyncComponent = () => (
  <div className={styles.someStyle}>Some async component</div>
);

AsyncComponent.propTypes = {
  optArray: PropTypes.string.isRequired,
};

export default AsyncComponent;
