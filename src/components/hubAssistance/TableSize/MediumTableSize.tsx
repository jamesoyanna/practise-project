import { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui'

import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import reducer, {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    getStockFilter,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/stocks'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import StockDetails from '../Dialog/InStockDetails'
import SizeTableSearch from './SizeTableSearch'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { injectReducer } from '@/store'

injectReducer('StockList', reducer)

// Define type for HubAssistance
type Stock = {
    id: string
    date: number
    customer: string
    status: number
    cylinderId: string
    cylinderSize: string
}

// Define color scheme for different HubAssistance statuses
const stockStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
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

// HubAssistanceTable component for rendering HubAssistance table
const HubAssistanceTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cylinderId, setCylinderId] = useState('');

    const openModal = (cylinderId: string) => {
        setCylinderId(cylinderId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCylinderId('');
        setIsModalOpen(false);
    };


    const tableRef = useRef<DataTableResetHandle>(null) // Initialize ref for DataTable

    const dispatch = useAppDispatch() // Get dispatch function

    // Get table data and loading state from Redux store
    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.StockList.data.tableData
    )
    const loading = useAppSelector(
        (state) => state.StockList.data.loading
    )

    // Get order data from Redux store
    const data = useAppSelector(
        (state) => state.StockList.data.stockList
    )
    // Function to fetch orders data
    const fetchData = useCallback(() => {
        dispatch(
            getStockFilter({
                pageIndex,
                pageSize,
                sort,
                query,
                cylinderSize: '25kg',
            })
        )
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        dispatch(setSelectedRows([])) // Reset selected rows
        fetchData() // Fetch orders data
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
    const columns: ColumnDef<Stock>[] = useMemo(
        () => [
            {
                header: 'Cylinder ID',
                accessorKey: 'cylinderId',
            },
            {
                header: 'Cylinder Size',
                accessorFn: (row) => row.cylinderSize,
            },
            {
                header: 'Date',
                accessorKey: 'date',
                cell: (props) => {
                    const { date } = props.row.original
                    const formattedDate = dayjs(date).format(
                        'ddd DD, MMM YYYY, h:mmA'
                    )
                    return <span>{formattedDate}</span>
                },
            },

            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const { status } = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={
                                    stockStatusColor[status].dotClass
                                }
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${stockStatusColor[status].textClass}`}
                            >
                                {stockStatusColor[status].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: '',
                accesorKey: 'cylinderId',
                id: '5',
                cell: (props) => {
                    const { cylinderId } = props.row.original

                    return (
                        <div className="div">
                            <Button
                                color="#fff"
                                variant="solid"
                                size="sm"
                                disabled={false}
                                loading={false}
                                className="bg-[#194DA3]"
                                onClick={() => openModal(cylinderId)}
                            >
                                View
                            </Button>
                        </div>
                    )
                },
            },
        ],
        []
    )

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
            <div className="lg:flex items-center justify-between mb-6">
                <h4 className="flex gap-3 items-center text-sm mb-5">
                    {' '}
                    <Link to="/hub-assistance">
                        <FaArrowLeft />
                    </Link>{' '}
                    25kg Cylinders
                </h4>
            </div>
            <SizeTableSearch />
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
                onSelectChange={onSelectChange}
                onSort={onSort}
                onCheckBoxChange={onRowSelect}
                onIndeterminateCheckBoxChange={onAllRowSelect}
            />
            {isModalOpen && (
                <>
                    <StockDetails
                       cylinderId = {cylinderId}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                </>
            )}
        </>
    )
}

export default HubAssistanceTable
