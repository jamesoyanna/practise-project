import { useRef } from 'react'
import Input from '@/components/ui/Input'
import TableFilter from './TableFilter'
import { HiOutlineSearch } from 'react-icons/hi'
import reducer, {
    getStocks,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '@/store/slices/stocks'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import type { TableQueries } from '@/@types/common'
import type { ChangeEvent } from 'react'
import { DatePicker } from '@/components/ui'
import { injectReducer } from '@/store/'

injectReducer('StockList', reducer)

// OrderTableSearch component for rendering search input for orders table
const CylinderTableSearch = () => {
    const date = new Date()
    const dispatch = useAppDispatch() // Get dispatch function

    const searchInput = useRef<HTMLInputElement>(null) // Ref for search input

    const tableData = useAppSelector(
        (state) => state.StockList.data.tableData // Get table data from Redux store
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
        dispatch(getStocks(data))
    }

    // Function to handle search input changes
    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
                <Input
                    ref={searchInput}
                    className="w-full border border-yellow-500"
                    size="md"
                    placeholder="Search by cylinder ID, smart device ID"
                    prefix={<HiOutlineSearch className="text-lg ml-auto" />}
                    onChange={onEdit}
                />
            </div>
            <div className="flex items-center gap-4">
                <TableFilter />
                <DatePicker inputFormat="MMM, DD YYYY" defaultValue={date} />
            </div>
        </div>
    )
}

export default CylinderTableSearch
