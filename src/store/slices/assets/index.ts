import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, AssetsListState } from './assetsSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: AssetsListState
        }
    }
> = useSelector

export * from './assetsSlice'
export { useAppDispatch } from '@/store'
export default reducer
