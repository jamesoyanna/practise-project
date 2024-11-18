import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { TableQueries } from '@/@types/common'
import { apiGetDueInvoices } from '@/services/dueInvoicesService'

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
    regulatorUnits:number
    regulatorPrice: number
    hoseUnits: number
    hosePrice: number
    date: string
    status: any
}

type InvoiceData = InvoiceDataType[]

type GetDueInvoiceResponse = {
    data: InvoiceData
    total: number
}

export type DueInvoicesListState = {
    loading: boolean
    dueInvoicesList: InvoiceData
    tableData: TableQueries
}

export const SLICE_NAME = 'dueInvoicesList'

export const getDueInvoices = createAsyncThunk(
    `${SLICE_NAME}/invoices/due`,
    async (data: TableQueries) => {
        const response = await apiGetDueInvoices<
            GetDueInvoiceResponse,
            TableQueries
        >(data)
        return response.data
    }
)

const initialState: DueInvoicesListState = {
    loading: false,
    dueInvoicesList: [],
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

const dueInvoicesListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setdueInvoicesList: (state, action) => {
            state.dueInvoicesList = action.payload
        },

        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDueInvoices.fulfilled, (state, action) => {
                state.dueInvoicesList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getDueInvoices.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setdueInvoicesList, setTableData } = dueInvoicesListSlice.actions

export default dueInvoicesListSlice.reducer
