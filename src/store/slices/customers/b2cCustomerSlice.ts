import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import {
    apiGetCustomersB2c
   
} from '@/services/customerService'
import type { TableQueries } from '@/@types/common'

export type CustomerB2c = {
    firstname: string
    lastname: string
    priority_asset: {
    bot_tag_id: string
    bot_device_id:string
    content_weight: number
    cylinder_tag_id: string
    refill_priority: number
    cylinder_capacity: number
    content_percentage_level: string
}
}

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

type CustomersB2c = CustomerB2c[]

type GetCustomersB2cResponse = {
    data: CustomersB2c
    // total: number
}

export type CustomerListState = {
    loading: boolean
    customerB2cList: CustomersB2c
}


export const SLICE_NAME = 'customerB2cList'

export const getCustomersB2c = createAsyncThunk(
    'customerB2cList/customers/b2c',
    async () => {
        const response = await apiGetCustomersB2c<
            GetCustomersB2cResponse
        >()
        return response.data
    }
)



const initialState: CustomerListState = {
    loading: false,
    customerB2cList: []
}

const customerListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setCustomerList: (state, action) => {
            state.customerB2cList = action.payload
            console.log('state :', state, action)
        },
        // setTableData: (state, action) => {
        //     state.tableData = action.payload
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomersB2c.fulfilled, (state, action) => {
                state.customerB2cList = action.payload.data
                console.log('state :', state, action)
                // state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getCustomersB2c.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setCustomerList,
    // setTableData,
} = customerListSlice.actions

export default customerListSlice.reducer
