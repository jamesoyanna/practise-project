import { useEffect, useCallback, useMemo, useRef } from 'react'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import reducer, {
    setSelectedRows,
    getOrders,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/orders'
import { injectReducer } from '@/store/'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    DataTableResetHandle,
    ColumnDef,
} from '@/components/shared/DataTable'

injectReducer('OrderList', reducer)

type Order = {
    id: string
    date: number
    customer: string
    status: number
}

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
    1: {
        label: 'Assigned',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: { label: 'Pending', dotClass: 'bg-red-500', textClass: 'text-red-500' },

    3: { label: 'Rescheduled', dotClass: 'bg-blue-500', textClass: 'text-blue-500' },

    4: { label: 'Delivered', dotClass: 'bg-green-500', textClass: 'text-green-500' },
}


const OrderColumn = ({ row }: { row: Order }) => {
    return (
        <span className="font-semibold"
        >
            #{row.id}
        </span>
    )
}

const RecentOrdersTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null) // Ref for DataTable

    const dispatch = useAppDispatch(); // Get dispatch function from Redux

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.OrderList.data.tableData // Get state from Redux store
    )
   const loading = useAppSelector((state) => state.OrderList.data.loading) // Get loading state

    const data = useAppSelector((state) => state.OrderList.data.orderList)
    //   Function to fetch data
    const fetchData = useCallback(() => {
        console.log('{ pageIndex, pageSize, query }', {
            pageIndex,
            pageSize,
            sort,
            query,
        })
        dispatch(getOrders({ pageIndex, pageSize, query }))
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        dispatch(setSelectedRows([])) // Reset selected rows
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])


    const tableData = useMemo(
        () => ({ pageIndex, pageSize, query, total }),
        [pageIndex, pageSize, query, total]  // Memoize table data
    )

    const columns: ColumnDef<Order>[] = useMemo(
        () => [
            {
                header: 'Order ID',
                accessorKey: 'id',
                cell: (props) => <OrderColumn row={props.row.original} />,
            },
            {
                header: 'Customer Name',
                accessorKey: 'customer',
            },
            {
                header: 'Address',
                accessorKey: 'address',
            },
            {
                header: 'Phone Number',
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
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData)) // Update table data in Redux store
    }

    return (
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
        />
    )
}

export default RecentOrdersTable;
