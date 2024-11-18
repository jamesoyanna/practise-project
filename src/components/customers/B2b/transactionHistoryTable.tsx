import { Badge, Button, Pagination } from '../../ui'
import type { ColumnDef } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import {
    getCustomersB2bDetails,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/customers/b2bCustomerDetailsSlice'
import { useEffect, useMemo, useState } from 'react'
import TransactionHistoryDetails from './cards/transactionHistoryDetails'

type Customers = {
    invoiceId?: string
    customerId?: string
    name?: string
    date?: string
    status?: any
    transactionDetails?: string
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

const B2bTransactionHistoryTable = ({ customerId }: Customers) => {
    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTransactionData, setSelectedTransactionData] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                if (typeof customerId === 'string') {
                    dispatch(getCustomersB2bDetails(customerId))
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchCustomerDetails()
    }, [customerId, dispatch])

    const testData = useAppSelector((state) => state)
    const authority = testData.auth.user.authority
    console.log('auth :', authority)
    const userDetails = testData.b2bCustomerDetails.data.setCustomerB2bDetails

    const transactionHistory = userDetails?.transactionHistory || []

    const openModal = (transactionData: any) => {
        setSelectedTransactionData(transactionData)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedTransactionData(null)
    }

    const columns: ColumnDef<Customers>[] = useMemo(
        () => [
            {
                header: 'invoice Id',
                accessorKey: 'invoiceId',
                id: '0',
            },
            {
                header: 'Transaction Details',
                id: '1',
                accessorKey: 'transactionDetails',
            },
            {
                header: 'Amount',
                accessorKey: 'totalAmount',
                id: '2',
            },
            {
                header: 'Date',
                accessorKey: 'date',
                id: '3',
            },
            {
                header: 'Status',
                accesorKey: 'status',
                id: '4',
                cell: (props) => {
                    const { status } = props.row.original
                    const statusColor = orderStatusColor[status]
                    if (!statusColor) {
                        return null
                    }
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor.dotClass} />
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
                id: '5',
                cell: (props: { row: { original: any } }) => {
                    const transactionData = props.row.original
                    return (
                        <div className="div">
                           
                                <Button
                                    color="#fff"
                                    variant="solid"
                                    size="sm"
                                    disabled={false}
                                    loading={false}
                                    className="bg-[#194DA3]"
                                    onClick={() => openModal(transactionData)}
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

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <>
            <div>
                <DataTable
                    columns={columns}
                    data={transactionHistory}
                    skeletonAvatarColumns={[0]}
                    skeletonAvatarProps={{ width: 28, height: 28 }}
                />
                <div className="flex justify-end">
                    <Pagination
                        currentPage={currentPage}
                        total={transactionHistory.length}
                        onChange={onPageChange}
                    />
                </div>
            </div>

            {isModalOpen && selectedTransactionData && (
                <TransactionHistoryDetails
                    isOpen={isModalOpen}
                    transactionHistoryData={selectedTransactionData}
                    onClose={closeModal}
                />
            )}
        </>
    )
}

export default B2bTransactionHistoryTable
