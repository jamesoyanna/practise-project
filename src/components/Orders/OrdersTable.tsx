import { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui'

import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    getOrders,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/orders'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import OrderDetails from './OrderDetails'
import StockOrderDetails from './StockOrderDetails'

// Define type for order
type Order = {
    id: string
    approvedDate: string
    phoneNumber: string
    address: string
    smartDeviceId: string
    cylinderSize: string
    customer: string
    status: number
    status2: number
    imageUrl: string
    orderCode: string
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
    0: {
        label: 'Approved',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },

    1: { label: 'Pending', dotClass: 'bg-red-500', textClass: 'text-red-500' },
    2: {
        label: 'Rescheduled',
        dotClass: 'bg-blue-500',
        textClass: 'text-blue-500',
    },

    3: {
        label: 'Delivered',
        dotClass: 'bg-green-500',
        textClass: 'text-green-500',
    },
    4: {
        label: 'Assigned',
        dotClass: 'bg-yellow-500',
        textClass: 'text-yellow-500',
    },
}

// OrdersTable component for rendering orders table
const OrdersTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [orderId, setOrderId] = useState('')

    const openModal = (orderCode: string) => {
        setOrderId(orderCode)
        setIsModalOpen(true)
    }

    const tableRef = useRef<DataTableResetHandle>(null) // Initialize ref for DataTable

    const dispatch = useAppDispatch() // Get dispatch function

    const userData = useAppSelector((state) => state)
    const staff_role = userData.auth.user.authority

    // Get table data and loading state from Redux store
    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.OrderList.data.tableData
    )
    const loading = userData.OrderList.data.loading

    // Get order data from Redux store
    const data = userData.OrderList.data.orderList
    console.log('Fetch Order Data: ', data)

    // Function to fetch orders data
    const fetchData = useCallback(() => {
        dispatch(getOrders({ pageIndex, pageSize, sort, query }))
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

    const closeModal = () => {
        setOrderId('')
        setIsModalOpen(false)
    }

    const superAdmincolumns: ColumnDef<Order>[] = useMemo(
        () => [
            {
                header: 'Hub Name',
                accessorKey: 'hubName',
                cell: (props) => {
                    const { hubName, imageUrl } = props.row.original
                    return (
                        <div className="flex items-center">
                            <img
                                src={imageUrl}
                                alt="Hub Icon"
                                className="w-6 h-6 mr-2"
                            />
                            <span>{hubName}</span>
                        </div>
                    )
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
                accessorKey: 'approvedDate',
                cell: (props) => {
                    const { approvedDate } = props.row.original
                    const formattedDate = dayjs(approvedDate).format(
                        'ddd DD, MMM YYYY, h:mmA'
                    )
                    return <span>{formattedDate}</span>
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const { status2 } = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={orderStatusColor[status2].dotClass}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status2].textClass}`}
                            >
                                {orderStatusColor[status2].label}
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
                cell: (props) => {
                    const { customer } = props.row.original
                    return <span>{customer}</span>
                },
            },
            {
                header: 'Address',
                accessorKey: 'address',
                cell: (props) => {
                    const { address } = props.row.original
                    return <span>{address}</span>
                },
            },
            {
                header: 'Phone No.',
                accessorKey: 'phoneNumber',
                cell: (props) => {
                    const { phoneNumber } = props.row.original
                    return <span>{phoneNumber}</span>
                },
            },
            {
                header: 'Smart Device Id',
                accessorKey: 'smartDeviceId',
                cell: (props) => {
                    const { smartDeviceId } = props.row.original
                    return <span>{smartDeviceId}</span>
                },
            },
            {
                header: 'cylinder Size',
                accessorKey: 'cylinderSize',
                cell: (props) => {
                    const { cylinderSize } = props.row.original
                    return <span>{cylinderSize}</span>
                },
            },

            {
                header: 'Order Date',
                accessorKey: 'approvedDate',
                cell: (props) => {
                    const { approvedDate } = props.row.original
                    const formattedDate = dayjs(approvedDate).format(
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
                        <OrderDetails
                            orderCode={orderId}
                            isOpen={isModalOpen}
                            onClose={closeModal}
                        />
                    ) : (
                        <StockOrderDetails
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

export default OrdersTable
