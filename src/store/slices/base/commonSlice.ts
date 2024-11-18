// Importing necessary dependencies and constants
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

// Defining the shape of the common state
export type CommonState = {
    currentRouteKey: string
}

// Initial state for the common slice
export const initialState: CommonState = {
    currentRouteKey: '',
}

// Creating the common slice
export const commonSlice = createSlice({
    name: `${SLICE_BASE_NAME}/common`,
    initialState,
    reducers: {
        // Reducer for setting the current route key
        setCurrentRouteKey: (state, action: PayloadAction<string>) => {
            state.currentRouteKey = action.payload
        },
    },
})

// Exporting action
export const { setCurrentRouteKey } = commonSlice.actions

// Exporting reducer
export default commonSlice.reducer
