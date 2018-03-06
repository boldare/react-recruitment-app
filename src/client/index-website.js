import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './website/containers/App';
import configureStore from './website/store/configureStore';

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
