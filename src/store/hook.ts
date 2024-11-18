// Importing necessary dependencies and types from Redux
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import type { RootState } from './rootReducer'

/* eslint-disable @typescript-eslint/no-explicit-any */

// Defining a custom type for app thunk dispatch, allowing usage of ThunkDispatch with RootState and AnyAction
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

// Custom hook for accessing the app dispatch function with typed thunk dispatch
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

// Typed selector hook for accessing the app state with RootState type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
