import { useRef } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'
import {
    getEmployees,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/employees'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import type { TableQueries } from '@/@types/common'
import type { ChangeEvent } from 'react'

// EmployeeTableSearch component for rendering search input for employees table
const EmployeeTableSearch = () => {
    const dispatch = useAppDispatch()  // Get dispatch function

    const searchInput = useRef<HTMLInputElement>(null) // Ref for search input

    const tableData = useAppSelector(
        (state) => state.EmployeeList.data.tableData // Get table data from Redux store
    )

        // Debounce function to handle search input changes
    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val: string) {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

      // Function to fetch data based on table queries
    const fetchData = (data: TableQueries) => {
        dispatch(setTableData(data))
        dispatch(getEmployees(data))
    }

     // Function to handle search input changes
    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }

    return (
        <Input
        ref={searchInput}
        className="w-full md:w-96 lg:w-full mb-4 border-yellow-500"
        size="md"
        placeholder="Search by customer name, phone number, smart device ID"
        prefix={<HiOutlineSearch className="text-lg ml-auto" />}
        onChange={onEdit}
    />    
    
    )
}

export default EmployeeTableSearch;
