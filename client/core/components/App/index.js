import React from 'react';
import universal from 'react-universal-component';

import { Steps } from 'modules/steps';
import '../../styles.global.css';

const UniversalComponent = universal(() => import('shared/AsyncComponent'), {
  loading: <div>Loading...</div>,
});

const App = () =>
  <div className="bg-dark-red">
    Hi, everybody!
    <UniversalComponent number={1} />
    <Steps wow="Hi" />
  </div>;

export default App;
