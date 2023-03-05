import React from 'react';
import ReactDOM from 'react-dom/client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app/app';
import toolkitSlice from './toolkitSlice';

const rootReducer = combineReducers({
  toolkit: toolkitSlice
})

const store = configureStore({
  reducer: rootReducer
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
