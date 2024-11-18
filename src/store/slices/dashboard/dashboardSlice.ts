// Importing necessary dependencies and services
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetDashboardData } from '@/services/dashboardService'

// Defining the shape of the statistic object
export type Statistic = {
    id: number,
    key: string
    label: string
    value: number
}

// Defining the shape of the dashboard data
export type DashboardData = {
    statisticData: Statistic[]
}

// Response type for the dashboard data
type DashboardDataResponse = DashboardData

// Defining the shape of the dashboard state
export type DashboardState = {
    loading: boolean
    dashboardData: Partial<DashboardData>
}

// Slice name for the dashboard slice
export const SLICE_NAME = 'dashboard'

// Thunk for fetching dashboard data asynchronously
export const getDashboardData = createAsyncThunk(
    'dashboard/data/getDashboardData',
    async () => {
        const response =
            await apiGetDashboardData<DashboardDataResponse>()
        return response.data
    }
)

// Initial state for the dashboard slice
const initialState: DashboardState = {
    loading: true,
    dashboardData: {},
}

// Creating the dashboard slice
const DashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.dashboardData = action.payload
                state.loading = false
            })
            .addCase(getDashboardData.pending, (state) => {
                state.loading = true
            })
    },
})

// Exporting the reducer
export default DashboardSlice.reducer
