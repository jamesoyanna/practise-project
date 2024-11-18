import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, CylindersState } from './inStockSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: CylindersState
        }
    }
> = useSelector

export * from './inStockSlice'
export { useAppDispatch } from '@/store'
export default reducer
