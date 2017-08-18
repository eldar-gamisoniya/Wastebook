import React from 'react';
import styles from './AsyncComponent.css';

const AsyncComponent = ({ number }) =>
  <div className={styles.someStyle}>
    Some async component {number}
  </div>;
export default AsyncComponent;
