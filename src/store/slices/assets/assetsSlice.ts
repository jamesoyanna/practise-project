import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import {
    apiGetAssets,
} from '@/services/assetsService'
import type { TableQueries } from '@/@types/common'

type transactionHistory= {
    id: string
        transactionDetails: string
        amount: string | number
        date: string | Date
        status: string | boolean

}
type walletHistory={
    fundId:string
    amount: string | number
    date: string | Date
    status: string | boolean
    time: string

}

export type Assets = {
    customerId: string
    customerName: string
    gasCurrentReading: number
    totalGas: number
    hub: string
    virtualWalletBalance: string
    dateOnboarded: string | Date
    totalGasQuantityPurchased: string
    totalTransactionAmount: string
    phoneNumber: string
    address: string
    debt: string
    transactionHistory: transactionHistory[]
    walletHistory:walletHistory[]
}

type assets = Assets[]

type GetAssetsResponse = {
    data: assets[]
    total: number
}

export type AssetsListState = {
    loading: boolean
    assetsList: assets[]
    tableData: TableQueries
}

export const SLICE_NAME = 'assetsList'

export const getAssets = createAsyncThunk(
    'assetsList/account-officer/assets',
    async (data: TableQueries) => {
        const response = await apiGetAssets<
            GetAssetsResponse,
            TableQueries
        >(data)
        return response.data
    }
)



const initialState: AssetsListState = {
    loading: false,
    assetsList: [],
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

const assetsListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setAssetsList: (state, action) => {
            state.assetsList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAssets.fulfilled, (state, action) => {
               
                state.assetsList = action.payload.data
                console.log("State", state,)
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getAssets.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setAssetsList,
    setTableData,
} = assetsListSlice.actions

export default assetsListSlice.reducer
