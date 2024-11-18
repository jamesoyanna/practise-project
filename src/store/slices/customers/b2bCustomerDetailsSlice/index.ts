import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, CustomerListState } from './b2bCustomerDetailsSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: CustomerListState
        }
    }
> = useSelector

export * from './b2bCustomerDetailsSlice'
export { useAppDispatch } from '@/store'
export default reducer
