import { useCallback, useEffect, useMemo, useRef } from 'react'
import Avatar from '@/components/ui/Avatar'
import DataTable from '@/components/shared/DataTable'
import { FiPackage } from 'react-icons/fi'
import {
    getHubs,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/hubs'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import { Button } from '../ui'

type Hub = {
    id: string
    hubName: string
    hubImg: string
    hubLocation: string
    hubPhoneNumber: number
    hubId: number
    status: number
    hubManagerFirstName: string
    hubManagerLastName: string
    dateRegistered: string
}

const HubColumn = ({ row }: { row: Hub }) => {
    const avatar = row.hubImg ? (
        <Avatar src={row.hubImg} />
    ) : (
        <Avatar icon={<FiPackage />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.hubName}</span>
        </div>
    )
}

// HubTable component for displaying the hub table
const HubTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch() // Initialize useDispatch hook to dispatch actions
    const navigate = useNavigate()

   

    const testdata = useAppSelector((state) => state)
    
    const mydata = testdata.hubList.data.hubsDataList
    

    const loading = testdata.hubList.data.loading
    const { pageIndex, pageSize, sort, query, total } =
        testdata.hubList.data.tableData

    const fetchData = useCallback(() => {
        dispatch(getHubs({ pageIndex, pageSize, sort, query }))
    }, [pageIndex, pageSize, sort, query, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

   

    // Function to fetch hub data
  

    // Define table columns
    const columns: ColumnDef<Hub>[] = useMemo(
        () => [
            {
                header: 'Hub Name',
                accessorKey: 'hubName',
                cell: (props) => {
                    const row = props.row.original
                    return <HubColumn row={row} />
                },
            },
            {
                header: 'Hub Id',
                accessorKey: 'hubId',
                sortable: true,
            },
            {
                header: 'Address',
                accessorKey: 'hubLocation',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.hubLocation}</span>
                },
            },
            {
                header: 'Hub Manager',
                accessorKey: 'hubManager',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.hubManagerFirstName} {row.hubManagerLastName}</span>
                },
            },

            {
                header: 'Date Registered',
                accessorKey: 'dateRegistered',
                cell: (props) => {
                    const { dateRegistered } = props.row.original
                    return <span>{dateRegistered}</span>
                },
            },
            {
                header: '',
                accesorKey: '',
                id: '5',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="div">
                            <Button
                                color="#fff"
                                variant="solid"
                                size="sm"
                                disabled={false}
                                loading={false}
                                className="bg-[#194DA3]"
                                onClick={() => {
                                    navigate(`/hubs/${row.hubId}`)
                                }}
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
                ref={tableRef}
                columns={columns}
                data={mydata}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
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
        </>
    )
}

export default HubTable
