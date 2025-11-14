import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/slice';
import storage from 'redux-persist/lib/storage';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';

const persistConfig = {
    key: 'favoriteProducts',
    storage,
    whitelist: ['favoriteProducts'],
};

const persistedUserReducer = persistReducer(persistConfig, productReducer);

export const store = configureStore({
    reducer: {
        products: persistedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);
