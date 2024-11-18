// Importing necessary dependencies and services
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetHubDashboardData } from '@/services/hubdashboardService'

// Defining the shape of the statistic object
export type HubDashboardAnalytics = {
    id: number,
    key: string
    label: string
    value: number
}

// Defining the shape of the dashboard data
export type HubDashboardData = {
    hubdashbardAnalyticsData: HubDashboardAnalytics[]
}

// Response type for the dashboard data
type HubDashboardDataResponse = HubDashboardData

// Defining the shape of the dashboard state
export type HubDashboardState = {
    loading: boolean
    hubdashbardAnalyticsData: Partial<HubDashboardData>
}

// Slice name for the dashboard slice
export const SLICE_NAME = 'hubdashboard'

// Thunk for fetching dashboard data asynchronously
export const getHubDashboardData = createAsyncThunk(
    'hubdashboard/data/getHubDashboardData',
    async () => {
        const response =
            await apiGetHubDashboardData<HubDashboardDataResponse>()
        return response.data
    }
)

// Initial state for the dashboard slice
const initialState: HubDashboardState = {
    loading: true,
    hubdashbardAnalyticsData: {},
}

// Creating the dashboard slice
const HubDashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHubDashboardData.fulfilled, (state, action) => {
                state.hubdashbardAnalyticsData = action.payload
                state.loading = false
            })
            .addCase(getHubDashboardData.pending, (state) => {
                state.loading = true
            })
    },
})

// Exporting the reducer
export default HubDashboardSlice.reducer
