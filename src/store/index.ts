import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { save, load } from 'redux-localstorage-simple';

import rootReducer from './rootReducer';

const createStoreWithMiddleware
    = applyMiddleware(
        save(), // Saving done here
        thunk
    )(createStore)

export const store = createStoreWithMiddleware(rootReducer, load());