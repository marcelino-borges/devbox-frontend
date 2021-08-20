import { createStore, Store, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { IApplicationState } from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (window &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store: Store<IApplicationState> = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
