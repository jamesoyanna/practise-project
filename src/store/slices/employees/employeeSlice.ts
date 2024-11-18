// Importing necessary dependencies and services
import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    current,
} from '@reduxjs/toolkit'
import {
    apiGetEmployees,
    apiAddEmployees,
} from '@/services/EmployeeService'
import type { TableQueries } from '@/@types/common'

// Defining the shape of an Employee
type Employee = {
    id: string;
    firstName: string;
    lastName: string;
    employeesName: string;
    phoneNumber: string;
    nextOfKinFirstName: string;
    nextOfKinLastName: string;
    nextOfKinPhoneNumber: string;
    designation: string; 
    nextOfKinRelationship: string; 
}

// Defining the type for an array of Employees
type Employees = Employee[]

// Response type for fetching employees
type GetEmployeesResponse = {
    data: Employees
    total: number
}

// State type for managing order list
export type EmployeeListState = {
    loading: boolean
    employeeList: Employees
    tableData: TableQueries
    newEmployeeDialog: boolean
}


// Request type for fetching orders
type GetEmployeeRequest = TableQueries

// Slice name for the employee list slice
export const SLICE_NAME = 'EmployeeList'

// Async thunk for fetching employees
export const getEmployees = createAsyncThunk(
    SLICE_NAME + '/getEmployees',
    async (data: GetEmployeeRequest) => {
        const response = await apiGetEmployees<GetEmployeesResponse, TableQueries>(data)
        return response.data
    }
)

type AddEmployeesRequest = {
    id: string;
    employeesName: string;
    phoneNumber: string;
    nextOfKinFirstName: string;
    nextOfKinLastName: string;
    nextOfKinPhoneNumber: string;
    designation: string; 
    nextOfKinRelationship: string; 
}

type AddEmployeesResponse = Employees

export const addEmployee = createAsyncThunk(
    SLICE_NAME + '/addEmployee',
    async (data: AddEmployeesRequest) => {
        const response = await apiAddEmployees<
            AddEmployeesResponse,
            AddEmployeesRequest
        >(data)
        return response.data
    }
)


// Initial table data for employee list
export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

// Initial state for the employee list slice
const initialState: EmployeeListState = {
    loading: false,
    employeeList: [],
    tableData: initialTableData,
    newEmployeeDialog: false,
}

// Creating the employee list slice
const employeeListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        // Reducer for updating the employee list
        setEmployeeList: (state, action) => {
            state.employeeList = action.payload
        },
        // Reducer for updating table data
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        
        // Reducer for toggling the new employee dialog
        toggleNewEmployeeDialog: (state, action) => {
            state.newEmployeeDialog = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // Reducer case for fulfilled getEmployees action
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.employeeList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            // Reducer case for pending getEmployees action
            .addCase(getEmployees.pending, (state) => {
                state.loading = true
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employeeList = action.payload
            })
    },
})

// Exporting actions from the employee list slice
export const {
    setEmployeeList,
    setTableData,
    toggleNewEmployeeDialog,
} = employeeListSlice.actions

// Exporting the reducer
export default employeeListSlice.reducer
