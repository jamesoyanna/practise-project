import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetMaintenanceDetails } from '@/services/maintenanceService'

export const SLICE_NAME = 'maintenanceDetails'

export type maintenancedetails = {
   id: string;
  deliveryDate: string;
  address: string;
  customer: string;
  status: string;
  totalAmount: number;
  phoneNumber: string;
  smartDeviceId: string;
  cylinderSize: string;
  orderCode: string;
  auxiliary: string;
  deliveryOfficer: string;
  customerType: string;
  cylinderType: string;
  approvedDate: string;
  cylinderId: string;
  tareWeight: string;
  owner: string;
  manufacturerName: string;
  totalCylindersOnboarded: string;
  cylinderSmallSize: string;
  cylinderMediumSize: string;
  cylinderLargeSize: string;
  smartDeviceType: string;
  deviceOnboarded: string;
  gsm: string;
  wifi: string;
}

type maintenanceDetailsData = maintenancedetails

type GetMaintenanceDetailsResponse = {
    data: maintenanceDetailsData
    total: number
}

export type MaintenanceDetailsListState = {
    loading: boolean
    maintenanceDetailsList: maintenancedetails
}

// Async thunk for fetching details
export const getMaintenanceDetails = createAsyncThunk(
    'maintenanceDetails/maintenanceCode',
    async (maintenanceCode: string) => {
        const response = await apiGetMaintenanceDetails<GetMaintenanceDetailsResponse>(
            maintenanceCode
        )
        console.log('API Response:', response) // Log the API response
        return response.data
    }
)

const initialState: MaintenanceDetailsListState = {
    loading: false,
    maintenanceDetailsList: {
    id: '',
  deliveryDate: '',
  address: '',
  customer: '',
  status: '',
  totalAmount: 0,
  phoneNumber: '',
  smartDeviceId: '',
  cylinderSize: '',
  cylinderType: '',
  orderCode: '',
  auxiliary: '',
  deliveryOfficer: '',
  customerType: '',
  approvedDate: '',
  cylinderId: '',
  tareWeight: '',
  owner: '',
  manufacturerName: '',
  totalCylindersOnboarded: '',
  cylinderSmallSize: '',
  cylinderMediumSize: '',
  cylinderLargeSize: '',
  smartDeviceType: '',
  deviceOnboarded: '',
  gsm: '',
  wifi: '',
    }
}

const maintenanceDetailsListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setMaintenanceDetails: (state, action) => {
            state.maintenanceDetailsList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                getMaintenanceDetails.fulfilled,
                (state, action) => {
                    console.log('Action payload:', action.payload) // Log the action payload

                    state.maintenanceDetailsList = action.payload.data // Adjust this line based on your response structure
                    state.loading = false
                }
            )
            .addCase(getMaintenanceDetails.pending, (state) => {
                state.loading = true
            })
            .addCase(getMaintenanceDetails.rejected, (state, action) => {
                state.loading = false
                console.error('Error fetching maintenance details:', action.error)
            })
    },
})

export const { setMaintenanceDetails } = maintenanceDetailsListSlice.actions

export default maintenanceDetailsListSlice.reducer
