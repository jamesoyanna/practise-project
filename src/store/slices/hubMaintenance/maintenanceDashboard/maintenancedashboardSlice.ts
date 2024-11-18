// Importing necessary dependencies and services
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetMaintenanceDashboardData } from '@/services/maintenanceService'

// Defining the shape of the statistic object
export type MaintenanceDashboardAnalytics = {
    id: number,
    key: string
    label: string
    value: number
    additionalInfo?: { label: string, value: number }[];
}

// Defining the shape of the dashboard data
export type MaintenanceDashboardData = {
    maintenancedashboardAnalyticsData: MaintenanceDashboardAnalytics[]
}

// Response type for the dashboard data
type MaintenanceDashboardDataResponse = MaintenanceDashboardData

// Defining the shape of the dashboard state
export type MaintenanceDashboardState = {
    loading: boolean
    maintenancedashboardAnalyticsData: Partial<MaintenanceDashboardData>
}

// Slice name for the dashboard slice
export const SLICE_NAME = 'maintenancedashboard'

// Thunk for fetching dashboard data asynchronously
export const getMaintenanceDashboardData = createAsyncThunk(
    'maintenancedashboard/data/getMaintenanceDashboardData',
    async () => {
        const response =
            await apiGetMaintenanceDashboardData<MaintenanceDashboardDataResponse>()
        return response.data
    }
)

// Initial state for the dashboard slice
const initialState: MaintenanceDashboardState = {
    loading: true,
    maintenancedashboardAnalyticsData: {},
}

// Creating the dashboard slice
const MaintenanceDashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMaintenanceDashboardData.fulfilled, (state, action) => {
                state.maintenancedashboardAnalyticsData = action.payload
                state.loading = false
            })
            .addCase(getMaintenanceDashboardData.pending, (state) => {
                state.loading = true
            })
    },
})

// Exporting the reducer
export default MaintenanceDashboardSlice.reducer
