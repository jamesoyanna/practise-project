// Importing necessary dependencies from Redux
import { combineReducers, CombinedState, AnyAction, Reducer } from 'redux'

// Importing slices from the slices directory
import auth, { AuthState } from './slices/auth'
import base, { BaseState } from './slices/base' 
import theme, { ThemeState } from './slices/theme/themeSlice'

// Importing the Redux Toolkit Query service
import RtkQueryService from '@/services/RtkQueryService'

// Defining the root state type, combining all individual state types
export type RootState = CombinedState<{
    auth: CombinedState<AuthState>
    base: CombinedState<BaseState>
    theme: ThemeState
    /* eslint-disable @typescript-eslint/no-explicit-any */
    [RtkQueryService.reducerPath]: any
}>

// Defining a type for async reducers
export interface AsyncReducers {
    [key: string]: Reducer<any, AnyAction>
}

// Defining static reducers
const staticReducers = {
    auth,
    base,
    theme,
    [RtkQueryService.reducerPath]: RtkQueryService.reducer,
}

// Defining the root reducer function
const rootReducer =
    (asyncReducers?: AsyncReducers) =>
    (state: RootState, action: AnyAction) => {
        // Combining static and async reducers
        const combinedReducer = combineReducers({
            ...staticReducers,
            ...asyncReducers,
        })
        // Returning the result of combined reducers
        return combinedReducer(state, action)
    }

// Exporting the root reducer function
export default rootReducer
