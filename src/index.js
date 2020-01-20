import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import currentUserReducer from './reducers/currentUserReducer'
import childReducer from './reducers/childReducer'
import errorsReducer from './reducers/errorsReducer'

import {history} from './actions/history'



const reducers = combineReducers({
  currentUser: currentUserReducer,
  child: childReducer,
  errors: errorsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))


ReactDOM.render(
<Router history={history}>
  <Provider store={store}>
    <App />
  </Provider>
</Router>,
 document.getElementById('root'));

serviceWorker.unregister();
