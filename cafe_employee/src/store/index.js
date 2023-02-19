import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducers from '../reducer';
import rootSaga from '../sagas';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers(reducers);

const middleware = [sagaMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));
sagaMiddleware.run(rootSaga)

export default store
