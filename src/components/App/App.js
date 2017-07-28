import React from 'react';

// Components
import Main from '../Main/Main';
import TopBar from '../TopBar/TopBar';

import './App.scss';

const App = () => (
  <div className='app full-dim'>
    <TopBar />
    <Main />
  </div>
);

export default App;
