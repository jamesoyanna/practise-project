import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { apiGetInStockStats } from '@/services/inStockService'

export const SLICE_NAME = 'inStockCardList'

export type CylinderStatistics = {
    filled: string[]
    unfilled: string[]
    functional: string[]
    unfunctional: string[]
}

export type InstockCardData = {
    [key: string]: CylinderStatistics
}

export type InstockCard = {
    label: string
    value: { twelve: number; twentyFive: number; fifty: number; SmartDevice: number }
    id: number
    filled: any
    key: string
    unfilled: number
    valueIdUnfilled: never[]
    valueIdFilled: never[]
    valueTotalUnfilled: {
       twelve: { filled: number; unfilled: number }
        twentyFive: { filled: number; unfilled: number }
        fifty: { filled: number; unfilled: number }
        SmartDevice: { filled: number; unfilled: number }
    }
    valueTotalFilled: {
       twelve: number
        twentyFive: number
        fifty: number
        SmartDevice: string
    }
    stats: InstockCardData
}

export type InstockCardState = {
    loading: boolean
    instockDataList: InstockCard[]
}
export type GetInstockResponse = {
    data: InstockCard[]
}

export const getInstockStats = createAsyncThunk(
    `${SLICE_NAME}/instock/stats`,
    async () => {
        console.log('stats1010 :')
        const response = await apiGetInStockStats()
        return response // The response should contain the required data structure
    }
)

const initialState: InstockCardState = {
    loading: false,
    instockDataList: [],
}

const instockCardListSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        setInstockDetails: (state, action) => {
            state.instockDataList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getInstockStats.fulfilled,
                (state, action: PayloadAction<GetInstockResponse> | any) => {
                    state.instockDataList = action.payload.data
                    state.loading = false
                }
            )
            .addCase(getInstockStats.rejected, (state) => {
                state.loading = false
            })
    },
})

export const { setInstockDetails } = instockCardListSlice.actions

export default instockCardListSlice.reducer
