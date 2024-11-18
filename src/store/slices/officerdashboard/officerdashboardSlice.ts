// Importing necessary dependencies and services
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetOfficerDashboardData } from '@/services/officerdashboardService'

// Defining the shape of the statistic object
export type OfficerDashboardAnalytics = {
    id: number,
    key: string
    label: string
    value: number
}

// Defining the shape of the dashboard data
export type OfficerDashboardData = {
    officerdashboardAnalyticsData: OfficerDashboardAnalytics[]
}

// Response type for the dashboard data
type OfficerDashboardDataResponse = OfficerDashboardData

// Defining the shape of the dashboard state
export type OfficerDashboardState = {
    loading: boolean
    officerdashboardAnalyticsData: Partial<OfficerDashboardData>
}

// Slice name for the dashboard slice
export const SLICE_NAME = 'officerdashboard'

// Thunk for fetching dashboard data asynchronously
export const getOfficerDashboardData = createAsyncThunk(
    `${SLICE_NAME}/officer-dashboard`,
    async () => {
        const response =
            await apiGetOfficerDashboardData<OfficerDashboardDataResponse>()
            console.log("slice response :", response.data)
        return response.data
    }
)

// Initial state for the dashboard slice
const initialState: OfficerDashboardState = {
    loading: true,
    officerdashboardAnalyticsData: {},
}

// Creating the dashboard slice
const OfficerDashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOfficerDashboardData.fulfilled, (state, action) => {
                state.officerdashboardAnalyticsData = action.payload
                console.log('State', state)
                state.loading = false
            })
            .addCase(getOfficerDashboardData.pending, (state) => {
                state.loading = true
            })
    },
})

// Exporting the reducer
export default OfficerDashboardSlice.reducer
