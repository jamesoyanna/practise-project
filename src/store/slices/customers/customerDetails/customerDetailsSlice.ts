import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCustomerB2cDetails } from '@/services/customerService'
export const SLICE_NAME = 'b2cCustomerDetails'


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

export type AddAsset = {
    onboardingDate: string | Date
    state: string
    localGovernment: string
}
type walletHistory={
    fundId:string
    amount: string | number
    date: string | Date
    status: string | boolean
    time: string

}

type assets = {
    gasCurrentReading: number,
    smartDeviceId: string,
    totalGas: number
}

export type Customer = {
    total: any
    customerId: string
    customerName: string
    // gasCurrentReading: number
    // totalGas: number
    asset: assets[]
    virtualWalletBalance: string
    dateOnboarded: string | Date
    totalGasQuantityPurchased: string
    totalTransactionAmount: string
    phoneNumber: string
    address: string
    debt: string
    hub: string
    transactionHistory: TransactionHistory[]
    walletHistory: walletHistory[]
}
type customer = Customer

type GetCustomerB2cDetailsResponse = {
    data: customer[]
}

type GetCustomerB2cDetailsRequest = { customerId: string }


export type CustomerListState = {
    loading: boolean
    setCustomerDetails: customer[]
}

export const getCustomersB2cDetails = createAsyncThunk(
    'b2cCustomerDetails/getCustomersB2cDetails',
    async (customerId: string, thunkAPI) => {
        try {
            console.log('try')

            const response =
                await apiGetCustomerB2cDetails<GetCustomerB2cDetailsResponse>(
                    customerId
                )
            console.log('reponse :', await response)

            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState: CustomerListState = {
    loading: false,
    setCustomerDetails: [],
}

const customerListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setCustomerDetails: (state, action) => {
            state.setCustomerDetails = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomersB2cDetails.fulfilled, (state, action) => {
                console.log('state :', state, action)

                state.setCustomerDetails = action.payload.data
                state.loading = false
            })
            .addCase(getCustomersB2cDetails.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setCustomerDetails,
} = customerListSlice.actions

export default customerListSlice.reducer
