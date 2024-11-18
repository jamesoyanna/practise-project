import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetOrderDetails } from '@/services/OrderService'

export const SLICE_NAME = 'orderDetails'

export type orderdetails = {
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
    status2: string
    auxiliary: string
    deliveryOfficer: string
    deliveryDate: string
    approvedDate: string;
    hubName: string;
    hubId: string
    hubAddress: string
    hubManager: string
}

type orderDetailsData = orderdetails

type GetOrderDetailsResponse = {
    data: orderDetailsData
    total: number
}

export type OrderDetailsListState = {
    loading: boolean
    orderDetailsList: orderdetails
}


// Async thunk for fetching order details
export const getOrderDetails = createAsyncThunk(
    'orderDetails/orderCode',
    async (orderCode: string) => {
        const response = await apiGetOrderDetails<GetOrderDetailsResponse>(
            orderCode
        )
        return response.data
    }
)

const initialState: OrderDetailsListState = {
    loading: false,
    orderDetailsList: {
        id:'',
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
        status2: '',
        smartDeviceId:'',
        cylinderSize: '',
        auxiliary: '',
        deliveryOfficer: '',
        deliveryDate: '',
        approvedDate: '',
        hubName: '',
        hubId: '',
        hubAddress: '',
        hubManager: '',
    }
}

const orderDetailsListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setOrderDetails: (state, action) => {
            state.orderDetailsList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getOrderDetails.fulfilled,
                (state, action) => {
                    console.log('state :', state, action)

                    state.orderDetailsList = action.payload.data
                    state.loading = false
                }
            )
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setOrderDetails } = orderDetailsListSlice.actions

export default orderDetailsListSlice.reducer
