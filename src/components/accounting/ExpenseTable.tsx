import { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
// Importing necessary functions and hooks from the accounting slice
import {
    getExpenses,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '@/store/slices/accounting'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable' // Importing necessary types from DataTable component

// Define the type for a Expense
type Expense = {
    id: string
    description: string
    amount: string
}

// ExpenseTable component
const ExpenseTable = () => {
    // Ref for the DataTable component
    const tableRef = useRef<DataTableResetHandle>(null)

    // Redux hooks for dispatching actions and selecting state
    const dispatch = useAppDispatch()
    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.accounting.data.tableData
    )
    const loading = useAppSelector((state) => state.accounting.data.loading)
    const data = useAppSelector((state) => state.accounting.data.expenseList)

    // Fetch data effect
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    // Reset sorting effect
    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [])

    // Memoized table data
    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    // Function to fetch data
    const fetchData = () => {
        dispatch(getExpenses({ pageIndex, pageSize, sort, query }))
    }

    // Columns definition
    const columns: ColumnDef<Expense>[] = useMemo(
        () => [
            {
                header: 'Description',
                accessorKey: 'description',
                // Custom cell renderer for Description column
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.description}</span>
                },
            },
            {
                header: 'Amount',
                accessorKey: 'amount',
                sortable: true,
            },
        ],
        []
    )

    // Pagination change handler
    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    // Render the DataTable component
    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
            />
        </>
    )
}

export default ExpenseTable;
