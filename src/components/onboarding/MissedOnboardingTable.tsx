import { useEffect, useCallback, useMemo, useState } from 'react'
import reducer, {
    getMissedOnboardingData,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/onboarding/missedOnboarding'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import { Badge, Button } from '../ui'
import { injectReducer } from '@/store'
import MissedOnboardingdetails from './MissedOnboardingDetails'

type OnboardingDataType = {
    customerCode: string
    customerName: string
    address: number
    phoneNumber: number
    scheduledOnboardingDate: string
    customerBusinessType: string
    status: string
}

const orderStatusColor: Record<
    string,
    { label: string; dotClass: string; textClass: string }
> = {
    missed: {
        label: 'missed',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
    rejected: {
        label: 'rejected',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}
type OnboardingTableProps = {
    authority?: string[] 
}

injectReducer('missedOnboardingList', reducer)

const MissedOnboardingTableTemplate = ({ authority =[] }: OnboardingTableProps) => {
    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [customerId, setCustomerId] = useState('')

    const openModal = (customerCode: string) => {
        setCustomerId(customerCode)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setCustomerId('')
        setIsModalOpen(false)
    }

    const testdata = useAppSelector((state) => state)
    const allData =testdata.missedOnboardingList.data.MissedonBoardingDataList  as unknown as OnboardingDataType[]

    console.log('data :', allData)

    const loading = testdata.missedOnboardingList.data.loading
    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.missedOnboardingList.data.tableData
    )
    const fetchData = useCallback(() => {
        dispatch(getMissedOnboardingData({ pageIndex, pageSize, sort, query }))
    }, [pageIndex, pageSize, sort, query, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort])

    const mydata = useMemo(() => {
        if (Array.isArray(authority) && authority.includes('account_officer')) {
          return allData.filter((item) => item.customerBusinessType === 'B2B');
        } else {
          return allData;
        }
      }, [allData, authority]);

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<OnboardingDataType>[] = useMemo(
        () => [
            {
                header: 'Customer Name',
                accesorKey: 'customerName',
                id: '0',
                cell: (props) => {
                    const { customerName, customerBusinessType } =
                        props.row.original

                    const displayName = `${customerName}  `
                    return (
                        <span className="flex gap-2">
                            <p> {displayName}</p>
                            <span className="pb-1 px-2 border-[#cccccc] text-[#fff] bg-[#2d2e2d] text-xs h-[1.2rem] rounded-lg">
                                {customerBusinessType}
                            </span>
                        </span>
                    )
                },
            },
            {
                header: 'Address',
                accessorKey: 'address',
                id: '1',
            },
            {
                header: 'Phone Number',
                accessorKey: 'phoneNumber',
                id: '2',
            },

            {
                header: 'Scheduled Onboarding Date',
                id: '3',
                accessorKey: 'scheduledOnboardingDate',
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
                accesorKey: 'customerCode',
                id: '5',
                cell: (props) => {
                    const { customerCode } = props.row.original

                    return (
                        <div className="div">
                            <Button
                                color="#fff"
                                variant="solid"
                                size="sm"
                                disabled={false}
                                loading={false}
                                className="bg-[#194DA3]"
                                onClick={() => openModal(customerCode)}
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
    return (
        <>
            <DataTable
                columns={columns}
                data={mydata}
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
                    <MissedOnboardingdetails
                        customerCode={customerId}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                </>
            )}
        </>
    )
}

const MissedOnboardingTable = () => {
    const testdata = useAppSelector((state) => state)
    const authority = testdata.auth.user.authority ?? []
    return (
        <div className="div">
            <MissedOnboardingTableTemplate authority={authority} />
        </div>
    )
}

export default MissedOnboardingTable
