import { useRef } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'
import {
    getHubs,
    setTableData,
    useAppSelector,
    useAppDispatch,
} from '../../store/slices/hubs'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import type { TableQueries } from '@/@types/common'
import type { ChangeEvent } from 'react'

// HubTableSearch component for handling hub search functionality
const HubTableSearch = () => {
    const dispatch = useAppDispatch() // Initialize useDispatch hook to dispatch actions

    const searchInput = useRef(null) // Initialize useRef for accessing search input element

        // Select table data from Redux store using useSelector hook
    const tableData = useAppSelector(
        (state) => state.hubList.data.tableData
    )

        // Debounce function to delay search input
    const debounceFn = debounce(handleDebounceFn, 500)

     // Function to handle debounced search input
    function handleDebounceFn(val: string) {
        const newTableData = cloneDeep(tableData)
        // Update query parameter with search input value
        newTableData.query = val
        newTableData.pageIndex = 1 // Reset page index to 1 when performing a new search

         // Fetch data only if the search input value is a string and its length is greater than 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

           // Fetch data when the search input value is an empty string
        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    // Function to fetch hub data
    const fetchData = (data: TableQueries) => {
        dispatch(setTableData(data)) // Dispatch action to set table data
        dispatch(getHubs(data)) // Dispatch action to get hub data
    }

    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value) // Call debounce function with search input value
    }

    return (
        <Input
            ref={searchInput}
            className="w-full md:w-96 lg:w-full  border-yellow-500"
            size="md"
            placeholder="Search by Hub Name, Hub ID, Hub Manager"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default HubTableSearch;
