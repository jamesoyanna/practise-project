import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetHubDetails } from '@/services/hubService'

export const SLICE_NAME = 'hubDetails'

type LocalGovernment = {
    id: number
    state_id: number
    name: string
}

export type hubType = {
    id: string
    hubName: string
    hubState: number
    hubImg: string
    hubLocation: string
    // hubPhoneNumber: number
    hubId: string
    // status: number
    dateRegistered: string
    servicingLocalGovernment: LocalGovernment[]
    hubManagerFirstName: string
    hubManagerLastName: string
    hubManagerId: string
    hubManagerPhoneNo: string
    hubManagerEmail: string
    hubManagerAdress: string
    nextOfKin: {
        nextOfKinFirstName: string
        nextOfKinLastName: string
        nextOfKinPhoneNumber: string
        nextOfKinAddress: string
        nextOfKinRelationship: string
    }
}

type hubData = hubType

type GethubResponse = {
    data: hubData
    total: number
}

export type hubDetailListState = {
    loading: boolean
    hubDetailDataList: hubType
}

export const gethubDetails = createAsyncThunk(
    'hubDetails/hub/hubId',
    async (hubId: string) => {
        const response = await apiGetHubDetails<GethubResponse>(hubId)
        return response.data
    }
)

const initialState: hubDetailListState = {
    loading: false,
    hubDetailDataList: {
        id: '',
        hubName: '',
        hubImg: '',
        hubState: 0,
        hubLocation: '',
        // hubPhoneNumber: 0,
        hubId: '',
        // status: 0,
        dateRegistered: '',
        servicingLocalGovernment: [],
        hubManagerFirstName: '',
        hubManagerLastName: '',
        hubManagerId: '',
        hubManagerPhoneNo: '',
        hubManagerAdress: '',
        hubManagerEmail: '',
        nextOfKin: {
            nextOfKinFirstName: '',
            nextOfKinLastName: '',
            nextOfKinPhoneNumber: '',
            nextOfKinAddress: '',
            nextOfKinRelationship: '',
        },
    },
}

const hubDetailsListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setHubDetails: (state, action) => {
            state.hubDetailDataList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(gethubDetails.fulfilled, (state, action) => {
                console.log('state :', state, action)

                state.hubDetailDataList = action.payload.data
                state.loading = false
            })
            .addCase(gethubDetails.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setHubDetails } = hubDetailsListSlice.actions

export default hubDetailsListSlice.reducer
