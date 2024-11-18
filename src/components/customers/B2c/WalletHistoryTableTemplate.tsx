/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Badge, DatePicker, Pagination } from '../../ui'
import type { ColumnDef } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import {
    getCustomersB2cDetails,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/customers/customerDetails'
import { useEffect, useMemo, useState } from 'react'

type Customers = {
    fundId?: string
    customerId?: string
    time?: string
    date?: string
    status?: any
    fundMethod?: string
    customerName: string
}

const orderStatusColor: Record<
    string,
    { label: string; dotClass: string; textClass: string }
> = {
    paid: {
        label: 'Paid',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    failed: {
        label: 'failed',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    unpaid: {
        label: 'unpaid',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
    debited: {
        label: 'debited',
        dotClass: 'bg-blue-500',
        textClass: 'text-blue-500',
    },

    // 4: { label: 'Delivered', dotClass: 'bg-green-500', textClass: 'text-green-500' },
}

const WalletHistoryTableTemplate = ({ customerId }: Customers) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                console.log('customerId :', customerId)

                if (typeof customerId === 'string') {
                    dispatch(getCustomersB2cDetails(customerId))
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchCustomerDetails()
    }, [customerId, dispatch])

    const userDetails = useAppSelector(
        (state) => state.b2cCustomerDetails.data.setCustomerDetails
    )

    // Check if userDetails is available before accessing its properties
    const walletHistory = userDetails?.walletHistory || []

    const columns: ColumnDef<Customers>[] = useMemo(
        () => [
            {
                header: 'fund id',
                accessorKey: 'fundId',
                id: '0',
            },

            {
                header: 'Amount',
                accessorKey: 'amount',
                id: '1',
            },
            {
                header: 'Fund Method',
                id: '2',
                accessorKey: 'fundMethod',
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
                        return null // Return null or fallback element if status color is not defined
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
        ],
        []
    )

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 4
    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, walletHistory.length)


    return (
        <div className="mt-6">
            <div className="flex items-center justify-between my-6">
                <div className='flex items-center gap-6'> 
                <span className='border p-3 bg-[#194da3] bg-opacity-10'>
                <h4 className=' text-[#121213] font-light'>Wallet History</h4>
                    </span>
                <p className='font-bold'>{userDetails.customerName}</p></div>
               
                <div className='w-[10rem]'>
                    
                <DatePicker
                            inputFormat="MMM, DD YYYY"
                            // defaultValue={new Date()}
                            className="text-sm"
                            placeholder=' Date'
                            // onChange={handleDateOnChange}
                        />
                </div>
            </div>
            <DataTable
                columns={columns}
                data={walletHistory}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
            />
            <div className=" flex justify-end">
                <Pagination
                    currentPage={currentPage}
                    total={walletHistory.length}
                    onChange={onPageChange}

                />
            </div>
        </div>
    )
}

export default WalletHistoryTableTemplate
