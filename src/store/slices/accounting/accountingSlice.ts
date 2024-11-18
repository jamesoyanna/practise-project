// Importing necessary dependencies and types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { TableQueries } from '@/@types/common'
import {
    apiGetAccountingData,
    apiGetExpenses,
    apiCreateExpense,
} from '@/services/accountingService'

// Types for accounting analytics and expenses
export type AccountingAnalytics = {
    id: number
    key: string
    label: string
    value: number
}

type Expense = {
    description: string
    amount: string
}
type Expenses = Expense[]

// Type for accounting data
export type AccountingData = {
    statisticData: AccountingAnalytics[]
}

type CreateExpenseResponse = Expense

// Response type for dashboard data
type DashboardDataResponse = AccountingData

// Type for accounting state
export type AccountingState = {
    loading: boolean
    accountingData: Partial<AccountingData>
    tableData: TableQueries
    expenseList: Expense[]
    newExpenseDialog: boolean
}

// Type for expense response and request
type GetExpenseResponse = {
    data: Expenses
    total: number
}
type GetExpenseRequest = TableQueries

// Slice name constant
export const SLICE_NAME = 'accounting'

// Thunk to fetch dashboard data
export const getDashboardData = createAsyncThunk(
    'accounting/data/getDashboardData',
    async () => {
        const response = await apiGetAccountingData<DashboardDataResponse>()
        return response.data
    }
)

// Thunk to fetch expenses
export const getExpenses = createAsyncThunk(
    SLICE_NAME + '/getExpenses',
    async (data: GetExpenseRequest) => {
        const response = await apiGetExpenses<
            GetExpenseResponse,
            GetExpenseRequest
        >(data)
        return response.data
    }
)

export const createExpense = createAsyncThunk(
    SLICE_NAME + '/create-expense',
    async (data: Expense) => {
        const response = await apiCreateExpense<CreateExpenseResponse, Expense>(
            data
        )
        return response.data
    }
)

// Initial table data
export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

// Initial state for accounting slice
const initialState: AccountingState = {
    loading: true,
    accountingData: {},
    expenseList: [],
    tableData: initialTableData,
    newExpenseDialog: false,
}

// Accounting slice configuration
const AcountingSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        toggleNewExpenseDialog: (state, action) => {
            state.newExpenseDialog = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.accountingData = action.payload
                state.loading = false
            })
            .addCase(getDashboardData.pending, (state) => {
                state.loading = true
            })
            .addCase(getExpenses.fulfilled, (state, action) => {
                state.expenseList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getExpenses.pending, (state) => {
                state.loading = true
            })
    },
})

// Exporting actions and reducer
export const { setTableData, toggleNewExpenseDialog } = AcountingSlice.actions

export default AcountingSlice.reducer
