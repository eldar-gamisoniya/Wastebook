import React from 'react';
import universal from 'react-universal-component';
import './App.css';

const UniversalComponent = universal(() => import('./AsyncComponent'), {
  loading: <div>Loading...</div>,
});

const App = () =>
  <div>
    Hi, everybody!
    <UniversalComponent number={1} />
  </div>;

export default App;
