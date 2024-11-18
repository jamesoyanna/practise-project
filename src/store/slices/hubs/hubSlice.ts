import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetHubs, apiPostHubs} from '@/services/hubService'
import type { TableQueries } from '@/@types/common'

type LocalGovernment = {
    id: number
    state_id: number
    name: string
}
export type Hub = {
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
    nextOfKin: {
        nextOfKinFirstName: string
        nextOfKinLastName: string
        nextOfKinPhoneNumber: string
        nextOfKinAddress: string
    }
}

type hubData = Hub[]

type GetHubsResponse = {
    data: hubData[]
    total: number
}
type PostHubRequest = hubData 

export type HubsListState = {
    loading: boolean
    hubsDataList: hubData[]
    tableData: TableQueries
    error: string
}

export const SLICE_NAME = 'hubList'

export const getHubs = createAsyncThunk(
    SLICE_NAME + '/getHubs',
    async (data: TableQueries) => {
        const response = await apiGetHubs<GetHubsResponse, TableQueries>(data)
        return response.data
    }
)



export const postHubs = createAsyncThunk(
    SLICE_NAME + '/postHubs',
    async (hubsData: hubData) => {
        const postData: Record<string, hubData> = { data: hubsData };
        const response = await apiPostHubs<hubData, typeof postData>(postData);
        return response.data;
    }
);




const initialState: HubsListState = {
    loading: false,
    error:"",
    hubsDataList: [],
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

const hubsListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setHubsList: (state, action) => {
            state.hubsDataList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHubs.fulfilled, (state, action) => {
                state.hubsDataList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getHubs.pending, (state) => {
                state.loading = true
            })
            // .addCase(postHubs.fulfilled, (state, action) => {
            //     const newHubDataArray: Hub[] = action.payload; 
            //     if (Array.isArray(newHubDataArray)) {
            //         newHubDataArray.forEach((item) => {
            //             state.hubsDataList.push([item]); 
            //         });
            //     } else {
            //         state.hubsDataList.push([newHubDataArray]); 
            //     }
                
            //     state.loading = false;
            // })
            .addCase(postHubs.fulfilled, (state, action) => {
                const newHubDataArray: Hub[] = Array.isArray(action.payload) ? action.payload : []; // Use an empty array if payload is not an array
                if (Array.isArray(newHubDataArray)) {
                    newHubDataArray.forEach((item) => {
                        state.hubsDataList.push([item]); // Wrap the item in an array
                    });
                } else {
                    state.hubsDataList.push([newHubDataArray]); // Wrap the item in an array
                }
                state.loading = false;
            })
            
            
            
            .addCase(postHubs.pending, (state) => {
                state.loading = true;
            })
            .addCase(postHubs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'An error occurred during posting hubs';
            });
    },
})

export const { setHubsList, setTableData, setError} = hubsListSlice.actions

export default hubsListSlice.reducer
