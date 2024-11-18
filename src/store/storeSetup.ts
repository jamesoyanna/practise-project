// Importing necessary dependencies from Redux Toolkit and redux-persist
import {
    configureStore,
    Action,
    Reducer,
    AnyAction,
    Store,
} from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Importing constants and other dependencies
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import rootReducer, { RootState, AsyncReducers } from './rootReducer'
import RtkQueryService from '@/services/RtkQueryService'

/* eslint-disable @typescript-eslint/no-explicit-any */

// Defining middleware for Redux store
const middlewares: any[] = [RtkQueryService.middleware]

// Configuration for redux-persist
const persistConfig = {
    key: PERSIST_STORE_NAME,
    keyPrefix: '',
    storage,
    whitelist: ['auth'], // Whitelisting 'auth' reducer for persistence
}

// Custom type definition for Redux store
interface CustomStore extends Store<RootState, AnyAction> {
    asyncReducers?: AsyncReducers
}

// Configuring the Redux store
const store: CustomStore = configureStore({
    reducer: persistReducer(persistConfig, rootReducer() as Reducer), // Applying redux-persist to the root reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ], // Ignoring certain actions for serializable check
            },
        }).concat(middlewares), // Adding custom middleware
    devTools: process.env.NODE_ENV === 'development', // Enabling Redux DevTools in development mode
})

store.asyncReducers = {}

// Creating the Redux persistor
export const persistor = persistStore(store)

// Function to inject async reducers dynamically
export function injectReducer<S>(key: string, reducer: Reducer<S, Action>) {
    if (store.asyncReducers) {
        if (store.asyncReducers[key]) {
            return false
        }
        store.asyncReducers[key] = reducer
        store.replaceReducer(
            persistReducer(
                persistConfig,
                rootReducer(store.asyncReducers) as Reducer
            )
        )
    }
    persistor.persist()
    return store
}

// Type definition for the Redux store dispatch
export type AppDispatch = typeof store.dispatch

export default store
