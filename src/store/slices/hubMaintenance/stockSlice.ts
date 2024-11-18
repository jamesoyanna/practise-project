// Importing necessary dependencies and services
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGetStock, apiGetStockAnalyticsData } from '@/services/stockService';
import type { TableQueries } from '@/@types/common';

// Defining the shape of a Stock
type Stock = {
    id: string;
    date: number;
    customer: string;
    status: string;
    cylinderId: string;
    smartDeviceId: string;
    smartDeviceSize: string;
    cylinderSize: string;
    smartDeviceType: string;
    cylinderType: string;
    tareWeight: string;
    manufacturerName: string;
    owner: string;
    name: string;
    deliveryDate: string
};

// Defining the type for an array of Stocks
type Stocks = Stock[];

// Response type for fetching Stocks
type GetStockResponse = {
    data: Stock[];
    total: number;
};

// Defining the shape of Stocks statistics
export type StockStats = {
    id: number;
    key: string;
    label: string;
    value: number;
    title: string;
    color: string;
};

export const initialFilterData = {
    status: '',
};

// Data structure for Stocks analytics
export type StockAnalyticsData = {
    stockStatsData: StockStats[];
};

// Response type for fetching Stocks analytics data
type StockAnalyticsDataResponse = StockAnalyticsData;

// State type for managing Stocks list
export type StockListState = {
    loading: boolean;
    stockList: Stocks;
    filterData: Filter;
    analyticsData: Partial<StockAnalyticsData>;
    tableData: TableQueries;
    deleteMode: 'single' | 'batch' | '';
    selectedRows: string[];
    selectedRow: string;
    newStockDialog: boolean;
};

// Request type for fetching Stocks
type GetStockRequest = TableQueries;

type Filter = {
    status?: string;
};

// Slice name for the Stocks list slice
export const SLICE_NAME = 'StockList';

// Async thunk for fetching Stock
export const getStockFilter = createAsyncThunk(
    SLICE_NAME + '/getStock',
    async (data: GetStockRequest & { cylinderSize?: string; smartDeviceType?: string }) => {
        const response = await apiGetStock<GetStockResponse, TableQueries>(data);
        const dataArray = response.data.data; // assume response.data is an array
        if (data.cylinderSize && data.smartDeviceType) {
            return dataArray.filter(
                (entry) =>
                    entry.cylinderSize === data.cylinderSize &&
                    entry.smartDeviceType === data.smartDeviceType
            );
        } else if (data.cylinderSize) {
            return dataArray.filter((entry) => entry.cylinderSize === data.cylinderSize);
        } else if (data.smartDeviceType) {
            return dataArray.filter((entry) => entry.smartDeviceType === data.smartDeviceType);
        }
        return dataArray;
    }
);

// Async thunk for fetching employees
export const getStocks = createAsyncThunk(
    SLICE_NAME + '/getStocks',
    async (data: GetStockRequest) => {
        const response = await apiGetStock<GetStockResponse, TableQueries>(data)

        console.log("Stock Data from store:", response.data)
        return response.data
    }
)

// Async thunk for fetching Stock analytics data
export const getStockAnalyticsData = createAsyncThunk(
    'stock/analytics',
    async () => {
        const response = await apiGetStockAnalyticsData<StockAnalyticsDataResponse>();
        return response.data;
    }
);

// Initial table data for Stocklist
export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
};

// Initial state for the Stock list slice
const initialState: StockListState = {
    loading: false,
    analyticsData: {},
    stockList: [],
    tableData: initialTableData,
    filterData: initialFilterData,
    newStockDialog: false,
    selectedRows: [],
    selectedRow: '',
    deleteMode: '',
};

// Creating the Stock list slice
const stockListSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        // Reducer for updating the Stock list
        setStockList: (state, action: PayloadAction<Stocks>) => {
            state.stockList = action.payload;
        },
        // Reducer for updating table data
        setTableData: (state, action: PayloadAction<TableQueries>) => {
            state.tableData = action.payload;
        },
        // Reducer for updating selected rows
        setSelectedRows: (state, action: PayloadAction<string[]>) => {
            state.selectedRows = action.payload;
        },
        // Reducer for updating selected row
        setSelectedRow: (state, action: PayloadAction<string>) => {
            state.selectedRow = action.payload;
        },
        // Reducer for toggling the new Stock dialog
        toggleNewStockDialog: (state, action: PayloadAction<boolean>) => {
            state.newStockDialog = action.payload;
        },
        setFilterData: (state, action: PayloadAction<Filter>) => {
            state.filterData = action.payload;
        },
        // Reducer for adding a row item
        addRowItem: (state, { payload }: PayloadAction<string>) => {
            if (!state.selectedRows.includes(payload)) {
                state.selectedRows.push(payload);
            }
        },
        // Reducer for removing a row item
        removeRowItem: (state, { payload }: PayloadAction<string>) => {
            state.selectedRows = state.selectedRows.filter((id) => id !== payload);
        },
        // Reducer for setting the delete mode
        setDeleteMode: (state, action: PayloadAction<'single' | 'batch' | ''>) => {
            state.deleteMode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Reducer case for fulfilled getStock action
            .addCase(
                getStockFilter.fulfilled,
                (state, action: PayloadAction<Stock[]>) => {
                    state.stockList = action.payload; // assuming action.payload is of type Stock[]
                    state.loading = false;
                }
            )

            .addCase(getStocks.fulfilled, (state, action) => {
                state.stockList = action.payload.data
                state.tableData.total = action.payload.total
                console.log("Stock Data Action:", action)
                state.loading = false
            })
            // Reducer case for pending getStock action
            .addCase(getStocks.pending, (state) => {
                state.loading = true;
            })
            // Reducer case for fulfilled getStockAnalyticsData action
            .addCase(
                getStockAnalyticsData.fulfilled,
                (state, action: PayloadAction<StockAnalyticsDataResponse>) => {
                    state.analyticsData = action.payload;
                    state.loading = false;
                }
            )
            // Reducer case for pending getStockAnalyticsData action
            .addCase(getStockAnalyticsData.pending, (state) => {
                state.loading = true;
            });
    },
});

// Exporting actions from the Stock list slice
export const {
    setFilterData,
    setStockList,
    setTableData,
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    toggleNewStockDialog,
} = stockListSlice.actions;

// Exporting the reducer
export default stockListSlice.reducer;
