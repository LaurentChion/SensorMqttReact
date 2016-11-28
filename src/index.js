import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';

import { createStore } from 'redux'
import sensors from './reducers'

const store = createStore(sensors)

const render = () => {
  ReactDOM.render(
    <App
       update={() => store.dispatch({ type: 'UPDATE' })}
    />,
    document.getElementById('root')
  );
};
render();
store.subscribe(render);
