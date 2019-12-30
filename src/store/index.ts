import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { save, load } from 'redux-localstorage-simple';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware
    = applyMiddleware(
        save(),
        sagaMiddleware,
        thunk
    )(createStore)


export const store = createStoreWithMiddleware(rootReducer, load());

sagaMiddleware.run(rootSaga);
