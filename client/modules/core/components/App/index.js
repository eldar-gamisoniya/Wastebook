import React from 'react';
import universal from 'react-universal-component';
import './style.css';

const UniversalComponent = universal(
  () => import('components/AsyncComponent'),
  {
    loading: <div>Loading...</div>,
  },
);

const App = () =>
  <div>
    Hi, everybody!
    <UniversalComponent number={1} />
  </div>;

export default App;
