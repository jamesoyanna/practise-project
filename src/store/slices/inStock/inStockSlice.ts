import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetInStockData } from '@/services/inStockService'
import type { TableQueries } from '@/@types/common'

interface Cylinder {
    CylinderID: string
    CylinderSize: string
    Details: string
    Date: string
    Status: string
}

export interface CylindersState {
    loading: boolean
    cylinders: Cylinder[]
    filledCylinderIds: string[]
    unfilledCylinderIds: string[]
    smartDeviceIds: string[]
    tableData: TableQueries
}

type GetinStockResponse = {
    data: Cylinder[]
    total: number
}

const initialState: CylindersState = {
    loading: false,
    cylinders: [],
    filledCylinderIds: [],
    unfilledCylinderIds: [],
    smartDeviceIds: [],
    tableData: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: {
            order: '',
            key: '',
        },
    },
}

export const SLICE_NAME = 'inStockList'

export const getInstockData = createAsyncThunk(
    'inStockList/instock',
    async (data: TableQueries) => {
        const response = await apiGetInStockData<
            GetinStockResponse,
            TableQueries
        >(data)
        console.log("data :", response);

        return response.data
    }
)

const cylindersSlice = createSlice({
    name: 'cylinders',
    initialState,
    reducers: {
        setCylinders(state, action: PayloadAction<Cylinder[]>) {
            state.cylinders = action.payload
        },
        setFilledCylinderIds(state, action: PayloadAction<string[]>) {
            state.filledCylinderIds = action.payload
        },
        setUnfilledCylinderIds(state, action: PayloadAction<string[]>) {
            state.unfilledCylinderIds = action.payload
        },
        setSmartDeviceIds(state, action: PayloadAction<string[]>) {
            state.smartDeviceIds = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getInstockData.fulfilled, (state, action) => {
                state.cylinders = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getInstockData.pending, (state) => {
                state.loading = true
            })
            .addCase(setCylinders, (state, action) => {
                state.cylinders = action.payload
            })
            .addCase(setFilledCylinderIds, (state, action) => {
                state.filledCylinderIds = action.payload
            })
            .addCase(setUnfilledCylinderIds, (state, action) => {
                state.unfilledCylinderIds = action.payload
            })
            .addCase(setSmartDeviceIds, (state, action) => {
                state.smartDeviceIds = action.payload
            })
            .addCase(setTableData, (state, action) => {
                state.tableData = action.payload
            })
    },

})

export const {
    setCylinders,
    setTableData,
    setFilledCylinderIds,
    setUnfilledCylinderIds,
    setSmartDeviceIds,
} = cylindersSlice.actions

export default cylindersSlice.reducer

