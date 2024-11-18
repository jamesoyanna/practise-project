import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetMissedOnboarding } from '@/services/onboardingService'
import type { TableQueries } from '@/@types/common'

export type missedOnboarding = {
    customerName: string
    address: string
    phoneNumber: string
    scheduledOnboardingDate: string
    customerType: string
    customerBusinessType: string
    localGovernment: string
    customerRequest: {
        completeAsset: []
        singleAsset: []
    }
    email: string
    state: string
    customerCode: string
    status: string
}

type MissedonboardingData = missedOnboarding[]

type GetMissedOnboardingResponse = {
    data: MissedonboardingData[]
    total: number
}

export type MissedOnboardingListState = {
    loading: boolean
    MissedonBoardingDataList: MissedonboardingData[]
    tableData: TableQueries
}

export const SLICE_NAME = 'missedOnboardingList'

export const getMissedOnboardingData = createAsyncThunk(
    'onboardingList/onboarding/missed',
    async (data: TableQueries) => {
        const response = await apiGetMissedOnboarding<
            GetMissedOnboardingResponse,
            TableQueries
        >(data)
        return response.data
    }
)

const initialState: MissedOnboardingListState = {
    loading: false,
    MissedonBoardingDataList: [],
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

const onboardingListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setMissedOnboardingList: (state, action) => {
            state.MissedonBoardingDataList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMissedOnboardingData.fulfilled, (state, action) => {
                state.MissedonBoardingDataList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getMissedOnboardingData.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setMissedOnboardingList, setTableData } =
    onboardingListSlice.actions

export default onboardingListSlice.reducer
