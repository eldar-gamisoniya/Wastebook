import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asyncComponent: null,
    };
  }

  async componentDidMount() {
    import('./AsyncComponent').then(this.handleComponentLoad);
  }

  handleComponentLoad = (module) => {
    this.setState(() => ({
      asyncComponent: module.default,
    }));
  }

  render() {
    const AsyncComponent = this.state.asyncComponent;

    return (
      <div>
        Hi, everybody
        { AsyncComponent ? <AsyncComponent /> : (<div>Loading...</div>) }
      </div>
    );
  }
}

export default App;
