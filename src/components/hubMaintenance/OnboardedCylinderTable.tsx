import { useEffect, useCallback, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import { injectReducer } from '@/store'
import reducer, {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    getStocks,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/stocks'
import cloneDeep from 'lodash/cloneDeep'
import { DatePicker } from '@/components/ui'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

injectReducer('StockList', reducer)

type Stock = {
    id: string
    date: number
    customer: string
    status: number
    hubAssistanceCode: string
}

const hubAssistanceStatusColor: Record<
    number,
    { label: string; dotClass: string; textClass: string }
> = {
    0: {
        label: 'Assigned',
        dotClass: 'bg-blue-500',
        textClass: 'text-blue-500',
    },
    1: {
        label: 'Accepted',
        dotClass: 'bg-green-500',
        textClass: 'text-green-500',
    },
}

const OnboardedCylinderTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()
    const date = new Date()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.StockList.data.tableData
    )
    const loading = useAppSelector(
        (state) => state.StockList.data.loading
    )
    const data = useAppSelector(
        (state) => state.StockList.data.stockList
    )

    const fetchData = useCallback(() => {
        dispatch(getStocks({ pageIndex, pageSize, sort, query }))
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<Stock>[] = useMemo(
        () => [
            { header: 'Cylinder Type', accessorKey: 'cylinderType' },
            {
                header: 'Total Cylinders Onboarded',
                accessorKey: 'totalCylindersOnboarded',
            },
            { header: '12kg Cylinders', accessorKey: 'cylinderSmallSize' },
            { header: '25kg Cylinders', accessorKey: 'cylinderMediumSize' },
            { header: '50kg Cylinders', accessorKey: 'cylinderLargeSize' },
        ],
        []
    )

    const MaintenanceTopBar = () => {
        return (
            <div className="grid grid-rows-2 grid-flow-col pt-10">
                <div className="bg-gray-100 rounded-full py-5">
                    <span className="bg-teal-400 p-2 rounded-full xs:rounded-lg font-bold text-base text-white">
                        Total No. of cylinders onboarded today:
                    </span>

                    <span className="bg-gray-100 p-2 rounded-full xs:rounded-lg font-bold text-2xl text-black">
                        15
                    </span>
                </div>
            </div>
        )
    }

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    const onRowSelect = (checked: boolean, row: Stock) => {
        if (checked) {
            dispatch(addRowItem(row.id))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked: boolean, rows: Row<Stock>[]) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds: string[] = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.id)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

    return (
        <>
            <div className="lg:flex items-left justify-between my-0">
                <h4 className="flex gap-3 items-center text-sm ml-8 lg:mb-0">
                    {' '}
                    <Link to="/cylinders-onboarded">
                        <FaArrowLeft />
                    </Link>{' '}
                    Cylinders Onboarded
                </h4>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 items-center">
                <MaintenanceTopBar />
                <div className="col-span-2 lg:col-span-1 text-gray-500 text-lg">
                    Last updated as at 12:30pm
                </div>
                <DatePicker inputFormat="MMM, DD YYYY" defaultValue={date} />
            </div>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
                onCheckBoxChange={onRowSelect}
                onIndeterminateCheckBoxChange={onAllRowSelect}
            />
        </>
    )
}

export default OnboardedCylinderTable
