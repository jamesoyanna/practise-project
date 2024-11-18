// Importing necessary dependencies and constants
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

// Defining the shape of the session state
export interface SessionState {
    signedIn: boolean
    token: string | null
}

// Initial state for the session slice
const initialState: SessionState = {
    signedIn: false,
    token: null,
}

// Creating the session slice
const sessionSlice = createSlice({
    name: `${SLICE_BASE_NAME}/session`,
    initialState,
    reducers: {
        // Reducer for successful sign in
        signInSuccess(state, action: PayloadAction<string>) {
            state.signedIn = true
            state.token = action.payload
        },
        // Reducer for successful sign out
        signOutSuccess(state) {
            state.signedIn = false
            state.token = null
        },
    },
})

// Exporting actions and reducer
export const { signInSuccess, signOutSuccess } = sessionSlice.actions
export default sessionSlice.reducer
