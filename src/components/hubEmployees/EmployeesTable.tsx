import { useEffect, useCallback, useMemo, useRef } from 'react'
import { Button } from '@/components/ui'
import DataTable from '@/components/shared/DataTable'
import {
    getEmployees,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/employees'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'

import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'

// Define type for empployees
type Employee = {
    id: string
    staffId: string
    employeeName: string
    designation: string
}

const ActionColumn = ({ row }: { row: Employee }) => {
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/employee-details/${row.staffId}`)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <div className="div">
                <Button
                    color="#fff"
                    variant="solid"
                    size="sm"
                    disabled={false}
                    loading={false}
                    className="bg-[#194DA3]"
                    onClick={onView}
                >
                    View
                </Button>
            </div>
        </div>
    )
}

// EmployeesTable component for rendering employees table
const EmployeesTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null) // Initialize ref for DataTable

    const dispatch = useAppDispatch() // Get dispatch function

    // Get table data and loading state from Redux store
    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.EmployeeList.data.tableData
    )
    const loading = useAppSelector((state) => state.EmployeeList.data.loading)

    // Get employee data from Redux store
    const data = useAppSelector((state) => state.EmployeeList.data.employeeList)
    console.log("Employee, data", data)

    // Function to fetch emplyees data
    const fetchData = useCallback(() => {
        dispatch(getEmployees({ pageIndex, pageSize, sort, query }))
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        fetchData() // Fetch employees data
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected() // Reset selected rows in DataTable
        }
    }, [data])

    // Memoized table data
    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    // Memoized columns definition
    const columns: ColumnDef<Employee>[] = useMemo(
        () => [
            {
                header: 'Employees Name',
                accessorKey: 'employeeName',
            },

            {
                header: 'Designation',
                accessorKey: 'designation',
            },

            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    return (
        <DataTable
            ref={tableRef}
            // selectable
            columns={columns}
            data={data}
            loading={loading}
            pagingData={{
                total: tableData.total as number,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            onPaginationChange={onPaginationChange}
        />
    )
}

export default EmployeesTable
