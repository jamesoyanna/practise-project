import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetRejectedOrderDetails } from '@/services/OrderService'

export const SLICE_NAME = 'rejectedOrderDetails'

export type rejectedorderdetails = {
    id: string
    customer: string
    address: string
    phoneNumber: string
    scheduledOrderDetailsDate: string
    customerType: string
    localGovernment: string
    customerRequest: string
    smartDeviceId: string
    cylinderSize: string
    email: string
    state: string
    orderCode: string
    status: string
    auxiliary: string
    deliveryOfficer: string
    deliveryDate: string
    //-----------------------------
    hubName: string
    hubId: string
    hubAddress: string
    hubManager: string
}

type rejectOrderDetailsData = rejectedorderdetails

type GetRejectedOrderDetailsResponse = {
    data: rejectOrderDetailsData
    total: number
}

export type RejectedOrderDetailsListState = {
    loading: boolean
    rejectedOrderDetails: rejectedorderdetails
}

// Async thunk for fetching rejected order details
export const getRejectedOrderDetails = createAsyncThunk(
    'rejectedOrderDetails/orderCode',
    async (orderCode: string) => {
        const response =
            await apiGetRejectedOrderDetails<GetRejectedOrderDetailsResponse>(
                orderCode
            )
        return response.data
    }
)

const initialState: RejectedOrderDetailsListState = {
    loading: false,
    rejectedOrderDetails: {
        id: '',
        customer: '',
        address: '',
        phoneNumber: '',
        scheduledOrderDetailsDate: '',
        customerType: '',
        localGovernment: '',
        customerRequest: '',
        email: '',
        state: '',
        orderCode: '',
        status: '',
        smartDeviceId: '',
        cylinderSize: '',
        auxiliary: '',
        deliveryOfficer: '',
        deliveryDate: '',
        hubName: '',
        hubId: '',
        hubAddress: '',
        hubManager: '',
    },
}

const rejectedOrderDetailsSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setRejectedOrderDetails: (state, action) => {
            state.rejectedOrderDetails = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRejectedOrderDetails.fulfilled, (state, action) => {
                state.rejectedOrderDetails = action.payload.data
                state.loading = false
            })
            .addCase(getRejectedOrderDetails.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setRejectedOrderDetails } = rejectedOrderDetailsSlice.actions

export default rejectedOrderDetailsSlice.reducer
