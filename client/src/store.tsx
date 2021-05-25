import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from 'reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const middleware = [thunk];

// redux-persist
const persistConfig = {
    key: "root",
    storage
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
    persistedReducer, 
    composeWithDevTools(applyMiddleware(...middleware)));

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>

