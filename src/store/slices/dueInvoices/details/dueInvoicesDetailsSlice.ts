import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetDueInvoiceDetails } from '@/services/dueInvoicesService'

type InvoiceDataType = {
    id: '1'
    invoiceId: string
    customerName: string
    customerPhoneNo: string
    totalGasQuantityDelivered: number
    totalGasRemnant: number
    gasQuantityBillable: number
    sellingPrice: number
    gasFee: number
    deliveryFee: number
    totalAmount: number
    transactionDetails: string
    regulatorPrice: number
    regulatorUnits:number
    hoseUnits: number
    hosePrice: number
    date: string
    status: any
}

type InvoiceData = InvoiceDataType

type GetDueInvoiceResponse = {
    data: InvoiceDataType
}

export type DueInvoicesDetailsListState = {
    loading: boolean
    dueInvoicesList: InvoiceData
}

export const SLICE_NAME = 'dueInvoicesDetailsList'

export const getDueInvoicesDetails = createAsyncThunk(
    `${SLICE_NAME}/getInvoiceDetails`,
    async (invoiceId: string, thunkAPI) => {
        try {
            const response = await apiGetDueInvoiceDetails<GetDueInvoiceResponse>(invoiceId);
            console.log('response from slice:', response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


const initialState: DueInvoicesDetailsListState = {
    loading: false,
    dueInvoicesList: {} as InvoiceDataType,
}

const dueInvoicesDetailsSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setInvoiceDetails: (state, action) => {
            state.dueInvoicesList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDueInvoicesDetails.fulfilled, (state, action) => {
                state.loading = false
                state.dueInvoicesList = action.payload.data
            })
            .addCase(getDueInvoicesDetails.pending, (state) => {
                state.loading = true
            })
           
    },
})

export const { setInvoiceDetails } = dueInvoicesDetailsSlice.actions

export default dueInvoicesDetailsSlice.reducer
