import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetMissedOnboardingDetails } from '@/services/onboardingService'

export const SLICE_NAME = 'missedOnboardingCustomerDetails'

interface Asset {
    gasType: string
    gasBotType?: string
} 
export type onboarding = {
    customerName: string
    address: string
    phoneNumber: string
    scheduledOnboardingDate: string
    customerType: string
    localGovernment: string
    customerRequest: {
        completeAsset: Asset[]
        singleAsset: Asset[]
    }
    email: string
    state: string
    customerCode: string
    status: string
}

type onboardingData = onboarding

type GetOnboardingResponse = {
    data: onboardingData
    total: number
}

export type OnboardingListState = {
    loading: boolean
    onBoardingDataList: onboarding
}

export const getMissedOnboardingCustomerDetails = createAsyncThunk(
    'missedOnboardingCustomerDetails/missed/customerCode',
    async (customerCode: string) => {
        const response =
            await apiGetMissedOnboardingDetails<GetOnboardingResponse>(
                customerCode
            )
        return response.data
    }
)

const initialState: OnboardingListState = {
    loading: false,
    onBoardingDataList: {
        customerName: '',
        address: '',
        phoneNumber: '',
        scheduledOnboardingDate: '',
        customerType: '',
        localGovernment: '',
        customerRequest: {
            completeAsset: [],
            singleAsset: [],
        },
        email: '',
        state: '',
        customerCode: '',
        status: '',
    },
}

const onboardListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setOnBoardDetails: (state, action) => {
            state.onBoardingDataList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getMissedOnboardingCustomerDetails.fulfilled,
                (state, action) => {
                    console.log('state :', state, action)

                    state.onBoardingDataList = action.payload.data
                    state.loading = false
                }
            )
            .addCase(getMissedOnboardingCustomerDetails.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setOnBoardDetails } = onboardListSlice.actions

export default onboardListSlice.reducer
