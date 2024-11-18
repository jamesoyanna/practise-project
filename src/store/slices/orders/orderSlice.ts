// Importing necessary dependencies and services
import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    current,
} from '@reduxjs/toolkit'
import {
    apiGetOrders,
    apiDeleteOrders,
    apiGetOrderAnalyticsData,
    apiGetRejectedOrders,
} from '@/services/OrderService'
import type { TableQueries } from '@/@types/common'

// Defining the shape of an Order
type Order = {
    id: string
    date: number
    customer: string
    status: number
}

// Defining the type for an array of Orders
type Orders = Order[]

// Defining the type for an array of rejedctd Orders
type RejectedOrders = Order[]

// Response type for fetching orders
type GetOrdersResponse = {
    data: Orders
    total: number
}

// Response type for fetching rejected orders
type GetRejectOrdersResponse = {
    data: RejectedOrders
    total: number
}

// Defining the shape of order statistics
export type OrderStats = {
    id: number
    key: string
    label: string
    value: number
    title: string
    color: string
}

export const initialFilterData = {
    status: '',
}

// Data structure for order analytics
export type OrderAnalyticsData = {
    orderStatsData: OrderStats[]
}

// Response type for fetching order analytics data
type OrderAnalyticsDataResponse = OrderAnalyticsData

// State type for managing order list
export type OrderListState = {
    loading: boolean
    orderList: Orders
    filterData: Filter
    rejectedOrderList: RejectedOrders
    analyticsData: Partial<OrderAnalyticsData>
    tableData: TableQueries
    deleteMode: 'single' | 'batch' | ''
    selectedRows: string[]
    selectedRow: string
    newOrderDialog: boolean
}

// Request type for fetching orders
type GetOrderRequest = TableQueries

type Filter = {
    status: string
}

// Request type for fetching orders
type GetRejectedOrderRequest = TableQueries

// Slice name for the order list slice
export const SLICE_NAME = 'OrderList'

// Async thunk for fetching orders
export const getRejectOrders = createAsyncThunk(
    SLICE_NAME + '/getRejectOrders',
    async (data: GetRejectedOrderRequest) => {
        const response = await apiGetRejectedOrders<
            GetRejectOrdersResponse,
            TableQueries
        >(data)
        return response.data
    }
)

// Async thunk for fetching orders
export const getOrders = createAsyncThunk(
    SLICE_NAME + '/getOrders',
    async (data: GetOrderRequest & { filterData?: Filter }) => {
        const response = await apiGetOrders<GetOrdersResponse, TableQueries>(
            data
        )
        return response.data
    }
)

// export const getOrders = createAsyncThunk(
//     SLICE_NAME + '/getOrders',
//     async (data: TableQueries & { filterData?: Filter }) => {
//         const response = await apiGetOrders<
//         GetOrdersResponse,
//             TableQueries
//         >(data)
//         return response.data
//     }
// )
// Async thunk for fetching order analytics data
export const getOrderAnalyticsData = createAsyncThunk(
    'orders/analytics',
    async () => {
        const response =
            await apiGetOrderAnalyticsData<OrderAnalyticsDataResponse>()
        return response.data
    }
)

// Async function for deleting orders
export const deleteOrders = async (data: { id: string | string[] }) => {
    const response = await apiDeleteOrders<boolean, { id: string | string[] }>(
        data
    )
    return response.data
}

// Initial table data for order list
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

// Initial state for the order list slice
const initialState: OrderListState = {
    loading: false,
    analyticsData: {},
    orderList: [],
    rejectedOrderList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
    newOrderDialog: false,
    selectedRows: [],
    selectedRow: '',
    deleteMode: '',
}

// Creating the order list slice
const orderListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        // Reducer for updating the order list
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        // Reducer for updating table data
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        // Reducer for updating selected rows
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        // Reducer for updating selected row
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        // Reducer for toggling the new order dialog
        toggleNewOrderDialog: (state, action) => {
            state.newOrderDialog = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        // Reducer for adding a row item
        addRowItem: (state, { payload }) => {
            const currentState = current(state)
            if (!currentState.selectedRows.includes(payload)) {
                state.selectedRows = [...currentState.selectedRows, ...payload]
            }
        },
        // Reducer for removing a row item
        removeRowItem: (state, { payload }: PayloadAction<string>) => {
            const currentState = current(state)
            if (currentState.selectedRows.includes(payload)) {
                state.selectedRows = currentState.selectedRows.filter(
                    (id) => id !== payload
                )
            }
        },
        // Reducer for setting the delete mode
        setDeleteMode: (state, action) => {
            state.deleteMode = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // Reducer case for fulfilled getOrders action
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orderList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            // Reducer case for pending getOrders action
            .addCase(getOrders.pending, (state) => {
                state.loading = true
            })
            // Reducer case for fulfilled getOrderAnalyticsData action
            .addCase(getOrderAnalyticsData.fulfilled, (state, action) => {
                state.analyticsData = action.payload
                state.loading = false
            })
            // Reducer case for pending getOrderAnalyticsData action
            .addCase(getOrderAnalyticsData.pending, (state) => {
                state.loading = true
            })
            // Reducer case for fulfilled getOrders action
            .addCase(getRejectOrders.fulfilled, (state, action) => {
                state.rejectedOrderList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            // Reducer case for pending getOrders action
            .addCase(getRejectOrders.pending, (state) => {
                state.loading = true
            })
    },
})

// Exporting actions from the order list slice
export const {
    setFilterData,
    setOrderList,
    setTableData,
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    toggleNewOrderDialog,
} = orderListSlice.actions

// Exporting the reducer
export default orderListSlice.reducer
