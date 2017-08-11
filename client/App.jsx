import React from 'react';
import universal from 'react-universal-component';
import './App.css';

const UniversalComponent = universal(() => import('./AsyncComponent'), {
  loading: <div>Loading...</div>,
  onLoad: (module, { isServer }) => {
    import('./asyncFile.js').then(al => al.default());
  },
});
const UniversalComponent2 = universal(() => import('./AsyncComponent2'), {
  loading: <div>Loading...</div>,
  onLoad: (module, { isServer }) => {
    import('./asyncFile.js').then(al => al.default());
  },
});

const App = () =>
  <div>
    Hi, everybody!
    <UniversalComponent number={1} />
    <UniversalComponent2 number={2} />
  </div>;

export default App;
