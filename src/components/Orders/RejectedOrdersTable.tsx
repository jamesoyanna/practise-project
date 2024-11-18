import { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    getRejectOrders,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/orders'
// import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import RejectedOrderDetails from './RejectedOrderDetails'
import RejectedStockOrderDetails from './RejectedStockOrderDetails'

// Define type for order
type Order = {
    id: string
    date: number
    customer: string
    status: number
    orderCode: string
    //-----------------------------
    hubName: string
    hubId: string
    hubAddress: string
    hubManager: string
}

// Define color scheme for different order statuses
const orderStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: { label: 'Pending', dotClass: 'bg-red-500', textClass: 'text-red-500' },
}

// OrdersTable component for rendering orders table
const RejectedOrdersTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [orderId, setOrderId] = useState('')
    const tableRef = useRef<DataTableResetHandle>(null) // Initialize ref for DataTable

    const openModal = (orderCode: string) => {
        setOrderId(orderCode)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setOrderId('')
        setIsModalOpen(false)
    }

    const dispatch = useAppDispatch() // Get dispatch function

    // Get table data and loading state from Redux store
    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.OrderList.data.tableData
    )
    const loading = useAppSelector((state) => state.OrderList.data.loading)

    const userData = useAppSelector((state) => state)
    const staff_role = userData.auth.user.authority

    // Get order data from Redux store
    const data = userData.OrderList.data.rejectedOrderList
    console.log('Fetch StocksOrder Data: ', data)

    // Function to fetch orders data
    const fetchData = useCallback(() => {
        dispatch(getRejectOrders({ pageIndex, pageSize, sort, query }))
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
    const superAdmincolumns: ColumnDef<Order>[] = useMemo(
        () => [
            {
                header: 'Hub Name',
                accessorKey: 'hubName',
                cell: (props) => {
                    const { hubName } = props.row.original
                    return <span>{hubName}</span>
                },
            },
            {
                header: 'Hub ID',
                accessorKey: 'hubId',
                cell: (props) => {
                    const { hubId } = props.row.original
                    return <span>{hubId}</span>
                },
            },
            {
                header: 'Hub Address',
                accessorKey: 'hubAddress',
                cell: (props) => {
                    const { hubAddress } = props.row.original
                    return <span>{hubAddress}</span>
                },
            },
            {
                header: 'Hub Manager',
                accessorKey: 'hubManager',
                cell: (props) => {
                    const { hubManager } = props.row.original
                    return <span>{hubManager}</span>
                },
            },
            {
                header: 'Order Date',
                accessorKey: 'date',
                cell: (props) => {
                    const row = props.row.original
                    const formattedDate = dayjs
                        .unix(row.date)
                        .format('ddd DD, MMM, YYYY')
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
                                className={orderStatusColor[status].dotClass}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
                            >
                                {orderStatusColor[status].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: '',
                accesorKey: 'orderCode',
                id: '5',
                cell: (props) => {
                    const { orderCode } = props.row.original

                    return (
                        <div className="div">
                            <Button
                                color="#fff"
                                variant="solid"
                                size="sm"
                                disabled={false}
                                loading={false}
                                className="bg-[#194DA3]"
                                onClick={() => openModal(orderCode)}
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

    const otherAdmincolumns: ColumnDef<Order>[] = useMemo(
        () => [
            {
                header: 'Customer Name',
                accessorKey: 'customer',
            },

            {
                header: 'Address',
                accessorKey: 'address',
            },
            {
                header: 'Phone No.',
                accessorKey: 'phoneNumber',
            },
            {
                header: 'Smart Device Id',
                accessorKey: 'smartDeviceId',
            },
            {
                header: 'cylinder Size',
                accessorKey: 'cylinderSize',
            },
            {
                header: 'Order Date',
                accessorKey: 'date',
                cell: (props) => {
                    const row = props.row.original
                    const formattedDate = dayjs
                        .unix(row.date)
                        .format('ddd DD, MMM, YYYY')
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
                                className={orderStatusColor[status].dotClass}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
                            >
                                {orderStatusColor[status].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: '',
                accesorKey: 'orderCode',
                id: '5',
                cell: (props) => {
                    const { orderCode } = props.row.original

                    return (
                        <div className="div">
                            <Button
                                color="#fff"
                                variant="solid"
                                size="sm"
                                disabled={false}
                                loading={false}
                                className="bg-[#194DA3]"
                                onClick={() => openModal(orderCode)}
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

    const columns = staff_role?.includes('SUPER_ADMIN')
        ? superAdmincolumns
        : otherAdmincolumns

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

    const onRowSelect = (checked: boolean, row: Order) => {
        if (checked) {
            dispatch(addRowItem([row.id]))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked: boolean, rows: Row<Order>[]) => {
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
                    {staff_role?.includes('SUPER_ADMIN') ? (
                        <RejectedOrderDetails
                            orderCode={orderId}
                            isOpen={isModalOpen}
                            onClose={closeModal}
                        />
                    ) : (
                        <RejectedStockOrderDetails
                            orderCode={orderId}
                            isOpen={isModalOpen}
                            onClose={closeModal}
                        />
                    )}
                </>
            )}
        </>
    )
}

export default RejectedOrdersTable
