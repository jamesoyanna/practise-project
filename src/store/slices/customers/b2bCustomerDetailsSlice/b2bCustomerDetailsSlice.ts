import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCustomerB2bDetails,
    apiPutCustomerTier,
} from '@/services/b2bCustomerService'

export const SLICE_NAME = 'b2bCustomerDetails'

export type TransactionHistory = {
    invoiceId: string
    transactionDetails: string
    totalAmount: string | number
    date: string | Date
    status: string | boolean
    totalGasQuantityDelivered: number
    totalGasRemnant: number
    gasQuantityBillable: number
    sellingPrice: number
    gasFee: number
    deliveryFee: number
    regulatorUnits: number
    regulatorPrice: number
    hoseUnits: number
    hosePrice: number
}

export type Assets = {
    gasCurrentReading: number
    smartDeviceId: string
    totalGas: number
}

type WalletHistory = {
    fundId: string
    amount: string | number
    date: string | Date
    status: string | boolean
    time: string
}

export type Customer = {
    total: any
    customerId: string
    businessName: string
    virtualWalletBalance: string
    dateOnboarded: string | Date | any
    totalGasQuantityPurchased: string
    totalTransactionAmount: string
    phoneNumber: string
    address: string
    debt: string
    hub: string
    customerTier: string
    invoicePeriod: number
    transactionHistory: TransactionHistory[]
    walletHistory: WalletHistory[]
    assets: Assets[]
    currentSellingPrice: number
}

type GetCustomerB2bDetailsResponse = {
    data: Customer
}

export type CustomerListState = {
    loading: boolean
    setCustomerB2bDetails: Customer
}

export const getCustomersB2bDetails = createAsyncThunk(
    `${SLICE_NAME}/getCustomersB2bDetails`,
    async (customerId: string, thunkAPI) => {
        try {
            const response =
                await apiGetCustomerB2bDetails<GetCustomerB2bDetailsResponse>(
                    customerId
                )
            console.log('response from slice :', response)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const putCustomerData = createAsyncThunk(
    `${SLICE_NAME}/putSettingsData`,
    async (
        {
            customerId,
            updatedCustomerData,
        }: { customerId: string; updatedCustomerData: Customer },
        { rejectWithValue }
    ) => {
        try {
            console.log(
                'Attempting to update settings with data:',
                updatedCustomerData
            )
            const response = await apiPutCustomerTier<Customer>(
                customerId,
                updatedCustomerData
            )
            console.log('Response from apiPutSettings:', response)
            return response.data
        } catch (error) {
            console.error('Error updating settings:', error)
            return rejectWithValue('Failed to update settings')
        }
    }
)

const initialState: CustomerListState = {
    loading: false,
    setCustomerB2bDetails: {} as Customer,
}

const customerListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setB2bCustomerDetails: (state, action) => {
            state.setCustomerB2bDetails = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomersB2bDetails.fulfilled, (state, action) => {
                state.loading = false
                state.setCustomerB2bDetails = action.payload.data
            })
            .addCase(getCustomersB2bDetails.pending, (state) => {
                state.loading = true
            })
            .addCase(putCustomerData.fulfilled, (state, action) => {
                state.loading = false
                console.log('Fulfilled action payload:', action.payload)
                state.setCustomerB2bDetails = action.payload
            })
            .addCase(putCustomerData.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setB2bCustomerDetails } = customerListSlice.actions

export default customerListSlice.reducer
