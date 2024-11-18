import { useEffect, useCallback, useMemo, useState } from 'react'
import {
    getOnboardingData,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/onboarding'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import { Badge, Button } from '../ui'
import Onboardingdetails from './Onboardingdetails'

export type OnboardingDataType = {
    customerCode: string
    customerName: string
    address: string
    phoneNumber: string
    scheduledOnboardingDate: string
    customerBusinessType: string
    status: string
}

const orderStatusColor: Record<
    string,
    { label: string; dotClass: string; textClass: string }
> = {
    onboarded: {
        label: 'onboarded',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    assigned: {
        label: 'assigned',
        dotClass: 'bg-yellow-500',
        textClass: 'text-yellow-500',
    },
    unassigned: {
        label: 'unassigned',
        dotClass: 'bg-blue-500',
        textClass: 'text-blue-500',
    },
}
type OnboardingTableProps = {
    authority: string[] 
}
const OnboardingTable = ({ authority }: OnboardingTableProps) => {
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

    const allData = testdata.onboardingList.data
        .onBoardingDataList as unknown as OnboardingDataType[]

    const mydata = useMemo(() => {
        if (authority.includes('ACCOUNT_OFFICER')) {
            return allData.filter((item) => item.customerBusinessType === 'B2B')
        } else {
            return allData
        }
    }, [allData, authority])

    console.log("{all} :", allData);
    console.log("b2b :", mydata);

    

    const loading = testdata.onboardingList.data.loading
    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.onboardingList.data.tableData
    )
    const fetchData = useCallback(() => {
        dispatch(getOnboardingData({ pageIndex, pageSize, sort, query }))
    }, [pageIndex, pageSize, sort, query, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort])

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
                        return null // Return null or fallback element if status color is not defined
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
                    <Onboardingdetails
                        customerCode={customerId}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                    />
                </>
            )}
        </>
    )
}

const OnboardingTableTemplate = () => {
    const testdata = useAppSelector((state) => state)
    const authority = testdata.auth.user.authority ?? []

    return (
        <div className="flex flex-col gap-5">
            <OnboardingTable authority={authority} />
        </div>
    )
}

export default OnboardingTableTemplate
