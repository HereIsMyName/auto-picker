import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk'
import reducers from './reducers'
import { loadState, saveState } from './localStorage';
import axios from 'axios'


const token = localStorage.getItem('WEB_TOKEN');

  if (token) {
      axios.defaults.headers.common['Authorization'] = token;
  } 
  else {
      axios.defaults.headers.common['Authorization'] = '';
  }

const store = createStore(
  reducers,
  loadState(),
  applyMiddleware(reduxThunk)
);

store.subscribe(() => {
  saveState(store.getState())
})

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, 
document.getElementById('root'));
registerServiceWorker();
