import React from 'react';
import universal from 'react-universal-component';
import './App.css';

const UniversalComponent = universal(() => import('./AsyncComponent'), {
  loading: <div>Loading...</div>,
  minDelay: 5000,
});

const App = () => (
  <div>
    Hi, everybody!
    <UniversalComponent />
  </div>
);

export default App;
