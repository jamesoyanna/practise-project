import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import cloneDeep from 'lodash/cloneDeep'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '../ui'
import {
    getDueInvoices,
    setTableData,
   
} from '@/store/slices/dueInvoices/dueInvoicesSlice'
import { useAppDispatch, useAppSelector } from '@/store/slices/dueInvoices'
import DueInvoicedetails from './invoicesDetails'

type Customers = {
    customerName?: string
    invoiceId?: string
    customerId?: string
    name?: string
    date?: string
    status?: any
    transactionDetails?: string
    totalAmount?: number

}

const orderStatusColor: Record<
    string,
    { label: string; dotClass: string; textClass: string }
> = {
    Paid: {
        label: 'Paid',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    Debited: {
        label: 'Debited',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    Failed: {
        label: 'Failed',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
    Unpaid: {
        label: 'Unpaid',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const B2bUnpaidCustomersTable = () => {
    const dispatch = useAppDispatch()
    const testData = useAppSelector((state) => state)
    const authority = testData.auth.user.authority
    console.log('auth :', authority)
    const dueInvoices = testData.dueInvoicesList.data.dueInvoicesList
    console.log('unpaid :', dueInvoices)

    const { pageIndex, pageSize, sort, query, total } = testData.dueInvoicesList.data.tableData

    const fetchData = useCallback(() => {
        dispatch(getDueInvoices({ pageIndex, pageSize, sort, query }))
    }, [pageIndex, pageSize, sort, query, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )
    const loading = testData.dueInvoicesList.data.loading


    const columns: ColumnDef<Customers>[] = useMemo(
        () => [
            {
                header: 'Customer Name',
                accessorKey: 'customerName',
                id: '0',
            },
            {
                header: 'invoice Id',
                accessorKey: 'invoiceId',
                id: '1',
            },
            {
                header: 'Transaction Details',
                id: '2',
                accessorKey: 'transactionDetails',
            },
            {
                header: 'Amount',
                accessorKey: 'totalAmount',
                id: '3',
            },
            {
                header: 'Date',
                accessorKey: 'date',
                id: '4',
            },
            {
                header: 'Status',
                accesorKey: 'status',
                id: '5',
                cell: (props) => {
                    const { status } = props.row.original
                    const statusColor = orderStatusColor[status]
                    if (!statusColor) {
                        return null
                    }
                    return (
                        <div className="flex items-center">
                          
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${statusColor.textClass}`}
                            >
                                {statusColor.label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: '',
                accesorKey: '',
                id: '6',
                cell: (props: { row: { original: any } }) => {
                    const { invoiceId } = props.row.original
                    return (
                        <div className="div">
                            {authority?.includes('account_officer') && (
                                <Button
                                    color="#fff"
                                    variant="solid"
                                    size="sm"
                                    disabled={false}
                                    loading={false}
                                    className="bg-[#194DA3]"
                                    onClick={() => openModal(invoiceId)}

                                >
                                    View
                                </Button>
                            )}
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

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [customerId, setCustomerId] = useState('');

    const openModal = (invoiceId: string) => {
        setCustomerId(invoiceId)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setCustomerId('')
        setIsModalOpen(false)
    }
    return (
        <>
            <DataTable
                columns={columns}
                data={dueInvoices}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
             {isModalOpen && (
                <>
                    <DueInvoicedetails
                        invoiceId={customerId}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                </>
            )}
        </>
    )
}

export default B2bUnpaidCustomersTable
