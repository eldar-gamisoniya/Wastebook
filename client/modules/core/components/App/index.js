import React from 'react';
import universal from 'react-universal-component';
import './style.css';
import AsyncComponent from 'shared/AsyncComponent';

// const UniversalComponent = universal(() => import('shared/AsyncComponent'), {
//   loading: <div>Loading...</div>,
// });

const App = () =>
  <div>
    Hi, everybody!
    <AsyncComponent number={2} />
    {/* <UniversalComponent number={1} /> */}
  </div>;

export default App;
