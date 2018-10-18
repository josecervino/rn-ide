import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import App from "./App";
import rootReducer from './js/reducers/rootReducer';

const store = createStore(rootReducer, compose( window.devToolsExtension ? window.devToolsExtension() : f => f))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
