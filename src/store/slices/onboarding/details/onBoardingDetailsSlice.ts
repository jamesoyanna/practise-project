import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetOnboardingDetails } from '@/services/onboardingService'

export const SLICE_NAME = 'onboardingCustomerDetails'

export type onboarding = {
    customerName: string
    address: string
    phoneNumber: string
    scheduledOnboardingDate: string
    customerBusinessType: string
    customerType: string
    localGovernment: string
    customerRequest: string
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


export const getOnboardingCustomerDetails = createAsyncThunk(
    'onboardingCustomerDetails/customerCode',
    async (customerCode: string) => {
        const response = await apiGetOnboardingDetails<GetOnboardingResponse>(
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
        customerBusinessType:'',
        customerType: '',
        localGovernment: '',
        customerRequest: '',
        email: '',
        state: '',
        customerCode: '',
        status: '',
    }
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
                getOnboardingCustomerDetails.fulfilled,
                (state, action) => {
                    console.log('state :', state, action)

                    state.onBoardingDataList = action.payload.data
                    state.loading = false
                }
            )
            .addCase(getOnboardingCustomerDetails.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setOnBoardDetails } = onboardListSlice.actions

export default onboardListSlice.reducer
