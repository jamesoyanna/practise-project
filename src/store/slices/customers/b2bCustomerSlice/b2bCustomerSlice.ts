import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import {
    apiGetCustomersB2b,
    apiGetUnpaidCustomers
} from '@/services/b2bCustomerService'
import type { TableQueries } from '@/@types/common'

type TransactionHistory = {
    invoiceID: string
    transactionDetails: string
    amount: string | number
    date: string | Date
    status: string | boolean
}

type Assets = {
    gasCurrentReading: number
    smartDeviceId: string
    totalGas: number
}

type WalletHistory = {
    fundId: string
    amount: string
    fundMethod: string
    date: string
    status: string
}

type CustomerB2b = {
    customerId: string
    businessName: string
    gasCurrentReading: number // This seems to be part of assets, I'm assuming here
    totalGas: number // This seems to be part of assets, I'm assuming here
    virtualWalletBalance: string
    dateOnboarded: string | Date
    totalGasQuantityPurchased: string
    totalTransactionAmount: string
    phoneNumber: string
    address: string
    debt: string
    transactionHistory: TransactionHistory[]
    assets: Assets[]
    walletHistory: WalletHistory[]
    hub: string
}

type CustomersB2b = CustomerB2b[]

type GetCustomersB2bResponse = {
    data: CustomersB2b
    total: number
}

export type CustomerListState = {
    loading: boolean
    customerB2bList: CustomersB2b
    tableData: TableQueries
}


export const SLICE_NAME = 'customerB2bList'

export const getCustomersB2b = createAsyncThunk(
    'customerB2cList/customers/b2b',
    async (data: TableQueries) => {
        const response = await apiGetCustomersB2b<
            GetCustomersB2bResponse,
            TableQueries
        >(data)
        return response.data
    }
)
export const getUnpaidCustomers = createAsyncThunk(
    'customerB2bList/customers/b2b/unpaid',
    async (data: TableQueries) => {
        const response = await apiGetUnpaidCustomers<
            GetCustomersB2bResponse,
            TableQueries
        >(data)
        return response.data
    }
)

const initialState: CustomerListState = {
    loading: false,
    customerB2bList: [],
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
            state.customerB2bList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setUnpaidCustomers: (state, action) => {
            state.customerB2bList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomersB2b.fulfilled, (state, action) => {
                state.customerB2bList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getCustomersB2b.pending, (state) => {
                state.loading = true
            })
            .addCase(getUnpaidCustomers.fulfilled, (state, action) => {
                state.customerB2bList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getUnpaidCustomers.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setCustomerList,
    setTableData,
    setUnpaidCustomers,
} = customerListSlice.actions

export default customerListSlice.reducer

