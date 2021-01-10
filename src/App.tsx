import React from 'react';
import { News } from './news-page/News'
import './App.css';

import { Provider } from 'react-redux';
import store from './news-page/redux/store';


function App() {
  return (
    <>
      <Provider store={store}>
        <News />
      </Provider>
    </>
  );
}

export default App;
