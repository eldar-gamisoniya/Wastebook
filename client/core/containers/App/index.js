import React from 'react';

import { Challenge, Hello } from 'modules/challenge';
import '../../styles.global.css';

const App = () =>
  <div className=" mw5 mw7-ns tc bg-light-gray pa3 ph5-ns">
    <Challenge />
    <Hello />
  </div>;

export default App;
