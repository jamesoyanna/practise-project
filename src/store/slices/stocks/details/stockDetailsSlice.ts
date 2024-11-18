import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetStockDetails } from '@/services/stockService'

export const SLICE_NAME = 'stockDetails'

export type stockdetails = {
    id: string
    customer: string
    address: string
    phoneNumber: string
    scheduledStockDetailsDate: string
    customerType: string
    localGovernment: string
    customerRequest: string
    smartDeviceId: string
    cylinderType: string
    cylinderSize: string
    cylinderId: string
    manufacturerName: string
    smartDeviceSize: string
    smartDeviceType: string
    tareWeight: string
    owner: string
    email: string
    state: string
    status: string
    auxiliary: string
    deliveryOfficer: string
    deliveryDate: string
    approvedDate: string;
}

type stockDetailsData = stockdetails

type GetStockDetailsResponse = {
    data: stockDetailsData
    total: number
}

export type StockDetailsListState = {
    loading: boolean
    stockDetailsList: stockdetails
}


// Async thunk for fetching Stock details
export const getStockDetails = createAsyncThunk(
    'stockDetails/cylinderId',
    async (cylinderId: string) => {
        const response = await apiGetStockDetails<GetStockDetailsResponse>(
            cylinderId
        )
        console.log("Stock Details from Stock:", response.data)
        return response.data
    }
)

const initialState: StockDetailsListState = {
    loading: false,
    stockDetailsList: {
        id:'',
        customer: '',
        address: '',
        phoneNumber: '',
        scheduledStockDetailsDate: '',
        customerType: '',
        localGovernment: '',
        customerRequest: '',
        tareWeight: '',
        manufacturerName: '',
        email: '',
        owner: '',
        state: '',
        status: '',
        smartDeviceId:'',
        smartDeviceSize: '',
        smartDeviceType: '',
        cylinderId: '',
        cylinderSize: '',
        cylinderType: '',
        auxiliary: '',
        deliveryOfficer: '',
        deliveryDate: '',
        approvedDate: '',
    }
}

const stockDetailsListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setStockDetails: (state, action) => {
            state.stockDetailsList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getStockDetails.fulfilled,
                (state, action) => {
                    console.log('state :', action)

                    state.stockDetailsList = action.payload.data
                    state.loading = false
                }
            )
            .addCase(getStockDetails.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setStockDetails } = stockDetailsListSlice.actions

export default stockDetailsListSlice.reducer
