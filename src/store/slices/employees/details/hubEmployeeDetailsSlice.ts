import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetHubEmployeeDetails } from '@/services/EmployeeService'

export const SLICE_NAME = 'hubEmployeeDetails'

export type employeeDetail = {
    id: string
    employeeName: string
    designation: string
    img: string
    location: string
    phoneNumber: number
    staffId: string
    status: number
    dateRegistered: string
    servicingLocalGovernment: string[]
    hubManager: string
    hubManagerId: string
    hubEmployeePhoneNo: string
    hubManagerEmail: string
    nextOfKin: {
        nokName: string
        nokRelationship: string
        nokPhoneNo: string
    }
}

type employeeData = employeeDetail

type GethubEmployeeResponse = {
    data: employeeData
    total: number
}

export type hubEmployeeDetailListState = {
    loading: boolean
    hubEmployeeDetailDataList: employeeDetail
}


export const gethubEmployeeDetails = createAsyncThunk(
    'hubEmployeeDetails/employee-details/staffId',
    async (staffId: string) => {
        const response = await apiGetHubEmployeeDetails<GethubEmployeeResponse>(
            staffId
        )
        return response.data
    }
)

const initialState: hubEmployeeDetailListState = {
    loading: false,
    hubEmployeeDetailDataList: {
        id: '',
        employeeName: '',
        designation: '',
        img: '',
        location: '',
        phoneNumber: 0, 
        staffId: '',
        status: 0, 
        dateRegistered: '',
        servicingLocalGovernment: [], 
        hubManager: '',
        hubManagerId: '',
        hubEmployeePhoneNo: '',
        hubManagerEmail: '',
        nextOfKin: {
            nokName: '',
            nokRelationship: '',
            nokPhoneNo: '',
        }
    }
}

const hubEmployeeDetailsListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setHubEmployeeDetails: (state, action) => {
            state.hubEmployeeDetailDataList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                gethubEmployeeDetails.fulfilled,
                (state, action) => {
                    console.log('state :', state, action)

                    state.hubEmployeeDetailDataList = action.payload.data
                    state.loading = false
                }
            )
            .addCase(gethubEmployeeDetails.pending, (state) => {
                state.loading = true
            })
    },
})

export const { setHubEmployeeDetails } = hubEmployeeDetailsListSlice.actions

export default hubEmployeeDetailsListSlice.reducer