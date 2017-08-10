import React from 'react';
import PropTypes from 'prop-types';
import styles from './AsyncComponent.css';

class AsyncComponent extends React.PureComponent {
  static propTypes = {
    number: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      number: props.number,
    };
  }

  async componentDidMount() {
    const { number } = this.props;
    const { add } = await (number === 1
      ? import('./add1.js')
      : import('./add2.js'));
    const interval = setInterval(() => {
      this.setState(({ number }) => ({ number: add(number) }));
    }, 1000);
    this.setState({ interval });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className={styles.someStyle}>
        Some async component {this.state.number}
      </div>
    );
  }
}

export default AsyncComponent;
