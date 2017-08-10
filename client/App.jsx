import React from 'react';
import universal from 'react-universal-component';
import './App.css';
import AsyncComponent from './AsyncComponent';

const UniversalComponent = universal(() => import('./AsyncComponent'), {
  loading: <div>Loading...</div>,
  onLoad: (module, { isServer }) => {
    if (isServer) return;
    import('./asyncFile.js').then(al => al.default());
  },
});

const App = () =>
  <div>
    Hi, everybody!
    <UniversalComponent number={1} />
    <UniversalComponent number={2} />
  </div>;

export default App;
