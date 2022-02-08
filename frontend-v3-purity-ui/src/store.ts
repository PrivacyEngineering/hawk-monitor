import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { app } from './reducers';


export const configureStore = () => {
  const middlewares = [thunk];

  let composeEnhancers;
  if (process.env.NODE_ENV === 'development') {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  } else {
    composeEnhancers = compose;
  }

  return createStore(
    app,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};
