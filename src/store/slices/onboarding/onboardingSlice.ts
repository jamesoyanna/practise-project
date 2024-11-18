import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import {
    apiGetOnboarding
} from '@/services/onboardingService'
import type { TableQueries } from '@/@types/common'

export type onboarding = {
    customerName: string
    address: string
    phoneNumber: string
    scheduledOnboardingDate:string
    customerBusinessType: string
    customerType: string
    localGovernment: string
    customerRequest: string
    email: string
    state: string
    customerCode: string
    status: string
}

type onboardingData = onboarding[]

type GetOnboardingResponse = {
    data: onboardingData[]
    total: number
}

export type OnboardingListState = {
    loading: boolean
    onBoardingDataList: onboardingData[]
    tableData: TableQueries
}

export const SLICE_NAME = 'onboardingList'


export const getOnboardingData = createAsyncThunk(
    'onboardingList/onboarding',
    async (data: TableQueries) => {
        const response = await apiGetOnboarding<
        GetOnboardingResponse,
            TableQueries
        >(data)
        return response.data
    }
)



const initialState: OnboardingListState = {
    loading: false,
    onBoardingDataList: [],
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
        setOnboardingList: (state, action) => {
            state.onBoardingDataList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOnboardingData.fulfilled, (state, action) => {
                state.onBoardingDataList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getOnboardingData.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setOnboardingList,
    setTableData,
} = onboardingListSlice.actions

export default onboardingListSlice.reducer
