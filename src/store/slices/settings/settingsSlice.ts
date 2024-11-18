import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    AsyncThunk,
} from '@reduxjs/toolkit'
import { apiGetSettings, apiPutSettings } from '@/services/settingsService'
import { AxiosResponse } from 'axios'

export interface SettingsData {
    cylinderPrice: { [type: string]: string };
    SellingPriceOfGas: { [type: string]: string };
    AnnualSubscription: { [type: string]: string };
    PriceofRegulator: { [type: string]: string };
    HosePrice: { [type: string]: string };
    ReferralBonusPrice: { [type: string]: string };
    deliveryFee: { [type: string]: string };
    cylinderGasReadingTriggerLevel: { [type: string]: string };
}


export type GetSettingsResponse = {
    data: SettingsData
}

export const SLICE_NAME = 'settingsFormData'

type AsyncThunkConfig = object

export const getSettingsData = createAsyncThunk<
    SettingsData,
    void,
    AsyncThunkConfig
>(`${SLICE_NAME}/getsettings`, async (_, thunkAPI) => {
    try {
        const response: AxiosResponse<SettingsData> = await apiGetSettings()
        console.log('get res:', response)
        return response.data
    } catch (error: unknown) {
        return thunkAPI.rejectWithValue('Failed to fetch settings')
    }
})


export const putSettingsData: AsyncThunk<
    SettingsData,
    SettingsData,
    AsyncThunkConfig
> = createAsyncThunk(
    `${SLICE_NAME}/putsettings`,
    async (updatedSettingsData, { rejectWithValue }) => {
        try {
            console.log(
                'Attempting to update settings with data:',
                updatedSettingsData
            )
            const response = await apiPutSettings(updatedSettingsData)
            console.log('Response from apiPutSettings:', response)
            return response.data as SettingsData
        } catch (error) {
            console.error('Error updating settings:', error)
            return rejectWithValue('Failed to update settings')
        }
    }
)



export type SettingsState = {
    loading: boolean
    settingsDataList: SettingsData
}



const initialState: SettingsState = {
    loading: false,
    settingsDataList: {
        cylinderPrice: {},
        SellingPriceOfGas: {},
        AnnualSubscription: {},
        PriceofRegulator: {},
        HosePrice: {},
        ReferralBonusPrice: {},
        deliveryFee: {},
        cylinderGasReadingTriggerLevel: {},
    },
};


const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettingsData: (state, action: PayloadAction<SettingsData>) => { // Specify PayloadAction type
            state.settingsDataList = action.payload
        },
    },
  
    extraReducers: (builder) => {
        builder
            .addCase(getSettingsData.pending, (state) => {
                state.loading = true
            })
            .addCase(
                getSettingsData.fulfilled,
                (state, action: PayloadAction<GetSettingsResponse> | any) => {
                    state.settingsDataList = action.payload
                    state.loading = false
                }
            )

            .addCase(getSettingsData.rejected, (state) => {
                state.loading = false
            })
            .addCase(putSettingsData.pending, (state) => {
                state.loading = true
            })
            .addCase(putSettingsData.fulfilled, (state, action) => {
                console.log('Fulfilled action payload:', action.payload); 
                state.settingsDataList = action.payload;
                state.loading = false;
            })
            
    },
})

export const { setSettingsData } = settingsSlice.actions

export default settingsSlice.reducer
