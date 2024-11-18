// Importing necessary dependencies and types
import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, AccountingState } from './accountingSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

// Combining reducers
const reducer = combineReducers({
    data: reducers,
})

// Custom typed useSelector hook
export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: AccountingState
        }
    }
> = useSelector

// Exporting necessary elements
export * from './accountingSlice'
export { useAppDispatch } from '@/store'
export default reducer
