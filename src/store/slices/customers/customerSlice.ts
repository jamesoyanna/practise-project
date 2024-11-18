import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import {
    apiGetCustomersB2c
   
} from '@/services/customerService'
import type { TableQueries } from '@/@types/common'

type TransactionHistory = {
    id: string
    transactionDetails: string
    amount: string | number
    date: string | Date
    status: string | boolean
}

type WalletHistory = {
    fundId: string
    amount: string | number
    date: string | Date
    status: string | boolean
    time: string
}

type Assets = {
    gasCurrentReading: number
    smartDeviceId: string
    totalGas: number
    cylinderId: string
}

export type CustomerB2c = {
    customerId: string
    customerName: string
    hub: string
    virtualWalletBalance: string
    dateOnboarded: string | Date
    totalGasQuantityPurchased: string
    totalTransactionAmount: string
    phoneNumber: string
    address: string
    debt: string
    assets: Assets[]
    transactionHistory: TransactionHistory[]
    walletHistory: WalletHistory[]
}

type CustomersB2c = CustomerB2c[]

type GetCustomersB2cResponse = {
    data: CustomersB2c
    total: number
}

export type CustomerListState = {
    loading: boolean
    customerB2cList: CustomersB2c
    tableData: TableQueries
}


export const SLICE_NAME = 'customerB2cList'

export const getCustomersB2c = createAsyncThunk(
    'customerB2cList/customers/b2c',
    async (data: TableQueries) => {
        const response = await apiGetCustomersB2c<
            GetCustomersB2cResponse,
            TableQueries
        >(data)
        return response.data
    }
)



const initialState: CustomerListState = {
    loading: false,
    customerB2cList: [],
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

const customerListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setCustomerList: (state, action) => {
            state.customerB2cList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomersB2c.fulfilled, (state, action) => {
                state.customerB2cList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getCustomersB2c.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setCustomerList,
    setTableData,
} = customerListSlice.actions

export default customerListSlice.reducer
